"use client";
import { Button } from "@/components/ui/button";
import { FileDownIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";

import EventTable from "./event-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getAlliesApi } from "@/lib/api/core";
import AddAlly from "./add-ally";
export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isPending } = useQuery({
    queryKey: ["allies"],
    queryFn: (): idk => {
      return getAlliesApi({ page });
    },
  });

  const pages = Array.from({ length: data?.data?.totalPages }, (_, i) => i + 1);
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Partner Inquiries</h1>
          <p>
            Review and manage all partnership requests submitted through the
            website.
          </p>
        </div>
        <AddAlly />
      </div>
      {isPending ? (
        <div className={`flex justify-center items-center h-24 mx-auto`}>
          <Loader2Icon className={`animate-spin`} />
        </div>
      ) : (
        <>
          <EventTable data={data} />
          <div className="w-full flex flex-row justify-between items-center mt-12!">
            <div className=""></div>
            <Pagination className="mt-12">
              <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
                {pages.map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Next button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < data?.data?.totalPages) setPage(page + 1);
                    }}
                    className={
                      page === data?.data?.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Button variant={"outline"} className="rounded">
              <FileDownIcon />
              Export PDF
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
