"use server";
import EventCard from "@/components/core/event-card";
import { getEventsApi } from "@/lib/api/core";
import { dateExtractor, timeExtractor } from "@/lib/func/functions";
import { idk } from "@/lib/utils";
import { cookies } from "next/headers";
import React from "react";

export default async function Events() {
  const token = (await cookies()).get("token")?.value;
  const call: idk = await getEventsApi(token ?? "");

  return call.data.map(
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
