/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditIcon, Loader2Icon, User2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { editTeamMemberApi, getTeamMembersApi } from "@/lib/api/core";
import { imgCreator } from "@/lib/func/functions";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

// Zod schema
const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  image: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Image must be a file"),
});

type TeamMemberForm = z.infer<typeof teamMemberSchema>;

export default function Team() {
  const [cookies] = useCookies(["token"]);
  const qClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["team"],
    queryFn: (): idk => getTeamMembersApi({}, cookies.token),
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-xl">
          <div className="flex items-center gap-2">
            <User2Icon className="size-7 text-primary" />
            Edit Team Member
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-6 text-center">
        {isPending ? (
          <div className="flex justify-center items-center h-24 col-span-4">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          data.data.map((member: any) => (
            <EditTeamMemberCard
              key={member._id}
              member={member}
              token={cookies.token}
              qClient={qClient}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

type EditTeamMemberCardProps = {
  member: any;
  token: string;
  qClient: any;
};

function EditTeamMemberCard({
  member,
  token,
  qClient,
}: EditTeamMemberCardProps) {
  const form = useForm<TeamMemberForm>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: { name: member.name, role: member.role, image: undefined },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit_team", member._id],
    mutationFn: (data: TeamMemberForm) =>
      editTeamMemberApi(member._id, data, token),
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to update team member");
    },
    onSuccess: (data: any) => {
      toast.success(data.message ?? "Team member updated successfully");
      qClient.invalidateQueries({ queryKey: ["team"] });
      form.reset();
    },
  });

  const onSubmit = (data: TeamMemberForm) => {
    mutate(data);
  };

  return (
    <Card>
      <CardContent className="flex flex-col justify-center items-center gap-4">
        <Avatar className="size-18 object-cover">
          <AvatarImage
            src={
              member.image
                ? imgCreator(member.image)
                : "https://avatar.iran.liara.run/public/404"
            }
          />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <h3>{member.name}</h3>
        <p>{member.role}</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-primary" variant="ghost">
              <EditIcon className="size-6" />
            </Button>
          </DialogTrigger>

          <DialogContent className="flex justify-center items-center flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-center items-center gap-4"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="img_edit"
                        className="relative cursor-pointer"
                      >
                        <Avatar className="size-18">
                          <AvatarImage
                            src={
                              member.image
                                ? imgCreator(member.image)
                                : "https://avatar.iran.liara.run/public/404"
                            }
                          />
                          <AvatarFallback>UI</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 flex justify-center items-center rounded-full bg-background/70 opacity-0 hover:opacity-100">
                          <EditIcon />
                        </div>
                      </FormLabel>
                      <input
                        name="img_edit"
                        id="img_edit"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="w-full flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    {isPending ? "Updating..." : "Update"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
