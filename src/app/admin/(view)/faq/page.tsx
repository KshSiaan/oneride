/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3Icon, Loader2Icon, Trash2Icon } from "lucide-react";
import React from "react";
import Add from "./add";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFaqApi, getFaqsApi, updateFaqApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
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
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const [cookies] = useCookies(["token"]);
  const qClient = useQueryClient();
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const { data, isPending } = useQuery({
    queryKey: ["faq"],
    queryFn: (): idk => getFaqsApi(cookies.token),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { question: "", answer: "" },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormValues }) =>
      updateFaqApi(id, data, cookies.token),
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to update FAQ");
    },
    onSuccess: (res: any) => {
      toast.success(res.message ?? "FAQ updated successfully");
      qClient.invalidateQueries({ queryKey: ["faq"] });
      reset();
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFaqApi(id, cookies.token),
    onError: (err: any) => toast.error(err.message ?? "Failed to delete FAQ"),
    onSuccess: () => {
      toast.success("FAQ deleted successfully");
      qClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!editingId) return;
    updateMutation.mutate({ id: editingId, data });
  };

  const handleEditClick = (faq: idk) => {
    setEditingId(faq._id);
    reset({ question: faq.question, answer: faq.answer });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl">FAQ Management</h1>
        <Add />
      </div>

      <div className="space-y-6">
        {isPending ? (
          <div className="flex justify-center items-center h-24 mx-auto">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          data.data.map((faq: idk) => (
            <Card key={faq._id} className="gap-2">
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex-1 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
                <div className="flex gap-2">
                  {/* Edit Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => handleEditClick(faq)}
                      >
                        <Edit3Icon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingId ? "Edit FAQ" : "Add New FAQ"}
                        </DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={control}
                            name="question"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Question</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter your question"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name="answer"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Answer</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="Enter the answer"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter className="flex justify-end space-x-2">
                            <DialogClose asChild>
                              <Button type="button" variant="outline">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting
                                ? editingId
                                  ? "Updating..."
                                  : "Adding..."
                                : editingId
                                ? "Update FAQ"
                                : "Add FAQ"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Button */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="text-destructive">
                        <Trash2Icon />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={() => deleteMutation.mutate(faq._id)}>
                          Delete FAQ
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
