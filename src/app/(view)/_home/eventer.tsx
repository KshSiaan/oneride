"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi, getEventsApi, getPickupById } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import MapBase from "@/components/core/map";
import { Direction } from "@/components/core/direction-maker";
export default function Eventer() {
  const [cookies] = useCookies(["token"]);
  const [category, setCategory] = useState<string | undefined>("");
  const [currentEvent, setCurrentEvent] = useState<string | undefined>();
  const { data: cat, isPending: catPending } = useQuery({
    queryKey: ["categories"],
    queryFn: (): idk => {
      return getCategoriesApi();
    },
  });
  const { data, isPending } = useQuery({
    queryKey: ["event", category],
    queryFn: (): idk => {
      return getEventsApi(cookies.token, { category });
    },
  });
  const { data: transport, isPending: transportLoading } = useQuery({
    queryKey: ["transport", currentEvent],
    queryFn: (): idk => {
      return getPickupById(JSON.parse(currentEvent as string)[0]);
    },
    enabled: !!currentEvent,
  });
  return (
    <>
      <div className="w-full space-y-6!">
        <h1 className="text-2xl lg:text-5xl text-center">Find Your Bus Ride</h1>
        <h3 className=" px-2! text-sm lg:text-2xl text-center">
          Choose your event and see available pickup points near you.
        </h3>
        <div className="px-4! lg:w-1/3 grid grid-cols-2 gap-6 mx-auto!">
          <Select
            onValueChange={(e) => {
              setCurrentEvent(e);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={"Event"}></SelectValue>
            </SelectTrigger>
            {!isPending && (
              <SelectContent>
                {data.data.map((x: idk) => (
                  <SelectItem key={x._id} value={JSON.stringify(x.transports)}>
                    {x.title}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
          <Select
            onValueChange={(e) => {
              setCategory(e);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Transport Option"></SelectValue>
            </SelectTrigger>
            {!catPending && (
              <SelectContent>
                {cat.data.map((x: idk) => (
                  <SelectItem value={x._id} key={x._id}>
                    {x.name}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
        </div>
        {/* {currentEvent} */}
      </div>
      {/* {!transportLoading && (
        <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
          <code className="whitespace-pre-wrap">
            {JSON.stringify(transport, null, 2)}
          </code>
        </pre>
      )} */}
      {!transportLoading ? (
        <MapBase className="h-[60dvh] mt-12">
          {transport?.data && (
            <Direction
              pick={{
                lat: transport.data.pickUpPoint.lat,
                lng: transport.data.pickUpPoint.lng,
              }}
              drop={{
                lat: transport.data.dropOffPoint.lat,
                lng: transport.data.dropOffPoint.lng,
              }}
            />
          )}
        </MapBase>
      ) : (
        <MapBase className="h-[60dvh] mt-12"></MapBase>
      )}
    </>
  );
}
