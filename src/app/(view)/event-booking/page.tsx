import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BusFront,
  CalendarDaysIcon,
  CircleAlertIcon,
  Clock1,
  Loader2Icon,
  MapPin,
  PercentIcon,
  ShieldCheckIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import AvailableRides from "./available-rides";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/api/core";
import { dateExtractor, imgCreator, timeExtractor } from "@/lib/func/functions";
import { idk } from "@/lib/utils";
import MapBase from "@/components/core/map";
import { Direction } from "@/components/core/direction-maker";
import EventMaquee from "../_home/event-marquee";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const storage = await searchParams;
  const id = storage.id;
  // console.log(id);
  if (!id) {
    return notFound();
  }
  const call: idk = await getEventById(id, true);
  interface Category {
    _id: string;
    name: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    __v: number;
  }
  interface EventData {
    transports?: string[]; // replace `any` with specific type if you know transport structure
    _id: string;
    title?: string;
    category?: Category;
    description?: string;
    startDate?: string; // ISO string
    endDate?: string; // ISO string
    startTime?: string; // ISO string
    endTime?: string; // ISO string
    venueName?: string;
    busRoutes?: string[]; // array of IDs
    parkAndRides?: string[]; // array of IDs
    pubPickups?: string[]; // array of IDs
    totalSeat?: number;
    ticketPrice?: number;
    image?: string;
    adminStatus: "active" | "inactive"; // example union type
    websiteStatus?: "upcoming" | "ongoing" | "completed"; // example union type
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    __v: number;
  }
  const event: EventData = call.data;
  // console.log(event);
  return (
    <>
      <header
        className="w-full h-[calc(100dvh-64px)] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            event.image
              ? imgCreator(event.image)
              : `https://placehold.co/600x400/191919/888888`
          })`,
        }}
      >
        <div className="h-full w-full backdrop-brightness-50 backdrop-grayscale flex flex-col justify-end items-start p-4! lg:p-12! gap-6">
          <Badge className="py-2! px-6! rounded-full text-foreground">
            {event.category?.name ?? "N/A"}
          </Badge>
          <h1 className="text-shadow-md text-shadow-foreground text-3xl lg:text-6xl relative">
            {event.title ?? "N/A"}
            <div className="absolute -bottom-3 h-1 bg-primary w-[40%]"></div>
          </h1>
          <div className="flex items-center mt-6!">
            <CalendarDaysIcon className="mr-2! text-primary" />{" "}
            {event.startDate ? dateExtractor(event.startDate) : "N/A"}
          </div>
          <div className="flex items-center mt-3!">
            <Clock1 className="mr-2! text-primary" />{" "}
            {event.startTime ? timeExtractor(event.startTime) : "N/A"}
          </div>
          <div className="flex items-center mt-3!">
            <MapPin className="mr-2! text-primary" /> {event.venueName ?? "N/A"}
          </div>
        </div>
      </header>
      <main className="w-full flex flex-col justify-center items-center mb-12! space-y-6! font-serif px-4! lg:px-[7%]!">
        <Card className="w-full">
          <CardContent className="flex flex-row justify-center items-center gap-4">
            <Button
              variant="link"
              className="text-foreground text-base!"
              asChild
            >
              <Link href="#about" scroll>
                About
              </Link>
            </Button>
            <Button
              variant="link"
              className="text-foreground text-base!"
              asChild
            >
              <Link href="#availables"> Available rides</Link>
            </Button>
            <Button variant="link" className="text-base!">
              Start
            </Button>
          </CardContent>
        </Card>
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <MapBase className="h-[60dvh]! w-full mt-12">
            {call.data.transports.map(
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
                  id={x._id}
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
        </Suspense>
        <section className="w-full grid lg:grid-cols-8 gap-6" id="about">
          <Card className="lg:col-span-5">
            <CardContent>
              <h2 className="text-2xl font-semibold relative w-fit">
                About The Event
                <div className="absolute w-[40%] h-1 -bottom-1 -left-3 bg-primary"></div>
              </h2>
              <p className="leading-relaxed mt-6!">
                {event.description ?? "N/A"}
              </p>
            </CardContent>
          </Card>
          <div className="lg:col-span-3 space-y-6!">
            <Card className="w-full">
              <CardContent className="space-y-12!">
                <div className="flex flex-row justify-start items-center gap-4">
                  <div className="size-12 bg-secondary rounded-full flex justify-center items-center text-primary">
                    <User2Icon />
                  </div>
                  <div className="flex flex-col justify-between items-start">
                    <h3 className="text-xl">Artist</h3>
                    <p className="text-muted-foreground text-sm">N/A</p>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-4">
                  <div className="size-12 bg-secondary rounded-full flex justify-center items-center text-primary">
                    <MapPin />
                  </div>
                  <div className="flex flex-col justify-between items-start">
                    <h3 className="text-xl">Venue</h3>
                    <p className="text-muted-foreground text-sm">
                      {event.venueName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-4">
                  <div className="size-12 bg-secondary rounded-full flex justify-center items-center text-primary">
                    <CircleAlertIcon />
                  </div>
                  <div className="flex flex-col justify-between items-start">
                    <h3 className="text-xl">Event Duration</h3>
                    <p className="text-muted-foreground text-sm">
                      Approximately N/A hours <br /> (including intermission)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex justify-start items-center gap-4">
                  <div className="size-12 bg-secondary rounded-full flex justify-center items-center text-primary">
                    <ShieldCheckIcon />
                  </div>
                  <span className="text-lg">Safety Tips</span>
                </div>
                <ul className="pl-4! mt-4! space-y-2! lg:pl-16! list-disc list-inside leading-relaxed text-sm lg:text-base">
                  <li>
                    Arrive at your pickup location at least 10 minutes early
                  </li>
                  <li>
                    Have your booking confirmation ready to show the driver
                  </li>
                  <li>Wear your seatbelt at all times during the ride</li>
                  <li>
                    Respect other passengers and keep noise levels reasonable
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-12! w-full" id="availables">
          <h2 className="flex items-center text-3xl">
            <BusFront className="text-primary mr-2! size-8" /> Available Rides
          </h2>
        </section>
        <AvailableRides data={call.data} id={id} />
        <Card className="w-full">
          <CardContent className=" flex flex-row justify-start items-center gap-4">
            <div className="size-12! aspect-square bg-primary rounded-full flex justify-center items-center text-secondary">
              <PercentIcon />
            </div>
            <div className="flex flex-col justify-between items-start">
              <h3 className="lg:text-xl">Group Discount Available</h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Book 4 or more seats together and get 10% off your total
                booking! Perfect for groups of friends or family attending the
                event together.
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6! mt-24!">
          <h2 className="text-3xl font-semibold text-center">
            Upcoming Events
          </h2>
          <h4 className="text-xl text-center">
            Find your ride to the next big thing
          </h4>
          <EventMaquee />
        </div>
      </main>
    </>
  );
}
