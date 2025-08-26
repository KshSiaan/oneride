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
import {
  // FileDownIcon,
  CheckIcon,
  XIcon,
  EyeIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { idk } from "@/lib/utils";
import { dateExtractor } from "@/lib/func/functions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCharterStatusApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function EventTable({ data }: { data: idk }) {
  const [cookies] = useCookies(["token"]);
  const qClient = useQueryClient();
  const list = data.result;
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };
  const { mutate } = useMutation({
    mutationKey: ["update_status"],
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "pending" | "approved" | "rejected";
    }) => {
      return updateCharterStatusApi(id, status, cookies.token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Something went wrong", {
        description: "Failed to Update the Status",
      });
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Successfully Updated Request");
      qClient.invalidateQueries({ queryKey: ["charter"] });
    },
  });
  return (
    <>
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
          {list.map((x: idk) => (
            <TableRow key={x._id}>
              <TableCell className="text-center">{x._id}</TableCell>
              <TableCell className="text-center">{x.name}</TableCell>
              <TableCell className="text-center">
                {dateExtractor(x.createdAt)}
              </TableCell>
              <TableCell className="text-center">{x.pickupLocation}</TableCell>
              <TableCell className="text-center">{x.dropoffLocation}</TableCell>
              <TableCell className="text-center">{x.passengerCount}</TableCell>
              <TableCell className="text-center">
                <Badge className={getStatusBadgeColor(x.status)}>
                  {x.status}
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
                        <p className="font-medium">{x._id}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">User Name:</p>
                        <p className="font-medium">{x.name}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Email:</p>
                        <p className="font-medium">{x.email}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Phone:</p>
                        <p className="font-medium">{x.phone}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Date of journey:</p>
                        <p className="font-medium">
                          {new Date(x.pickupDateAndTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Pickup Time:</p>
                        <p className="font-medium">
                          {new Date(x.pickupDateAndTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Origin:</p>
                        <p className="font-medium">{x.pickupLocation}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Destination:</p>
                        <p className="font-medium">{x.dropoffLocation}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Passengers:</p>
                        <p className="font-medium">{x.passengerCount}</p>
                      </div>
                      {/* Not in API response */}
                      {/* <div className="grid grid-cols-2 items-center gap-4">
      <p className="text-gray-400">Bus Type:</p>
      <p className="font-medium">{x.busType}</p>
    </div> */}
                      <div className="grid grid-cols-2 items-start gap-4">
                        <p className="text-gray-400">Purpose:</p>
                        <p className="font-medium">{x.purpose}</p>
                      </div>
                      <div className="grid grid-cols-2 items-start gap-4">
                        <p className="text-gray-400">Special Requests:</p>
                        <p className="font-medium">{x.specialInstructions}</p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-gray-400">Status:</p>
                        <span
                          className={`inline-flex items-center !px-3 !py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            x.status
                          )} text-white`}
                        >
                          {x.status}
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
                {["pending"].includes(x.status) && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600"
                      onClick={() => {
                        mutate({ id: x._id, status: "approved" });
                      }}
                    >
                      <CheckIcon />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                        >
                          <XIcon />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are going to reject this charter request.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button
                            variant={"destructive"}
                            onClick={() => {
                              mutate({ id: x._id, status: "rejected" });
                            }}
                          >
                            Reject
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
