"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getInvitationsApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, Mail, Search, Users } from "lucide-react";
import { useCookies } from "react-cookie";

export default function Directory() {
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["invites"],
    queryFn: (): idk => {
      return getInvitationsApi({}, cookies.token);
    },
  });

  return (
    <div className="min-h-screen p-4!">
      <div className="mx-auto!">
        <Card className="shadow-sm">
          <CardHeader className="">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 " />
                <h1 className="text-xl font-semibold ">User Directory</h1>
              </div>
              <div className="flex-1 max-w-md ml-auto!">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
                  <Input placeholder="Search users..." className="pl-8!" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="divide-y divide">
              {isPending ? (
                <div
                  className={`flex justify-center items-center h-24 mx-auto`}
                >
                  <Loader2Icon className={`animate-spin`} />
                </div>
              ) : (
                data.data.map((user: idk) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4! hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 ">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.fullName}
                          className="object-cover"
                        />
                        <AvatarFallback className="font-medium uppercase">
                          {user.fullName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.fullName}</span>
                        <span className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className=" transition-colors bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
