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
import { EyeIcon, FileDownIcon, XIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";

import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

export default function EventTable() {
  const customers = [
    {
      id: "BK-1001",
      event: "Music Festival",
      user: "John smith",
      seats: 2,
      date: "Jun 15, 2025",
      payment: "Paid",
      status: "Confirmed",
    },
  ];

  return (
    <>
      {" "}
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">Booking ID</TableHead>
            <TableHead className="text-center">Event Name</TableHead>
            <TableHead className="text-center">User Name</TableHead>
            <TableHead className="text-center">Seats Booked</TableHead>
            <TableHead className="text-center">Booking Date</TableHead>
            <TableHead className="text-center">Payment status</TableHead>
            <TableHead className="text-center">Booking status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((x, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{x.id}</TableCell>
              <TableCell className="text-center">{x.event}</TableCell>
              <TableCell className="text-center">{x.user}</TableCell>
              <TableCell className="text-center">{x.seats}</TableCell>
              <TableCell className="text-center">{x.date}</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-700"> {x.payment}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-700">{x.status}</Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={"bookings/details"}>
                    <EyeIcon />
                  </Link>
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-destructive"
                      size="icon"
                    >
                      <XIcon />
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
                        <XIcon />
                        Delete
                      </Button>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex flex-row justify-between items-center mt-12!">
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
      </div>
    </>
  );
}
