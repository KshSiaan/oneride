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
import { CheckIcon, XIcon, EyeIcon } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";

export default function PartnerInquiriesTable() {
  const partnerInquiries = [
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Pending",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Pending",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Pending",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Approved",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Approved",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Approved",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Rejected",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Rejected",
    },
    {
      companyName: "Hanif Enterprise",
      contactPerson: "John Snow",
      email: "JohnSnow@gmail.com",
      submittedOn: "Jun 15, 2025",
      status: "Rejected",
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
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">Company Name</TableHead>
            <TableHead className="text-center">Contact Person</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Submitted On</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partnerInquiries.map((inquiry, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                {inquiry.companyName}
              </TableCell>
              <TableCell className="text-center">
                {inquiry.contactPerson}
              </TableCell>
              <TableCell className="text-center">{inquiry.email}</TableCell>
              <TableCell className="text-center">
                {inquiry.submittedOn}
              </TableCell>
              <TableCell className="text-center">
                <Badge className={getStatusBadgeColor(inquiry.status)}>
                  {inquiry.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EyeIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-black text-white p-6! rounded-lg min-w-[540px]">
                    <DialogHeader>
                      <DialogTitle className="w-full text-center text-xl font-semibold mb-4!">
                        Partner Inquiry Details
                      </DialogTitle>
                    </DialogHeader>
                    <div className="block! space-y-2! w-full gap-4 py-4!">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Company Name:</p>
                        <p className="font-medium">
                          {inquiry.companyName || "N/A"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Contact Person:</p>
                        <p className="font-medium">
                          {inquiry.contactPerson || "N/A"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Email:</p>
                        <p className="font-medium">{inquiry.email || "N/A"}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Phone:</p>
                        {/* Assuming 'phone' might be part of the inquiry object */}
                        <p className="font-medium">{"+15222222"}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Website:</p>
                        {/* Assuming 'website' might be part of the inquiry object */}
                        <p className="font-medium">{"www.hanif.com"}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Submitted On:</p>
                        <p className="font-medium">
                          {inquiry.submittedOn || "N/A"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Status:</p>
                        <span
                          className={`inline-flex items-center !px-3 !py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            inquiry.status
                          )} text-white`}
                        >
                          {inquiry.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-600 mt-4!">
                        Proposal Message
                      </h3>
                      <div className="col-span-2">
                        {/* Assuming 'proposalMessage' might be part of the inquiry object */}
                        <Textarea
                          className="font-medium border border-gray-700 p-3! rounded text-gray-300"
                          defaultValue={`We are Tech Events Inc., a leading organizer of
                          technology conferences with over 10 years of
                          experience. We'd like to partner with your platform to
                          offer exclusive event packages to your users. Our
                          events typically attract 500+ attendees and we believe
                          this partnership would be mutually beneficial by
                          providing value to your customers while expanding our
                          reach.`}
                          readOnly
                        ></Textarea>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-600 mt-4!">
                        Admins Notes
                      </h3>
                      <div className="col-span-2">
                        {/* Assuming 'adminsNotes' might be part of the inquiry object */}
                        <Textarea
                          className="font-medium border border-gray-700 p-3 rounded text-gray-300"
                          defaultValue={"Admin Notes about this inquiries"}
                          readOnly
                        ></Textarea>
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
                        Email Partner
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {inquiry.status === "Pending" && (
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
                          <p>You successfully approved this inquiry.</p>
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
      </div>
    </>
  );
}
