import HeroCarousel from "@/components/core/hero-carousel";

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
    <main>
      <div className="">
        <HeroCarousel slides={slideResouce} />
      </div>
    </main>
  );
}
