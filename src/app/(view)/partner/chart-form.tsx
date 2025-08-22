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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createPartnershipApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";

const formSchema = z.object({
  organizerName: z.string().min(1),
  eventName: z.string().min(1),
  organizerEmail: z.string().email(),
  eventDate: z.coerce.date(),
  eventLocation: z.string().min(1),
  transportationNeeds: z.string().optional(),
});

export default function PartnershipForm() {
  const navig = useRouter();
  const [cookies] = useCookies(["token"]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizerName: "",
      eventName: "",
      organizerEmail: "",
      eventDate: new Date(),
      eventLocation: "",
      transportationNeeds: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["partnership"],
    mutationFn: (body: {
      organizerName: string;
      eventName: string;
      organizerEmail: string;
      eventDate: string;
      eventLocation: string;
      transportationNeeds: string;
    }) => {
      return createPartnershipApi(body, cookies.token); // token here if needed
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formatted = {
      ...values,
      eventDate: values.eventDate.toISOString(),
    };

    try {
      mutate(formatted as idk, {
        onError: (err) => {
          toast.error(err.message ?? "Something went wrong..");
          console.error(err);
        },
        onSuccess: (data: idk) => {
          toast.success(
            data.message ?? "Successfully submitted partnership request!"
          );
          form.reset();
          navig.push("/partner/thanks");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-10">
        {/* Organizer name */}
        <FormField
          control={form.control}
          name="organizerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Organizer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Event name */}
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="organizerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="email@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Event Date */}
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
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

        {/* Event Location */}
        <FormField
          control={form.control}
          name="eventLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Transportation needs */}
        <FormField
          control={form.control}
          name="transportationNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transportation Needs</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about transportation needs"
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
          className="w-full md:w-auto lg:w-1/2 font-semibold text-foreground rounded"
        >
          Submit Partnership Request
        </Button>
      </form>
    </Form>
  );
}
