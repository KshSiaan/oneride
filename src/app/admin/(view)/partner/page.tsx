/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDownIcon, Loader2Icon, PlusIcon, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventTable from "./event-table";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getPartnershipsApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";

export default function Page() {
  const [cookies] = useCookies(["token"]);
  const [status, setStatus] = useState<
    "pending" | "approved" | "rejected" | "" | "all"
  >("");
  const [dateFilter, setDateFilter] = useState<
    "today" | "thisWeek" | "thisMonth" | "all" | ""
  >("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch partnerships data
  const { data, isPending, refetch } = useQuery({
    queryKey: ["partner", status, dateFilter, search, page],
    queryFn: (): any =>
      getPartnershipsApi(
        {
          status: status === "all" ? "" : status,
          dateFilter: dateFilter === "all" ? "" : dateFilter,
          search,
          page,
          limit: 12,
        },
        cookies.token
      ),
  });

  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 1;

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
    refetch();
  }, [status, dateFilter, search]);

  return (
    <section className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3">
          <h1 className="text-2xl">Charter Requests</h1>
          <p>Manage all charter booking requests from users</p>
        </div>
        <Button className="rounded text-foreground" size="lg">
          <PlusIcon />
          Create New Event
        </Button>
      </div>

      {/* Stats */}
      <div className="w-full grid grid-cols-4 gap-6 mt-6">
        <Card className="aspect-[2/1]">
          <CardContent className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-5xl text-primary">{totalItems}</h2>
            <p className="text-lg">Total Inquiries</p>
          </CardContent>
        </Card>
        <Card className="aspect-[2/1]">
          <CardContent className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-5xl text-primary">
              {data?.data?.result.filter((x: any) => x.status === "pending")
                .length || 0}
            </h2>
            <p className="text-lg">Pending Request</p>
          </CardContent>
        </Card>
        <Card className="aspect-[2/1]">
          <CardContent className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-5xl text-primary">
              {data?.data?.result.filter((x: any) => x.status === "approved")
                .length || 0}
            </h2>
            <p className="text-lg">Accepted Partners</p>
          </CardContent>
        </Card>
        <Card className="aspect-[2/1]">
          <CardContent className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-5xl text-primary">
              {data?.data?.result.filter((x: any) => x.status === "rejected")
                .length || 0}
            </h2>
            <p className="text-lg">Rejected Submissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="w-full grid grid-cols-6 mt-6 gap-6">
        {/* Search */}
        <div className="col-span-3 flex items-center border rounded-lg px-4 bg-secondary">
          <SearchIcon className="text-muted-foreground w-4 h-4 mr-2" />
          <Input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && refetch()}
            className="border-0 shadow-none! outline-none bg-inherit! ring-0!"
          />
        </div>

        {/* Status Filter */}
        <Select onValueChange={(val) => setStatus(val as any)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setDateFilter(val as idk)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
          </SelectContent>
        </Select>

        {/* Export */}
        <Button variant="outline" className="rounded-md">
          <FileDownIcon />
          Export PDF
        </Button>
      </div>

      {/* Event Table */}
      {isPending ? (
        <div className="flex justify-center items-center h-24 mx-auto">
          <Loader2Icon className="animate-spin" />
        </div>
      ) : (
        <EventTable data={data?.data?.result || []} />
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center gap-4 mt-4">
        <Button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
