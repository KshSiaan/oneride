import React, { Suspense } from "react";
import Guest from "./guest";
import { Loader2Icon } from "lucide-react";
import { cookies } from "next/headers";
import User from "./user";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const id = (await searchParams).id;
  if (!id) {
    return notFound();
  }
  const token = (await cookies()).get("token")?.value;

  return (
    <main className="px-4! lg:px-[7%]! my-12! font-serif h-[200dvh] md:h-[150dvh] lg:h-auto">
      {token ? (
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <User id={id} />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <Guest id={id} />
        </Suspense>
      )}
    </main>
  );
}
