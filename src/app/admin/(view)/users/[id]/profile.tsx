"use client";
import React from "react";
import {
  MailIcon,
  CalendarDaysIcon,
  ShieldCheck,
  HistoryIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getUserByIdApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { dateExtractor } from "@/lib/func/functions";
import { idk } from "@/lib/utils";
export default function Profile({ id }: { id: string }) {
  const [cookies] = useCookies(["token"]);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: (): idk => {
      return getUserByIdApi(id, cookies.token);
    },
    enabled: !!id,
  });

  if (isPending) {
    return (
      <section className="w-full space-y-6">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="w-full h-[300px]" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="w-full h-[80px]" />
          <Skeleton className="w-full h-[80px]" />
          <Skeleton className="w-full h-[80px]" />
        </div>
      </section>
    );
  }

  if (isError) {
    if (error.message === "API request failed") {
      return notFound();
    }
  }

  const user = data.data;

  return (
    <>
      {/* Bookings Summary */}
      <Card className="">
        <CardContent className="flex flex-row justify-start items-center gap-6">
          <Avatar className="size-34 border-4 border-primary">
            <AvatarImage
              src={user.image ?? `https://avatar.iran.liara.run/public/404`}
            />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex flex-row justify-start items-center gap-2">
              <h2 className="text-3xl">{user.name ?? "N/A"}</h2>
              <Badge variant="secondary">{user.roles[0]}</Badge>
              <Badge variant={"default"}>{user.status}</Badge>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-6">
              <p className="flex items-center gap-2">
                <MailIcon className="size-4" />
                {user.email}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDaysIcon className="size-4" />
                Joined {dateExtractor(user.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="w-full grid grid-cols-4 gap-6">
          <Card className="aspect-video">
            <CardContent className="w-full h-full flex flex-col justify-center items-center gap-6">
              <h2 className="text-5xl text-primary">{user.services.length}</h2>
              <p className="text-lg">Events Managed</p>
            </CardContent>
          </Card>
          <Card className="aspect-video">
            <CardContent className="w-full h-full flex flex-col justify-center items-center gap-6">
              <h2 className="text-5xl text-primary">N/A</h2>
              <p className="text-lg">Charter Request</p>
            </CardContent>
          </Card>
          <Card className="aspect-video">
            <CardContent className="w-full h-full flex flex-col justify-center items-center gap-6">
              <h2 className="text-5xl text-primary">N/A</h2>
              <p className="text-lg">User Invited</p>
            </CardContent>
          </Card>
          <Card className="aspect-video">
            <CardContent className="w-full h-full flex flex-col justify-center items-center gap-6">
              <h2 className="text-5xl text-primary">
                {/* {new Date().toUTCString()} */}
              </h2>
              <p className="text-lg">Last Login - 2:45Pm</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card className="">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Permissions & Access
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6! text-center space-y-6!">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Access level</TableHead>
                <TableHead className="text-center">
                  Last Password Update
                </TableHead>
                <TableHead className="text-center">
                  Two Factor Authentication
                </TableHead>
                <TableHead className="text-center">Devices</TableHead>
              </TableRow>
            </TableHeader>
            {user.notifications.length > 0 && (
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">Full Access</TableCell>
                  <TableCell className="text-center">2 Weeks ago</TableCell>
                  <TableCell className="text-center">Enabled</TableCell>
                  <TableCell className="text-center">
                    2 Active Devices
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
      {/* Booking Actions */}
      <Card className="">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6! text-center space-y-6! ">
          <Table className="text-lg!">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date </TableHead>
                <TableHead className="text-center">Action</TableHead>
                <TableHead className="text-center">Module</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">May 14, 2025</TableCell>
                <TableCell className="text-center">Edited Event</TableCell>
                <TableCell className="text-center">
                  Tech Conference 2023
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">May 14, 2025</TableCell>
                <TableCell className="text-center">Edited Event</TableCell>
                <TableCell className="text-center">
                  Tech Conference 2023
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">May 14, 2025</TableCell>
                <TableCell className="text-center">Edited Event</TableCell>
                <TableCell className="text-center">
                  Tech Conference 2023
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">May 14, 2025</TableCell>
                <TableCell className="text-center">Edited Event</TableCell>
                <TableCell className="text-center">
                  Tech Conference 2023
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
