"use client";

import { idk } from "@/lib/utils";
import { Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export function Direction({
  pick,
  drop,
  setRouteData,
  type,
  noRoute,
}: {
  pick: { lat: number; lng: number };
  drop: { lat: number; lng: number };
  setRouteData?: (leg: google.maps.DirectionsLeg) => void;
  type?: "busRoute" | "parkAndRide" | "pubPickup";
  noRoute?: boolean;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [route, setRoute] = useState<google.maps.DirectionsRoute>();

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionService(new routesLibrary.DirectionsService());

    const renderer = new routesLibrary.DirectionsRenderer({
      map,
      polylineOptions: {
        strokeColor: "#FF4081",
        strokeWeight: 4,
        strokeOpacity: noRoute ? 0 : 0.6,
      },
      suppressMarkers: true,
    });
    setDirectionRenderer(renderer);
  }, [map, noRoute, routesLibrary]);

  useEffect(() => {
    if (!directionService || !directionRenderer) return;

    directionService
      .route({
        origin: { lat: pick.lat, lng: pick.lng },
        destination: { lat: drop.lat, lng: drop.lng },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      })
      .then((response) => {
        const firstRoute = response.routes[0];
        if (!firstRoute) return;

        directionRenderer.setDirections(response);
        setRoute(firstRoute);

        const firstLeg = firstRoute.legs[0];
        if (setRouteData && firstLeg) {
          setRouteData(firstLeg); // ✅ send leg back to parent
        }
      });
  }, [
    directionRenderer,
    directionService,
    drop.lat,
    drop.lng,
    pick.lat,
    pick.lng,
    setRouteData,
  ]);

  return (
    <>
      <Marker
        position={{
          lat: route?.legs[0]?.start_location.lat() ?? 0,
          lng: route?.legs[0]?.start_location.lng() ?? 0,
        }}
        icon={{
          url:
            type === "pubPickup" ? "/icon/pub-pin.svg" : "/icon/route-pin.svg",
          scaledSize: {
            height: 35,
            width: 35,
            equals: (otherSize: idk) =>
              otherSize.width === 40 && otherSize.height === 40,
          },
        }}
      />
      <Marker
        position={{
          lat: route?.legs[0]?.end_location.lat() ?? 0,
          lng: route?.legs[0]?.end_location.lng() ?? 0,
        }}
      />
    </>
  );
}
