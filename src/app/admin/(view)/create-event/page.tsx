"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Calendar,
  DollarSign,
  ImageIcon,
  Settings,
  AlertCircleIcon,
} from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),

  transportation: z.string().min(1),

  image: z.any().optional(),

  totalSeats: z.string().min(1, "Total seats is required"),
  ticketPrice: z.string().min(1, "Ticket price is required"),
  eventStatus: z.string().min(1, "Event status is required"),
});

// interface LocationData {
//   lat: number;
//   lng: number;
//   address?: string;
// }

export default function CreateEventPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      transportation: "",
      totalSeats: "",
      ticketPrice: "",
      eventStatus: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Submitted:", data);
  };

  function onSaveDraft() {
    console.log("Saving as draft...");
  }

  function onCancel() {
    console.log("Cancelling...");
  }

  return (
    <div className="min-h-screen bg-muted rounded-md text-white p-6!">
      <div className="w-full !mx-auto">
        {/* Header */}
        <div className="mb-8!">
          <h1 className="text-3xl font-bold mb-2!">Create New Event</h1>
          <p>Fill out the form below to create a new transportation event</p>
        </div>
        <div className="flex justify-end items-center">
          <Button asChild>
            <Link href={"/admin/create-event/pickups"}>Manage Pickups</Link>
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
            {/* Event Information Section */}
            <div className="rounded-lg p-6!">
              <div className="flex items-center gap-2 mb-6!">
                <AlertCircleIcon className="text-primary size-5" />
                <h2 className="text-lg font-semibold text-primary">
                  Event Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Event Title *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Shuttle service add new line"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Category *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="shuttle">
                            Shuttle Service
                          </SelectItem>
                          <SelectItem value="bus">Bus Service</SelectItem>
                          <SelectItem value="taxi">Taxi Service</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-6!">
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide details about your event"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date & Time Section */}
            <div className="rounded-lg p-6!">
              <div className="flex items-center gap-2 mb-6!">
                <Calendar className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-primary">
                  Date & Time
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Start Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">End Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Start Time *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">End Time *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-lg p-6!">
              {/* Venue */}
              <div className="mb-4">
                <h3 className="mb-4!">Select Route</h3>
                <FormField
                  control={form.control}
                  name="transportation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Route" />
                          </SelectTrigger>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Seating & Pricing Section */}
            <div className="rounded-lg p-6!">
              <div className="flex items-center gap-2 mb-6!">
                <DollarSign className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-primary">
                  Seating & Pricing
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="totalSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Total seat *</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ticketPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Ticket Price (NZD) *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="eg. $25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Event Image Section */}
            <div className="rounded-lg p-6!">
              <div className="flex items-center gap-2 mb-6!">
                <ImageIcon className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-primary">
                  Event Image
                </h2>
              </div>

              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-12! text-center">
                <div className="flex flex-col items-center gap-4">
                  {form.getValues("image") ? (
                    <div className="w-full aspect-video rounded-lg flex items-center justify-center">
                      <Image
                        src={form.getValues("image")}
                        fill
                        alt="thumbnail"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 " />
                    </div>
                  )}
                  <div>
                    <p className="text-white mb-1!">
                      Drag & drop your event image here
                    </p>
                    <p className="text-gray-400 text-sm">
                      or click to browse files (JPEG, PNG, max 5MB)
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="rounded-lg p-6!">
              <div className="flex items-center gap-2 mb-6!">
                <Settings className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-primary">Status</h2>
              </div>

              <FormField
                control={form.control}
                name="eventStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Event status *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-1/2">
                          <SelectValue placeholder="Upcoming" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onSaveDraft}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                Publish Event
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
