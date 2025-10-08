/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Edit3,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MultiplePagemergeData } from "../components/mock-data";
import showHighlight from "../components/pdfhighlight";
import { usePathname, useRouter } from "next/navigation";
import PageButtons from "../components/rout-buttons";

type Coords = [number, number, number, number];

interface Field {
  value: string;
  coords: Coords;
  pageNumber: number;
}

interface Highlight {
  label: string;
  field: Field;
  confidence?: number; // add confidence

  editedValue?: string;
  from?: string;
  to?: string;
  status?: "accepted" | "declined" | "missing" | "editing";
}

export const flattenHighlights = (data: any): Highlight[] => {
  const highlights: Highlight[] = [];

  const processField = (label: string, fieldData: any, itemIndex?: number) => {
    if (!fieldData?.coords) return;

    highlights.push({
      label:
        itemIndex !== undefined ? `Item ${itemIndex + 1} - ${label}` : label,
      field: {
        value: fieldData.value ?? "",
        coords: fieldData.coords,
        pageNumber: fieldData.pageNumber ?? 1,
      },
      confidence: fieldData.confidence, // add confidence here

      editedValue: fieldData.value ?? "",
    });
  };

  for (const [label, fieldData] of Object.entries(data)) {
    if (label === "Items") continue;
    processField(label, fieldData);
  }

  data.Items?.forEach((item: any, idx: number) => {
    for (const [label, fieldData] of Object.entries(item)) {
      processField(label, fieldData, idx);
    }
  });

  return highlights;
};

export default function Page() {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [editableHighlights, setEditableHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);

  const highlights = useMemo(
    () => flattenHighlights(MultiplePagemergeData),
    []
  );
  const pdfIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setEditableHighlights(highlights);
  }, [highlights]);

  const viewURL = "/pdfviewer/pdfjs-4.2.67-dist/web/viewer.html?file=";

  const loadLocalPdf = async () => {
    setLoading(true);
    const response = await fetch("/multiple-pages.pdf");
    const blob = await response.blob();
    setPdfBlob(blob);
    setTimeout(() => setLoading(false), 500); // optional small delay for better skeleton effect
  };

  useEffect(() => {
    loadLocalPdf();
  }, []);

  const pdfURL = useMemo(() => {
    if (!pdfBlob) return null;
    return URL.createObjectURL(pdfBlob);
  }, [pdfBlob]);

  useEffect(() => {
    return () => {
      if (pdfURL) URL.revokeObjectURL(pdfURL);
    };
  }, [pdfURL]);

  const showValue = (field: Field, isHover: boolean) => {
    showHighlight(field, isHover, false);
  };

  const handleValueChange = (index: number, value: string) => {
    setEditableHighlights((prev) => {
      const copy = [...prev];
      copy[index].editedValue = value;
      return copy;
    });
  };

  const handleAction = (
    index: number,
    action: "accept" | "decline" | "missing" | "edit"
  ) => {
    setEditableHighlights((prev) => {
      const copy = [...prev];
      const field = copy[index];

      switch (action) {
        case "accept":
          field.status = "accepted";
          field.editedValue = field.editedValue ?? field.field.value;
          break;
        case "decline":
          field.status = "declined";
          break;
        case "missing":
          field.status = "missing";
          break;
        case "edit":
          field.status = "editing";
          if (!field.from) field.from = field.field.value;
          field.editedValue = field.editedValue ?? field.field.value;
          break;
      }

      return copy;
    });
  };

  const handleEditSave = (index: number) => {
    setEditableHighlights((prev) => {
      const copy = [...prev];
      const field = copy[index];

      field.status = "accepted";
      field.to = field.editedValue;
      if (!field.from) field.from = field.field.value;

      return copy;
    });
  };

  const handleSubmit = () => {
    const mainMap: Record<string, string> = {};
    mainHighlights.forEach((h) => {
      mainMap[h.label] = h.editedValue ?? h.field.value;
    });

    // Main highlights payload
    const mainPayload = mainHighlights.map((h) => ({
      label: h.label,
      value: h.editedValue ?? h.field.value,
      status: h.status ?? "none",
      from: h.from,
      to: h.to,
    }));

    // Items payload: only include differences from main
    const itemsPayload = MultiplePagemergeData.Items?.map((_, itemIndex) => {
      const itemFields = itemHighlightsMap[itemIndex] || [];

      // Convert each field to an object
      return itemFields.map((h) => {
        const cleanLabel = h.label.replace(/^Item\s*\d+\s*-\s*/i, "");
        return {
          label: cleanLabel,
          value: h.editedValue,
          from: h.from ?? h.field.value,
          to: h.editedValue,
          status: h.status ?? "none",
        };
      });
    })?.flat(); // flatten all items into a single array

    const finalPayload = {
      main: mainPayload,
      items: itemsPayload,
    };

    console.log("Submitted data:", JSON.stringify(finalPayload, null, 2));
  };

  const mainHighlights = editableHighlights.filter(
    (h) => !h.label.startsWith("Item ")
  );

  const itemHighlightsMap = useMemo(() => {
    const map: Record<number, Highlight[]> = {};
    editableHighlights.forEach((h) => {
      const match = h.label.match(/^Item (\d+) -/);
      if (match) {
        const idx = parseInt(match[1], 10) - 1;
        map[idx] = map[idx] || [];
        map[idx].push(h);
      }
    });
    return map;
  }, [editableHighlights]);

  const statusStyles: Record<
    "accepted" | "declined" | "missing" | "editing" | "default",
    string
  > = {
    accepted: "border-green-500 bg-green-50 text-green-700",
    declined: "border-red-500 bg-red-50 text-red-700",
    missing: "border-orange-500 bg-orange-50 text-orange-700",
    editing: "ring-0 ring-blue-0 bg-blue-50",
    default: "border-gray-200 bg-white text-black",
  };

  const Skeleton = () => (
    <div className="grid grid-cols-[200px_1fr_200px] w-full items-center gap-2 ">
      <div className="animate-pulse bg-gray-200 rounded h-10 w-full"></div>
      <div className="w-full h-full flex  items-center gap-3"></div>
    </div>
  );
  const waitForPDF = async (
    field: Field,
    isHover: boolean,
    retries = 20,
    delay = 500
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        const PDFViewerApplication = (window as any).frames[0]
          .PDFViewerApplication;
        if (!PDFViewerApplication)
          throw new Error("PDFViewerApplication not ready");

        const pageView = PDFViewerApplication.pdfViewer.getPageView(
          field.pageNumber - 1
        );
        if (!pageView || !pageView.canvas) throw new Error("Page not ready");

        showHighlight(field, isHover, true); // safe to call now
        return;
      } catch (err) {
        // Wait a bit and retry
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    console.warn("Failed to highlight field after retries:", field);
  };

  return (
    <div className="h-screen w-full p-6 flex flex-col bg-gray-50">
      <h1 className="text-2xl font-semibold flex  gap-20 w-full justify-between px-5 mb-4 text-gray-800">
        PDF Highlights & Submit Example
        <PageButtons />
      </h1>

      <div className="grid grid-cols-[45%_1fr] gap-5">
        {/* PDF Viewer */}
        <div className="flex-1 bg-white rounded-[8px] shadow-sm border overflow-hidden flex items-center justify-center">
          {pdfURL ? (
            <iframe
              ref={pdfIframeRef}
              src={viewURL + encodeURIComponent(pdfURL)}
              className="w-full max-h-full h-full border-0"
              title="PDF Viewer"
              onLoad={() => {
                editableHighlights.forEach((h) => waitForPDF(h.field, false));
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              PDF failed to load.
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
          <h2 className="text-lg font-medium border-b px-4 py-3 bg-gray-100 sticky top-0 z-10">
            Highlights & Edit
          </h2>

          <div className="overflow-auto max-h-[700px] p-4">
            <Table>
              <TableHeader>
                <TableRow className="h-[60px] bg-gray-100">
                  <TableHead className="font-bold text-[16px]">Label</TableHead>
                  <TableHead className="font-bold text-[16px]">Value</TableHead>
                  <TableHead className="font-bold text-[16px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading
                  ? Array(15)
                      .fill(0)
                      .map((_, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Skeleton />
                          </TableCell>
                          <TableCell>
                            <Skeleton />
                          </TableCell>
                          <TableCell className="text-center">
                            <Skeleton />
                          </TableCell>
                        </TableRow>
                      ))
                  : mainHighlights.map((h, idx) => (
                      <TableRow
                        key={h.label}
                        onClick={() => showValue(h.field, false)}
                        onMouseEnter={() => showValue(h.field, true)}
                        className={cn(
                          "transition-colors hover:shadow-sm  h-[60px] items-center ",
                          h.status
                            ? statusStyles[h.status]
                            : statusStyles.default
                        )}
                      >
                        <TableCell className="">
                          <div className="font-bold flex items-center  gap-5 text-[14px]  min-h-full cursor-pointer">
                            {h.confidence !== undefined && (
                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <ShieldCheck
                                      className={cn(
                                        "w-4 h-4 cursor-pointer",
                                        h.confidence! >= 0.95
                                          ? "text-green-600"
                                          : h.confidence! >= 0.8
                                          ? "text-orange-500"
                                          : "text-red-600"
                                      )}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="rounded p-2 ">
                                    <p className="flex gap-1">
                                      Accuracy:
                                      <span
                                        className={cn(
                                          "font-bold",
                                          h.confidence! >= 0.95
                                            ? "text-green-600"
                                            : h.confidence! >= 0.8
                                            ? "text-orange-500"
                                            : "text-red-600"
                                        )}
                                      >
                                        {(h.confidence! * 100).toFixed(2)}%
                                      </span>
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {h.label}
                          </div>
                        </TableCell>

                        <TableCell>
                          {h.status === "editing" ? (
                            <div className="flex gap-2 items-center">
                              <Input
                                type="text"
                                value={h.editedValue}
                                onChange={(e) =>
                                  handleValueChange(idx, e.target.value)
                                }
                                className="flex-1"
                              />
                              <Button
                                onClick={() => handleEditSave(idx)}
                                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <p
                              className={cn(
                                "p-2 rounded bg-transparent"
                                // h.status && statusStyles[h.status]
                              )}
                            >
                              {h.status === "declined"
                                ? "Declined"
                                : h.status === "missing"
                                ? "Missing"
                                : h.editedValue}
                            </p>
                          )}
                        </TableCell>

                        <TableCell className="flex justify-center gap-2">
                          <TooltipProvider>
                            {/* Accept */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  className="bg-transparent hover:bg-green-100 text-green-600 p-1 rounded cursor-pointer"
                                  onClick={() => handleAction(idx, "accept")}
                                >
                                  <CheckCircle size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Accept</TooltipContent>
                            </Tooltip>

                            {/* Edit */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  className="bg-transparent hover:bg-blue-100 text-blue-600 p-1 rounded cursor-pointer"
                                  onClick={() => handleAction(idx, "edit")}
                                >
                                  <Edit3 size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>

                            {/* Decline */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  className="bg-transparent hover:bg-red-100 text-red-600 p-1 rounded cursor-pointer"
                                  onClick={() => handleAction(idx, "decline")}
                                >
                                  <XCircle size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Decline</TooltipContent>
                            </Tooltip>

                            {/* Mark Missing */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  className="bg-transparent hover:bg-orange-100 text-orange-600 p-1 rounded cursor-pointer"
                                  onClick={() => handleAction(idx, "missing")}
                                >
                                  <AlertTriangle size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Mark Missing</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}

                {/* Items */}
                {!loading &&
                  MultiplePagemergeData.Items?.map((_, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      {/* Item header row */}
                      <TableRow className="bg-gray-100 ">
                        <TableCell
                          colSpan={3}
                          className="font-semibold text-gray-700  py-5 text-[15px] capitalize tracking-wide"
                        >
                          Item {itemIndex + 1}
                        </TableCell>
                      </TableRow>

                      {/* Item details */}
                      {itemHighlightsMap[itemIndex]?.map((h) => {
                        const globalIndex = editableHighlights.findIndex(
                          (eh) => eh.label === h.label
                        );
                        const cleanLabel = h.label.replace(
                          /^Item\s*\d+\s*-\s*/i,
                          ""
                        );

                        return (
                          <TableRow
                            key={h.label}
                            onClick={() => showValue(h.field, false)}
                            onMouseEnter={() => showValue(h.field, true)}
                            className={cn(
                              "hover:bg-gray-50 transition-colors border-b  h-[60px]",
                              h.status
                                ? statusStyles[h.status]
                                : statusStyles.default
                            )}
                          >
                            <TableCell>
                              <div className="font-bold flex items-center gap-5 text-[14px]  cursor-pointer">
                                {h.confidence !== undefined && (
                                  <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <ShieldCheck
                                          className={cn(
                                            "w-4 h-4 cursor-pointer",
                                            h.confidence! >= 0.95
                                              ? "text-green-600"
                                              : h.confidence! >= 0.8
                                              ? "text-orange-500"
                                              : "text-red-600"
                                          )}
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent className="rounded p-2 ">
                                        <p className="flex gap-1">
                                          Accuracy:
                                          <span
                                            className={cn(
                                              "font-bold",
                                              h.confidence! >= 0.95
                                                ? "text-green-600"
                                                : h.confidence! >= 0.8
                                                ? "text-orange-500"
                                                : "text-red-600"
                                            )}
                                          >
                                            {(h.confidence! * 100).toFixed(2)}%
                                          </span>
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                                {cleanLabel}
                              </div>
                            </TableCell>

                            <TableCell>
                              {h.status === "editing" ? (
                                <div className="flex gap-2 items-center">
                                  <Input
                                    type="text"
                                    value={h.editedValue}
                                    onChange={(e) =>
                                      handleValueChange(
                                        globalIndex,
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 border rounded px-2 py-1"
                                  />
                                  <Button
                                    onClick={() => handleEditSave(globalIndex)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer"
                                  >
                                    Save
                                  </Button>
                                </div>
                              ) : (
                                <p
                                  className={cn(
                                    "p-2 rounded text-[14px] bg-transparent"
                                    // h.status && statusStyles[h.status]
                                  )}
                                >
                                  {h.status === "declined"
                                    ? "Declined"
                                    : h.status === "missing"
                                    ? "Missing"
                                    : h.editedValue}
                                </p>
                              )}
                            </TableCell>

                            <TableCell className="flex justify-center gap-2">
                              <TooltipProvider>
                                {/* Accept */}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      className="bg-transparent hover:bg-green-100 text-green-600 p-1 rounded cursor-pointer"
                                      onClick={() =>
                                        handleAction(globalIndex, "accept")
                                      }
                                    >
                                      <CheckCircle size={16} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Accept</TooltipContent>
                                </Tooltip>

                                {/* Edit */}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      className="bg-transparent hover:bg-blue-100 text-blue-600 p-1 rounded cursor-pointer"
                                      onClick={() =>
                                        handleAction(globalIndex, "edit")
                                      }
                                    >
                                      <Edit3 size={16} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit</TooltipContent>
                                </Tooltip>

                                {/* Decline */}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      className="bg-transparent hover:bg-red-100 text-red-600 p-1 rounded cursor-pointer"
                                      onClick={() =>
                                        handleAction(globalIndex, "decline")
                                      }
                                    >
                                      <XCircle size={16} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Decline</TooltipContent>
                                </Tooltip>

                                {/* Missing */}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      className="bg-transparent hover:bg-orange-100 text-orange-600 p-1 rounded cursor-pointer"
                                      onClick={() =>
                                        handleAction(globalIndex, "missing")
                                      }
                                    >
                                      <AlertTriangle size={16} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Mark Missing</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </div>

          <Button
            onClick={handleSubmit}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit All
          </Button>
        </div>
      </div>
    </div>
  );
}
