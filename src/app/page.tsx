// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import showHighlight from "./components/pdfhighlight";
// import { mergeData } from "./components/mock-data";
// import { cn } from "@/lib/utils";

// type Coords = [number, number, number, number];

// interface Field {
//   value: string;
//   coords: Coords;
//   pageNumber: number;
// }

// interface Highlight {
//   label: string;
//   field: Field;
// }
// interface SubmitValue {
//   label: string;
//   value: string;
//   status?: "accepted" | "declined" | "missing" | "editing";
//   editedValue?: string;
// }

// /**
//  * Flatten mergeData into an array of highlights suitable for rendering
//  */
// export const flattenHighlights = (data: any): Highlight[] => {
//   const highlights: Highlight[] = [];

//   const processField = (label: string, fieldData: any, itemIndex?: number) => {
//     if (!fieldData?.coords) return;

//     highlights.push({
//       label:
//         itemIndex !== undefined ? `Item ${itemIndex + 1} - ${label}` : label,
//       field: {
//         value: fieldData.value ?? "",
//         coords: fieldData.coords,
//         pageNumber: fieldData.pageNumber ?? 1,
//       },
//     });
//   };

//   // Process top-level fields except "Items"
//   for (const [label, fieldData] of Object.entries(data)) {
//     if (label === "Items") continue;
//     processField(label, fieldData);
//   }

//   // Process line items if any
//   data.Items?.forEach((item: any, idx: number) => {
//     for (const [label, fieldData] of Object.entries(item)) {
//       processField(label, fieldData, idx);
//     }
//   });

//   return highlights;
// };

// export default function Page() {
//   const c = mergeData;
//   const [pdfBlob, setPdfBlob] = React.useState<Blob | null>(null);
//   // const [hoveredField, setHoveredField] = useState<string | null>(null);
//   const [editableHighlights, setEditableHighlights] = useState<Highlight[]>([]);

//   const highlights = useMemo(() => flattenHighlights(mergeData), [mergeData]);

//   useEffect(() => {
//     setEditableHighlights(highlights);
//   }, [highlights]);

//   const viewURL = "/pdfviewer/pdfjs-4.2.67-dist/web/viewer.html?file=";
//   const handleValueChange = (index: number, newValue: string) => {
//     setEditableHighlights((prev) => {
//       const updated = [...prev];
//       updated[index].field.value = newValue;
//       return updated;
//     });
//   };

//   const handleSubmit = () => {
//     console.log(
//       "Submitted highlights:",
//       JSON.stringify(editableHighlights, null, 2)
//     );
//   };

//   const loadLocalPdf = async () => {
//     const response = await fetch("/Iphoneinvoicev2.pdf");
//     const blob = await response.blob();
//     setPdfBlob(blob);
//   };

//   useEffect(() => {
//     const init = async () => {
//       await loadLocalPdf();
//     };
//     init();
//   }, []);

//   const showValue = (caa: any) => {
//     showHighlight(caa);
//   };

//   return (
//     <div className="h-screen w-full p-6 flex flex-col bg-gray-50">
//       {/* Header */}
//       <h1 className="text-2xl font-semibold mb-4 text-gray-800">
//         PDF Highlighter Example
//       </h1>

//       {/* Main content area */}
//       <div className="grid grid-cols-[45%_1fr] gap-5">
//         {/* Left: PDF Viewer */}
//         <div className="flex-1 bg-white rounded-[8px] shadow-sm border overflow-hidden">
//           {pdfBlob ? (
//             <iframe
//               src={
//                 viewURL +
//                 encodeURIComponent(
//                   (pdfBlob && URL.createObjectURL(pdfBlob)) || ""
//                 )
//               }
//               className="w-full max-h-full h-full border-0 "
//               title="PDF Viewer"
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               Loading PDF...
//             </div>
//           )}
//         </div>

//         {/* Right: Highlight List */}
//         <div className=" bg-white rounded-[8px] shadow-sm border flex flex-col">
//           <h2 className="text-lg font-medium border-b px-4 py-3 bg-gray-100">
//             Highlights
//           </h2>

//           {/* <div className="flex-1 overflow-y-auto p-4 space-y-2">
//             {c && Object.keys(c).length > 0 ? (
//               Object.entries(c).map(
//                 ([key, item]: [string, any], index: number) => (
//                   <div key={index}>
//                     {Array.isArray(item) ? (
//                       item.map((subItem, subIndex) => (
//                         <div
//                           key={`${index}-${subIndex}`}
//                           onClick={() => showValue(subItem)}
//                           className="cursor-pointer px-3 py-2 rounded-md hover:bg-yellow-100 transition"
//                         >
//                           <span className="bg-yellow-200 px-1 rounded">
//                             {key}[{subIndex}]:{" "}
//                             {subItem.value || JSON.stringify(subItem)}
//                           </span>
//                         </div>
//                       ))
//                     ) : (
//                       <div
//                         onClick={() => showValue(item)}
//                         className="cursor-pointer px-3 py-2 rounded-md hover:bg-yellow-100 transition"
//                       >
//                         <span className="bg-yellow-200 px-1 rounded">
//                           {key}: {item.value || JSON.stringify(item)}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )
//               )
//             ) : (
//               <p className="text-gray-500 text-sm text-center mt-8">
//                 No highlights available
//               </p>
//             )}
//           </div> */}
//           <div className="overflow-auto max-h-[800px] bg-white rounded-2xl p-4 text-black flex flex-col">
//             <div className="flex-1 overflow-auto">
//               {editableHighlights.map(({ label, field }, index) => (
//                 <div
//                   key={label}
//                   onClick={() => {
//                     console.log("field", field);
//                     showValue(field);
//                   }}
//                   className={cn(
//                     "p-2 mb-2 border rounded cursor-pointer"
//                     // hoveredField === label ? "bg-green-100" : "bg-white"
//                   )}
//                   // onMouseEnter={() => setHoveredField(label)}
//                   // onMouseLeave={() => setHoveredField(null)}
//                 >
//                   <strong>{label}:</strong>
//                   <input
//                     type="text"
//                     value={field.value}
//                     onChange={(e) => handleValueChange(index, e.target.value)}
//                     className="border rounded p-1 w-full mt-1"
//                   />
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="mt-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import showHighlight from "./components/pdfhighlight";
// import { mergeData } from "./components/mock-data";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Check, X, Edit2, AlertCircle } from "lucide-react";
// import { Input } from "@/components/ui/input";

// type Coords = [number, number, number, number];

// interface Field {
//   value: string;
//   coords: Coords;
//   pageNumber: number;
// }

// interface Highlight {
//   label: string;
//   field: Field;
//   editedValue?: string;
//   from?: string;
//   to?: string;
//   status?: "accepted" | "declined" | "missing" | "editing";
// }

// export const flattenHighlights = (data: any): Highlight[] => {
//   const highlights: Highlight[] = [];

//   const processField = (label: string, fieldData: any, itemIndex?: number) => {
//     if (!fieldData?.coords) return;

//     highlights.push({
//       label:
//         itemIndex !== undefined ? `Item ${itemIndex + 1} - ${label}` : label,
//       field: {
//         value: fieldData.value ?? "",
//         coords: fieldData.coords,
//         pageNumber: fieldData.pageNumber ?? 1,
//       },
//       editedValue: fieldData.value ?? "",
//     });
//   };

//   for (const [label, fieldData] of Object.entries(data)) {
//     if (label === "Items") continue;
//     processField(label, fieldData);
//   }

//   data.Items?.forEach((item: any, idx: number) => {
//     for (const [label, fieldData] of Object.entries(item)) {
//       processField(label, fieldData, idx);
//     }
//   });

//   return highlights;
// };

// export default function Page() {
//   const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
//   const [editableHighlights, setEditableHighlights] = useState<Highlight[]>([]);

//   const highlights = useMemo(() => flattenHighlights(mergeData), []);

//   useEffect(() => {
//     setEditableHighlights(highlights);
//   }, [highlights]);

//   const viewURL = "/pdfviewer/pdfjs-4.2.67-dist/web/viewer.html?file=";

//   const loadLocalPdf = async () => {
//     const response = await fetch("/Iphoneinvoicev2.pdf");
//     const blob = await response.blob();
//     setPdfBlob(blob);
//   };

//   useEffect(() => {
//     loadLocalPdf();
//   }, []);

//   const pdfURL = useMemo(() => {
//     if (!pdfBlob) return null;
//     return URL.createObjectURL(pdfBlob);
//   }, [pdfBlob]);

//   useEffect(() => {
//     return () => {
//       if (pdfURL) URL.revokeObjectURL(pdfURL);
//     };
//   }, [pdfURL]);

//   const showValue = (field: Field | null, isHover: boolean) => {
//     showHighlight(field, isHover);
//   };

//   const handleValueChange = (index: number, value: string) => {
//     setEditableHighlights((prev) => {
//       const copy = [...prev];
//       copy[index].editedValue = value;
//       return copy;
//     });
//   };

//   const handleAction = (
//     index: number,
//     action: "accept" | "decline" | "missing" | "edit"
//   ) => {
//     setEditableHighlights((prev) => {
//       const copy = [...prev];
//       const field = copy[index];

//       switch (action) {
//         case "accept":
//           field.status = "accepted";
//           field.editedValue = field.editedValue ?? field.field.value;
//           break;
//         case "decline":
//           field.status = "declined";
//           break;
//         case "missing":
//           field.status = "missing";
//           break;
//         case "edit":
//           field.status = "editing";
//           if (!field.from) field.from = field.field.value;
//           field.editedValue = field.editedValue ?? field.field.value;
//           break;
//       }

//       return copy;
//     });
//   };

//   const handleEditSave = (index: number) => {
//     setEditableHighlights((prev) => {
//       const copy = [...prev];
//       const field = copy[index];

//       field.status = "accepted";
//       field.to = field.editedValue;
//       if (!field.from) field.from = field.field.value;

//       return copy;
//     });
//   };

//   const handleSubmit = () => {
//     const payload = editableHighlights.map((f) => {
//       if (f.editedValue !== f.field.value) {
//         return {
//           label: f.label,
//           value: f.editedValue ?? f.field.value,
//           from: f.field.value,
//           to: f.editedValue,
//           status: f.status ?? "none",
//         };
//       }
//       return {
//         label: f.label,
//         value: f.editedValue ?? f.field.value,
//         status: f.status ?? "none",
//       };
//     });

//     console.log("Submitted data:", JSON.stringify(payload, null, 2));
//   };

//   return (
//     <div className="h-screen w-full p-6 flex flex-col bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-4 text-gray-800">
//         PDF Highlights & Submit Example
//       </h1>

//       <div className="grid grid-cols-[45%_1fr] gap-5">
//         {/* PDF Viewer */}
//         <div className="flex-1 bg-white rounded-[8px] shadow-sm border overflow-hidden">
//           {pdfURL ? (
//             <iframe
//               src={viewURL + encodeURIComponent(pdfURL)}
//               className="w-full max-h-full h-full border-0"
//               title="PDF Viewer"
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               Loading PDF...
//             </div>
//           )}
//         </div>

//         {/* Right Panel */}
//         <div className="bg-white rounded-[8px] shadow-sm border flex flex-col">
//           {/* Sticky Header */}
//           <h2 className="text-lg font-medium border-b px-4 py-3 bg-gray-100 sticky top-0 z-10">
//             Highlights & Edit
//           </h2>

//           <div className="overflow-auto max-h-[800px] flex flex-col gap-2 p-4">
//             {/* Render non-item highlights first */}
//             {editableHighlights
//               .filter((h) => !h.label.startsWith("Item "))
//               .map((h, idx) => {
//                 const statusStyles: Record<
//                   "accepted" | "declined" | "missing" | "editing" | "default",
//                   string
//                 > = {
//                   accepted: "border-green-500 bg-green-50 text-green-700",
//                   declined: "border-red-500 bg-red-50 text-red-700",
//                   missing: "border-orange-500 bg-orange-50 text-orange-700",
//                   editing: "ring-2 ring-blue-300 bg-blue-50",
//                   default: "border-gray-200 bg-white text-black",
//                 };

//                 return (
//                   <div
//                     key={h.label}
//                     onClick={() => showValue(h.field, false)}
//                     onMouseEnter={() => showValue(h.field, true)}
//                     className={cn(
//                       "border p-3 rounded transition-colors grid grid-cols-[200px_1fr_200px] items-center hover:shadow-sm",
//                       h.status ? statusStyles[h.status] : statusStyles.default
//                     )}
//                   >
//                     <div className="cursor-pointer text-[14px] font-bold">
//                       {h.label}
//                     </div>

//                     {h.status === "editing" ? (
//                       <div className="flex gap-2 items-center">
//                         <Input
//                           type="text"
//                           value={h.editedValue}
//                           onChange={(e) =>
//                             handleValueChange(idx, e.target.value)
//                           }
//                           className="border rounded h-[40px] p-2 flex-1"
//                         />
//                         <Button
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                           onClick={() => handleEditSave(idx)}
//                         >
//                           Save
//                         </Button>
//                       </div>
//                     ) : (
//                       <p
//                         className={cn(
//                           "p-2 rounded h-full",
//                           h.status
//                             ? statusStyles[h.status]
//                             : statusStyles.default
//                         )}
//                       >
//                         {h.status === "declined"
//                           ? "Declined"
//                           : h.status === "missing"
//                           ? "Missing"
//                           : h.editedValue}
//                       </p>
//                     )}

//                     <div className="flex gap-2 items-center justify-center opacity-100">
//                       <Button
//                         size="icon"
//                         title="Accept"
//                         className="bg-transparent hover:bg-green-100 text-green-600 p-1 rounded"
//                         onClick={() => handleAction(idx, "accept")}
//                       >
//                         <Check size={16} />
//                       </Button>
//                       <Button
//                         size="icon"
//                         title="Edit"
//                         className="bg-transparent hover:bg-blue-100 text-blue-600 p-1 rounded"
//                         onClick={() => handleAction(idx, "edit")}
//                       >
//                         <Edit2 size={16} />
//                       </Button>
//                       <Button
//                         size="icon"
//                         title="Decline"
//                         className="bg-transparent hover:bg-red-100 text-red-600 p-1 rounded"
//                         onClick={() => handleAction(idx, "decline")}
//                       >
//                         <X size={16} />
//                       </Button>
//                       <Button
//                         size="icon"
//                         title="Mark Missing"
//                         className="bg-transparent hover:bg-orange-100 text-orange-600 p-1 rounded"
//                         onClick={() => handleAction(idx, "missing")}
//                       >
//                         <AlertCircle size={16} />
//                       </Button>
//                     </div>
//                   </div>
//                 );
//               })}

//             {/* Render Items separately */}
//             {mergeData.Items?.map((item, itemIndex) => (
//               <div key={itemIndex} className="border rounded p-2 bg-gray-50">
//                 <div className="font-semibold text-gray-700 mb-2">
//                   Item {itemIndex + 1}
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   {Object.entries(item).map(([label, fieldData]: any, idx) => {
//                     const highlight = editableHighlights.find(
//                       (h) => h.label === `Item ${itemIndex + 1} - ${label}`
//                     );

//                     if (!highlight) return null;

//                     const statusStyles: Record<
//                       | "accepted"
//                       | "declined"
//                       | "missing"
//                       | "editing"
//                       | "default",
//                       string
//                     > = {
//                       accepted: "border-green-500 bg-green-50 text-green-700",
//                       declined: "border-red-500 bg-red-50 text-red-700",
//                       missing: "border-orange-500 bg-orange-50 text-orange-700",
//                       editing: "ring-2 ring-blue-300 bg-blue-50",
//                       default: "border-gray-200 bg-white text-black",
//                     };

//                     return (
//                       <div
//                         key={label}
//                         onClick={() => showValue(highlight.field, false)}
//                         onMouseEnter={() => showValue(highlight.field, true)}
//                         className={cn(
//                           "border p-3 rounded transition-colors grid grid-cols-[200px_1fr_200px] items-center hover:shadow-sm",
//                           highlight.status
//                             ? statusStyles[highlight.status]
//                             : statusStyles.default
//                         )}
//                       >
//                         <div className="cursor-pointer text-[14px] font-bold">
//                           {label}
//                         </div>

//                         {highlight.status === "editing" ? (
//                           <div className="flex gap-2 items-center">
//                             <Input
//                               type="text"
//                               value={highlight.editedValue}
//                               onChange={(e) =>
//                                 handleValueChange(idx, e.target.value)
//                               }
//                               className="border rounded h-[40px] p-2 flex-1"
//                             />
//                             <Button
//                               className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                               onClick={() => handleEditSave(idx)}
//                             >
//                               Save
//                             </Button>
//                           </div>
//                         ) : (
//                           <p
//                             className={cn(
//                               "p-2 rounded h-full",
//                               highlight.status
//                                 ? statusStyles[highlight.status]
//                                 : statusStyles.default
//                             )}
//                           >
//                             {highlight.status === "declined"
//                               ? "Declined"
//                               : highlight.status === "missing"
//                               ? "Missing"
//                               : highlight.editedValue}
//                           </p>
//                         )}

//                         <div className="flex gap-2 items-center justify-center opacity-100">
//                           <Button
//                             size="icon"
//                             title="Accept"
//                             className="bg-transparent hover:bg-green-100 text-green-600 p-1 rounded"
//                             onClick={() => handleAction(idx, "accept")}
//                           >
//                             <Check size={16} />
//                           </Button>
//                           <Button
//                             size="icon"
//                             title="Edit"
//                             className="bg-transparent hover:bg-blue-100 text-blue-600 p-1 rounded"
//                             onClick={() => handleAction(idx, "edit")}
//                           >
//                             <Edit2 size={16} />
//                           </Button>
//                           <Button
//                             size="icon"
//                             title="Decline"
//                             className="bg-transparent hover:bg-red-100 text-red-600 p-1 rounded"
//                             onClick={() => handleAction(idx, "decline")}
//                           >
//                             <X size={16} />
//                           </Button>
//                           <Button
//                             size="icon"
//                             title="Mark Missing"
//                             className="bg-transparent hover:bg-orange-100 text-orange-600 p-1 rounded"
//                             onClick={() => handleAction(idx, "missing")}
//                           >
//                             <AlertCircle size={16} />
//                           </Button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Submit All */}
//           <button
//             onClick={handleSubmit}
//             className={cn(
//               "mt-2 p-2 rounded text-white w-full transition-colors",
//               "bg-blue-600 hover:bg-blue-700"
//             )}
//           >
//             Submit All
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import showHighlight from "./components/pdfhighlight";
// import { mergeData } from "./components/mock-data";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Check, X, Edit2, AlertCircle } from "lucide-react";
// import { Input } from "@/components/ui/input";

// type Coords = [number, number, number, number];

// interface Field {
//   value: string;
//   coords: Coords;
//   pageNumber: number;
// }

// interface Highlight {
//   label: string;
//   field: Field;
//   editedValue?: string;
//   from?: string;
//   to?: string;
//   status?: "accepted" | "declined" | "missing" | "editing";
// }

// export const flattenHighlights = (data: any): Highlight[] => {
//   const highlights: Highlight[] = [];

//   const processField = (label: string, fieldData: any, itemIndex?: number) => {
//     if (!fieldData?.coords) return;

//     highlights.push({
//       label:
//         itemIndex !== undefined ? `Item ${itemIndex + 1} - ${label}` : label,
//       field: {
//         value: fieldData.value ?? "",
//         coords: fieldData.coords,
//         pageNumber: fieldData.pageNumber ?? 1,
//       },
//       editedValue: fieldData.value ?? "",
//     });
//   };

//   // Only process non-item fields
//   for (const [label, fieldData] of Object.entries(data)) {
//     if (label === "Items") continue;
//     processField(label, fieldData);
//   }

//   // Process item children separately
//   data.Items?.forEach((item: any, idx: number) => {
//     for (const [label, fieldData] of Object.entries(item)) {
//       processField(label, fieldData, idx);
//     }
//   });

//   return highlights;
// };

// export default function Page() {
//   const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
//   const [editableHighlights, setEditableHighlights] = useState<Highlight[]>([]);

//   const highlights = useMemo(() => flattenHighlights(mergeData), []);

//   useEffect(() => {
//     setEditableHighlights(highlights);
//   }, [highlights]);

//   const viewURL = "/pdfviewer/pdfjs-4.2.67-dist/web/viewer.html?file=";

//   const loadLocalPdf = async () => {
//     const response = await fetch("/Iphoneinvoicev2.pdf");
//     const blob = await response.blob();
//     setPdfBlob(blob);
//   };

//   useEffect(() => {
//     loadLocalPdf();
//   }, []);

//   const pdfURL = useMemo(() => {
//     if (!pdfBlob) return null;
//     return URL.createObjectURL(pdfBlob);
//   }, [pdfBlob]);

//   useEffect(() => {
//     return () => {
//       if (pdfURL) URL.revokeObjectURL(pdfURL);
//     };
//   }, [pdfURL]);

//   const showValue = (field: Field, isHover: boolean) => {
//     showHighlight(field, isHover);
//   };

//   const handleValueChange = (index: number, value: string) => {
//     setEditableHighlights((prev) => {
//       const copy = [...prev];
//       copy[index].editedValue = value;
//       return copy;
//     });
//   };

//   const handleAction = (
//     index: number,
//     action: "accept" | "decline" | "missing" | "edit"
//   ) => {
//     setEditableHighlights((prev) => {
//       const copy = [...prev];
//       const field = copy[index];

//       switch (action) {
//         case "accept":
//           field.status = "accepted";
//           field.editedValue = field.editedValue ?? field.field.value;
//           break;
//         case "decline":
//           field.status = "declined";
//           break;
//         case "missing":
//           field.status = "missing";
//           break;
//         case "edit":
//           field.status = "editing";
//           if (!field.from) field.from = field.field.value;
//           field.editedValue = field.editedValue ?? field.field.value;
//           break;
//       }

//       return copy;
//     });
//   };

//   const handleEditSave = (index: number) => {
//     setEditableHighlights((prev) => {
//       const copy = [...prev];
//       const field = copy[index];

//       field.status = "accepted";
//       field.to = field.editedValue;
//       if (!field.from) field.from = field.field.value;

//       return copy;
//     });
//   };

//   const handleSubmit = () => {
//     const payload = editableHighlights.map((f) => {
//       if (f.editedValue !== f.field.value) {
//         return {
//           label: f.label,
//           value: f.editedValue ?? f.field.value,
//           from: f.field.value,
//           to: f.editedValue,
//           status: f.status ?? "none",
//         };
//       }
//       return {
//         label: f.label,
//         value: f.editedValue ?? f.field.value,
//         status: f.status ?? "none",
//       };
//     });

//     console.log("Submitted data:", JSON.stringify(payload, null, 2));
//   };

//   // Split main highlights and item highlights
//   const mainHighlights = editableHighlights.filter(
//     (h) => !h.label.startsWith("Item ")
//   );

//   const itemHighlightsMap: Record<number, Highlight[]> = {};
//   editableHighlights.forEach((h) => {
//     const match = h.label.match(/^Item (\d+) -/);
//     if (match) {
//       const idx = parseInt(match[1], 10) - 1;
//       itemHighlightsMap[idx] = itemHighlightsMap[idx] || [];
//       itemHighlightsMap[idx].push(h);
//     }
//   });

//   const statusStyles: Record<
//     "accepted" | "declined" | "missing" | "editing" | "default",
//     string
//   > = {
//     accepted: "border-green-500 bg-green-50 text-green-700",
//     declined: "border-red-500 bg-red-50 text-red-700",
//     missing: "border-orange-500 bg-orange-50 text-orange-700",
//     editing: "ring-2 ring-blue-300 bg-blue-50",
//     default: "border-gray-200 bg-white text-black",
//   };

//   return (
//     <div className="h-screen w-full p-6 flex flex-col bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-4 text-gray-800">
//         PDF Highlights & Submit Example
//       </h1>

//       <div className="grid grid-cols-[45%_1fr] gap-5">
//         {/* PDF Viewer */}
//         <div className="flex-1 bg-white rounded-[8px] shadow-sm border overflow-hidden">
//           {pdfURL ? (
//             <iframe
//               src={viewURL + encodeURIComponent(pdfURL)}
//               className="w-full max-h-full h-full border-0"
//               title="PDF Viewer"
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               Loading PDF...
//             </div>
//           )}
//         </div>

//         {/* Right Panel */}
//         <div className="bg-white rounded-[8px] shadow-sm border flex flex-col">
//           <h2 className="text-lg font-medium border-b px-4 py-3 bg-gray-100 sticky top-0 z-10">
//             Highlights & Edit
//           </h2>

//           <div className="overflow-auto max-h-[800px] flex flex-col gap-4 p-4">
//             {/* Main highlights */}
//             {mainHighlights.map((h, idx) => (
//               <div
//                 key={h.label}
//                 onClick={() => showValue(h.field, false)}
//                 onMouseEnter={() => showValue(h.field, true)}
//                 className={cn(
//                   "border p-3 rounded transition-colors grid grid-cols-[200px_1fr_200px] items-center hover:shadow-sm",
//                   h.status ? statusStyles[h.status] : statusStyles.default
//                 )}
//               >
//                 <div className="cursor-pointer text-[14px] font-bold">
//                   {h.label}
//                 </div>

//                 {h.status === "editing" ? (
//                   <div className="flex gap-2 items-center">
//                     <Input
//                       type="text"
//                       value={h.editedValue}
//                       onChange={(e) => handleValueChange(idx, e.target.value)}
//                       className="border rounded h-[40px] p-2 flex-1"
//                     />
//                     <Button
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                       onClick={() => handleEditSave(idx)}
//                     >
//                       Save
//                     </Button>
//                   </div>
//                 ) : (
//                   <p
//                     className={cn(
//                       "p-2 rounded h-full",
//                       h.status ? statusStyles[h.status] : statusStyles.default
//                     )}
//                   >
//                     {h.status === "declined"
//                       ? "Declined"
//                       : h.status === "missing"
//                       ? "Missing"
//                       : h.editedValue}
//                   </p>
//                 )}

//                 <div className="flex gap-2 items-center justify-center opacity-100">
//                   <Button
//                     size="icon"
//                     title="Accept"
//                     className="bg-transparent hover:bg-green-100 text-green-600 p-1 rounded"
//                     onClick={() => handleAction(idx, "accept")}
//                   >
//                     <Check size={16} />
//                   </Button>
//                   <Button
//                     size="icon"
//                     title="Edit"
//                     className="bg-transparent hover:bg-blue-100 text-blue-600 p-1 rounded"
//                     onClick={() => handleAction(idx, "edit")}
//                   >
//                     <Edit2 size={16} />
//                   </Button>
//                   <Button
//                     size="icon"
//                     title="Decline"
//                     className="bg-transparent hover:bg-red-100 text-red-600 p-1 rounded"
//                     onClick={() => handleAction(idx, "decline")}
//                   >
//                     <X size={16} />
//                   </Button>
//                   <Button
//                     size="icon"
//                     title="Mark Missing"
//                     className="bg-transparent hover:bg-orange-100 text-orange-600 p-1 rounded"
//                     onClick={() => handleAction(idx, "missing")}
//                   >
//                     <AlertCircle size={16} />
//                   </Button>
//                 </div>
//               </div>
//             ))}

//             {/* Items */}
//             {mergeData.Items?.map((_, itemIndex) => (
//               <div key={itemIndex} className="border rounded p-2 bg-gray-50">
//                 <div className="font-semibold text-gray-700 mb-2">
//                   Item {itemIndex + 1}
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   {itemHighlightsMap[itemIndex]?.map((h, idx) => (
//                     <div
//                       key={h.label}
//                       onClick={() => showValue(h.field, false)}
//                       onMouseEnter={() => showValue(h.field, true)}
//                       className={cn(
//                         "border p-3 rounded transition-colors grid grid-cols-[200px_1fr_200px] items-center hover:shadow-sm",
//                         h.status ? statusStyles[h.status] : statusStyles.default
//                       )}
//                     >
//                       <div className="cursor-pointer text-[14px] font-bold">
//                         {h.label}
//                       </div>

//                       {h.status === "editing" ? (
//                         <div className="flex gap-2 items-center">
//                           <Input
//                             type="text"
//                             value={h.editedValue}
//                             onChange={(e) =>
//                               handleValueChange(idx, e.target.value)
//                             }
//                             className="border rounded h-[40px] p-2 flex-1"
//                           />
//                           <Button
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                             onClick={() => handleEditSave(idx)}
//                           >
//                             Save
//                           </Button>
//                         </div>
//                       ) : (
//                         <p
//                           className={cn(
//                             "p-2 rounded h-full",
//                             h.status
//                               ? statusStyles[h.status]
//                               : statusStyles.default
//                           )}
//                         >
//                           {h.status === "declined"
//                             ? "Declined"
//                             : h.status === "missing"
//                             ? "Missing"
//                             : h.editedValue}
//                         </p>
//                       )}

//                       <div className="flex gap-2 items-center justify-center opacity-100">
//                         <Button
//                           size="icon"
//                           title="Accept"
//                           className="bg-transparent hover:bg-green-100 text-green-600 p-1 rounded"
//                           onClick={() => handleAction(idx, "accept")}
//                         >
//                           <Check size={16} />
//                         </Button>
//                         <Button
//                           size="icon"
//                           title="Edit"
//                           className="bg-transparent hover:bg-blue-100 text-blue-600 p-1 rounded"
//                           onClick={() => handleAction(idx, "edit")}
//                         >
//                           <Edit2 size={16} />
//                         </Button>
//                         <Button
//                           size="icon"
//                           title="Decline"
//                           className="bg-transparent hover:bg-red-100 text-red-600 p-1 rounded"
//                           onClick={() => handleAction(idx, "decline")}
//                         >
//                           <X size={16} />
//                         </Button>
//                         <Button
//                           size="icon"
//                           title="Mark Missing"
//                           className="bg-transparent hover:bg-orange-100 text-orange-600 p-1 rounded"
//                           onClick={() => handleAction(idx, "missing")}
//                         >
//                           <AlertCircle size={16} />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleSubmit}
//             className={cn(
//               "mt-2 p-2 rounded text-white w-full transition-colors",
//               "bg-blue-600 hover:bg-blue-700"
//             )}
//           >
//             Submit All
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import showHighlight from "./components/pdfhighlight";
import { mergeData } from "./components/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Edit2,
  AlertCircle,
  Info,
  ShieldCheck,
  Badge,
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

  const highlights = useMemo(() => flattenHighlights(mergeData), []);

  useEffect(() => {
    setEditableHighlights(highlights);
  }, [highlights]);

  const viewURL = "/pdfviewer/pdfjs-4.2.67-dist/web/viewer.html?file=";

  const loadLocalPdf = async () => {
    setLoading(true);
    const response = await fetch("/Iphoneinvoicev2.pdf");
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
    showHighlight(field, isHover);
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

  // const handleSubmit = () => {
  //   const payload = editableHighlights.map((f) => {
  //     const isDeclinedOrMissing =
  //       f.status === "declined" || f.status === "missing";

  //     // Base payload
  //     const base = {
  //       label: f.label,
  //       status: f.status ?? "none",
  //     };

  //     // If declined or missing → no value fields
  //     if (isDeclinedOrMissing) {
  //       return base;
  //     }

  //     // If value changed → include both from/to
  //     if (f.editedValue !== f.field.value) {
  //       return {
  //         ...base,
  //         value: f.editedValue ?? f.field.value,
  //         from: f.field.value,
  //         to: f.editedValue,
  //       };
  //     }

  //     // Otherwise → include current value only
  //     return {
  //       label: f.label,
  //       value: f.editedValue ?? f.field.value,
  //       status: f.status ?? "none",
  //     };
  //   });

  //   console.log("Submitted data:", JSON.stringify(payload, null, 2));
  // };

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
    const itemsPayload = mergeData.Items?.map((_, itemIndex) => {
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

  return (
    <div className="h-screen w-full p-6 flex flex-col bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        PDF Highlights & Submit Example
      </h1>

      <div className="grid grid-cols-[45%_1fr] gap-5">
        {/* PDF Viewer */}
        <div className="flex-1 bg-white rounded-[8px] shadow-sm border overflow-hidden flex items-center justify-center">
          {pdfURL ? (
            <iframe
              src={viewURL + encodeURIComponent(pdfURL)}
              className="w-full max-h-full h-full border-0"
              title="PDF Viewer"
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

          <div className="overflow-auto max-h-[800px] p-4">
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
                  mergeData.Items?.map((_, itemIndex) => (
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
