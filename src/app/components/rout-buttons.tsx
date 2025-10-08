"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function PageButtons() {
  const router = useRouter();
  const pathname = usePathname();

  const paths = [
    { path: "/", label: "Normal" },
    { path: "/blank", label: "Blank" },
    { path: "/both", label: "Both" },
    { path: "/diffrent", label: "Diffrent" },
    { path: "/size-different", label: "Size Different" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {paths.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Button
            variant="outline"
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`
              capitalize
              font-normal
              px-4 py-2
              rounded-md
              border ${isActive ? "border-blue-500" : "border-gray-300"}
              ${isActive ? "!bg-blue-700 text-white" : "text-gray-700"}
              transition-colors
              cursor-pointer
            `}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
