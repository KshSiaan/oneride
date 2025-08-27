"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Search, Users } from "lucide-react";

export default function Directory() {
  // Sample user data
  const users = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `/placeholder.svg?height=40&width=40`,
    initials: `U${i + 1}`,
  }));

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
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4! hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 ">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="font-medium">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
