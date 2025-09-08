"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiConfig } from "@/lib/config";
import { useRouter } from "next/navigation";

export default function PaymentForm({
  id,
  price,
  paymentId,
}: {
  id: string;
  price: string;
  paymentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navig = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/thanks", // optional
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      const data = {
        bookingId: id,
        amount: price,
        status: "success",
        paymentIntentId: paymentId,
      };

      const res = await fetch(
        `${apiConfig.baseUrl}/payments/intents/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${cookies.ghost}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      console.log(result);

      if (!result.success) {
        toast.error(result.message ?? "Payment failed");
      } else {
        toast.success(result.message ?? "Payment success");
        navig.push("/add-rides/details/payment/thanks");
      }
    } else {
      toast.error(
        `Payment failed: ${paymentIntent?.status ?? "Unknown status"}`
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PaymentElement className="border-2 rounded-md border-slate-600 shadow-none! pb-0.5" />
      <Button
        className="w-full mt-6"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          <>Pay ${parseInt(price).toFixed(2)}</>
        )}
      </Button>
    </form>
  );
}
