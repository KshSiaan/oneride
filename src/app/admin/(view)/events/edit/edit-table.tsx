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
import {
  EyeIcon,
  FileDownIcon,
  MailIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function EventTable() {
  const customers = [
    {
      title: "Sarah Johnson",
      date: "Sarah@example.com",
      location: 4,
      cat: "10 JUn 2025",
      total: "Paid",
      booked: "Confirmed",
      status: "Active",
    },
    {
      title: "Sarah Johnson",
      date: "Sarah@example.com",
      location: 4,
      cat: "10 JUn 2025",
      total: "Paid",
      booked: "Confirmed",
      status: "Active",
    },
    {
      title: "Sarah Johnson",
      date: "Sarah@example.com",
      location: 4,
      cat: "10 JUn 2025",
      total: "Paid",
      booked: "Confirmed",
      status: "Active",
    },
    {
      title: "Sarah Johnson",
      date: "Sarah@example.com",
      location: 4,
      cat: "10 JUn 2025",
      total: "Paid",
      booked: "Confirmed",
      status: "Active",
    },
    {
      title: "Sarah Johnson",
      date: "Sarah@example.com",
      location: 4,
      cat: "10 JUn 2025",
      total: "Paid",
      booked: "Confirmed",
      status: "Active",
    },
    {
      title: "Sarah Johnson",
      date: "Sarah@example.com",
      location: 4,
      cat: "10 JUn 2025",
      total: "Paid",
      booked: "Confirmed",
      status: "Active",
    },
  ];

  return (
    <>
      {" "}
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">User Name</TableHead>
            <TableHead className="text-center">Contact</TableHead>
            <TableHead className="text-center">Seats</TableHead>
            <TableHead className="text-center">Booking Date</TableHead>
            <TableHead className="text-center">Payment Status</TableHead>
            <TableHead className="text-center">Booking Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((x, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{x.title}</TableCell>
              <TableCell className="text-center">{x.date}</TableCell>
              <TableCell className="text-center">{x.location}</TableCell>
              <TableCell className="text-center">{x.cat}</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-700">{x.total}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-700">{x.booked}</Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="edit/details">
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
                        <TrashIcon />
                        Delete
                      </Button>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon">
                  <MailIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex flex-row justify-between items-center mt-12!">
        <div className=""></div>

        <Button variant={"outline"} className="rounded">
          <FileDownIcon />
          Export PDF
        </Button>
      </div>
    </>
  );
}
