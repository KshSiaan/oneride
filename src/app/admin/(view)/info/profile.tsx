/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon, PhoneIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOwnProfileApi, updateUserProfileApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import AvatarUpdate from "./avatar-update";
import { imgCreator } from "@/lib/func/functions";
import { idk } from "@/lib/utils";

// ----- Zod schema -----
const profileSchema = z.object({
  name: z.string().min(1, "First name is required"),
  phone: z.string().min(1, "Contact number is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const [cookies] = useCookies(["token"]);
  const [isClient, setIsClient] = useState(false);
  const qClient = useQueryClient();
  useEffect(() => {
    setIsClient(true); // render only on client
  }, []);

  const { mutate } = useMutation({
    mutationKey: ["update_profile"],
    mutationFn: (body: FormData): idk =>
      updateUserProfileApi(body, cookies.token),
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to Update Admin Profile");
    },
    onSuccess: (data: any) => {
      toast.success(data?.message ?? "Successfully Updated Admin Profile");
      qClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: (): idk => getOwnProfileApi(cookies.token),
  });

  // Populate form once data is loaded
  useEffect(() => {
    if (data?.data) {
      form.setValue("name", data.data.name ?? "");
      form.setValue("phone", data.data.phone ?? "");
    }
  }, [data?.data, form]);

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("phone", data.phone);
    mutate(payload);
  };

  if (!isClient) return null; // prevent server-side render

  return (
    <Card className="mt-6">
      <CardContent className="flex flex-col justify-center items-center gap-4">
        {/* Profile Picture */}
        {isPending ? (
          <div className="flex justify-center items-center h-24 mx-auto">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          <AvatarUpdate
            image={data?.data?.image ? imgCreator(data.data.image) : ""}
          />
        )}
        <h1 className="text-2xl">Upload your photo</h1>

        {/* Profile Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {/* First Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-md pl-3 bg-background focus-within:ring-2 ring-ring transition">
                      <User2Icon className="w-5 h-5 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="First name"
                        className="border-none! shadow-none! ring-0! bg-inherit!"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-md pl-3 bg-background focus-within:ring-2 ring-ring transition">
                      <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="Contact number"
                        className="border-none! shadow-none! ring-0! bg-inherit!"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <Button
              className="col-span-2 w-full mt-6 rounded-md font-semibold"
              type="submit"
            >
              Save changes
            </Button>
            <Button
              className="col-span-2 w-full mt-2 rounded-md font-semibold"
              variant="outline"
              asChild
            >
              <Link href="info/update-pass">Update password form here</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
