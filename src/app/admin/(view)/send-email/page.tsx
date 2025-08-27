import { Card, CardContent } from "@/components/ui/card";
import Directory from "./user-directory";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Add Charter Request</h1>
          <p>Manually enter a new private charter request from a client</p>
        </div>
      </div>
      <Card className=" rounded-md mt-6!">
        <CardContent>
          <Suspense
            fallback={
              <div className={`flex justify-center items-center h-24 mx-auto`}>
                <Loader2Icon className={`animate-spin`} />
              </div>
            }
          >
            <Directory />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}
