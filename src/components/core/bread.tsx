"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Bread() {
  const path = usePathname();

  const segments = path.split("/").filter(Boolean);

  const fullPath = (index: number) =>
    "/" + segments.slice(0, index + 1).join("/");

  if (path === "/") {
    return null;
  }

  return (
    <div className="py-4! px-[7%]! bg-secondary font-serif">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((seg, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={fullPath(idx)} className="capitalize">
                  {decodeURIComponent(seg.replace(/[-_]/g, " "))}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
