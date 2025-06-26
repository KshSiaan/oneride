import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function EventCard() {
  return (
    <Link href={"/event-booking"}>
      <Card className="!p-0 overflow-hidden rounded-none border-0 hover:text-primary! transition-colors">
        <CardContent
          className="flex h-[80dvh] items-center justify-center bg-zinc-800 bg-blend-luminosity !p-0 overflow-hidden bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('/image/slide1.png')` }}
        >
          <div className="h-full w-full backdrop-brightness-50 flex flex-col justify-end items-start space-y-6! p-6! font-serif">
            <h3 className="text-3xl">Way To</h3>
            <h2 className="text-5xl">Eminem Live in Concert </h2>
            <h3 className="text-3xl">Auckland Stadium</h3>
            <p className="text-xl text-primary">June 21, 2025 · 7:30 PM</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
