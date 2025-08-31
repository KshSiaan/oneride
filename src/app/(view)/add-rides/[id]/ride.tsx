"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BusFrontIcon,
  ChevronRight,
  Loader2Icon,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getPickupById } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import { dateExtractor, timeExtractor, timeSumUp } from "@/lib/func/functions";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
export default function Ride({ id }: { id: string }) {
  const [cookies] = useCookies(["token"]);
  const [total, setTotal] = useState<number>(0);
  const navig = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["transport"],
    queryFn: (): idk => {
      return getPickupById(id);
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  const bag = data.data;
  return (
    <>
      <section className="space-y-3!">
        <h1 className="text-lg lg:text-2xl">Add Rides</h1>
        <h2>{bag.dropOffPoint.name}</h2>
        <p>{dateExtractor(bag.departureTime)}</p>
      </section>
      <section className="border-2 border-primary mt-12! lg:grid grid-cols-3 gap-6 p-6! rounded-lg">
        <div className="">
          <h3 className="text-2xl">Roundtrip Outbound</h3>

          <div className="w-full grid md:grid-cols-3 col-span-3 gap-2 mt-6!">
            <div className="space-y-2!">
              <p className="text-base">Depart</p>
              <p className="text-2xl">{timeExtractor(bag.departureTime)}</p>
              <p className="text-sm">{dateExtractor(bag.departureTime)}</p>
              <p className="text-sm">{bag.pickUpPoint.name.split(",").at(0)}</p>
            </div>
            <div className="h-full flex flex-col justify-center items-center gap-2">
              <p className="text-xs">{bag.duration} min</p>
              <div className="h-1 w-full bg-[#FD962F] relative">
                <div className="absolute size-5 rounded-full bg-[#FD962F] -left-0 top-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
                  <BusFrontIcon className="size-3" />
                </div>
                <div className="absolute size-5 rounded-full bg-[#FD962F] right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
                  <BusFrontIcon className="size-3" />
                </div>
              </div>
            </div>
            <div className="space-y-2!">
              <p className="text-base">Arrival</p>
              <p className="text-2xl">
                {timeSumUp(bag.departureTime, bag.duration)}
              </p>
              <p className="text-sm">{dateExtractor(bag.departureTime)}</p>
              <p className="text-sm">
                {bag.dropOffPoint.name.split(",").at(0)}
              </p>
            </div>
          </div>
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
              ${bag.price}
            </h3>
            <p>Per Roundtrip Ride </p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Button
              className="text-foreground rounded-full"
              size={"icon"}
              onClick={() => {
                if (total > 0) {
                  setTotal(total - 1);
                }
              }}
            >
              <Minus />
            </Button>
            <p className="text-lg lg:text-2xl">{total}</p>
            <Button
              className="text-foreground rounded-full"
              onClick={() => {
                setTotal(total + 1);
              }}
              size={"icon"}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </section>
      <div className="grid md:grid-cols-2 mt-12! gap-6 w-full">
        <Button
          className="w-full lg:w-1/2 lg:text-lg text-foreground py-6! flex justify-between items-center rounded-lg"
          onClick={() => {}}
        >
          <span>Add another ticket</span>
        </Button>
        <Button
          className="w-full lg:text-lg text-foreground py-6! flex justify-between items-center rounded-lg"
          onClick={() => {
            localStorage.setItem("ticketTotal", String(total));
            if (!cookies.token) {
              navig.push(`/add-rides/continue/${id}`);
            } else {
              navig.push(`/add-rides/details?id=${id}`);
            }
          }}
        >
          <span>Add 1 Ride</span>
          <span className="size-6 text-primary rounded-full bg-foreground flex flex-row justify-center items-center">
            <ChevronRight />
          </span>
        </Button>
      </div>
    </>
  );
}
