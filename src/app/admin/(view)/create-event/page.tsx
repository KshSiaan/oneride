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
  Loader2Icon,
  ArrowDown,
  MapPin,
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
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createEventApi,
  getCategoriesApi,
  getPickupsApi,
} from "@/lib/api/core";
import type { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  venueName: z.string().min(1, "Venue name is required"),
  totalSeat: z.string().min(1, "Total seats is required"),
  ticketPrice: z.string().min(1, "Ticket price is required"),
  adminStatus: z.enum(["active", "draft", "ended"]),
  websiteStatus: z.enum(["upcoming", "featured"]),
  transportation: z.array(z.string().min(1)),
  eventStatus: z.enum(["active", "inactive", "ended"]),
  image: z.any(),
});

export default function CreateEventPage() {
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["routes"],
    queryFn: (): idk => {
      return getPickupsApi();
    },
  });

  const { data: categories, isPending: categoryPending }: idk = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });
  const { mutate } = useMutation({
    mutationKey: ["add_event"],
    mutationFn: ({
      data,
      adminStat,
    }: {
      data: z.infer<typeof formSchema>;
      adminStat: string;
    }) => {
      const formData = new FormData();

      const startDateTime = new Date(
        `${data.startDate}T${data.startTime}:00Z`
      ).toISOString();
      const endDateTime = new Date(
        `${data.endDate}T${data.endTime}:00Z`
      ).toISOString();

      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("startDate", startDateTime);
      formData.append("endDate", endDateTime);
      formData.append("startTime", startDateTime);
      formData.append("endTime", endDateTime);
      formData.append("venueName", data.venueName);
      formData.append("totalSeat", data.totalSeat);
      formData.append("ticketPrice", data.ticketPrice);
      formData.append("adminStatus", adminStat);
      formData.append("websiteStatus", data.websiteStatus);
      formData.append("eventStatus", data.eventStatus);
      formData.append("transports", JSON.stringify(data.transportation));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      return createEventApi(formData, cookies.token);
    },

    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Event Created Successfully");
      form.reset();
    },
  });

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
      venueName: "",
      transportation: [],
      totalSeat: "", // ✅ string
      ticketPrice: "", // ✅ string
      adminStatus: "draft",
      websiteStatus: "upcoming",
      eventStatus: "active", // ✅ default
      image: undefined,
    },
  });

  const selectedRoutes = form.watch("transportation");

  // Add new empty select
  function addRoute() {
    form.setValue("transportation", [...selectedRoutes, ""]);
  }

  // Remove a select if needed (optional)
  function removeRoute(index: number) {
    const updated = [...selectedRoutes];
    updated.splice(index, 1);
    form.setValue("transportation", updated);
  }
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({ data, adminStat: "active" });
  };

  function onSaveDraft() {
    mutate({ data, adminStat: "draft" });
  }

  function onCancel() {
    form.reset();
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
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="space-y-6!"
          >
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
                        {!categoryPending && (
                          <SelectContent>
                            {categories.data.map((x: idk) => (
                              <SelectItem value={x._id} key={x._id}>
                                {x.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        )}
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
              <div className="flex items-center gap-2 mb-6!">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-primary">
                  Venue Information
                </h2>
              </div>

              <FormField
                control={form.control}
                name="venueName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Venue Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. Auckland Convention Centre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg p-6!">
              {/* Transportation Routes */}
              {isPending ? (
                <div
                  className={`flex justify-center items-center h-24 mx-auto`}
                >
                  <Loader2Icon className={`animate-spin`} />
                </div>
              ) : (
                <div className="mb-4 space-y-6">
                  <h3 className="mb-4!">Select Routes</h3>

                  {selectedRoutes.map((routeId, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`transportation.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-3">
                            <FormControl className="flex-1">
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full py-4 px-3 h-auto!">
                                  <SelectValue placeholder="Select Route" />
                                </SelectTrigger>
                                <SelectContent>
                                  {data.data
                                    .filter(
                                      (x: idk) =>
                                        !selectedRoutes.includes(x._id) ||
                                        x._id === field.value
                                    )
                                    .map((x: idk) => (
                                      <SelectItem key={x._id} value={x._id}>
                                        <div className="flex items-center gap-3">
                                          {/* Pickup */}
                                          <div className="flex-1 min-w-0">
                                            <p className="truncate font-medium text-foreground">
                                              {x.pickUpPoint.name.length > 50
                                                ? x.pickUpPoint.name.slice(
                                                    0,
                                                    50
                                                  ) + "…"
                                                : x.pickUpPoint.name}
                                            </p>
                                            <span className="text-xs text-muted-foreground">
                                              Pickup
                                            </span>
                                          </div>
                                          <ArrowDown className="size-4 shrink-0 text-muted-foreground rotate-[-90deg]" />
                                          {/* Dropoff */}
                                          <div className="flex-1 min-w-0 text-right">
                                            <p className="truncate font-medium text-foreground">
                                              {x.dropOffPoint.name.length > 50
                                                ? x.dropOffPoint.name.slice(
                                                    0,
                                                    50
                                                  ) + "…"
                                                : x.dropOffPoint.name}
                                            </p>
                                            <span className="text-xs text-muted-foreground">
                                              Dropoff
                                            </span>
                                          </div>
                                        </div>
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </FormControl>

                            {/* ✅ Remove Route Button */}
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeRoute(index)}
                              className="shrink-0"
                            >
                              Remove
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  <div className="flex justify-end items-center mt-6">
                    <Button
                      type="button"
                      onClick={addRoute}
                      className="rounded-md!"
                    >
                      Add Route
                    </Button>
                  </div>
                </div>
              )}
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
                  name="totalSeat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Total seat *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="eg. 10"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value || 0)}
                        />
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
                        Ticket Price (BDT) *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="eg. 25"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value || 0)}
                        />
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
                name="websiteStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Website status *
                    </FormLabel>
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
                        <SelectItem value="featured">Featured</SelectItem>
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
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onSaveDraft}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
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
