import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { CalendarDaysIcon, MapIcon, SofaIcon, User2Icon } from "lucide-react";
import React from "react";
import ChartForm from "./chart-form";

export default function Page() {
  return (
    <>
      <header
        className="h-[80dvh] w-full bg-cover bg-center font-serif"
        style={{ backgroundImage: `url('/image/bus-header.jpg')` }}
      >
        <div className="h-full w-full flex justify-center items-center backdrop-blur-xs backdrop-brightness-50">
          <div className="px-4! lg:w-1/2 flex flex-col justify-around items-center gap-12 text-center">
            <h1 className="text-xl lg:text-4xl font-semibold">
              Ride to Your Next Adventure
            </h1>
            <h3 className="text-sm lg:text-lg">
              Book comfortable, affordable transport to major events across New
              Zealand. No parking hassles, just good times.
            </h3>
            <div className="w-full flex justify-center items-center">
              <Button
                className="lg:py-8! lg:px-12! rounded lg:text-xl text-foreground"
                asChild
              >
                <a href="#create-charter">Get a Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="my-12! px-4! lg:px-[7%]! font-serif text-center">
        <div className="relative w-full mb-12! space-y-6!">
          <h1 className="text-2xl lg:text-4xl font-semibold">
            Why Charter With Us
          </h1>
          <h3 className="text-sm lg:text-lg">
            We provide premium bus charter services with a focus on comfort,
            safety, and reliability.
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {charterCards.map((x, i) => (
            <Card key={i} className="rounded-none">
              <CardContent className="flex flex-col justify-center items-center gap-6 aspect-square">
                <x.icon className="text-primary size-12" />
                <h3 className="text-2xl">{x.title}</h3>
                <p>{x.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="relative w-full mb-12! space-y-6! mt-24!">
          <h1 className="text-4xl font-semibold">Perfect For</h1>
          <h3 className="text-lg">
            Our bus charter services are ideal for all kinds of group
            transportation needs.
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tripData.map((x) => (
            <Card
              className="p-3! overflow-hidden border-0 aspect-square flex flex-col justify-between items-start"
              key={x.title}
            >
              <CardContent
                className="flex rounded-md items-center flex-1 w-full justify-center bg-zinc-800 overflow-hidden bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url('${x.image}')` }}
              ></CardContent>
              <CardFooter className="flex flex-col w-full p-0! justify-start items-start gap-2">
                <h3 className="text-lg font-semibold">{x.title}</h3>
                <CardDescription className="w-full text-start">
                  {x.description}
                </CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div
          className="relative w-full mb-12! space-y-6! mt-24!"
          id="create-charter"
        >
          <h1 className="text-2xl lg:text-4xl font-semibold">
            Ready to Charter Your Bus?
          </h1>
          <h3 className="text-sm lg:text-lg">
            Fill out the form below and we&apos;ll get back to you with a quote
            within 24 hours.
          </h3>
        </div>
        <Card>
          <CardContent>
            <ChartForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}

const charterCards = [
  {
    icon: CalendarDaysIcon,
    title: "Flexible Scheduling",
    desc: "Book for any date and time that works for your group. We're available 24/7.",
  },
  {
    icon: SofaIcon,
    title: "Comfortable Rides",
    desc: "Modern buses with air conditioning, reclining seats, and ample legroom..",
  },
  {
    icon: User2Icon,
    title: "Experienced Drivers",
    desc: "Professional drivers with extensive knowledge of New Zealand roads.",
  },
  {
    icon: MapIcon,
    title: "Anywhere in NZ",
    desc: "We operate nationwide, from Auckland to Queenstown and everywhere between.",
  },
];

const tripData = [
  {
    title: "Group Concert Trips",
    description:
      "Arrive together and enjoy the event without worrying about parking or designated drivers.",
    image: "/image/charter/charter (1).jpg",
  },
  {
    title: "Weddings",
    description:
      "Transport your wedding party and guests in style and comfort.",
    image: "/image/charter/charter (2).jpg",
  },
  {
    title: "Corporate Events",
    description:
      "Transport your team to conferences, retreats, or company outings.",
    image: "/image/charter/charter (3).jpg",
  },
  {
    title: "School Trips",
    description:
      "Safe and reliable transportation for students and chaperones.",
    image: "/image/charter/charter (4).jpg",
  },
  {
    title: "Sports Teams",
    description: "Get your team to the game together and travel in comfort.",
    image: "/image/charter/charter (5).jpg",
  },
  {
    title: "Tours",
    description:
      "Explore New Zealand’s beautiful landscapes with our comfortable coaches.",
    image: "/image/charter/charter (6).jpg",
  },
];
