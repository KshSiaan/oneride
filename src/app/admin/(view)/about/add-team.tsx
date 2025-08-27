/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditIcon, PlusIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { addTeamMemberApi } from "@/lib/api/core";

// Zod schema for validation
const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
    .optional(), // <--- add this
});

type TeamMemberForm = z.infer<typeof teamMemberSchema>;

export default function AddTeam() {
  const [cookies] = useCookies(["token"]);
  const qClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TeamMemberForm>({
    resolver: zodResolver(teamMemberSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_team"],
    mutationFn: (data: TeamMemberForm) => addTeamMemberApi(data, cookies.token),
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: any) => {
      toast.success(data.message ?? "Successfully added team member");
      qClient.invalidateQueries({ queryKey: ["team"] });
      reset();
    },
  });
  const imageFile = watch("image");

  const onSubmit = (data: TeamMemberForm) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-foreground rounded-md">
          <PlusIcon />
          Add
        </Button>
      </DialogTrigger>

      <DialogContent className="flex justify-center items-center flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>

        <form
          className="w-full flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label htmlFor="image" className="relative cursor-pointer">
            <Avatar className="w-20 h-20">
              {imageFile ? (
                <AvatarImage src={URL.createObjectURL(imageFile)} />
              ) : (
                <AvatarFallback>Img</AvatarFallback>
              )}
            </Avatar>
            <div className="absolute inset-0 flex justify-center items-center rounded-full bg-background/70 opacity-0 hover:opacity-100">
              <EditIcon />
            </div>
          </Label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("image")}
            onChange={(e) => setValue("image", e.target.files?.[0] as File)}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          <div className="w-full space-y-2">
            <Label>Name</Label>
            <Input placeholder="Raven" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full space-y-2">
            <Label>Role</Label>
            <Input placeholder="Programmer" {...register("role")} />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <DialogFooter className="w-full flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
