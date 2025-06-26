import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="px-[7%]! my-12! font-serif">
      <div className="w-full grid grid-cols-8 gap-6">
        <div className="col-span-5 space-y-6!">
          <Card className="">
            <CardHeader className="flex flex-row justify-start items-center gap-4 border-b">
              <div className="size-12 rounded-full bg-primary flex justify-center items-center">
                <Phone fill="#ffffff" />
              </div>
              <div className="font-semibold">
                <h2>Contact Details</h2>
                <p className="text-sm text-muted-foreground">
                  To Recieve your E-tickets & updates
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-12! grid grid-cols-2 gap-6">
              <div className="space-y-4!">
                <Label>Mobile no.</Label>
                <Input placeholder="+123" />
              </div>
              <div className="space-y-4!">
                <Label>Email</Label>
                <Input placeholder="email@email.com" />
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row justify-start items-center gap-4 border-b">
              <div className="size-12 rounded-full bg-primary flex justify-center items-center">
                <Phone fill="#ffffff" />
              </div>
              <div className="font-semibold">
                <h2>Passanger Details</h2>
                <p className="text-sm text-muted-foreground">
                  To Recieve your E-tickets & updates
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-12! grid grid-cols-2 gap-6">
              <div className="space-y-4!">
                <Label>First name</Label>
                <Input placeholder="Enter name" />
              </div>
              <div className="space-y-4!">
                <Label>Last name</Label>
                <Input placeholder="Enter name" />
              </div>
              <div className="flex justify-start items-center gap-2">
                <Label>Select Gener :</Label>
                <Button
                  className="border-primary! border-2 py-2!"
                  size="sm"
                  variant={"outline"}
                >
                  Male
                </Button>
                <Button
                  className=" border-2 py-2!"
                  size="sm"
                  variant={"outline"}
                >
                  Female
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3 h-12">
          <Card className="w-full">
            <CardHeader className="flex items-center gap-2">
              <Image
                src="/icon/hanif.png"
                height={64}
                width={64}
                alt="hanif"
                className="size-12"
              />
              <p className="text-3xl">HBL Enterprise</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between items-center text-muted-foreground">
                <p>Fare</p>
                <p>Seats</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-xl text-green-600">$60</p>
                <p className="text-primary text-xl">A1</p>
              </div>
              <div className="flex flex-row justify-between items-center mt-6! text-muted-foreground">
                <p className="">Departure </p>
                <p className="">Arrival</p>
              </div>
              <div className="flex flex-row justify-between items-center  text-xl">
                <p className="">New york</p>
                <p className="">Los angeles</p>
              </div>
              <div className="flex flex-row justify-between items-center text-xl">
                <p className="">06:00 AM</p>
                <p className="">12:00 PM</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="">Fri,13 Jun</p>
                <p className="">Fri,13 Jun</p>
              </div>
              <p className="text-muted-foreground py-6!">BOARDING POINT</p>
              <div className="flex flex-row justify-between items-center">
                <p className="">NY Bus station</p>
                <p className="">LA Bus station</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="text-foreground w-full rounded-md text-xl py-6! uppercase"
                asChild
              >
                <Link href="/add-rides/details/payment">
                  Proceed to payment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
