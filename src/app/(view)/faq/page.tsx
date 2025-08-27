import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import FAQ from "./faq";

export default function Page() {
  return (
    <main className="pb-12">
      <h1 className="text-6xl text-center py-12">FAQ</h1>
      <div className="w-4/5 mx-auto">
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <FAQ />
        </Suspense>
      </div>
    </main>
  );
}
