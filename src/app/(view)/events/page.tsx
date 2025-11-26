"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Suspense, useState } from "react";
import Events from "./events";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <header
        className="h-[60dvh] w-full bg-cover bg-center font-serif"
        style={{ backgroundImage: `url('/image/concert.jpg')` }}
      >
        <div className="h-full w-full flex justify-center items-center backdrop-blur-xs backdrop-brightness-50">
          <div className="px-4! lg:w-1/2 flex flex-col justify-around items-center gap-6 text-center">
            <h1 className="text-2xl lg:text-4xl font-semibold">
              Ride to Your Next Adventure
            </h1>
            <h3 className="text-sm lg:text-lg">
              Book comfortable, affordable transport to major events across
              Bangladesh. No parking hassles, just good times.
            </h3>
            <div className="w-full flex justify-center items-center">
              <Input
                className="rounded-r-none!"
                placeholder="Search events or locations...."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button className="rounded-r-lg">Search</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="my-12! px-4! lg:px-[7%]! font-serif">
        <div className="relative w-fit mb-12!">
          <h1 className="tex-xl lg:text-3xl">Upcoming Events</h1>
          <div className="h-1 w-[40%] absolute -bottom-1 bg-primary" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense
            fallback={
              <>
                <Skeleton className="w-full aspect-square" />
                <Skeleton className="w-full aspect-square" />
                <Skeleton className="w-full aspect-square" />
              </>
            }
          >
            <Events search={search} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
