/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { getBlogByIdApi, editBlogApi } from "@/lib/api/core";
import ContentEditor from "./ContentEditor"; // import child
import { useEffect } from "react";
import { idk } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2),
  author: z.string().min(2),
  status: z.enum(["draft", "published", "archived"]),
  content: z.string().min(10),
  image: z.any().refine((file) => file instanceof File || file === null),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const params: idk = useParams();
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["blog", params.id],
    queryFn: (): idk => getBlogByIdApi(params.id),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      status: "draft",
      content: "",
      image: null,
    },
  });

  // Once data is loaded, reset form
  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title,
        author: data.data.author,
        status: data.data.status,
        content: data.data.content,
        image: null,
      });
    }
  }, [data, form]);

  const { mutate } = useMutation({
    mutationKey: ["edit_blog"],
    mutationFn: (values: FormValues) => {
      return editBlogApi(
        params.id,
        {
          title: values.title,
          author: values.author,
          status: values.status,
          content: values.content,
          image: values.image,
        },
        cookies.token
      );
    },
    onSuccess: (res: any) => {
      toast.success(res.message ?? "Blog updated successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/admin/blogs");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const onSubmit = (values: FormValues) => mutate(values);

  if (!data?.data) return <p>Loading...</p>;

  return (
    <section className="p-4">
      <h1 className="text-2xl">Edit Blog Post</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select {...field}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Editor (Child Component) */}
          <ContentEditor control={form.control} name="content" />

          {/* Submit */}
          <Button type="submit">Update Post</Button>
        </form>
      </Form>
    </section>
  );
}
