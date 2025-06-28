import Image from "next/image";
import React from "react";
export default function Page() {
  return (
    <main className="px-4! w-full flex flex-col justify-center items-center my-12! space-y-6! font-serif">
      <Image
        src="/icon/sorry.png"
        height={1000}
        width={1000}
        alt="sold-icon"
        className="h-[20dvh] lg:h-[50dvh] aspect-square object-contain"
      />
      <p className="text-xl text-center">
        We’re sorry — tickets are completely sold out. We wish we had more to
        share
      </p>
    </main>
  );
}
