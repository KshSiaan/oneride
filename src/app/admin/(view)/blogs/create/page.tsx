"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Editor } from "primereact/editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBlogApi, getOwnProfileApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { idk } from "@/lib/utils";

// ✅ Zod schema
const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  author: z.string().min(2, "Author name is required"),
  status: z.enum(["draft", "published", "archived"]),
  content: z.string().min(10, "Content is too short"),
  image: z
    .any()
    .refine((file) => file instanceof File || file === null, "Invalid file"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const [editorValue, setEditorValue] = useState("");
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: (): idk => {
      return getOwnProfileApi(cookies.token);
    },
  });
  const navig = useRouter();
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
  const qCLient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["create_blog"],
    mutationFn: (data: {
      title: string;
      author: string;
      status: string;
      content: string;
      image: File | null;
    }) => {
      return addBlogApi(data, cookies.token);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data.message ?? "Blog added successfully");
      qCLient.invalidateQueries({ queryKey: ["blogs"] });
      navig.push("/admin/blogs");
    },
  });
  useEffect(() => {
    if (!isPending) {
      form.setValue("author", data.data.name);
    }

    return () => {};
  }, [isPending]);
  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("status", values.status);
    formData.append("content", editorValue);
    if (values.image) {
      formData.append("image", values.image);
    }

    mutate({
      ...values,
      content: editorValue,
      image: values.image ?? null,
    });
  };

  return (
    <section className="p-4!">
      <div className="space-y-3!">
        <h1 className="text-2xl">Create Blog Post</h1>
        <p>Manage and monitor all platform users from one place.</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12! space-y-6!"
        >
          {/* Cover Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Blog title</FormLabel>
                <FormControl>
                  <Input placeholder="enter blog post title" {...field} />
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
                <FormLabel className="text-xl">Author</FormLabel>
                <FormControl>
                  <Input placeholder="enter author name" {...field} />
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
                <FormLabel className="text-xl">Status</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem>
                <FormLabel className="text-xl">Full Content</FormLabel>
                <FormControl>
                  <Editor
                    style={{ height: "40dvh" }}
                    value={editorValue}
                    onTextChange={(e) => {
                      setEditorValue(e.htmlValue || "");
                      form.setValue("content", e.htmlValue || "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="text-foreground">
              Create Post
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
