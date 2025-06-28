import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="w-full flex flex-col justify-center items-center my-12! space-y-6! font-serif">
      <Image
        src="/icon/bus.svg"
        height={1000}
        width={1000}
        alt="bus-icon"
        className="h-[20dvh] md:h-[30dvh] lg:h-[50dvh] aspect-square"
      />
      <p className="text-lg lg:text-3xl text-center">
        Zero risk booking means you can relax! <br /> Free cancelations until 7
        days prior <br /> Only pay when the trip is confirmed.
      </p>
      <p className="text-lg lg:text-xl mt-12!">
        Log in with your{" "}
        <Link href="/auth" className="text-primary hover:underline">
          ONERIDE
        </Link>{" "}
        account{" "}
      </p>
      <div className="w-full flex justify-center mt-12!">
        <Button
          className="lg:w-1/2 text-lg text-foreground py-6! flex justify-between items-center rounded-lg"
          asChild
        >
          <Link href="/add-rides/details">
            <span>Continue As Guest</span>
            <span className="size-6 text-primary rounded-full bg-foreground flex flex-row justify-center items-center">
              <ChevronRightIcon />
            </span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
