"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon, Users2Icon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { idk } from "@/lib/utils";
import { dateExtractor, timeExtractor } from "@/lib/func/functions";

export default function EventTable({ data }: { data: idk }) {
  console.log(data.data);
  const customers = data.data;
  return (
    <>
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">Event Title</TableHead>
            <TableHead className="text-center">Date & Time</TableHead>
            {/* <TableHead className="text-center">Location</TableHead> */}
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Total seats</TableHead>
            <TableHead className="text-center">Ticket Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((x: idk) => (
            <TableRow key={x._id}>
              <TableCell className="text-center">{x.title}</TableCell>
              <TableCell className="text-center">
                {dateExtractor(x.startDate)} at {timeExtractor(x.startTime)}
              </TableCell>
              {/* <TableCell className="">{x.location}</TableCell> */}
              <TableCell className="text-center capitalize">
                {x?.category?.name}
              </TableCell>
              <TableCell className="text-center">{x.totalSeat}</TableCell>
              <TableCell className="text-center">{x.ticketPrice}</TableCell>
              <TableCell className=" text-center">
                <Badge className="bg-green-700 capitalize">
                  {x.adminStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={"events/edit"}>
                    <EditIcon />
                  </Link>
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-destructive"
                      size="icon"
                    >
                      <TrashIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="left">
                    <PopoverArrow />
                    <h3>Are you sure?</h3>
                    <CardDescription>
                      You are going to delete this user account and this cannot
                      be undone.
                    </CardDescription>
                    <PopoverClose asChild>
                      <Button variant="destructive" className="text-sm !mt-6">
                        <TrashIcon />
                        Delete
                      </Button>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon">
                  <Users2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className="w-full flex flex-row justify-between items-center mt-12!">
        <div className=""></div>
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Button variant={"outline"} className="rounded">
          <FileDownIcon />
          Export PDF
        </Button>
      </div> */}
    </>
  );
}
