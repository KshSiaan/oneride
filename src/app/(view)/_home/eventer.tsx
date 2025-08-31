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
import { getCategoriesApi, getEventById, getEventsApi } from "@/lib/api/core";
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
  const { data: event, isPending: eventLoading } = useQuery({
    queryKey: ["event", currentEvent],
    queryFn: (): idk => {
      return getEventById(currentEvent!, true);
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
                  <SelectItem key={x._id} value={x._id}>
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
      </div>
      {!eventLoading ? (
        <>
          <MapBase className="h-[60dvh] mt-12">
            {event.data.transports.map(
              (x: {
                _id: string;
                type: "busRoute" | "parkAndRide" | "pubPickup" | undefined;
                pickUpPoint: {
                  name: string;
                  lat: number;
                  lng: number;
                  _id: string;
                };
                dropOffPoint: {
                  name: string;
                  lat: number;
                  lng: number;
                  _id: string;
                };
              }) => (
                <Direction
                  key={x._id}
                  pick={{
                    lat: x.pickUpPoint.lat,
                    lng: x.pickUpPoint.lng,
                  }}
                  drop={{
                    lat: x.dropOffPoint.lat,
                    lng: x.dropOffPoint.lng,
                  }}
                  type={x.type}
                />
              )
            )}
          </MapBase>
        </>
      ) : (
        <MapBase className="h-[60dvh] mt-12"></MapBase>
      )}
    </>
  );
}
