"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment-form"; // ✅ your working form
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { decrypt } from "@/lib/func/functions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Page() {
  const searcher = useSearchParams();
  const id = searcher.get("bookingId");
  const p_id = searcher.get("p_id");
  const amm = searcher.get("amm");
  const kilo = searcher.get("kilo");

  // normally you’d fetch these from query params or backend
  const clientSecret = decrypt(kilo!); // <- real client_secret returned from backend
  const price = amm!;
  const bookingId = id;
  const paymentId = p_id;

  return (
    <main className="px-4 lg:px-0 min-h-dvh py-24  w-dvw flex flex-row justify-center items-center">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#FF4081",
              fontFamily: "sans-serif",
              colorBackground: "#131313",
              colorText: "#f8fafc",
              spacingUnit: "5px",
              borderRadius: "8px",
            },
          },
        }}
      >
        <Card className="lg:w-2/3">
          <CardHeader>
            <CardTitle>Complete Payment</CardTitle>
            <CardDescription>
              Secure payment processed through our encrypted gateway
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentForm
              id={bookingId ?? ""}
              price={price}
              paymentId={paymentId ?? ""}
            />
            <span className="flex flex-row justify-start items-center gap-4 mt-6">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-xs md:text-sm">
                I authorize this payment and agree to the Terms of Service and
                Privacy Policy.
              </Label>
            </span>
          </CardContent>
          <CardFooter>
            {/* Button lives inside PaymentForm for real stripe confirm */}
          </CardFooter>
        </Card>
      </Elements>
    </main>
  );
}
