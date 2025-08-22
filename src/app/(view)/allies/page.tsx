import React, { Suspense } from "react";
import AllAllies from "./all-allies";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <>
      <header
        className="h-[80dvh] w-full bg-cover bg-center font-serif"
        style={{ backgroundImage: `url('/image/about.jpg')` }}
      >
        <div className="h-full w-full flex justify-center items-center backdrop-blur-xs backdrop-brightness-50">
          <div className="lg:w-1/2 flex flex-col justify-around items-center gap-6 text-center">
            <h1 className="text-xl lg:text-3xl font-semibold">
              Meet Our Allies
            </h1>
            <h1 className="text-4xl lg:text-7xl font-semibold">
              Partnerships & Vibes
            </h1>
            <h3 className="text-base px-4! lg:text-lg">
              Discover the local pubs and venues partnering with us to bring
              better rides and pre-event vibes.
            </h3>
          </div>
        </div>
      </header>
      <main className="my-12! px-4! lg:px-[7%]! font-serif">
        <h2 className=" text-center text-4xl">Our core team member</h2>

        <div className="my-12! grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Suspense
            fallback={Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={`skeleton-${i}`} className="w-full aspect-video" />
            ))}
          >
            <AllAllies />
          </Suspense>
        </div>
        <div className="">
          <h2 className="text-center mt-12! text-lg md:text-2xl lg:text-4xl">
            Are you a local venue? Become our ally and grow with us.
          </h2>
          <div className="py-12! flex justify-center items-center">
            <Button className="text-foreground rounded" size="lg">
              Apply to join
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
