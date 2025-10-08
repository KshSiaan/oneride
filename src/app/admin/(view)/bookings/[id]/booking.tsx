"use client";
import React from "react";
import {
  Calendar,
  CreditCard,
  Mail,
  Phone,
  User,
  Users,
  X,
  Send,
  Settings,
  CalendarCheck,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getBookingByIdApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { idk } from "@/lib/utils";
import { dateExtractor, timeExtractor } from "@/lib/func/functions";

export default function Booking({ id }: { id: string }) {
  const [cookies] = useCookies(["token"]);

  const {
    data,
    isPending,
    isError,
    error: err,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: (): idk => getBookingByIdApi(id, cookies.token),
  });

  if (isPending) {
    return (
      <section className="w-full space-y-6">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="w-full h-[300px]" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="w-full h-[80px]" />
          <Skeleton className="w-full h-[80px]" />
          <Skeleton className="w-full h-[80px]" />
        </div>
      </section>
    );
  }

  if (isError) {
    if (err.message === "Validation failed") return notFound();
    return <pre>{JSON.stringify(err, null, 2)}</pre>;
  }

  const info = data?.data;
  if (!info) return notFound();

  // dynamic user object — either user or guestUser
  const user = info.user ?? info.guestUser ?? {};

  const totalAmount =
    info.event?.ticketPrice && info.ticketCount
      ? info.ticketCount * info.event.ticketPrice
      : "N/A";

  return (
    <>
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  # Booking ID
                </p>
                <p className="text-lg font-semibold">{info?._id ?? "N/A"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  $ Total Amount
                </p>
                <p className="text-lg font-semibold">
                  {totalAmount !== "N/A" ? `$${totalAmount}` : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <CalendarCheck className="size-4" /> Event
                </p>
                <p className="text-lg font-semibold text-primary">
                  {info?.event?.title ?? "Event Deleted / N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  # Booking Date
                </p>
                <p className="text-lg font-semibold">
                  {info?.event
                    ? `${dateExtractor(info.event.startDate)} - ${timeExtractor(
                        info.event.startTime
                      )}`
                    : dateExtractor(info?.createdAt ?? "")}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <CreditCard className="size-4" /> Payment Status
                </p>
                <Badge variant={info?.paid ? "success" : "secondary"}>
                  {info?.paid ? "Paid" : "Unpaid"}
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  # Number of Seats
                </p>
                <p className="text-lg font-semibold">
                  {info?.ticketCount ?? "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <Calendar className="size-4" /> Booking Status
                </p>
                <Badge
                  variant={
                    info?.status === "pending"
                      ? "outline"
                      : info?.status === "confirmed"
                      ? "success"
                      : "secondary"
                  }
                >
                  {info?.status ?? "N/A"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                <User className="h-4 w-4" /> Name
              </p>
              <p className="text-lg font-semibold">
                {`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
                  "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                <Mail className="h-4 w-4" /> Email
              </p>
              <p className="text-lg font-semibold">{user?.email ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                <Phone className="h-4 w-4" /> Phone
              </p>
              <p className="text-lg font-semibold">{user?.phone ?? "N/A"}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Users className="h-4 w-4" /> Account Status
            </p>
            <Badge
              variant={user?.isActive ? "success" : "secondary"}
              className={user?.isActive ? "bg-green-500" : "bg-gray-400"}
            >
              {user?.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                # Transaction ID
              </p>
              <p className="text-lg font-semibold">N/A</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <CreditCard className="size-4" /> Payment Method
              </p>
              <p className="text-lg font-semibold">N/A</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <Coins className="size-4" /> Payment Date
              </p>
              <p className="text-lg font-semibold">
                {dateExtractor(info?.updatedAt ?? "")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Booking Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="destructive" className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancel Booking
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Resend Confirmation
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
