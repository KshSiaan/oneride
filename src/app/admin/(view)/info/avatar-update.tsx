/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileApi } from "@/lib/api/core";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

// ---------------- Schema ----------------
const avatarSchema = z.object({
  image: z
    .custom<File>((file) => file instanceof File, "Please select a valid image")
    .refine((file) => file && file.size <= 2 * 1024 * 1024, {
      message: "Image must be less than 2MB",
    })
    .refine((file) => file && file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

type AvatarSchema = z.infer<typeof avatarSchema>;

export default function AvatarUpdate({ image }: { image: string }) {
  const [cookies] = useCookies(["token"]);
  const [preview, setPreview] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const qClient = useQueryClient();

  useEffect(() => {
    // ensures we only render after hydration
    setIsClient(true);
    setPreview(image || null);
  }, [image]);

  const form = useForm<AvatarSchema>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_profile"],
    mutationFn: (body: FormData) => updateUserProfileApi(body, cookies.token),
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to upload avatar");
    },
    onSuccess: (data: any) => {
      toast.success(data?.message ?? "Successfully Updated Avatar");
      qClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const onSubmit: SubmitHandler<AvatarSchema> = (values) => {
    const payload = new FormData();
    payload.append("image", values.image);
    mutate(payload);
  };

  if (!isClient) return null; // prevent server-side rendering

  return (
    <Form {...form}>
      <form className="flex flex-col items-center gap-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label htmlFor="profilepic">
                    <div className="w-32 h-32 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-zinc-950 transition-all ease-in-out overflow-hidden">
                      {preview ? (
                        <Image
                          height={128}
                          width={128}
                          src={preview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <ImageIcon className="text-secondary" />
                      )}
                    </div>
                  </label>
                  <input
                    id="profilepic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setPreview(URL.createObjectURL(file));
                        // 🚀 instantly trigger upload
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isPending && (
          <p className="text-sm text-muted-foreground">Uploading...</p>
        )}
      </form>
    </Form>
  );
}
