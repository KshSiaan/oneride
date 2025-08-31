"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Phone } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBookingAuthApi,
  createPaymentIntentApi,
  getPickupById,
} from "@/lib/api/core";
import { Skeleton } from "@/components/ui/skeleton";
import {
  dateExtractor,
  encrypt,
  timeExtractor,
  timeSumUp,
} from "@/lib/func/functions";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required"),
  gender: z.string().min(1, "Gender is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function User({ id }: { id: string }) {
  const navig = useRouter();
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["transport"],
    queryFn: (): idk => {
      return getPickupById(id);
    },
    enabled: !!id,
  });
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      gender: "male",
    },
  });
  const { mutate: createIntent } = useMutation({
    mutationKey: ["create_intent"],
    mutationFn: (x: { amount: number; bookingId: string }) => {
      return createPaymentIntentApi(x);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["create_booking"],
    mutationFn: (data: {
      event: string;
      transport: string;
      ticketCount: string;
    }) => {
      return createBookingAuthApi(data, cookies.token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (succA: idk) => {
      toast.success(
        data.message ?? "Please complete payment to confirm the ride"
      );

      createIntent(
        {
          amount:
            data.data.price * parseInt(localStorage.getItem("ticketTotal")!),

          bookingId: succA.data._id,
        },
        {
          onSuccess: (succB: idk) => {
            navig.push(
              `/add-rides/details/payment?id=${data.data._id}&p_id=${
                succB.data.id
              }&amm=${
                data.data.price * parseInt(localStorage.getItem("ticketTotal")!)
              }&kilo=${encrypt(succB.data.client_secret)}`
            );
          },
        }
      );
    },
  });

  const onSubmit = () => {
    const event_id = localStorage.getItem("selectedEvent");
    const ticketCount = localStorage.getItem("ticketTotal");

    if (!event_id) {
      toast.error("Event not found", {
        description: "Please check if ticket is still available",
      });
    }
    if (!ticketCount || ticketCount === "0") {
      toast.error("Failed to get ticket data", {
        description: "Please go back and try again",
      });
    }
    const payload = {
      event: String(event_id),
      transport: String(id),
      ticketCount: String(ticketCount),
    };

    mutate(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 lg:grid-cols-8 gap-6"
      >
        <div className="col-span-1 lg:col-span-5 space-y-6">
          {/* Contact Details */}
          <Card>
            <CardHeader className="flex flex-row justify-start items-center gap-4 border-b">
              <div className="size-12 rounded-full bg-primary flex justify-center items-center">
                <Phone fill="#ffffff" />
              </div>
              <div className="font-semibold">
                <h2>Contact Details</h2>
                <p className="text-sm text-muted-foreground">
                  To receive your E-tickets & updates
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-4 lg:px-12 grid lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile no.</FormLabel>
                    <FormControl>
                      <Input placeholder="+123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Passenger Details */}
          <Card>
            <CardHeader className="flex flex-row justify-start items-center gap-4 border-b">
              <div className="size-12 rounded-full bg-primary flex justify-center items-center">
                <Phone fill="#ffffff" />
              </div>
              <div className="font-semibold">
                <h2>Passenger Details</h2>
                <p className="text-sm text-muted-foreground">
                  To receive your E-tickets & updates
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-12 grid lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Radio */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel>Select Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-3 mt-2"
                      >
                        {["male", "female"].map((opt) => (
                          <label
                            key={opt}
                            className={`cursor-pointer border-2 rounded-md px-4 py-2 transition-colors ${
                              field.value === opt
                                ? "bg-primary text-foreground"
                                : "bg-secondary text-foreground"
                            }`}
                          >
                            <RadioGroupItem value={opt} className="hidden" />
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        {/* Summary Card */}
        <div className="col-span-1 lg:col-span-3">
          {isPending ? (
            <Skeleton className="w-full aspect-square" />
          ) : (
            <Card className="w-full">
              <CardHeader className="flex items-center gap-2">
                {/* <Image
                  src="/icon/hanif.png"
                  height={64}
                  width={64}
                  alt="hanif"
                  className="size-12"
                />
                <p className="text-3xl">HBL Enterprise</p> */}
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-between items-center text-muted-foreground">
                  <p>Fare</p>
                  <p>Seats</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xl text-green-600">${data.data.price}</p>
                  <p className="text-primary text-xl">
                    {localStorage.getItem("ticketTotal")}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center mt-6 text-muted-foreground">
                  <p>Departure</p>
                  <p>Arrival</p>
                </div>
                <div className="flex flex-row justify-between items-center text-xl">
                  <p>{data.data.pickUpPoint.name.split(",")[0]}</p>
                  <p>{data.data.dropOffPoint.name.split(",")[0]}</p>
                </div>
                <div className="flex flex-row justify-between items-center text-xl">
                  <p>{timeExtractor(data.data.departureTime)}</p>
                  <p>
                    {timeSumUp(data.data.departureTime, data.data.duration)}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>{dateExtractor(data.data.departureTime)}</p>
                  <p>{dateExtractor(data.data.departureTime)}</p>
                </div>
                <p className="text-muted-foreground py-6">BOARDING POINT</p>
                <div className="flex flex-row justify-between items-center">
                  <p>{data.data.pickUpPoint.name.split(",")[0]}</p>
                  <p>{data.data.dropOffPoint.name.split(",")[0]}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="text-foreground w-full rounded-md text-xl py-6 uppercase"
                  type="submit"
                >
                  Proceed to payment
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </form>
    </Form>
  );
}
