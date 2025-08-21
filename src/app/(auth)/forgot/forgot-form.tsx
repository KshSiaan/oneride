"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { sendOtpApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";

const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

export default function AuthForms() {
  const { push } = useRouter();
  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["forgotForm"],
    mutationFn: (email: string) => {
      return sendOtpApi({ email });
    },
  });

  const onSubmit = (values: ForgetPasswordFormValues) => {
    console.log("Form submitted:", values);
    try {
      mutate(values.email, {
        onError: (err) => {
          toast.error(err.message ?? "Something went wrong..");
        },
        onSuccess: (data: idk) => {
          toast.success(data.message ?? "Please verify your email");
          localStorage.setItem("forgot_mail", values.email);
          push("/otp");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden border">
        <div className="!p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Forget Password
          </h1>
          <p className="text-center mb-6 text-sm text-muted-foreground">
            Enter the email address or mobile phone number <br /> associated
            with your Poolvalet account.
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
            <div className="!space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="Enter your email"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full text-foreground">
              SEND CODE <ArrowRight className="ml-2" />
            </Button>

            <div className="!space-y-3">
              <p className="text-sm text-muted-foreground">
                Already have account?{" "}
                <Link
                  href="/auth"
                  className="text-accent-foreground hover:underline"
                >
                  Sign in
                </Link>
              </p>

              <Separator />
              <p className="text-sm text-muted-foreground">
                You may contact{" "}
                <Link
                  href="/help"
                  className="text-accent-foreground hover:underline"
                >
                  Customer Service
                </Link>{" "}
                for help restoring access to your account.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
