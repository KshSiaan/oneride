"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, ArrowLeft } from "lucide-react";
import LogoutButton from "@/components/func/logout-button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LogoutPage() {
  const { back } = useRouter();
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">
            Logout Confirmation
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
              <LogOut className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-serif font-black text-xl text-card-foreground">
              Are you sure you want to log out?
            </CardTitle>
            <CardDescription className="font-sans text-muted-foreground leading-relaxed">
              You will be signed out of your account. You can log back in at any
              time using your credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <LogoutButton>Log Out</LogoutButton>

              <Button
                variant="outline"
                className="w-full bg-secondary hover:bg-muted text-secondary-foreground font-sans font-medium py-3 border-border transition-all duration-200"
                onClick={() => {
                  back();
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-muted-foreground font-sans">
            Need help? Contact our support team
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
