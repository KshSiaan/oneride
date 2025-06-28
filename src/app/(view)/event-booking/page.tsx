import EventCard from "@/components/core/event-card";
import { Marquee } from "@/components/magicui/marquee";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BusFront,
  CalendarDaysIcon,
  CircleAlertIcon,
  Clock1,
  MapPin,
  PercentIcon,
  ShieldCheckIcon,
  User2Icon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
export default function Page() {
  return (
    <>
      <header
        className="w-full h-[calc(100dvh-64px)] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url('/image/slide1.png')` }}
      >
        <div className="h-full w-full backdrop-brightness-50 backdrop-grayscale flex flex-col justify-end items-start p-4! lg:p-12! gap-6">
          <Badge className="py-2! px-6! rounded-full text-foreground">
            CONCERT
          </Badge>
          <h1 className="text-shadow-md text-shadow-foreground text-3xl lg:text-6xl relative">
            Eminem Live in Concert
            <div className="absolute -bottom-3 h-1 bg-primary w-[40%]"></div>
          </h1>
          <div className="flex items-center mt-6!">
            <CalendarDaysIcon className="mr-2! text-primary" /> Sat, 25 Nov 2023
          </div>
          <div className="flex items-center mt-3!">
            <Clock1 className="mr-2! text-primary" /> 7:30 AM
          </div>
          <div className="flex items-center mt-3!">
            <MapPin className="mr-2! text-primary" /> Eden Park, Auckland
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
        <iframe
          width="1200"
          height="650"
          loading="lazy"
          className="border-0 w-[80dvw] mx-auto! block mb-12! h-[40dvh] lg:h-[80dvh] col-span-2 grayscale brightness-[70%]"
          src="https://www.google.com/maps/embed/v1/search?q=Murfreesboro&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        ></iframe>
        <section className="w-full grid lg:grid-cols-8 gap-6" id="about">
          <Card className="lg:col-span-5">
            <CardContent>
              <h2 className="text-2xl font-semibold relative w-fit">
                About The Event{" "}
                <div className="absolute w-[40%] h-1 -bottom-1 -left-3 bg-primary"></div>
              </h2>
              <p className="leading-relaxed mt-6!">
                Legendary rapper Eminem makes his long-awaited return to New
                Zealand for what he&apos;s announced will be his final tour.
                Experience the raw energy and lyrical mastery that made Eminem
                one of the greatest rappers of all time, performing hits from
                his entire career including &quot;Lose Yourself,&quot;
                &quot;Stan,&quot; &quot;The Real Slim Shady,&quot; and tracks
                from his latest album. <br />
                This once-in-a-lifetime event at Auckland&apos;s iconic Eden
                Park will feature special guests and a production spectacle
                unlike anything seen before in New Zealand. Don&apos;t miss your
                chance to witness hip-hop history in the making.
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
                    <p className="text-muted-foreground text-sm">
                      Eminem with Special guests
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-4">
                  <div className="size-12 bg-secondary rounded-full flex justify-center items-center text-primary">
                    <MapPin />
                  </div>
                  <div className="flex flex-col justify-between items-start">
                    <h3 className="text-xl">Venue</h3>
                    <p className="text-muted-foreground text-sm">
                      Eden Park, Reimers Ave, <br /> Kingsland, Auckland 1024
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
                      Approximately 2.5 hours <br /> (including intermission)
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
          <div className="mt-6! grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card className="w-full max-w-sm" key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2!">
                    <h3 className="">5:30 PM</h3>
                    <div className="flex items-center text-gray-400">
                      <Users2Icon className="text-primary mr-2! size-4" />
                      <span>12/15 Seats</span>
                    </div>
                  </div>
                  <div className="border-b border-gray-700 mb-4"></div>{" "}
                  {/* Divider */}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center text-gray-300 mb-6!">
                    <div>
                      <p className="text-sm font-semibold mb-1!">Pickup</p>
                      <p className="text-base font-medium">Britomart</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1!">Duration</p>
                      <p className="text-base font-medium">15 Min</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1!">Return</p>
                      <p className="text-base font-medium">11:30 PM</p>
                    </div>
                  </div>
                  <p className="text-center text-green-500 text-xl font-bold">
                    $25.99
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full text-white text-lg py-6 rounded-lg shadow-xl"
                    asChild
                  >
                    <Link href="/add-rides">Review & Book</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
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
          <Marquee pauseOnHover className="[--duration:20s]">
            <div className="grid grid-cols-3 gap-6 px-6!">
              {Array.from({ length: 3 }).map((_, i) => (
                <EventCard key={i} />
              ))}
            </div>
          </Marquee>
        </div>
      </main>
    </>
  );
}
