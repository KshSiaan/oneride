"use client";
import {
  CalendarCheck,
  CalendarOff,
  CalendarPlus2,
  Menu,
  TrendingDown,
  TrendingUp,
  UserIcon,
} from "lucide-react";
import React from "react";
import { ChartPart } from "./chart-part";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <CardContent className="w-full">
          <Card>
            <CardContent>
              <div className="size-18 bg-primary ">
                <CalendarPlus2 />
              </div>
            </CardContent>
          </Card>
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
