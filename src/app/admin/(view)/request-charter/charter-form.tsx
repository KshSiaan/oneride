"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CharterForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    passengers: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    purpose: "",
    instructions: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full mx-auto! text-foreground p-6! rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6!">
        <div className="space-y-2!">
          <Label htmlFor="clientName" className="text-foreground">
            Client Name *
          </Label>
          <Input
            id="clientName"
            type="text"
            placeholder="John"
            value={formData.clientName}
            onChange={(e) => handleInputChange("clientName", e.target.value)}
            className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
            required
          />
        </div>

        <div className="space-y-2!">
          <Label htmlFor="email" className="text-foreground">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="John@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
            required
          />
        </div>

        <div className="space-y-2!">
          <Label htmlFor="phone" className="text-foreground">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="01222222222"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
            required
          />
        </div>

        <div className="space-y-2!">
          <Label htmlFor="passengers" className="text-foreground">
            Number of Passengers *
          </Label>
          <Input
            id="passengers"
            type="text"
            placeholder="eg:25"
            value={formData.passengers}
            onChange={(e) => handleInputChange("passengers", e.target.value)}
            className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
            required
          />
        </div>

        <div className="space-y-2!">
          <Label htmlFor="pickupLocation" className="text-foreground">
            Pickup Location *
          </Label>
          <Input
            id="pickupLocation"
            type="text"
            placeholder="Address"
            value={formData.pickupLocation}
            onChange={(e) =>
              handleInputChange("pickupLocation", e.target.value)
            }
            className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
            required
          />
        </div>

        <div className="space-y-2!">
          <Label htmlFor="dropoffLocation" className="text-foreground">
            Drop-off Location *
          </Label>
          <Input
            id="dropoffLocation"
            type="text"
            placeholder="Address"
            value={formData.dropoffLocation}
            onChange={(e) =>
              handleInputChange("dropoffLocation", e.target.value)
            }
            className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
            required
          />
        </div>

        <div className="space-y-2!">
          <Label className="text-foreground">Pickup Date & Time *</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="dd/mm/yyyy"
              value={formData.pickupDate}
              onChange={(e) => handleInputChange("pickupDate", e.target.value)}
              className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
              required
            />
            <Input
              type="text"
              placeholder="9:50AM"
              value={formData.pickupTime}
              onChange={(e) => handleInputChange("pickupTime", e.target.value)}
              className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50"
              required
            />
          </div>
        </div>

        <div className="space-y-2!">
          <Label htmlFor="purpose" className="text-foreground">
            Purpose of Charter *
          </Label>
          <Select
            onValueChange={(value) => handleInputChange("purpose", value)}
            required
          >
            <SelectTrigger className="bg-background border-foreground/20 text-foreground w-full">
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent className="bg-background border-foreground/20">
              <SelectItem
                value="business"
                className="text-foreground hover:bg-foreground/10"
              >
                Business Trip
              </SelectItem>
              <SelectItem
                value="wedding"
                className="text-foreground hover:bg-foreground/10"
              >
                Wedding
              </SelectItem>
              <SelectItem
                value="airport"
                className="text-foreground hover:bg-foreground/10"
              >
                Airport Transfer
              </SelectItem>
              <SelectItem
                value="event"
                className="text-foreground hover:bg-foreground/10"
              >
                Special Event
              </SelectItem>
              <SelectItem
                value="tour"
                className="text-foreground hover:bg-foreground/10"
              >
                City Tour
              </SelectItem>
              <SelectItem
                value="other"
                className="text-foreground hover:bg-foreground/10"
              >
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2!">
          <Label htmlFor="instructions" className="text-foreground">
            Special Instructions
          </Label>
          <Textarea
            id="instructions"
            placeholder="Give any instruction"
            value={formData.instructions}
            onChange={(e) => handleInputChange("instructions", e.target.value)}
            className="bg-background border-foreground/20 text-foreground placeholder:text-foreground/50 min-h-[100px]"
            rows={4}
          />
        </div>

        <div className="w-full flex justify-end items-center gap-6">
          <Button type="reset" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className=" text-foreground">
            Submit Charter Request
          </Button>
        </div>
      </form>
    </div>
  );
}
