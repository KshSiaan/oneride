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
  // FileDownIcon,
  CheckIcon,
  XIcon,
  EyeIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function EventTable() {
  const charterRequests = [
    {
      requestId: "CR-1001",
      userName: "John Smith",
      dateOfJourney: "Jun 15, 2025",
      origin: "123 Main St",
      destination: "Convention center",
      passenger: 35,
      status: "Pending",
    },
    {
      requestId: "CR-1002",
      userName: "John Smith",
      dateOfJourney: "Jun 15, 2025",
      origin: "123 Main St",
      destination: "Convention center",
      passenger: 35,
      status: "Approved",
    },
    {
      requestId: "CR-1003",
      userName: "John Smith",
      dateOfJourney: "Jun 15, 2025",
      origin: "123 Main St",
      destination: "Convention center",
      passenger: 35,
      status: "Rejected",
    },
    {
      requestId: "CR-1004",
      userName: "John Smith",
      dateOfJourney: "Jun 15, 2025",
      origin: "456 Oak Ave",
      destination: "Airport Terminal",
      passenger: 20,
      status: "Pending",
    },
    {
      requestId: "CR-1005",
      userName: "Jane Doe",
      dateOfJourney: "Jun 20, 2025",
      origin: "789 Pine Ln",
      destination: "Stadium",
      passenger: 50,
      status: "Approved",
    },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Approved":
        return "bg-green-700";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      {" "}
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">Request ID</TableHead>
            <TableHead className="text-center">User Name</TableHead>
            <TableHead className="text-center">Date of journey</TableHead>
            <TableHead className="text-center">Origin</TableHead>
            <TableHead className="text-center">Destination</TableHead>
            <TableHead className="text-center">Passenger</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {charterRequests.map((request, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{request.requestId}</TableCell>
              <TableCell className="text-center">{request.userName}</TableCell>
              <TableCell className="text-center">
                {request.dateOfJourney}
              </TableCell>
              <TableCell className="text-center">{request.origin}</TableCell>
              <TableCell className="text-center">
                {request.destination}
              </TableCell>
              <TableCell className="text-center">{request.passenger}</TableCell>
              <TableCell className="text-center">
                <Badge className={getStatusBadgeColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EyeIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-black text-white p-6 rounded-lg min-w-[540px]">
                    <DialogHeader>
                      <DialogTitle className="w-full text-center text-xl font-semibold mb-4">
                        Charter Request Details
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Request ID:</p>
                        <p className="font-medium">CR-1001</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">User Name:</p>
                        <p className="font-medium">John Smith</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Email:</p>
                        <p className="font-medium">John.smith@example.com</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Phone:</p>
                        <p className="font-medium">+15222222</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Date of journey:</p>
                        <p className="font-medium">Jun 30, 2025</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Pickup Time:</p>
                        <p className="font-medium">09:00 AM</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Origin:</p>
                        <p className="font-medium">
                          123 Main St, San Francisco
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Destination:</p>
                        <p className="font-medium">
                          Convention Center, 456Tech Build
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Passengers:</p>
                        <p className="font-medium">45</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Bus Type:</p>
                        <p className="font-medium">Luxury Coach</p>
                      </div>
                      <div className="grid grid-cols-2 items-start gap-4">
                        <p className="text-gray-400">Special Requests:</p>
                        <p className="font-medium">
                          Need wheelchair accessibility and onboard restroom
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Status:</p>
                        <span className="inline-flex items-center !px-3 !py-1 rounded-full text-xs font-medium bg-red-800 text-white">
                          Rejected
                        </span>
                      </div>
                    </div>
                    <DialogFooter className="mt-4 flex justify-end">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-white border border-gray-700 hover:bg-gray-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-mail"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Email User
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {request.status === "Pending" && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600"
                        >
                          <CheckIcon /> {/* Approve Icon */}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col justify-center items-center gap-4">
                          <Image
                            src="/icon/thanks.gif"
                            height={100}
                            width={100}
                            alt="approved"
                            className="size-24"
                          />
                          <h3 className="text-2xl">Approved</h3>
                          <p>You successfully approved</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                    >
                      <XIcon /> {/* Reject Icon */}
                    </Button>
                  </>
                )}
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
        {/* <Button variant={"outline"} className="rounded">
          <FileDownIcon />
          Export PDF
        </Button> */}
      </div>
    </>
  );
}
