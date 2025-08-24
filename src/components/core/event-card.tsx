import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { imgCreator } from "@/lib/func/functions";
import { blankImg } from "@/lib/config";

export default function EventCard({
  title,
  image,
  location,
  startDate,
  startTime,
  id,
}: {
  title?: string;
  image?: string;
  location?: string;
  startDate?: string;
  startTime?: string;
  id?: string;
}) {
  return (
    <Link href={`/event-booking?id=${id}`}>
      <Card className="!p-0 overflow-hidden rounded-none border-0 hover:text-primary! transition-colors">
        <CardContent
          className="flex h-[40dvh] lg:h-[60dvh] aspect-square items-center justify-center bg-zinc-800 bg-blend-luminosity !p-0 overflow-hidden bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${image ? imgCreator(image) : blankImg})`,
          }}
        >
          <div className="h-full w-full backdrop-brightness-50 flex flex-col justify-end items-start space-y-2! lg:space-y-6! p-6! font-serif">
            <h3 className="text-xl lg:text-3xl">Way To</h3>
            <h2 className="text-2xl lg:text-5xl">{title ?? "N/A"}</h2>
            <h3 className="text-xl lg:text-3xl">{location ?? "N/A"}</h3>
            <p className="text-sm lgtext-xl text-primary">
              {startDate || startTime
                ? `${startDate ?? "N/A"} · ${startTime ?? "N/A"}`
                : "Date time: N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
