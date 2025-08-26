"use client";
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
import { TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { imgCreator } from "@/lib/func/functions";
import EditAlly from "./edit-ally";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllyApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

interface Ally {
  _id: string;
  name: string;
  location: string;
  websiteURL?: string;
  type: string;
  status: string;
  marketingBlurb?: string;
  logo?: string;
}

interface EventTableProps {
  data: { data: { result: Ally[] } };
}

export default function EventTable({ data }: EventTableProps) {
  const [cookies] = useCookies(["token"]);
  console.log(data);
  const dataset = data?.data.result || [];
  console.log(dataset);
  const qClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete_ally"],
    mutationFn: ({ id }: { id: string }) => {
      return deleteAllyApi(id, cookies.token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to delete this ally");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Successfully Deleted the ally");
      qClient.invalidateQueries({ queryKey: ["allies"] });
    },
  });

  return (
    <Table className="mt-12">
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead className="text-center">Icon</TableHead>
          <TableHead className="text-center">Ally Name</TableHead>
          <TableHead className="text-center">Location</TableHead>
          <TableHead className="text-center">Website URL</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dataset.map((ally) => (
          <TableRow key={ally._id}>
            <TableCell className="text-center flex items-center justify-center">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    ally.logo
                      ? imgCreator(ally.logo)
                      : "https://avatar.iran.liara.run/public"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
            </TableCell>

            <TableCell className="text-center">{ally.name}</TableCell>
            <TableCell className="text-center">{ally.location}</TableCell>
            <TableCell className="text-center">
              <Button variant="link" asChild>
                <Link href={ally.websiteURL || "#"}>
                  {ally.websiteURL || "N/A"}
                </Link>
              </Button>
            </TableCell>
            <TableCell className="text-center">{ally.type}</TableCell>
            <TableCell className="text-center">
              <Badge
                className={
                  ally.status === "active" ? "bg-green-700" : "bg-red-700"
                }
              >
                {ally.status}
              </Badge>
            </TableCell>

            <TableCell className="text-center !space-x-2">
              {/* Edit Dialog */}
              <EditAlly ally={ally as idk} />

              {/* Delete Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    size="icon"
                  >
                    <TrashIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent side="left">
                  <PopoverArrow />
                  <h3>Are you sure?</h3>
                  <CardDescription>
                    You are going to delete this user account and this cannot be
                    undone.
                  </CardDescription>
                  <PopoverClose asChild>
                    <Button
                      variant="destructive"
                      className="text-sm mt-4"
                      onClick={() => {
                        mutate({ id: ally._id });
                      }}
                    >
                      <TrashIcon />
                      Delete
                    </Button>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
