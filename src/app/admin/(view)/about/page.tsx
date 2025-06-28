import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { EditIcon, PlusIcon, UploadCloud, User2Icon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">About us</h1>
          <p>Admin can edit personal information</p>
        </div>
      </div>
      <Card className="mt-6!">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <Label className="text-start w-full text-xl">Header Text</Label>
          <Input placeholder="Who we are" />
        </CardContent>
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <Label className="text-start w-full text-xl">Sub Text</Label>
          <Input placeholder="Who we are" />
        </CardContent>
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <Label className="text-start w-full text-xl">Hero Image</Label>
          <div className="w-full rounded-md border-2 border-dashed flex flex-col justify-center items-center py-12! gap-3 text-muted-foreground">
            <UploadCloud className="size-10 text-primary" />
            <h3>Drag & drop your event image here</h3>
            <p>or click to browse files (JPEG, PNG,, max 5MB) </p>
            <label htmlFor="heroimg">
              <Button type="button" className="text-foreground rounded-md">
                BROWSE FILES
              </Button>
            </label>
            <input type="file" id="heroimg" name="heroimg" className="hidden" />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6!">
        <CardHeader className="">
          <CardTitle className="flex items-center justify-between gap-2 text-xl">
            <div className="flex items-center">
              <User2Icon className="size-7 text-primary" />
              Edit Team member
            </div>
            <Button className="text-foreground rounded-md">
              <PlusIcon />
              Add
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6! text-center space-y-6! grid grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex flex-col justify-center items-center gap-4">
                <Avatar className="size-18">
                  <AvatarImage src={`https://avatar.iran.liara.run/public}`} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <h3>David Jhonson</h3>
                <div className="flex items-center">
                  <p>Chief Executive Officer</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-primary" variant="ghost">
                        <EditIcon className="size-6" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex justify-center items-center flex-col gap-4">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <div className="w-full flex flex-col justify-center items-center gap-4">
                        <Avatar className="size-18">
                          <AvatarImage
                            src={`https://avatar.iran.liara.run/public}`}
                          />
                          <AvatarFallback>UI</AvatarFallback>
                        </Avatar>
                        <div className="w-full space-y-4! bg-re">
                          <Label>Name</Label>
                          <Input placeholder="raven" />
                        </div>
                        <div className="w-full space-y-4!">
                          <Label>Role</Label>
                          <Input placeholder="Programmer" />
                        </div>
                      </div>
                      <DialogFooter className="">
                        <DialogClose asChild>
                          <Button className="rounded-md" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button className="text-foreground rounded-md">
                          Update
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
