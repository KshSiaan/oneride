"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCharterApi } from "@/lib/api/core";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  passengerCount: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a number"),
  pickupLocation: z.string().min(1, "Pickup location required"),
  dropoffLocation: z.string().min(1, "Drop-off location required"),
  pickupDate: z.string().min(1, "Date required"),
  pickupTime: z.string().min(1, "Time required"),
  purpose: z.string().min(1, "Purpose required"),
  specialInstructions: z.string().optional(),
});

export default function CharterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      passengerCount: "",
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      pickupTime: "",
      purpose: "",
      specialInstructions: "",
    },
  });
  const qCl = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["charter_add"],
    mutationFn: (data: {
      name: string;
      email: string;
      phone: string;
      passengerCount: number;
      pickupLocation: string;
      dropoffLocation: string;
      pickupDateAndTime: string;
      purpose: string;
      specialInstructions: string;
    }): idk => {
      return createCharterApi(data);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: idk) => {
      toast.success(
        data.message ?? "Successfully Created a new Charter request"
      );
      qCl.invalidateQueries({ queryKey: ["charter"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // merge date + time → ISO
    const pickupDateAndTime = new Date(
      `${values.pickupDate}T${values.pickupTime}`
    ).toISOString();

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      passengerCount: Number(values.passengerCount),
      pickupLocation: values.pickupLocation,
      dropoffLocation: values.dropoffLocation,
      pickupDateAndTime,
      purpose: values.purpose,
      specialInstructions: values.specialInstructions || "",
    };

    mutate(payload); // ✅ send the correct object
    console.log("Form submitted:", payload);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-2xl mx-auto p-6"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name *</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
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
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" type="email" {...field} />
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
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input placeholder="01999999999" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passengers */}
        <FormField
          control={form.control}
          name="passengerCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Passengers *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 25" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pickup Location */}
        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Location *</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Drop-off Location */}
        <FormField
          control={form.control}
          name="dropoffLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drop-off Location *</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pickup Date + Time */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pickupDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickupTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Time *</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Purpose */}
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of Charter *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="business">Business Trip</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="airport">Airport Transfer</SelectItem>
                  <SelectItem value="event">Special Event</SelectItem>
                  <SelectItem value="tour">City Tour</SelectItem>
                  <SelectItem value="birthday party">Birthday Party</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Special Instructions */}
        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Give any instruction"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="reset" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit Charter Request</Button>
        </div>
      </form>
    </Form>
  );
}
