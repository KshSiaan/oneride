import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

export default function GettingThere() {
  return (
    <>
      <h1 className="text-4xl text-center mt-12!">Getting there is simple</h1>
      <div className="grid grid-cols-4 gap-6 px-6!">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            className="p-3! overflow-hidden border-0 aspect-square flex flex-col justify-between items-start"
            key={i}
          >
            <CardContent
              className="flex rounded-md items-center flex-1 w-full justify-center bg-zinc-800 bg-blend-luminosity overflow-hidden bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url('/image/slide1.png')` }}
            ></CardContent>
            <CardFooter className="flex flex-col w-full p-0!">
              <h3 className="text-lg text-center text-primary font-semibold">
                Choose Your Event
              </h3>
              <p>Select the event you&apos;re attending.</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
