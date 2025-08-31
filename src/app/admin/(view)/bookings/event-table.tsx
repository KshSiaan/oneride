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
import { cn, idk } from "@/lib/utils";
import { dateExtractor } from "@/lib/func/functions";

export default function EventTable({ data }: idk) {
  return (
    <>
      {" "}
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">Booking ID</TableHead>
            <TableHead className="text-center">Event Name</TableHead>
            {/* <TableHead className="text-center">User Name</TableHead> */}
            <TableHead className="text-center">Seats Booked</TableHead>
            <TableHead className="text-center">Booking Date</TableHead>
            <TableHead className="text-center">Payment status</TableHead>
            <TableHead className="text-center">Booking status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((x: idk) => (
            <TableRow key={x._id}>
              <TableCell className="text-center">{x._id}</TableCell>
              <TableCell className="text-center">{x?.event?.title}</TableCell>
              {/* <TableCell className="text-center">{x.}</TableCell> */}
              <TableCell className="text-center">{x.ticketCount}</TableCell>
              <TableCell className="text-center">
                {dateExtractor(x.updatedAt)}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    x.paid ? "bg-green-700" : "bg-secondary text-foreground"
                  )}
                >
                  {x.paid ? "Paid" : "Unpaid"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    x.status === "pending" ? "bg-yellow-400" : "bg-green-700"
                  )}
                >
                  {x.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`bookings/${x._id}`}>
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
