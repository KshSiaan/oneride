import EventCard from "@/components/core/event-card";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main className="py-12! font-serif flex flex-col justify-center items-center">
      <div className=" flex items-center justify-center flex-col">
        <Image
          src="/icon/thanks.gif"
          height={124}
          width={124}
          alt="thank-you"
        />
        <h2 className="text-2xl font-semibold text-center">Thank You</h2>
        <h4 className="text-lg text-center">
          our seat is booked and we’ll keep you updated! See you at the event!
        </h4>
      </div>
      <div className="space-y-6! mt-24!">
        <h2 className="text-3xl font-semibold text-center">Upcoming Events</h2>
        <h4 className="text-xl text-center">
          Find your ride to the next big thing
        </h4>
        <Marquee pauseOnHover className="[--duration:20s]">
          <div className="grid grid-cols-3 gap-6 px-6!">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventCard key={i} />
            ))}
          </div>
        </Marquee>
      </div>
    </main>
  );
}
