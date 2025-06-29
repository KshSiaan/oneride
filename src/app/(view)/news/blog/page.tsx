import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main className="py-12! px-4! lg:px-[7%]! space-y-6! font-serif">
      <h1 className="text-2xl lg:text-4xl">
        Exploring New Routes: Your Next Adventure Awaits
      </h1>
      <h2 className="text-xl lg:text-2xl text-muted-foreground">
        Author: Liam Bentley
      </h2>
      <h4 className="text-lg lg:text-xl text-muted-foreground">
        Published on: July 1, 2024
      </h4>
      <p className="text-sm md:text-base lg:text-lg">
        Welcome to an exciting new chapter in your travel adventures! We are
        thrilled to announce the expansion of our bus network with several new
        routes designed to connect you to more destinations than ever before.
        Whether you&apos;re a daily commuter or an intrepid explorer, these new
        routes offer unparalleled convenience and access to a wider array of
        attractions.
      </p>
      <Image
        src="/image/blog.jpg"
        height={600}
        width={900}
        alt="w-full object-cover"
      />
      <h4 className="text-2xl lg:text-4xl">Discover Hidden Gems</h4>
      <p className="text-sm md:text-base lg:text-lg">
        Our new routes aren&apos;t just about reaching your destination;
        they&apos;re about the journey itself. We&apos;ve meticulously planned
        these paths to take you through picturesque towns, vibrant communities,
        and stunning natural landscapes. Imagine gazing out the window at
        rolling hills, serene lakes, or charming Main Streets as you comfortably
        travel to your next adventure. Each stop along these new routes has been
        selected to offer something unique. From local eateries serving
        authentic cuisine to historical landmarks and recreational parks,
        there&apos;s always something new to discover. We encourage you to hop
        off and explore, then hop back on when you&apos;re ready for the next
        leg of your journey.
      </p>

      <h4 className="text-2xl lg:text-4xl">Seamless Connectivity</h4>
      <p className="text-sm md:text-base lg:text-lg">
        Our new routes aren&apos;t just about reaching your destination;
        they&apos;re about the journey itself. We&apos;ve meticulously planned
        these paths to take you through picturesque towns, vibrant communities,
        and stunning natural landscapes. Imagine gazing out the window at
        rolling hills, serene lakes, or charming Main Streets as you comfortably
        travel to your next adventure. Each stop along these new routes has been
        selected to offer something unique. From local eateries serving
        authentic cuisine to historical landmarks and recreational parks,
        there&apos;s always something new to discover. We encourage you to hop
        off and explore, then hop back on when you&apos;re ready for the next
        leg of your journey.
      </p>
      <div className="h-[100px]"></div>
    </main>
  );
}
