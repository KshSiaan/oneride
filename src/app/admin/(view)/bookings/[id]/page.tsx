import { notFound } from "next/navigation";
import Booking from "./booking";

// Structured data object

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const store = await params;
  const id = store.id;
  if (!id) {
    return notFound();
  }
  return (
    <div className="bg-background p-8">
      <div className="w-full space-y-8!">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Booking Details</h1>
          <p className="text-xl text-muted-foreground">
            Complete overview of this booking and the user who made it
          </p>
        </div>

        {/* Bookings Summary */}
        {id && <Booking id={id} />}
      </div>
    </div>
  );
}
