"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
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
import { getCategoriesApi, getEventsApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Page() {
  const [cookies] = useCookies(["token"]);

  // State for each select
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const { data, isPending } = useQuery({
    queryKey: ["events", selectedCategory, selectedDate, selectedStatus],
    queryFn: () =>
      getEventsApi(cookies.token, {
        filterByQuarter: selectedDate,
        adminStatus: selectedStatus,
        category: selectedCategory,
      }),
  });

  const { data: categoryData, isPending: categoryPending }: idk = useQuery({
    queryKey: ["cat"],
    queryFn: getCategoriesApi,
  });

  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Event Management</h1>
          <p>Manage all upcoming and past events from one place</p>
        </div>
        <Button className="rounded text-foreground" size="lg" asChild>
          <Link href={"/admin/create-event"}>
            <PlusIcon />
            Create New Event
          </Link>
        </Button>
      </div>

      <div className="w-full grid grid-cols-6 mt-6! gap-6">
        <div className="w-full border bg-none rounded-lg flex items-center px-4! bg-secondary col-span-3">
          <SearchIcon className="text-muted-foreground size-4" />
          <Input
            placeholder="Search by name or email"
            className="border-0 shadow-none outline-0! ring-0! bg-inherit!"
            inputMode="search"
          />
        </div>

        {/* Category Select */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            {!categoryPending &&
              categoryData.data.map((x: { _id: string; name: string }) => (
                <SelectItem value={x.name} key={x._id} className="capitalize">
                  {x.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Status Select */}
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

        {/* Date Range Select */}
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
      </div>

      {isPending ? (
        <div className="mt-6">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full mt-6 h-[400px]" />
          <div className="flex justify-end items-center gap-6 mt-6">
            <Skeleton className="w-24 h-12" />
            <Skeleton className="w-12 h-12" />
            <Skeleton className="w-12 h-12" />
            <Skeleton className="w-12 h-12" />
            <Skeleton className="w-24 h-12" />
          </div>
        </div>
      ) : (
        <EventTable data={data} />
      )}
    </section>
  );
}
