import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { getAlliesApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import Link from "next/link";
export default async function AllAllies() {
  const call: idk = await getAlliesApi({ page: 1 });

  return call.data.result.map(
    (x: { _id: string; name: string; location: string; type: string }) => (
      <Card key={x._id}>
        <CardContent className="flex flex-col items-center gap-4">
          <Badge className="mx-auto bg-green-500/60">{x.type}</Badge>
          {/* <Avatar className="size-24 border-3 border-primary">
            <AvatarImage src={`https://avatar.iran.liara.run/public/0`} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar> */}
          <div className="flex flex-col justify-between items-center">
            <h3 className="text-xl text-center w-full">{x.name}</h3>
            <p className="text-muted-foreground text-center">{x.location}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button className="text-foreground" asChild>
            <Link href={`/`}>
              <ExternalLinkIcon />
              Visit website
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  );
}
