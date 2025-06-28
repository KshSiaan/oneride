"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Personal Information</h1>
          <p>Admin can edit personal information</p>
        </div>
      </div>
      <Card className="mt-6!">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <form
            className="gap-6 w-full space-y-4!"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="col-span-1 space-y-3!">
              <Label>Curent password</Label>
              <div className="relative w-full">
                <Input
                  key="password-input-0"
                  placeholder=""
                  type="password"
                  id="password-input-0"
                  className="pe-9!"
                />
                <div
                  className={
                    "text-muted-foreground absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 end-0 pe-3! z-30"
                  }
                >
                  <Button variant="ghost" size="icon">
                    <EyeIcon className="size-4" strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-3!">
              <Label>New password</Label>
              <div className="relative w-full">
                <Input
                  key="password-input-0"
                  placeholder=""
                  type="password"
                  id="password-input-0"
                  className="pe-9!"
                />
                <div
                  className={
                    "text-muted-foreground absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 end-0 pe-3! z-30"
                  }
                >
                  <Button variant="ghost" size="icon">
                    <EyeIcon className="size-4" strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-3!">
              <Label>Confirm password</Label>
              <div className="relative w-full">
                <Input
                  key="password-input-0"
                  placeholder=""
                  type="password"
                  id="password-input-0"
                  className="pe-9!"
                />
                <div
                  className={
                    "text-muted-foreground absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 end-0 pe-3! z-30"
                  }
                >
                  <Button variant="ghost" size="icon">
                    <EyeIcon className="size-4" strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </div>
            <Button className="rounded-md w-full text-foreground mt-6!">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
