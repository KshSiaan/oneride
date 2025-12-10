"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HeroCarousel({
  slides,
}: {
  slides: {
    id: number;
    image: string;
    alt: string;
    date:string;
  }[];
}) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  const plugin = Autoplay({ delay: 4000, stopOnInteraction: false });

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      {/* Carousel */}
      <Carousel
        setApi={setApi}
        plugins={[plugin]}
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.slice(1).map((slide, i) => (
            <CarouselItem key={i} className="lg:basis-1/2 !ml-4">
              <Card className="!p-0 overflow-hidden rounded-none border-0">
                <CardContent
                  className="flex h-[80dvh] items-center justify-center bg-zinc-800 bg-blend-luminosity !p-0 overflow-hidden bg-center bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                >
                  <div className="h-full w-full flex flex-col justify-end items-start space-y-6! p-6! font-serif">
                    <h3 className="text-xl lg:text-3xl">Way To</h3>
                    <h2 className="text-3xl lg:text-5xl">{slide.alt}</h2>
                    <h3 className="text-xl lg:text-3xl">Dhaka,Bangladesh</h3>
                    <p className="text-base text-primary">
                      {/* January 21, 2025 · 7:30 AM */}
                      {slide.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Left Blur */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-background/80 to-transparent lg:backdrop-blur-sm z-10" />

      {/* Right Blur */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-background/80 to-transparent lg:backdrop-blur-sm z-10" />

      {/* Dots */}
      <div className="flex justify-center items-center !mt-4 gap-2">
        <Button
          className="bg-foreground rounded-full p-0! size-6! text-primary hover:bg-zinc-300"
          size="icon"
          onClick={() => api?.scrollTo(current - 1)}
        >
          <ArrowLeft />
        </Button>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`size-3 rounded-full transition-all ${
              current === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <Button
          className="bg-foreground rounded-full p-0! size-6! text-primary hover:bg-zinc-300"
          size="icon"
          onClick={() => api?.scrollTo(current + 1)}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
