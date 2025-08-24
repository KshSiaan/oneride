/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

const formSchema = z.object({
  code: z.string().min(6, "Enter the 6-digit OTP"),
});

type OtpFormValues = z.infer<typeof formSchema>;

export default function AdminOtpForm() {
  const [email, setEmail] = useState<string | null>(null);
  const { back, push } = useRouter();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin-verifyOtp"],
    mutationFn: ({ emailVerifyCode }: { emailVerifyCode: string }) => {
      if (email) {
        return verifyEmailApi({ email, emailVerifyCode });
      }
      return Promise.reject(new Error("Email not found!"));
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Invalid OTP");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "OTP verified successfully!");
      localStorage.removeItem("forgot_mail");
      push("/admin/reset-pass");
    },
  });

  useEffect(() => {
    const forgot_mail = localStorage.getItem("forgot_mail");
    if (forgot_mail) {
      setEmail(forgot_mail);
    } else {
      toast.error("Failed to fetch email", {
        description:
          "Could not retrieve your email from the previous page. Please try again.",
      });
      back();
    }
  }, []);

  const onSubmit = (values: OtpFormValues) => {
    mutate({ emailVerifyCode: values.code });
  };

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden border">
        <div className="!p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Admin Email Verification
          </h1>
          <p className="text-center mb-6 text-sm text-muted-foreground">
            Enter the 6-digit code sent to your admin email.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                      <FormLabel>Verification Code</FormLabel>
                      <Button
                        variant="link"
                        type="button"
                        className="text-sm text-accent-foreground hover:text-accent-foreground/80 font-medium"
                      >
                        Resend code
                      </Button>
                    </div>
                    <FormControl>
                      <InputOTP maxLength={6} className="flex gap-2" {...field}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="border border-muted-foreground/40 rounded-md w-10 h-10 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        ))}
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
