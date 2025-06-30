import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

import EventTable from "./event-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Partner Inquiries</h1>
          <p>
            Review and manage all partnership requests submitted through the
            website.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded text-foreground" size="lg">
              <PlusIcon />
              Add new ally
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Add new Ally</DialogTitle>
            </DialogHeader>
            <div className="py-12! space-y-4!">
              <Label>Ally Name </Label>
              <Input placeholder="Aa" />
              <Label>Location </Label>
              <Input placeholder="New york" />
              <Label>Website URL </Label>
              <Input placeholder="www.example.com" />
              <Label>Type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Label>Marketing Blurb</Label>
              <Textarea placeholder="Aa" />
              <div className="flex gap-2 items-center">
                <Label>Status </Label> <Switch />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="text-foreground">Save Ally</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <EventTable />
    </section>
  );
}
