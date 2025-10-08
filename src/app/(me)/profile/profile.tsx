"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfileApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  gender: z.string().min(1, "Select a gender"),
});

type ProfileValues = z.infer<typeof ProfileSchema>;

export default function Profile({
  updating,
  setUpdating,
  data,
  isPending,
}: {
  updating: boolean;
  setUpdating: Dispatch<SetStateAction<boolean>>;
  data: idk;
  isPending: boolean;
}) {
  const [cookies] = useCookies(["token"]);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!isPending && data?.data) {
      form.setValue("name", data?.data?.name ?? "");
      form.setValue("email", data?.data?.email ?? "");
      form.setValue("phone", data?.data?.phone ?? "");
      form.setValue("gender", data?.data?.gender ?? "");
    }
  }, [data, form, isPending]);

  const { mutate } = useMutation({
    mutationKey: ["profile_update"],
    mutationFn: (formData: FormData) => {
      return updateUserProfileApi(formData, cookies?.token ?? "");
    },
  });

  const onSubmit = (values: ProfileValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values?.name ?? "");
      formData.append("phone", values?.phone ?? "");
      formData.append("gender", values?.gender ?? "");

      mutate(formData, {
        onSuccess: (res) => {
          setUpdating(false);
          toast.success(
            res?.message ?? "Profile Information Updated Successfully"
          );
        },
        onError: (err: any) => {
          toast.error(err?.message ?? "Failed to update Profile Information");
        },
      });
    } catch (error) {
      toast.error("Unexpected error occurred. Please try again.");
      console.error(error);
    }
  };

  const safeDataAvailable = data?.data && !isPending;

  return (
    <div className="w-full">
      {safeDataAvailable ? (
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input readOnly={!updating} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              disabled
              render={({ field }) => (
                <FormItem>
                  <Label>Email Address</Label>
                  <Input type="email" {...field} readOnly />
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input readOnly={!updating} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    disabled={!updating}
                    onValueChange={(v) => field.onChange(v)}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {updating && (
              <div className="flex justify-end items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUpdating(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            )}
          </form>
        </Form>
      ) : (
        <div className="text-center py-10 text-sm text-muted-foreground">
          {isPending ? "Loading profile data..." : "No profile data available."}
        </div>
      )}
    </div>
  );
}
