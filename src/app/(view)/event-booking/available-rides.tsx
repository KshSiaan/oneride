import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BeerIcon, BusIcon, TreePineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const rideDatas = [
  {
    icon: BusIcon,
    triggerTitle: "Bus Routes",
    triggerDesc: "Direct bus services from various locations to the event.",
    childTitle: "Route A - Downtown to Stadium",
  },
  {
    icon: TreePineIcon,
    triggerTitle: "Park & Ride",
    triggerDesc: "Convenient parking outside the venue with shuttle service.",
    childTitle: "P&R Zone 1 - East Park",
  },
  {
    icon: BeerIcon,
    triggerTitle: "Pub Pickups",
    triggerDesc: "Buses picking up from popular pubs and bars.",
    childTitle: "P&R Zone 2 - North Gate",
  },
];

export default function AvailableRides() {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        className="bg-card rounded-md border"
        collapsible
      >
        {rideDatas.map((x, i) => (
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
              <RideCard title={x.childTitle} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

const RideCard = ({ title }: { title: string }) => {
  return (
    <div className="mt-6! grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-4! w-full">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card className="w-full" key={i}>
          <CardHeader>
            <div className="flex justify-between items-center mb-2!">
              <h3 className="w-full text-center text-lg">{title}</h3>
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
  );
};
