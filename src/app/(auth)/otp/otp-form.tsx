"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";

// ----- Zod schema -----
const verificationSchema = z.object({
  code: z.string().min(4, "Invalid Code"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

export default function AuthForms() {
  const [emType, setEmType] = useState<
    "verif_mail" | "forgot_mail" | "none" | null
  >(null);
  const [email, setEmail] = useState<string | null>(null);
  const { back, push } = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: ({ emailVerifyCode }: { emailVerifyCode: string }) => {
      if (email) {
        return verifyEmailApi({ email, emailVerifyCode });
      } else {
        return Promise.reject(new Error("Mail not found!"));
      }
    },
    onError: (err) => {
      toast.error(err.message ?? "Invalid OTP");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Email Verifed Successfully!");
      if (emType === "forgot_mail") {
        push("/reset");
      } else if (emType === "verif_mail") {
        localStorage.removeItem("verif_mail");
        push("/");
      } else {
        toast.error("Something went wrong!");
      }
    },
  });
  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    const verif_mail = localStorage.getItem("verif_mail");

    if (verif_mail) {
      setEmType("verif_mail");
      setEmail(verif_mail);
    } else {
      const forgot_mail = localStorage.getItem("forgot_mail");
      if (forgot_mail) {
        setEmType("forgot_mail");
        setEmail(forgot_mail);
      } else {
        toast.error("Failed to fetch email", {
          description:
            "Could not retrieve your email from the previous page. Please try again.",
        });
        back();
      }
    }
  }, []);

  const onSubmit = (data: VerificationFormData) => {
    console.log("Verification code submitted:", data);
    mutate({ emailVerifyCode: data.code });
  };

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden border">
        <div className="!p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Verify Your Email Address
          </h1>
          <p className="text-center mb-6 text-sm text-muted-foreground">
            Enter the verification code sent to your email.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="!space-y-2">
                    <div className="flex justify-between items-center">
                      <FormLabel>Verification code</FormLabel>
                      <Button
                        variant="link"
                        className="text-sm text-accent-foreground hover:text-accent-foreground/80 font-medium"
                        type="button"
                      >
                        Resend code
                      </Button>
                    </div>
                    <FormControl>
                      <Input {...field} placeholder="Enter 6-digit code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full flex items-center justify-center space-x-2"
              >
                <span>VERIFY CODE</span>
                <ArrowRight />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
