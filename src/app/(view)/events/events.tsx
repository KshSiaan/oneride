"use client";
import EventCard from "@/components/core/event-card";
import { getEventsApi } from "@/lib/api/core";
import { dateExtractor, timeExtractor } from "@/lib/func/functions";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function Events({ search }: { search: string }) {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["events", search],
    queryFn: (): idk =>
      getEventsApi(token, {
        title: search || undefined,
      }),
  });
  if (isPending) {
    return (
      <div
        className={`flex justify-center items-center h-24 mx-auto lg:col-span-3`}
      >
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return data.data.map(
    (x: {
      _id: string;
      title: string;
      description: string;
      startDate: string;
      startTime: string;
      image: string;
    }) => (
      <EventCard
        title={x.title}
        location={x.description}
        key={x._id}
        id={x._id}
        image={x.image}
        startDate={dateExtractor(x.startDate)}
        startTime={timeExtractor(x.startTime)}
      />
    )
  );
}
