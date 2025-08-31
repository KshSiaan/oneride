"use client";
import React from "react";
import { Marquee } from "@/components/magicui/marquee";
import EventCard from "@/components/core/event-card";
import { useQuery } from "@tanstack/react-query";
import { getEventsApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { idk } from "@/lib/utils";
import { dateExtractor, imgCreator, timeExtractor } from "@/lib/func/functions";

export default function EventMaquee() {
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: (): idk => {
      return getEventsApi(cookies.token);
    },
  });
  return (
    <Marquee pauseOnHover className="[--duration:20s]">
      <div className="flex items-center gap-12 px-6!">
        {!isPending
          ? data.data.map((x: idk) => (
              <EventCard
                key={x._id}
                title={x.title}
                image={x.image ? imgCreator(x.image) : undefined}
                location={x.description}
                startDate={dateExtractor(x.startDate)}
                startTime={timeExtractor(x.startTime)}
                id={x._id}
              />
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                className="h-[40dvh] lg:h-[60dvh] aspect-square"
                key={i}
              />
            ))}
      </div>
    </Marquee>
  );
}
