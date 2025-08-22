import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { BusFrontIcon, HeadphonesIcon, MapIcon, RouteIcon } from "lucide-react";
import React from "react";
import ChartForm from "./chart-form";
import Questions from "./questions";

export default function Page() {
  return (
    <>
      <header
        className="h-[80dvh] w-full bg-cover bg-center font-serif"
        style={{ backgroundImage: `url('/image/partner.jpg')` }}
      >
        <div className="h-full w-full flex justify-center items-center backdrop-blur-xs backdrop-brightness-50">
          <div className="px-4! lg:w-1/2 flex flex-col justify-around items-center gap-12 text-center">
            <h1 className="text-2xl lg:text-4xl font-semibold">
              Ride to Your Next Adventure
            </h1>
            <h3 className="text-lg">
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
          <h1 className="text-2xl lg:text-4xl font-semibold">Perfect For</h1>
          <h3 className="text-sm lg:text-lg">
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
        <section className="!py-16 !px-4 md:!py-24">
          <div className="w-full mx-auto!">
            {/* Header */}
            <div className="text-center mb-16!">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4!">
                How It Works
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto!">
                Our simple 3-step process makes partnering with KiwiRide
                effortless and efficient.
              </p>
            </div>

            {/* Steps */}
            <div className="relative">
              {/* Connection Line - Hidden on mobile, visible on larger screens */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-600">
                <div className="absolute inset-0 bg-zinc-500 h-full"></div>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                {steps.map((step, index) => (
                  <div key={step.number} className="text-center relative">
                    {/* Step Number Circle */}
                    <div className="relative mb-6!">
                      <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto! relative z-10">
                        {step.number}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-4!">
                      <h3 className="text-xl md:text-2xl font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm mx-auto!">
                        {step.description}
                      </p>
                    </div>

                    {/* Mobile Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="md:hidden w-0.5 h-8 bg-pink-500 mx-auto! mt-8!"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div
          className="relative w-full mb-12! space-y-6! mt-24!"
          id="create-charter"
        >
          <h1 className="text-4xl font-semibold">Ready to Charter Your Bus?</h1>
          <h3 className="text-lg">
            Fill out the form below and we&apos;ll get back to you with a quote
            within 24 hours.
          </h3>
        </div>
        <Card>
          <CardContent className="">
            <ChartForm />
          </CardContent>
        </Card>
        <Questions />
      </main>
    </>
  );
}
const steps = [
  {
    number: 1,
    title: "Submit Event Details",
    description:
      "Share your event information, attendee numbers, locations, and transportation needs with our team.",
  },
  {
    number: 2,
    title: "Plan Logistics",
    description:
      "We'll work with you to create a customized transportation plan that fits your event perfectly.",
  },
  {
    number: 3,
    title: "Launch with Confidence",
    description:
      "Execute your event knowing your transportation needs are professionally managed.",
  },
];
const charterCards = [
  {
    icon: BusFrontIcon,
    title: "Effortless Group Transport",
    desc: "Our platform simplifies group transportation with easy booking, management, and coordination for events of all sizes.",
  },
  {
    icon: HeadphonesIcon,
    title: "Professional Support",
    desc: "Our dedicated team is available 24/7 to handle any transportation issues during your event.",
  },
  {
    icon: RouteIcon,
    title: "Custom Routing",
    desc: "We create optimized routes tailored to your event locations, attendee distribution, and schedule requirements .",
  },
  {
    icon: MapIcon,
    title: "Real-Time Tracking",
    desc: "Provide your attendees with live bus tracking so they always know when their ride will arrive.",
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
