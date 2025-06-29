import HeroCarousel from "@/components/core/hero-carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GettingThere from "./_home/getting-there";
import Questions from "./_home/questions";
import { Marquee } from "@/components/magicui/marquee";
import EventCard from "@/components/core/event-card";

export default function Home() {
  const slideResouce = [
    { id: 1, image: "/image/slide2.jpg", alt: "Stuff" },
    {
      id: 2,
      image: "/image/slide1.png",
      alt: "Eminem",
    },

    {
      id: 3,
      image: "/image/slide3.png",
      alt: "Eminems",
    },
    {
      id: 4,
      image: "/image/slide1.png",
      alt: "Eminems",
    },
    {
      id: 5,
      image: "/image/slide1.png",
      alt: "Eminems",
    },
    {
      id: 6,
      image: "/image/slide2.jpg",
      alt: "Eminems",
    },
  ];

  return (
    <>
      <header>
        <HeroCarousel slides={slideResouce} />
      </header>
      <main className="py-12! font-serif">
        <div className="w-full space-y-6!">
          <h1 className="text-2xl lg:text-5xl text-center">
            Find Your Bus Ride
          </h1>
          <h3 className=" px-2! text-sm lg:text-2xl text-center">
            Choose your event and see available pickup points near you.
          </h3>
          <div className="px-4! lg:w-1/3 grid grid-cols-2 gap-6 mx-auto!">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Event"}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SelectItem key={i} value="eminem">
                    Eminem concert
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Transport Option"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eminem">All</SelectItem>
                <SelectItem value="eminem">Park and Ride</SelectItem>
                <SelectItem value="eminem">Pubs / Bars</SelectItem>
                <SelectItem value="eminem">Special Express Routes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <iframe
          width="1200"
          height="650"
          loading="lazy"
          className="border-0 w-full mx-auto! block mt-12! h-[40dvh] md:h-[60dvh] lg:h-[80dvh] col-span-2 grayscale brightness-[70%]"
          src="https://www.google.com/maps/embed/v1/search?q=Christchurch&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        ></iframe>
        <div className="space-y-6! mt-12!">
          <h1 className="text-2xl lg:text-4xl text-center">Upcoming Events</h1>
          <h3 className="text-sm lg:text-2xl text-center">
            Find your ride to the next big thing
          </h3>
          <Marquee pauseOnHover className="[--duration:20s]">
            <div className="grid grid-cols-3 gap-6 px-6!">
              {Array.from({ length: 3 }).map((_, i) => (
                <EventCard key={i} />
              ))}
            </div>
          </Marquee>
          <GettingThere />
          <Questions />
        </div>
      </main>
    </>
  );
}
