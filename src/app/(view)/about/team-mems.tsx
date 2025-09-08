import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import { getTeamMembersApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import { imgCreator } from "@/lib/func/functions";
export default async function TeamMems() {
  const token = (await cookies()).get("token")?.value;
  const call: idk = await getTeamMembersApi({ status: "" }, token ?? "");

  return call.data.map(
    (x: { _id: string; image: string | null; name: string; role: string }) => (
      <Card key={x._id}>
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage
              src={
                (x.image && imgCreator(x.image)) ??
                `https://avatar.iran.liara.run/public`
              }
            />

            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between items-start">
            <h3 className="text-xl">{x.name}</h3>
            <p className="text-muted-foreground">{x.role}</p>
          </div>
        </CardContent>
      </Card>
    )
  );
}
