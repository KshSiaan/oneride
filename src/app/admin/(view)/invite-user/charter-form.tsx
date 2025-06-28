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
            Full name
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
            Email Address
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
          <Label htmlFor="instructions" className="text-foreground">
            Role
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2!">
          <Label htmlFor="instructions" className="text-foreground">
            Optional Message
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
          <Button type="submit" className=" text-foreground">
            Send Invitation
          </Button>
        </div>
      </form>
    </div>
  );
}
