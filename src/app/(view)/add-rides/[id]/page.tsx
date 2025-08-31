import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Ride from "./ride";
import { Loader2Icon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const param = await params;
  const id = param.id;

  if (!id) {
    return notFound();
  }

  return (
    <main className="font-serif px-4! lg:px-[7%]! my-12!">
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Ride id={id} />
      </Suspense>
    </main>
  );
}
