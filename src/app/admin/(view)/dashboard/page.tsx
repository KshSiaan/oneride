"use client";
import {
  BusFrontIcon,
  CalendarCheck,
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
export default function Page() {
  return (
    <>
      <div className="!pb-6 ">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Activities summary at a glance{" "}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-6 !pr-6">
        {dbData.map((x, i) => (
          <div
            className="aspect-video border rounded-lg flex flex-col justify-around items-start !p-6 bg-secondary"
            key={i}
          >
            <div className="bg-secondary !p-2 rounded-xl flex text-lg gap-2">
              <div className="size-8 flex justify-center items-center rounded-full bg-primary">
                <x.icon className="size-5" />
              </div>
              {x.title}
            </div>
            <h4 className="text-3xl">{x.value}</h4>
            {x.direction === "up" ? (
              <p className="font-medium text-green-500 flex items-center">
                <TrendingUp className="size-4 mr-2" /> {x.change} {x.period}
              </p>
            ) : (
              <p className="font-medium text-red-500 flex items-center">
                <TrendingDown className="size-4 mr-2" /> {x.change} {x.period}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="!mt-6 !pr-6">
        <ChartPart />
      </div>
      <Card className="mt-6!">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-4 gap-6">
          <Link href="create-event">
            <Card className="hover:scale-105  transition-transform">
              <CardContent className="flex flex-col justify-center items-center gap-2">
                <div className="size-12 rounded-full flex items-center justify-center bg-primary ">
                  <CalendarPlus2 className="size-6" />
                </div>
                <h3>Create new event</h3>
                <p className="text-xs">Set up a new transportation event</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="request-charter">
            <Card>
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
            <Card>
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
            <Card>
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
const dbData = [
  {
    title: "Total Events",
    value: "24",
    icon: CalendarCheck,
    change: "12%",
    period: "from last month",
    direction: "up",
  },
  {
    title: "Bookings Today",
    value: "156",
    icon: Menu,
    change: "8%",
    period: "from yesterday",
    direction: "up",
  },
  {
    title: "Active Users",
    value: "1,842",
    icon: UserIcon,
    change: "3.5%",
    period: "from last week",
    direction: "up",
  },
  {
    title: "Pending Charter Requestes",
    value: "7",
    icon: CalendarOff,
    change: "2%",
    period: "from yesterday",
    direction: "down",
  },
];
