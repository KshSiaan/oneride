import {
  Calendar,
  CreditCard,
  Mail,
  Phone,
  User,
  Users,
  X,
  Send,
  Settings,
  CalendarCheck,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Structured data object
const bookingData = {
  booking: {
    id: "#BK-2002-1969",
    date: "10 Jun 2025, 2:00 PM",
    seats: 4,
    totalAmount: "$120.00 NZD",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    event: "Wellington Night Market",
  },
  user: {
    name: "Sarah Johnson",
    email: "Sarah@example.com",
    phone: "+01222222222",
    accountStatus: "Active",
  },
  payment: {
    transactionId: "TXN-465675847",
    method: "Visa ****4562",
    date: "10 Jun 2025, 6:30 PM",
  },
};

export default function Page() {
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
        <Card className="">
          <CardHeader className=" ">
            <CardTitle className="flex items-center gap-2 ">
              <Calendar className="h-5 w-5 text-primary" />
              Bookings Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6! pt-0!">
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-6!">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1!">
                    # Booking ID
                  </p>
                  <p className="text-lg font-semibold">
                    {bookingData.booking.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1!">
                    $ Total Amount
                  </p>
                  <p className="text-lg font-semibold">
                    {bookingData.booking.totalAmount}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-4! flex items-center gap-2">
                    <CalendarCheck className="size-4" /> Event
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    {bookingData.booking.event}
                  </p>
                </div>
              </div>

              <div className="space-y-6!">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1!">
                    # Booking Date
                  </p>
                  <p className="text-lg font-semibold">
                    {bookingData.booking.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-4! flex items-center gap-2">
                    <CreditCard className="size-4" /> Payment Status
                  </p>
                  <Badge variant="secondary" className="bg-green-500">
                    {bookingData.booking.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div className="space-y-6!">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1!">
                    # Number of Seats
                  </p>
                  <p className="text-lg font-semibold">
                    {bookingData.booking.seats}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-4! flex items-center gap-2">
                    <Calendar className="size-4" /> Booking Status
                  </p>
                  <Badge variant="secondary" className="bg-green-500">
                    {bookingData.booking.bookingStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Information */}
        <Card className="">
          <CardHeader className="">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6!">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1! flex items-center gap-1">
                  <User className="h-4 w-4" /> Name
                </p>
                <p className="text-lg font-semibold">{bookingData.user.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1! flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email
                </p>
                <p className="text-lg font-semibold">
                  {bookingData.user.email}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1! flex items-center gap-1">
                  <Phone className="h-4 w-4" /> Phone
                </p>
                <p className="text-lg font-semibold">
                  {bookingData.user.phone}
                </p>
              </div>
            </div>

            <Separator className="my-6!" />

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2! flex items-center gap-1">
                <Users className="h-4 w-4" /> Account Status
              </p>
              <Badge variant="secondary" className="bg-green-500">
                {bookingData.user.accountStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="">
          <CardHeader className="">
            <CardTitle className="flex items-center gap-2 ">
              <CreditCard className="h-5 w- text-primary" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6!">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1!">
                  # Transaction ID
                </p>
                <p className="text-lg font-semibold">
                  {bookingData.payment.transactionId}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1! flex items-center gap-2">
                  <CreditCard className="size-4" /> Payment Method
                </p>
                <p className="text-lg font-semibold">
                  {bookingData.payment.method}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1! flex items-center gap-2">
                  <Coins className="size-4" /> Payment Date
                </p>
                <p className="text-lg font-semibold">
                  {bookingData.payment.date}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Actions */}
        <Card className="">
          <CardHeader className="">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Booking Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Button variant="destructive" className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel Booking
              </Button>
              <Button variant="outline" className="">
                <Send className="h-4 w-4" />
                Resend Confirmation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
