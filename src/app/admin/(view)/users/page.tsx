"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon, FileDownIcon } from "lucide-react";
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
import { getUsersAndGuestsApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { idk } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [cookies] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["users", search, page, role, dateFilter],
    queryFn: (): idk => {
      return getUsersAndGuestsApi(
        { page, limit: 12, role, search, dateFilter },
        cookies.token
      );
    },
  });

  if (isPending) {
    return (
      <section className="p-4 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
        <div className="grid grid-cols-6 gap-6">
          <Skeleton className="h-12 col-span-3" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <div className="mx-auto grid grid-cols-6 gap-6 w-1/2">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </section>
    );
  }

  const pages = Array.from({ length: data?.data?.totalPages }, (_, i) => i + 1);
  const users = data.data.result;
  console.log(users);

  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Users</h1>
          <p>Manage and monitor all platform users from one place.</p>
        </div>
        <Button className="rounded text-foreground" size="lg">
          <PlusIcon />
          Create New Event
        </Button>
      </div>
      <div className="w-full grid grid-cols-6 mt-6! gap-6">
        <div className="w-full border bg-none rounded-lg flex items-center px-4! bg-secondary col-span-3">
          <SearchIcon className="text-muted-foreground size-4" />
          <Input
            placeholder="Search by name or email"
            className="border-0 shadow-none outline-0! ring-0! bg-inherit!"
            inputMode="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            {["admin", "user", "guest"].map((x) => (
              <SelectItem value={x} key={x} className="capitalize">
                {x}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Active</SelectItem>
            <SelectItem value="dark">Draft</SelectItem>
            <SelectItem value="system">Ended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Dates" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Today</SelectItem>
            <SelectItem value="dark">This week</SelectItem>
            <SelectItem value="system">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <EventTable data={users} />
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
        <Button variant={"outline"} className="rounded">
          <FileDownIcon />
          Export PDF
        </Button>
      </div>
    </section>
  );
}
