import HeroCarousel from "@/components/core/hero-carousel";
import GettingThere from "./_home/getting-there";
import Questions from "./_home/questions";
import EventMaquee from "./_home/event-marquee";
import Eventer from "./_home/eventer";

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
        <Eventer />
        <div className="space-y-6! mt-12!">
          <h1 className="text-2xl lg:text-4xl text-center">Upcoming Events</h1>
          <h3 className="text-sm lg:text-2xl text-center">
            Find your ride to the next big thing
          </h3>
          <EventMaquee />
          <GettingThere />
          <Questions />
        </div>
      </main>
    </>
  );
}
