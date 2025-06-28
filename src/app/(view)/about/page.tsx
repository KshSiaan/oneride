import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import React from "react";

export default function Page() {
  return (
    <>
      <header
        className="h-[80dvh] w-full bg-cover bg-center font-serif"
        style={{ backgroundImage: `url('/image/about.jpg')` }}
      >
        <div className="h-full w-full flex justify-center items-center backdrop-blur-xs backdrop-brightness-50">
          <div className="lg:w-1/2 flex flex-col justify-around items-center gap-12 text-center">
            <h1 className="text-3xl lg:text-6xl font-semibold">Who we are</h1>
            <h3 className="text-sm px-4! lg:text-lg">
              We are an event transportation platform focused on connecting
              people to their favorite events with ease. Whether it’s a concert,
              sports game, or special gathering, we make getting there simple
              and stress-free. With reliable bus rides, flexible options, and a
              focus on comfort and convenience, we&apos;re here to help you
              enjoy the journey as much as the destination.
            </h3>
          </div>
        </div>
      </header>
      <main className="my-12! px-4! lg:px-[7%]! font-serif">
        <h2 className=" text-center text-4xl">Our core team member</h2>

        <div className="my-12! grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/public/${i}`}
                  />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between items-start">
                  <h3 className="text-xl">Nancy Drew</h3>
                  <p className="text-muted-foreground">
                    Chief Executive Officer
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <h2 className="text-4xl text-center mt-24!">Why People Trust Us</h2>
        <div className="my-12! grid md:grid-cols-3 gap-6">
          {trust.map((x, i) => (
            <Card key={i}>
              <CardContent className="">
                <h3 className="text-2xl text-primary">{x.title}</h3>
                <ul className="list-disc list-inside leading-relaxed space-y-2! mt-6!">
                  {x.features.map((y, i) => (
                    <li className="pl-6!" key={i}>
                      {y}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <h2 className="text-xl lg:text-4xl text-center mt-24!">
            Why People Trust Us
          </h2>
          <p className="text-sm lg:text-xl text-center">
            Experience stress-free event transportation today.
          </p>
          <Button className="rounded py-6! px-12! text-sm lg:text-lg mx-auto! text-foreground">
            Book you first seat
          </Button>
        </div>
      </main>
    </>
  );
}
const trust = [
  {
    title: "Reliable Service",
    features: [
      "Consistent pick-up locations",
      "On-time arrivals guaranteed",
      "Real-time tracking available",
    ],
  },
  {
    title: "Easy Booking",
    features: [
      "Simple online reservation",
      "Group booking options",
      "Instant confirmation",
    ],
  },
  {
    title: "Friendly Support",
    features: [
      "24/7 customer service",
      "NZ-based support team",
      "Quick response times",
    ],
  },
];
