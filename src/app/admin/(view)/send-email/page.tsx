import { Card, CardContent } from "@/components/ui/card";
import Directory from "./user-directory";

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
          <Directory />
        </CardContent>
      </Card>
    </section>
  );
}
