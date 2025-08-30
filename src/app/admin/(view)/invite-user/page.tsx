"use client";
import { Card, CardContent } from "@/components/ui/card";
import CharterForm from "./charter-form";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getInvitationsApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { idk } from "@/lib/utils";

export default function Page() {
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["invites"],
    queryFn: (): idk => {
      return getInvitationsApi(undefined, cookies.token);
    },
  });
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

          {isPending ? (
            <div className="space-y-6 mt-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            data.data.slice(0, 3).map((x: idk) => (
              <div
                className="w-full flex justify-between items-center my-6!"
                key={x._id}
              >
                <div className="">
                  <h5>{x.fullName}</h5>
                  <p>{x.email}</p>
                </div>
                <div className="">
                  <Badge className="bg-green-500">{x.role}</Badge>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
