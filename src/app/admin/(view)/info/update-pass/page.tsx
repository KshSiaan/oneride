"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { changePasswordApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";

// ✅ Zod schema
const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

export default function Page() {
  const [cookies] = useCookies(["token"]);
  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_pass"],
    mutationFn: (body: PasswordForm) => changePasswordApi(body, cookies.token),
    onError: (err) => {
      toast.error(err.message ?? "Failed to update password");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Successfully updated your password");
      form.reset();
    },
  });

  const [show, setShow] = useState<Record<string, boolean>>({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const toggleVisibility = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit: SubmitHandler<PasswordForm> = (values) => {
    mutate(values);
  };

  return (
    <section className="p-4">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3">
          <h1 className="text-2xl">Change Password</h1>
          <p>Update your account password securely</p>
        </div>
      </div>

      <Card className="mt-6">
        <CardContent className="flex flex-col justify-center items-center gap-4 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {/* Old Password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Current password</Label>
                    <div className="relative w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type={show.oldPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="pe-9"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility("oldPassword")}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        {show.oldPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>New password</Label>
                    <div className="relative w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type={show.newPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="pe-9"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility("newPassword")}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        {show.newPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm New Password */}
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm password</Label>
                    <div className="relative w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type={show.confirmNewPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="pe-9"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility("confirmNewPassword")}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        {show.confirmNewPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="rounded-md w-full mt-6"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
