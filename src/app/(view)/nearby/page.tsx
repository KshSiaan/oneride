import EventCard from "@/components/core/event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Page() {
  return (
    <>
      <header
        className="h-[60dvh] w-full bg-cover bg-center font-serif"
        style={{ backgroundImage: `url('/image/festive.jpg')` }}
      >
        <div className="h-full w-full flex justify-center items-center backdrop-blur-xs backdrop-brightness-50">
          <div className="w-1/2 flex flex-col justify-around items-center gap-6 text-center">
            <h1 className="text-4xl font-semibold">
              Explore Events Around You
            </h1>
            <h3 className="text-lg">
              Don’t miss out on what’s happening near you — get there with us.
            </h3>
            <div className="w-full flex justify-center items-center">
              <Input
                className="rounded-r-none!"
                placeholder="Search events or locations...."
              />{" "}
              <Button className="rounded-r-lg">Search</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="my-12! px-[7%]! font-serif">
        <div className="relative w-fit mb-12!">
          <h1 className="text-3xl">Events Near You</h1>
          <div className="h-1 w-[40%] absolute -bottom-1 bg-primary" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCard key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
