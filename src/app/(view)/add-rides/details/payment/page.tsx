"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page() {
  const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");
  return (
    <main className="min-h-dvh w-dvw flex flex-row justify-center items-center">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: 50,
          currency: "usd",
          appearance: {
            theme: "night", // or "flat", "stripe", "none"
            variables: {
              colorPrimary: "#FF4081", // Tailwind red-900 for example
              fontFamily: "sans-serif",
              colorBackground: "#131313", // bg-slate-900
              colorText: "#f8fafc", // text-slate-50
              spacingUnit: "5px",
              borderRadius: "5px",
            },
          },
        }}
      >
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Complete Payment</CardTitle>
            <CardDescription>
              Secure payment processed through our encrypted gateway
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <PaymentElement />
              <span className="flex flex-row justify-start items-center gap-4 mt-6!">
                <Checkbox />
                <Label>
                  I authorize this payment and agree to the Terms of Service and
                  Privacy Policy.
                </Label>
              </span>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full py-6! text-base text-foreground rounded-lg"
              asChild
            >
              <Link href="payment/thanks">PAY</Link>
            </Button>
          </CardFooter>
        </Card>
      </Elements>
    </main>
  );
}
