import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Create Blog Post</h1>
          <p>Manage and monitor all platform users from one place.</p>
        </div>
      </div>

      <div className="mt-12! space-y-6!">
        <div className="space-y-4!">
          <Label className="text-xl">Blog title</Label>
          <Input placeholder="enter blog post title" />
        </div>
        <div className="space-y-4!">
          <Label className="text-xl">Author</Label>
          <Input placeholder="enter blog post title" />
        </div>
        <div className="space-y-4!">
          <Label className="text-xl">Status</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Draft" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4!">
          <Label className="text-xl">Full Content</Label>
          <Editor style={{ height: "40dvh" }} />
        </div>
        <div className="space-x-4! flex justify-end items-center">
          <Button className="rounded-md" variant="outline">
            Cancel
          </Button>
          <Button className="rounded-md text-foreground">Create Post</Button>
        </div>
      </div>
    </section>
  );
}
