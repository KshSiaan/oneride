import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon, FileDownIcon, TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";

import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function EventTable() {
  const customers = [
    {
      icon: "https://avatar.iran.liara.run/public",
      name: "Liam Bentley",
      location: "New York, United States",
      url: "www.thegoldenpint.com",
      type: "Pub",
      status: "Active",
    },
    {
      icon: "https://avatar.iran.liara.run/public",
      name: "Liam Bentley",
      location: "New York, United States",
      url: "www.thegoldenpint.com",
      type: "Pub",
      status: "Active",
    },
  ];

  return (
    <>
      <Table className="mt-12!">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">Icon</TableHead>
            <TableHead className="text-center">Ally Name</TableHead>
            <TableHead className="text-center">Location</TableHead>
            <TableHead className="text-center">Website URL</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((x, index) => (
            <TableRow key={index}>
              <TableCell className="text-center flex items-center justify-center">
                <Avatar className="size-12">
                  <AvatarImage src={`https://avatar.iran.liara.run/public}`} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-center">{x.name}</TableCell>
              <TableCell className="text-center">{x.location}</TableCell>
              <TableCell className="text-center">
                <Button variant="link" asChild>
                  <Link href={x.url}>{x.url}</Link>
                </Button>
              </TableCell>
              <TableCell className="text-center">{x.type}</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-700">{x.status}</Badge>
              </TableCell>
              <TableCell className="text-center !space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EditIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Edit Ally
                      </DialogTitle>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-destructive"
                      size="icon"
                    >
                      <TrashIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="left">
                    <PopoverArrow />
                    <h3>Are you sure?</h3>
                    <CardDescription>
                      You are going to delete this user account and this cannot
                      be undone.
                    </CardDescription>
                    <PopoverClose asChild>
                      <Button variant="destructive" className="text-sm !mt-6">
                        <TrashIcon />
                        Delete
                      </Button>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex flex-row justify-between items-center mt-12!">
        <div className=""></div>
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Button variant={"outline"} className="rounded">
          <FileDownIcon />
          Export PDF
        </Button>
      </div>
    </>
  );
}
