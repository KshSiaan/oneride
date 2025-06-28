"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Calendar,
  MapPin,
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

const formSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  venueName: z.string().min(1, "Venue name is required"),
  totalSeats: z.string().min(1, "Total seats is required"),
  ticketPrice: z.string().min(1, "Ticket price is required"),
  eventStatus: z.string().min(1, "Event status is required"),
});

export default function CreateEventPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: "",
      category: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      venueName: "",
      totalSeats: "",
      ticketPrice: "",
      eventStatus: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
          <p className="">
            Fill out the form below to create a new transportation event
          </p>
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
                  name="eventTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Event Title *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Shuttle service add new line"
                          className=" "
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
                        <SelectContent className="">
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
                        <Input type="date" className="" {...field} />
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
                        <Input type="date" className="" {...field} />
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
                        <Input type="time" className="" {...field} />
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
                        <Input type="time" className="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Location Details Section */}
            <div className="rounded-lg p-6!">
              <div className="flex items-center gap-2 mb-6!">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-primary">
                  Location Details
                </h2>
              </div>

              <FormField
                control={form.control}
                name="venueName"
                render={({ field }) => (
                  <FormItem className="mb-6!">
                    <FormLabel className="text-white">Venue Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. Wellington central market"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h3 className="mb-4!">Map Location</h3>
                <div className=" rounded-lg flex items-center justify-center">
                  <iframe
                    width="1200"
                    height="650"
                    loading="lazy"
                    className="border-0 w-[80dvw] mx-auto! block mt-12! h-[50dvh] col-span-2 grayscale brightness-[70%]"
                    src="https://www.google.com/maps/embed/v1/search?q=Murfreesboro&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                  ></iframe>
                </div>
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
                        <Input placeholder="eg. 10" className="" {...field} />
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
                        <Input placeholder="eg. $25" className="" {...field} />
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
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 " />
                  </div>
                  <div>
                    <p className="text-white mb-1!">
                      Drag & drop your event image here
                    </p>
                    <p className="text-gray-400 text-sm">
                      or click to browse files (JPEG, PNG, max 5MB)
                    </p>
                  </div>
                  <Button
                    type="button"
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    BROWSE FILES
                  </Button>
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
                      <SelectContent className="">
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
