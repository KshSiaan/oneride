import { Card, CardContent } from "@/components/ui/card";
import CharterForm from "./charter-form";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Add Charter Request</h1>
          <p>Manually enter a new private charter request from a client</p>
        </div>
      </div>
      <div className="bg-card w-1/2 mx-auto! rounded-md mt-6!">
        <CharterForm />
      </div>
      <Card className=" w-1/2 mx-auto! rounded-md mt-6!">
        <CardContent>
          <h3 className="w-full border-b">Recent Invites</h3>

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              className="w-full flex justify-between items-center my-6!"
              key={i}
            >
              <div className="">
                <h5>Sarah Jhonson</h5>
                <p>sarah@email.com</p>
              </div>
              <div className="">
                <Badge className="bg-green-500">Accepted</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
