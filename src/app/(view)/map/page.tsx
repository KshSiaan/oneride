"use client";
import { Direction } from "@/components/core/direction-maker";
import MapBase from "@/components/core/map";
import { Marker } from "@vis.gl/react-google-maps";
import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen">
      <MapBase>
        <Direction
          pick={{ lat: 23.8041, lng: 90.4152 }}
          drop={{ lat: 22.3752, lng: 91.8349 }}
        />
        <Marker position={{ lat: 25.3752, lng: 81.8349 }} />
      </MapBase>
    </main>
  );
}
