import React, { Suspense } from "react";
import Profile from "./profile";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Personal Information</h1>
          <p>Admin can edit personal information</p>
        </div>
      </div>
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Profile />
      </Suspense>
    </section>
  );
}
