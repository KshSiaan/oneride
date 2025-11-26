"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BeerIcon, BusIcon, TreePineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { idk } from "@/lib/utils";
import { timeExtractor } from "@/lib/func/functions";
import { useRouter } from "next/navigation";

export default function AvailableRides({
  id,
  data,
}: {
  id: string;
  data: idk;
}) {
  function divider(x: idk[]) {
    const BR = [];
    const PR = [];
    const PP = [];

    for (let i = 0; i < x.length; i++) {
      switch (x[i].type) {
        case "parkAndRide":
          PR.push(x[i]);
          break;
        case "busRoute":
          BR.push(x[i]);
          break;
        case "pubPickup":
          PP.push(x[i]);
          break;
        default:
          break;
      }
    }
    return {
      parkAndRide: PR,
      busRoute: BR,
      pubPickup: PP,
    };
  }
  const rides: idk = divider(data.transports);
  const rideDatas = [
    {
      icon: BusIcon,
      triggerTitle: "Bus Routes",
      triggerDesc: "Direct bus services from various locations to the event.",
      type: "busRoute",
    },
    {
      icon: TreePineIcon,
      triggerTitle: "Park & Ride",
      triggerDesc: "Convenient parking outside the venue with shuttle service.",
      type: "parkAndRide",
    },
    {
      icon: BeerIcon,
      triggerTitle: "Pub Pickups",
      triggerDesc: "Buses picking up from popular pubs and bars.",
      type: "pubPickup",
    },
  ];
  return (
    <div className="w-full">
      <Accordion
        type="single"
        className="bg-card rounded-md border"
        collapsible
      >
        {rideDatas.map((x: idk, i) => {
          const rideList = rides[x.type] || [];
          return (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className="py-5!">
                <CardContent className="flex flex-row justify-start items-center gap-4">
                  <div className="size-12! aspect-square bg-primary rounded-full flex justify-center items-center text-secondary">
                    <x.icon />
                  </div>
                  <div className="flex flex-col justify-between items-start">
                    <h3 className="lg:text-xl">{x.triggerTitle}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {x.triggerDesc}
                    </p>
                  </div>
                </CardContent>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <div className="mt-6! grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-4! w-full">
                  {rideList.length > 0 ? (
                    rideList.map((ride: idk) => (
                      <RideCard
                        eventId={id}
                        key={ride._id}
                        id={ride._id}
                        title={ride.pickUpPoint.name.split(",")[0]}
                        pickup={ride.pickUpPoint.name.split(",")[0]}
                        duration={`${parseInt(ride.duration).toFixed(0)} min`}
                        returner={timeExtractor(ride.departureTime)}
                        price={ride.price ? `${ride.price} BDT` : null}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground px-4 py-2">
                      No rides available
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

const RideCard = ({
  eventId,
  id,
  title,
  pickup,
  returner,
  duration,
  price,
}: {
  eventId: string;
  id: string;
  title?: string;
  pickup?: string;
  returner?: string;
  duration?: string;
  price?: string | null;
}) => {
  const navig = useRouter();
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2!">
          <h3 className="w-full text-center text-lg">{title}</h3>
        </div>
        <div className="border-b border-gray-700 mb-4"></div> {/* Divider */}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center text-gray-300 mb-6!">
          <div>
            <p className="text-sm font-semibold mb-1!">Pickup</p>
            <p className="text-base font-medium line-clamp-1">
              {pickup ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1!">Duration</p>
            <p className="text-base font-medium">{duration ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1!">Return</p>
            <p className="text-base font-medium">{returner ?? "N/A"}</p>
          </div>
        </div>
        <p className="text-center text-green-500 text-xl font-bold">
          {price ?? "N/A"}
        </p>
      </CardContent>
      {price && (
        <CardFooter>
          <Button
            className="w-full text-white text-lg py-6 rounded-lg shadow-xl"
            onClick={() => {
              localStorage.setItem("selectedEvent", eventId);
              navig.push(`/add-rides/${id}`);
            }}
          >
            Review & Book
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
