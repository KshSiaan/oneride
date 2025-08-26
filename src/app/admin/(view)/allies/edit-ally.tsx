"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
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
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAllyApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

// same Zod schema as AddAlly
const allySchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["pub", "restaurant", "venue"]),
  status: z.enum(["active", "inactive"]),
  websiteURL: z.string().url("Enter a valid URL"),
  marketingBlurb: z.string().min(1, "Marketing blurb is required"),
  image: z
    .any()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "File must be an image"
    )
    .optional(),
});

type AllyForm = z.infer<typeof allySchema>;

export default function EditAlly({
  ally,
}: {
  ally: AllyForm & { _id: string };
}) {
  const [cookies] = useCookies(["token"]);
  const qClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["edit_ally"],
    mutationFn: (body: AllyForm) => editAllyApi(ally._id, body, cookies.token),
    onError: (err) => {
      toast.error(err.message ?? "Failed to edit ally");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Ally updated successfully");
      qClient.invalidateQueries({ queryKey: ["allies"] });
    },
  });

  const form = useForm<AllyForm>({
    resolver: zodResolver(allySchema),
    defaultValues: {
      name: ally.name,
      location: ally.location,
      type: ally.type,
      status: ally.status,
      websiteURL: ally.websiteURL || "",
      marketingBlurb: ally.marketingBlurb || "",
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<AllyForm> = (data) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <EditIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit Ally</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ally Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="websiteURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pub">Pub</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="venue">Venue</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingBlurb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marketing Blurb</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Marketing Blurb" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-start gap-4">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value === "active"}
                      onCheckedChange={(val) =>
                        field.onChange(val ? "active" : "inactive")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Ally</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
