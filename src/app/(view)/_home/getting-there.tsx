import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

export default function GettingThere() {
  const slideResouce = [
    { id: 1, image: "/image/ev1.png", alt: "Social Autumn Fest" },
    {
      id: 2,
      image: "/image/ev2.png",
      alt: "AWS Community day BD",
    },

    {
      id: 3,
      image: "/image/eve3.jpeg",
      alt: "Uthso Shondha",
    },
    { id: 4, image: "/image/ev1.png", alt: "Social Autumn Fest" },
    {
      id: 5,
      image: "/image/ev2.png",
      alt: "AWS Community day BD",
    },
    {
      id: 6,
      image: "/image/eve3.jpeg",
      alt: "Uthso Shondha",
    },
  ];
  return (
    <>
      <h1 className="text-4xl text-center mt-12!">Getting there is simple</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6!">
        {slideResouce.slice(0, 4).map((x, i) => (
          <Card
            className="p-3! overflow-hidden border-0 aspect-square flex flex-col justify-between items-start"
            key={x.id}
          >
            <CardContent
              className="flex rounded-md items-center flex-1 w-full justify-center bg-zinc-800 bg-blend-luminosity overflow-hidden bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url('${x.image}')` }}
            ></CardContent>
            <CardFooter className="flex flex-col w-full p-0!">
              <h3 className="text-lg text-center text-primary font-semibold">
                {x.alt}
              </h3>
              <p>Select the event you&apos;re attending.</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
