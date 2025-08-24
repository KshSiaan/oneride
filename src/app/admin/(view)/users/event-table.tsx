import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BanIcon, EyeIcon, Loader2Icon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";

import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { cn, idk } from "@/lib/utils";
import { dateExtractor } from "@/lib/func/functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserBanApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function EventTable({ data }: { data: idk }) {
  const [cookies] = useCookies(["token"]);
  const qClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["ban"],
    mutationFn: (id: string): idk => {
      return toggleUserBanApi({ userId: id }, cookies.token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to Ban this account");
    },
  });
  return (
    <>
      {" "}
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">User name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Registration date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((x: idk) => (
            <TableRow key={x._id}>
              <TableCell className="text-center">{x.name ?? "N/A"}</TableCell>
              <TableCell className="text-center">{x.email ?? "N/A"}</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-700">{x.roles[0] ?? "N/A"}</Badge>
              </TableCell>
              <TableCell className="text-center">
                {dateExtractor(x.createdAt)}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    x.status === "active" ? "bg-green-700" : "bg-secondary"
                  )}
                >
                  {x.status ?? "N/A"}
                </Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Button variant="ghost" className="" size="icon" asChild>
                  <Link href={`users/${x._id}`}>
                    <EyeIcon />
                  </Link>
                </Button>
                {/* <Button variant="ghost" size="icon" asChild>
                  <Link href={"events/edit"}>
                    <EditIcon />
                  </Link>
                </Button> */}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <BanIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="left">
                    <PopoverArrow />
                    <h3>Are you sure?</h3>
                    <CardDescription>
                      You are going to ban {x.name}.
                    </CardDescription>
                    <PopoverClose asChild>
                      <Button
                        variant="outline"
                        className="text-sm !mt-6"
                        disabled={isPending}
                        onClick={() => {
                          mutate(x._id, {
                            onSuccess: (data: idk) => {
                              toast.success(
                                data.message ?? `Successfully banned ${x.name}`
                              );
                              qClient.invalidateQueries({
                                queryKey: ["users"],
                              });
                            },
                          });
                        }}
                      >
                        <BanIcon />
                        {isPending ? (
                          <Loader2Icon className="animate-spin" />
                        ) : x.status === "banned" ? (
                          "Unban"
                        ) : (
                          "Ban"
                        )}
                      </Button>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
