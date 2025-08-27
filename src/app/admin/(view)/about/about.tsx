/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Loader2Icon, UploadCloud } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addAboutUsApi, getAboutUsApi } from "@/lib/api/core";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { imgCreator } from "@/lib/func/functions";

// ---- schema ----
// ---- schema ----
const aboutSchema = z.object({
  headerText: z.string().min(1, "Header text is required"),
  subText: z.string().min(1, "Sub text is required"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file === undefined || file.size > 0, {
      message: "Image is required",
    }),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

export default function About() {
  const [cookies] = useCookies(["token"]);

  // ---- query ----
  const { data, isPending, refetch } = useQuery({
    queryKey: ["about"],
    queryFn: (): idk => getAboutUsApi(cookies.token),
  });

  // ---- mutation ----
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationKey: ["about_update"],
    mutationFn: (data: {
      headerText: string;
      subText: string;
      image?: File | null | undefined;
    }) => addAboutUsApi(data, cookies.token),
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Successfully updated About Us");
      refetch();
    },
  });

  // ---- form ----
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      headerText: "",
      subText: "",
      image: undefined,
    },
  });

  // prefill when query data arrives
  useEffect(() => {
    if (data?.data) {
      form.reset({
        headerText: data.data.headerText ?? "",
        subText: data.data.subText ?? "",
        image: undefined, // we don’t prefill file input
      });
    }
  }, [data, form]);

  const onSubmit = (values: AboutFormValues) => {
    mutate({
      headerText: values.headerText,
      subText: values.subText,
      image: values.image,
    });
  };

  return (
    <Card className="mt-6!">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <FormField
              control={form.control}
              name="headerText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Header Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Who we are" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sub Text */}
            <FormField
              control={form.control}
              name="subText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Sub Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Our story" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hero Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Hero Image</FormLabel>
                  <FormControl>
                    <div className="w-full rounded-md border-2 border-dashed flex flex-col justify-center items-center py-12 gap-3 text-muted-foreground">
                      <UploadCloud className="size-10 text-primary" />
                      <h3>Drag & drop your event image here</h3>
                      <p>or click to browse files (JPEG, PNG, max 5MB) </p>

                      <Input
                        className="w-1/2 mx-auto cursor-pointer"
                        type="file"
                        id="heroimg"
                        name="heroimg"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) field.onChange(file);
                        }}
                      />
                      {field.value && (
                        <p className="text-sm text-green-600 mt-2">
                          {field.value.name}
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-1/2 mx-auto aspect-[3/1]">
              {isPending ? (
                <div
                  className={`flex justify-center items-center h-24 mx-auto`}
                >
                  <Loader2Icon className={`animate-spin`} />
                </div>
              ) : (
                <Image
                  src={
                    data.data.heroImage
                      ? imgCreator(data.data.heroImage)
                      : "https://placehold.co/1200x400"
                  }
                  height={1200}
                  width={400}
                  className="w-full"
                  alt="thumbnail"
                />
              )}
            </div>

            <Button
              type="submit"
              className="rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
