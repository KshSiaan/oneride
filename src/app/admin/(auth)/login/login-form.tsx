/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { loginApi } from "@/lib/api/auth"; // ✅ reuse same API

// 👇 Schema
const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AdminLoginValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setCookie] = useCookies(["token"]); // ✅ use same cookie key
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi, // ✅ same API used
  });

  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: AdminLoginValues) => {
    mutate(values, {
      onError: (err: any) => {
        toast.error(err?.message ?? "Something went wrong..");
      },
      onSuccess: (data: any) => {
        setCookie("token", data.data.token, { path: "/" }); // ✅ store token
        toast.success(data.message ?? "Login successful");
        form.reset();
        push("/admin/dashboard"); // ✅ redirect to admin panel
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    type="email"
                    {...field}
                    className="bg-secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-lg font-bold">Password</FormLabel>
                  <Link
                    href={"/admin/forgot-pass"}
                    className="text-pretty text-primary font-bold hover:underline"
                  >
                    Forget your password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Abc123..."
                      {...field}
                      className="bg-secondary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember me */}
          <div className="flex items-center gap-2 !mt-12">
            <Checkbox id="remember" />{" "}
            <Label htmlFor="remember">Remember me?</Label>
          </div>

          {/* Submit */}
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
