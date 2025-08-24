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
import { getBookingsApi, getCategoriesApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const { data: categoryData, isPending: categoryPending }: idk = useQuery({
    queryKey: ["cat"],
    queryFn: getCategoriesApi,
  });

  const { data, isPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => {
      return getBookingsApi({
        status: selectedStatus,
        name: selectedCategory,
        filterByQuarter: selectedDate,
      });
    },
  });
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Bookings</h1>
          <p>
            Track, manage, and take action on every booking across all events.
          </p>
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
