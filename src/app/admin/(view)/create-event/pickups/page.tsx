/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Direction } from "@/components/core/direction-maker";
import LocationPicker from "@/components/core/location-picker";
import MapBase from "@/components/core/map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createPickupsApi,
  deletePickupsApi,
  getPickupsApi,
} from "@/lib/api/core";
import { dateExtractor, timeExtractor } from "@/lib/func/functions";

import { idk } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowLeftIcon,
  ArrowRight,
  ClockIcon,
  Loader2Icon,
  MapPin,
  RouteIcon,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const navig = useRouter();
  const [fromLocation, setFromLocation] = useState<idk>();
  const [toLocation, setToLocation] = useState<idk>();
  const [routeData, setRouteData] = useState<idk>();
  const [pickupType, setPickupType] = useState<
    "busRoute" | "parkAndRide" | "pubPickup" | ""
  >("");
  const [selectedPickupType, setSelectedPickupType] = useState<
    "busRoute" | "parkAndRide" | "pubPickup" | "all" | ""
  >("");
  const [departureTime, setDepartureTime] = useState("");
  const [price, setPrice] = useState<string>("");
  const [cookies] = useCookies(["token"]);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["transport", selectedPickupType],
    queryFn: (): idk => {
      return getPickupsApi(
        selectedPickupType === "all" ? "" : selectedPickupType
      );
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["add_transport"],
    mutationFn: (data: {
      type: "busRoute" | "parkAndRide" | "pubPickup";
      pickUpPoint: {
        name: string;
        lat: string;
        lng: string;
      };
      dropOffPoint: {
        name: string;
        lat: string;
        lng: string;
      };
      duration: string;
      departureTime: string;
      price: string;
    }) => createPickupsApi(data, cookies.token),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Route added successfully");
      refetch();
    },
  });

  const { mutate: deleteTransport } = useMutation({
    mutationKey: ["add_transport"],
    mutationFn: (id: string) => deletePickupsApi(id),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Route deleted successfully");
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!pickupType) {
      toast.error("Please select a pickup type");
      return;
    }
    if (!fromLocation || !toLocation) {
      toast.error("Please select both pickup and venue locations");
      return;
    }
    if (!departureTime) {
      toast.error("Please select a departure time");
      return;
    }
    if (!routeData?.duration) {
      toast.error("Route info not loaded yet");
      return;
    }
    if (!price) {
      toast.error("Please give this route a valid price");
      return;
    }

    mutate({
      type: pickupType,
      pickUpPoint: {
        name: fromLocation.address,
        lat: fromLocation.lat,
        lng: fromLocation.lng,
      },
      dropOffPoint: {
        name: toLocation.address,
        lat: toLocation.lat,
        lng: toLocation.lng,
      },
      duration: String(routeData.duration.value / 60),
      departureTime: new Date(departureTime).toISOString(),
      price,
    });
  };

  return (
    <main>
      <div className="flex items-center gap-2">
        <Button
          variant={"ghost"}
          onClick={() => {
            navig.back();
          }}
        >
          <ArrowLeftIcon />
          Go Back
        </Button>
      </div>

      <h2 className="text-3xl">Manage Pickups</h2>

      <div className="w-full space-y-6 mt-12">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Create a new Pickup point</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Pickup Type</Label>
                <Select onValueChange={(val) => setPickupType(val as any)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Pickup type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parkAndRide">Park & Ride</SelectItem>
                    <SelectItem value="pubPickup">Pub Pickup</SelectItem>
                    <SelectItem value="busRoute">Bus Route</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Pickup Location</Label>
                <LocationPicker
                  onLocationSelect={(locationData) => {
                    if (locationData) setFromLocation(locationData);
                  }}
                />
              </div>

              <div className="space-y-4">
                <Label>Venue Location</Label>
                <LocationPicker
                  onLocationSelect={(locationData) => {
                    if (locationData) setToLocation(locationData);
                  }}
                />
              </div>

              <div className="space-y-4">
                <Label>Departure Time</Label>
                <Input
                  type="datetime-local"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="Route Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {fromLocation && toLocation && (
                <div className="w-full mt-6">
                  <MapBase className="h-[50dvh] w-full">
                    <Direction
                      pick={{ lat: fromLocation.lat, lng: fromLocation.lng }}
                      drop={{ lat: toLocation.lat, lng: toLocation.lng }}
                      setRouteData={setRouteData}
                    />
                  </MapBase>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button type="submit">Add Pickup</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
      <Card className="mt-12">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Available Pickups</CardTitle>
          <Select onValueChange={(val) => setSelectedPickupType(val as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Pickup type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="parkAndRide">Park & Ride</SelectItem>
              <SelectItem value="pubPickup">Pub Pickup</SelectItem>
              <SelectItem value="busRoute">Bus Route</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-6 max-h-dvh overflow-auto">
          {isPending ? (
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          ) : (
            data.data.map((trip: idk) => (
              <Card
                key={trip._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  {/* Route Section */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <MapPin className="size-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium truncate">
                        {trip?.pickUpPoint?.name ?? "N/A"}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium truncate">
                        {trip?.dropOffPoint?.name ?? "N/A"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTransport(trip._id)}
                      className="text-muted-foreground hover:text-destructive flex-shrink-0"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>

                  {/* Trip Details */}
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="size-4" />
                      <span>
                        {timeExtractor(trip.departureTime)} •{" "}
                        {dateExtractor(trip.departureTime)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <RouteIcon className="size-4" />
                      <span>{trip.type}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {Number.parseInt(trip.duration)} min
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </main>
  );
}
