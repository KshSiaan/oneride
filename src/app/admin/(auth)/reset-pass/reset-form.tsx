/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordApi } from "@/lib/api/auth";
import { useCookies } from "react-cookie";

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function AdminResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const { push } = useRouter();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const [cookies] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["admin-reset-password"],
    mutationFn: (data: {
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      if (!email) return Promise.reject(new Error("Email not found"));
      return resetPasswordApi(
        {
          email,
          password: data.password,
          confirmPassword: data.confirmPassword, // now included
        },
        cookies.token
      );
    },

    onError: (err: any) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSuccess: (data: any) => {
      toast.success(data.message ?? "Password reset successfully");
      localStorage.removeItem("forgot_mail");
      push("/admin");
    },
  });

  useEffect(() => {
    const forgot_mail = localStorage.getItem("forgot_mail");
    if (forgot_mail) {
      setEmail(forgot_mail);
    } else {
      toast.error("Email not found. Please retry the reset flow.");
      push("/admin/forgot-pass");
    }
  }, []);

  const onSubmit = (values: ResetFormValues) => {
    mutate({
      email: localStorage.getItem("forgot_mail") ?? "",
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden border">
        <div className="!p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Reset Admin Password
          </h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
            <div className="!space-y-4">
              {/* New Password */}
              <div className="!space-y-2 relative">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.password?.message}
                </p>
              </div>

              {/* Confirm Password */}
              <div className="!space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...form.register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.confirmPassword?.message}
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                "Resetting..."
              ) : (
                <>
                  <span>Reset Password</span> <ArrowRight />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
