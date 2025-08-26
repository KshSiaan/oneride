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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePartnershipApi } from "@/lib/api/core";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Inquiry = {
  _id: string;
  organizerName: string;
  eventName: string;
  organizerEmail: string;
  eventDate: string;
  status: "pending" | "approved" | "rejected";
  eventLocation: string;
  transportationNeeds: string;
  adminNotes?: string;
};

type Props = {
  data: Inquiry[];
};

export default function PartnerInquiriesTable({ data }: Props) {
  const [cookies] = useCookies(["token"]);
  const qClient = useQueryClient();
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-700";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
      return togglePartnershipApi(id, { status }, cookies.token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Something went wrong", {
        description: "Failed to Update the Status",
      });
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Successfully Updated Request");
      qClient.invalidateQueries({ queryKey: ["partner"] });
    },
  });
  return (
    <Table className="mt-6">
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead className="text-center">Organizer</TableHead>
          <TableHead className="text-center">Event Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Event Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((inquiry) => (
          <TableRow key={inquiry._id}>
            <TableCell className="text-center">
              {inquiry.organizerName}
            </TableCell>
            <TableCell className="text-center">{inquiry.eventName}</TableCell>
            <TableCell className="text-center">
              {inquiry.organizerEmail}
            </TableCell>
            <TableCell className="text-center">
              {formatDate(inquiry.eventDate)}
            </TableCell>
            <TableCell className="text-center">
              <Badge className={getStatusBadgeColor(inquiry.status)}>
                {inquiry.status.charAt(0).toUpperCase() +
                  inquiry.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-center !space-x-2">
              {/* View Details */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EyeIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-black text-white p-6 rounded-lg min-w-[540px]">
                  <DialogHeader>
                    <DialogTitle className="w-full text-center text-xl font-semibold mb-4">
                      Partner Inquiry Details
                    </DialogTitle>
                  </DialogHeader>
                  <div className="block space-y-2 w-full gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <p className="text-gray-400">Organizer:</p>
                      <p className="font-medium">{inquiry.organizerName}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <p className="text-gray-400">Event Name:</p>
                      <p className="font-medium">{inquiry.eventName}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <p className="text-gray-400">Email:</p>
                      <p className="font-medium">{inquiry.organizerEmail}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <p className="text-gray-400">Event Date:</p>
                      <p className="font-medium">
                        {formatDate(inquiry.eventDate)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <p className="text-gray-400">Event Location:</p>
                      <p className="font-medium">{inquiry.eventLocation}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <p className="text-gray-400">Transportation Needs:</p>
                      <p className="font-medium">
                        {inquiry.transportationNeeds}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <p className="text-gray-400">Status:</p>
                      <Badge className={getStatusBadgeColor(inquiry.status)}>
                        {inquiry.status.charAt(0).toUpperCase() +
                          inquiry.status.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-pink-600 mt-4">
                      Admin Notes
                    </h3>
                    <Textarea
                      className="font-medium border border-gray-700 p-3 rounded text-gray-300"
                      defaultValue={inquiry.adminNotes || "N/A"}
                      readOnly
                    ></Textarea>
                  </div>
                  <DialogFooter className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-white border border-gray-700 hover:bg-gray-800"
                    >
                      Email Partner
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Approve / Reject */}
              {inquiry.status === "pending" && (
                <>
                  {/* <Dialog>
                    <DialogTrigger asChild>

                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-center items-center gap-4 p-6">
                      <Image
                        src="/icon/thanks.gif"
                        height={100}
                        width={100}
                        alt="approved"
                      />
                      <h3 className="text-2xl">Approved</h3>
                      <p>You successfully approved this inquiry.</p>
                    </DialogContent>
                  </Dialog> */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-600"
                    onClick={() => {
                      mutate({ id: inquiry._id, status: "approved" });
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
                        You are going to reject this partnership request.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          variant={"destructive"}
                          onClick={() => {
                            mutate({ id: inquiry._id, status: "rejected" });
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
  );
}
