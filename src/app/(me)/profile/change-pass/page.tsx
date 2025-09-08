"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "@/lib/api/auth";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

// 1. Define Zod schema
const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  });

// 2. Infer TypeScript type
type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function Page() {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const [cookies] = useCookies(["token"]);
  const { mutate } = useMutation({
    mutationKey: ["changePass"],
    mutationFn: (data: {
      newPassword: string;
      confirmNewPassword: string;
      oldPassword: string;
    }) => {
      return changePasswordApi(data, cookies.token);
    },
    onError: (err) => {
      form.reset();
      toast.error(err.message ?? "Something went wrong");
    },
    onSuccess: (data: idk) => {
      form.reset();
      toast.success(data.message ?? "Password Updated successfully");
    },
  });
  const onSubmit = (values: ChangePasswordFormValues) => {
    mutate(values);
  };

  return (
    <div className="w-fullmt-8">
      <div className="p-2 border-b text-lg font-medium">Change Password</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field, formState }) => (
              <FormItem>
                <Label>Current Password</Label>
                <Input type="password" {...field} />
                {formState.errors.oldPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.oldPassword.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field, formState }) => (
              <FormItem>
                <Label>New Password</Label>
                <Input type="password" {...field} />
                {formState.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.newPassword.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field, formState }) => (
              <FormItem>
                <Label>Confirm Password</Label>
                <Input type="password" {...field} />
                {formState.errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.confirmNewPassword.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Change Password</Button>
        </form>
      </Form>
    </div>
  );
}
