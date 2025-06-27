import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventTable from "./event-table";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Event Management</h1>
          <p>Manage all upcoming and past events from one place</p>
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
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All categoires" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lights">Concert</SelectItem>
            <SelectItem value="light">Sports events</SelectItem>
            <SelectItem value="dark">Cultural events</SelectItem>
            <SelectItem value="system">Food fair</SelectItem>
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
        <Select>
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
      <EventTable />
    </section>
  );
}
