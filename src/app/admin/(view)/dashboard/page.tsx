"use client";
import {
  BusFrontIcon,
  CalendarCheckIcon,
  CalendarOff,
  CalendarPlus2,
  MailIcon,
  Menu,
  TrendingDown,
  TrendingUp,
  UserIcon,
  UserPlus2Icon,
} from "lucide-react";
import React from "react";
import { ChartPart } from "./chart-part";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getDashboardApi } from "@/lib/api/core";
import { Skeleton } from "@/components/ui/skeleton";
import { idk } from "@/lib/utils";

export default function Page() {
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: (): idk => getDashboardApi(cookies.token),
  });

  const dashboardCards = [
    {
      title: "Total Events",
      value: data?.data?.totalEvents,
      icon: CalendarCheckIcon,
      change: data?.data?.eventsChange?.change,
      period: data?.data?.eventsChange?.period,
      trend: data?.data?.eventsChange?.trend,
    },
    {
      title: "Bookings Today",
      value: data?.data?.bookingsToday,
      icon: Menu,
      change: data?.data?.bookingsChange?.change,
      period: data?.data?.bookingsChange?.period,
      trend: data?.data?.bookingsChange?.trend,
    },
    {
      title: "Active Users",
      value: data?.data?.activeUsers,
      icon: UserIcon,
      change: data?.data?.usersChange?.change,
      period: data?.data?.usersChange?.period,
      trend: data?.data?.usersChange?.trend,
    },
    {
      title: "Pending Charter Requests",
      value: data?.data?.pendingCharters,
      icon: CalendarOff,
      change: data?.data?.chartersChange?.change,
      period: data?.data?.chartersChange?.period,
      trend: data?.data?.chartersChange?.trend,
    },
  ];

  return (
    <>
      <div className="!pb-6 ">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Activities summary at a glance
        </p>
      </div>

      {isPending ? (
        <div className={`grid grid-cols-4 gap-6 !pr-6`}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-video" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6 !pr-6">
          {dashboardCards.map((card, idx) => (
            <div
              key={idx}
              className="aspect-video border rounded-lg flex flex-col justify-around items-start !p-6 bg-secondary"
            >
              <div className="bg-secondary !p-2 rounded-xl flex text-lg gap-2 items-center">
                <div className="size-8 flex justify-center items-center rounded-full bg-primary">
                  <card.icon className="size-4 text-white" />
                </div>
                {card.title}
              </div>

              <h4 className="text-3xl">{card.value}</h4>

              {card.trend === "increase" ? (
                <p className="font-medium text-green-500 flex items-center">
                  <TrendingUp className="size-4 mr-2" /> {card.change}{" "}
                  {card.period}
                </p>
              ) : card.trend === "decrease" ? (
                <p className="font-medium text-red-500 flex items-center">
                  <TrendingDown className="size-4 mr-2" /> {card.change}{" "}
                  {card.period}
                </p>
              ) : (
                <p className="font-medium text-gray-500 flex items-center">
                  No Change
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="!mt-6 !pr-6">
        <ChartPart />
      </div>

      {/* Quick Actions */}
      <Card className="mt-6!">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-4 gap-6">
          <Link href="create-event">
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="flex flex-col justify-center items-center gap-2">
                <div className="size-12 rounded-full flex items-center justify-center bg-primary">
                  <CalendarPlus2 className="size-6" />
                </div>
                <h3>Create new event</h3>
                <p className="text-xs">Set up a new transportation event</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="request-charter">
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="flex flex-col justify-center items-center gap-2">
                <div className="size-12 rounded-full flex items-center justify-center bg-primary ">
                  <BusFrontIcon className="size-6" />
                </div>
                <h3>Add Charter Request</h3>
                <p className="text-xs">Request a private charter service</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="invite-user">
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="flex flex-col justify-center items-center gap-2">
                <div className="size-12 rounded-full flex items-center justify-center bg-primary ">
                  <UserPlus2Icon className="size-6" />
                </div>
                <h3>Invite User</h3>
                <p className="text-xs">Send invitation to new users</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="send-email">
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="flex flex-col justify-center items-center gap-2">
                <div className="size-12 rounded-full flex items-center justify-center bg-primary ">
                  <MailIcon className="size-6" />
                </div>
                <h3>Send Email</h3>
                <p className="text-xs">Contact users or partners</p>
              </CardContent>
            </Card>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
