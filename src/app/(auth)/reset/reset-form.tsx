"use client";

import type React from "react";

// import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthForms() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in submitted");
  };
  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md  rounded-lg shadow-lg overflow-hidden border">
        <div className="!p-8">
          <h1 className="text-2xl font-semibold mb-6! text-center">
            Reset Password
          </h1>
          <p className="text-center mb-6! text-sm text-muted-foreground">
            Duis sagittis molestie tellus, at eleifend sapien pellque quis.
            Fusce lorem nunc, fringilla sit amet nunc.
          </p>
          <form onSubmit={handleSubmit} className="!space-y-6">
            <div className="!space-y-2">
              <Label htmlFor="signin-password">New password</Label>
              <div className="relative">
                <Input
                  id="signup-confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform  -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="!space-y-2">
                <Label htmlFor="signup-confirm-password">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full text-foreground" asChild>
              <Link href="/">
                Reset Password <ArrowRight />
              </Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
