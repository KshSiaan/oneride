/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendOtpApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ForgotFormValues = z.infer<typeof formSchema>;

export default function ForgotForm() {
  const { push } = useRouter();

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin-forgot"],
    mutationFn: (email: string) => sendOtpApi({ email }),
  });

  const onSubmit = (values: ForgotFormValues) => {
    mutate(values.email, {
      onError: (err: any) => {
        toast.error(err?.message ?? "Something went wrong..");
      },
      onSuccess: (data: idk) => {
        toast.success(data.message ?? "Please verify your email");
        localStorage.setItem("forgot_mail", values.email);
        push("/admin/verify-otp"); // ✅ admin specific redirect
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden border">
        <div className="!p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Admin Forgot Password
          </h1>
          <p className="text-center mb-6 text-sm text-muted-foreground">
            Enter the email address associated with your admin account.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
                        {...field}
                        className="bg-secondary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full text-foreground"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
