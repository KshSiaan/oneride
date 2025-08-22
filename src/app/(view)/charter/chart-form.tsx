"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn, idk } from "@/lib/utils";
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
import { PhoneInput } from "@/components/ui/phone-input";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createCharterApi } from "@/lib/api/core";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(5),
  passengerCount: z.coerce.number(),
  pickupLocation: z.string().min(1),
  dropoffLocation: z.string().min(1),
  pickupDateAndTime: z.coerce.date(),
  purpose: z.string().optional(),
  specialInstructions: z.string().optional(),
});

export default function ChartForm() {
  const [submitted, setSubmitted] = useState(false);
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      passengerCount: 1,
      pickupLocation: "",
      dropoffLocation: "",
      pickupDateAndTime: new Date(),
      purpose: "",
      specialInstructions: "",
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["charter"],
    mutationFn: (body: {
      name: string;
      email: string;
      phone: string;
      passengerCount: number;
      pickupLocation: string;
      dropoffLocation: string;
      pickupDateAndTime: string;
      purpose: string;
      specialInstructions: string;
    }) => {
      return createCharterApi(body);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formatted = {
      ...values,
      pickupDateAndTime: values.pickupDateAndTime.toISOString(),
    };

    try {
      mutate(formatted as idk, {
        onError: (err) => {
          toast.error(err.message ?? "Something went wrong..");
          console.error(err);
        },
        onSuccess: (data: idk) => {
          toast.success(data.message ?? "Successfully Requested your quote!");
          console.log(data);
          form.reset();
          setSubmitted(true);
          navig.push(`/charter/thanks`);
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    // console.log(formatted);

    // toast(
    //   <pre className="mt-2 w-full rounded-md p-4">
    //     <code className="text-white">{JSON.stringify(formatted, null, 2)}</code>
    //   </pre>
    // );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-10">
        {/* Full name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="" {...field} defaultCountry="TR" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passenger count */}
        <FormField
          control={form.control}
          name="passengerCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Passengers</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pickup location */}
        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Location</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dropoff location */}
        <FormField
          control={form.control}
          name="dropoffLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drop-off Location</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pickup date & time */}
        <FormField
          control={form.control}
          name="pickupDateAndTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date & Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Purpose */}
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <FormControl>
                <Input placeholder="birthday party" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Special instructions */}
        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={submitted}
          className="w-full md:w-2/3 lg:w-1/2 font-semibold text-foreground rounded"
        >
          {submitted ? "Quote Submitted successfully" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
