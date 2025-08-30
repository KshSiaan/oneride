"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getStatsApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { idk } from "@/lib/utils";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  earning: {
    label: "Earning",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartPart() {
  const [period, setPeriod] = React.useState("monthly");
  const [cookies] = useCookies(["token"]);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["statistic", period],
    queryFn: (): idk => {
      return getStatsApi(period, cookies.token);
    },
  });
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0! border-b !py-0 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardDescription>Statics Analytics</CardDescription>
          <CardTitle className="text-3xl font-bold">Revenues</CardTitle>
        </div>
        <Select
          defaultValue="monthly"
          onValueChange={(e) => {
            setPeriod(e);
          }}
        >
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto! border-0 shadow-none"
            aria-label="Select Period"
          >
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="monthly" className="rounded-lg">
              Monthly
            </SelectItem>
            <SelectItem value="weekly" className="rounded-lg">
              Weekly
            </SelectItem>
            <SelectItem value="daily" className="rounded-lg">
              Daily
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2! pt-4! sm:px-6! sm:pt-6!">
        {isPending ? (
          <Skeleton className="h-[40dvh] w-full" />
        ) : isError ? (
          <div className="h-[40dvh] w-full">{error.message}</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={data.data}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-accent-foreground)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#1EE9B6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D96FF8" stopOpacity={0.1} />
                </linearGradient>

                {/* New gradient for mobile stroke */}
                <linearGradient id="strokeMobile" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1EE9B6" />
                  <stop offset="100%" stopColor="#D96FF8" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="mobile"
                type="linear"
                fill="url(#fillMobile)"
                stroke="url(#strokeMobile)"
                stackId="a"
              />
              {/* <ChartLegend content={<ChartLegendContent />} /> */}
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
