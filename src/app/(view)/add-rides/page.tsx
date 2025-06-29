import { Button } from "@/components/ui/button";
import { BusFrontIcon, ChevronRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="font-serif px-4! lg:px-[7%]! my-12!">
      <section className="space-y-3!">
        <h1 className="text-lg lg:text-2xl">Add Rides</h1>
        <h2>Newmarket, ON : 1111 Davis Dr, Newmarket, ON L3Y 8X2, Canada</h2>
        <p>Sunday, July 13</p>
      </section>
      <section className="border-2 border-primary mt-12! lg:grid grid-cols-3 gap-6 p-6! rounded-lg">
        <div className="">
          <h3 className="text-2xl">Roundtrip Outbound</h3>
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              className="w-full grid md:grid-cols-3 col-span-3 gap-2 mt-6!"
              key={i}
            >
              <div className="space-y-2!">
                <p className="text-base">Depart</p>
                <p className="text-2xl">06:00 Am</p>
                <p className="text-sm">Fri,13 Jun</p>
                <p className="text-sm">Dhaka</p>
              </div>
              <div className="h-full flex flex-col justify-center items-center gap-2">
                <p className="text-xs">6h 30min</p>
                <div className="h-1 w-full bg-[#FD962F] relative">
                  <div className="absolute size-5 rounded-full bg-[#FD962F] -left-0 top-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
                    <BusFrontIcon className="size-3" />
                  </div>
                  <div className="absolute size-5 rounded-full bg-[#FD962F] right-0 top-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              <div className="space-y-2!">
                <p className="text-base">12:00 Pm</p>
                <p className="text-2xl">12:00 Pm</p>
                <p className="text-sm">Fri,13 Jun</p>
                <p className="text-sm">Rajshahi</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/image/ask.jpg"
            height={1000}
            width={1000}
            alt="thumbnail"
            className="aspect-square! md:size-34 lg:size-64 rounded-full rotate-y-180"
          />
          {/* <p className="mt-6! text-base lg:text-lg">
            20 riders needed by Jul 6
          </p> */}
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="space-y-2!">
            <h3 className="text-3xl lg:text-5xl text-end text-green-500">
              $50
            </h3>
            <p>Per Roundtrip Ride </p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Button className="text-foreground rounded-full" size={"icon"}>
              <Minus />
            </Button>
            <p className="text-lg lg:text-2xl">1</p>
            <Button className="text-foreground rounded-full" size={"icon"}>
              <Plus />
            </Button>
          </div>
        </div>
      </section>
      <div className="grid md:grid-cols-2 mt-12! gap-6 w-full">
        <Button className="w-full lg:w-1/2 lg:text-lg text-foreground py-6! flex justify-between items-center rounded-lg">
          <span>Add another ticket</span>
        </Button>
        <Button
          className="w-full lg:text-lg text-foreground py-6! flex justify-between items-center rounded-lg"
          asChild
        >
          <Link href="/add-rides/continue">
            <span>Add 1 Ride</span>
            <span className="size-6 text-primary rounded-full bg-foreground flex flex-row justify-center items-center">
              <ChevronRight />
            </span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
