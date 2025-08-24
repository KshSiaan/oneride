"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDownIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventTable from "./event-table";
import { useQuery } from "@tanstack/react-query";
import { getChartersApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [cookies] = useCookies(["token"]);
  const [page, setPage] = useState(1);
  const { data, isPending } = useQuery({
    queryKey: ["charter"],
    queryFn: () => {
      return getChartersApi(
        {
          name: search,
          status: selectedStatus,
          filterByQuarter: selectedDate,
          page: page,
          limit: 12,
        },
        cookies.token
      );
    },
  });
  if (isPending) {
    return <></>;
  }
  const pages = Array.from({ length: data?.data?.totalPages }, (_, i) => i + 1);
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Charter Requests</h1>
          <p>Manage all charter booking requests from users</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-6 mt-6! gap-6">
        <div className="w-full border bg-none rounded-lg flex items-center px-4! bg-secondary col-span-3">
          <SearchIcon className="text-muted-foreground size-4" />
          <Input
            placeholder="Search by name or email"
            className="border-0 shadow-none outline-0! ring-0! bg-inherit!"
            inputMode="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {["active", "draft", "ended"].map((x) => (
              <SelectItem key={x} value={x} className="capitalize">
                {x}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Dates" />
          </SelectTrigger>
          <SelectContent>
            {["thisWeek", "thisMonth", "thisYear"].map((x) => (
              <SelectItem key={x} value={x} className="capitalize">
                This {x.replace("this", "")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="bg-background! rounded-md">
          <FileDownIcon />
          Export PDF
        </Button>
      </div>
      <EventTable data={data.data} />
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
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
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
    </section>
  );
}
