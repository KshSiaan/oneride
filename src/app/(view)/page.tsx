import HeroCarousel from "@/components/core/hero-carousel";
import GettingThere from "./_home/getting-there";
import Questions from "./_home/questions";
import EventMaquee from "./_home/event-marquee";
import Eventer from "./_home/eventer";

export default function Home() {
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
