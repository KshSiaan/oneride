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
import { createPickupsApi } from "@/lib/api/core";

import { idk } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeftIcon, ArrowRight, Trash2Icon } from "lucide-react";
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
  const [departureTime, setDepartureTime] = useState("");
  const [cookies] = useCookies(["token"]);

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
    }) => createPickupsApi(data, cookies.token),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Route added successfully");
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
      // ✅ departure time formatted to ISO string
      departureTime: new Date(departureTime).toISOString(),
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
        <CardHeader>
          <CardTitle>Available Pickups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                LOL <ArrowRight className="size-4 text-muted-foreground" /> LOL
              </div>
              <div>
                <Button variant={"ghost"} size={"icon"}>
                  <Trash2Icon className="text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                LOL <ArrowRight className="size-4 text-muted-foreground" /> LOL
              </div>
              <div>
                <Button variant={"ghost"} size={"icon"}>
                  <Trash2Icon className="text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}
