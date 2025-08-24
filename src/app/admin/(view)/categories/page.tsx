"use client";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  addCategoryApi,
  getCategoriesApi,
  deleteCategoryApi,
  editCategoryApi,
} from "@/lib/api/core";
import { Edit3Icon, Loader2Icon, PlusIcon, Trash2 } from "lucide-react";
import { idk } from "@/lib/utils";

export default function Page() {
  const [cookies] = useCookies(["token"]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");

  const { data, isPending, refetch }: idk = useQuery({
    queryKey: ["category"],
    queryFn: getCategoriesApi,
  });

  const addMutation = useMutation({
    mutationFn: (data: { name: string }) => addCategoryApi(data, cookies.token),
    onSuccess: () => {
      setNewCategory("");
      refetch();
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: { id: string; name: string }) =>
      editCategoryApi(data.id, { name: data.name }, cookies.token),
    onSuccess: () => {
      setEditCategoryId("");
      setEditCategoryName("");
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategoryApi(id, cookies.token),
    onSuccess: () => refetch(),
  });

  return (
    <section className="p-4">
      <div className="flex justify-between items-center w-full mb-6">
        <div className="space-y-3">
          <h1 className="text-2xl">Categories</h1>
          <p className="text-muted-foreground">
            Organize and manage event categories for better user filtering and
            event discovery
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your categories & subcategories</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {isPending ? (
            <>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </>
          ) : (
            data?.data?.map((x: idk) => (
              <div
                className="flex flex-row justify-between items-center py-2 px-4 border rounded-lg"
                key={x._id}
              >
                <h3>{x.name}</h3>
                <div className="flex gap-2 text-primary">
                  {/* Edit Dialog */}
                  <Dialog
                    open={editCategoryId === x._id}
                    onOpenChange={(open) => {
                      if (!open) setEditCategoryId("");
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditCategoryId(x._id);
                          setEditCategoryName(x.name);
                        }}
                      >
                        <Edit3Icon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit your category</DialogTitle>
                      </DialogHeader>
                      <div className="w-full mb-4">
                        <Input
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          placeholder="Category name"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <Button
                          className="text-foreground rounded-lg px-12"
                          onClick={() =>
                            editMutation.mutate({
                              id: x._id,
                              name: editCategoryName,
                            })
                          }
                          disabled={!editCategoryName || editMutation.isPending}
                        >
                          {!editMutation.isPending ? (
                            "Update"
                          ) : (
                            <Loader2Icon className="animate-spin" />
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Alert */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost">
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-primary">
                          Delete Category
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          If you delete the category, it will be permanently
                          removed from your app.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(x._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          )}
        </CardContent>

        {/* Add Category */}
        <CardFooter className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-foreground rounded-lg" size="lg">
                <PlusIcon /> Add a new category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your category</DialogTitle>
              </DialogHeader>
              <div className="w-full mb-4">
                <Input
                  placeholder="Category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button
                  className="text-foreground rounded-lg px-12"
                  onClick={() => addMutation.mutate({ name: newCategory })}
                  disabled={!newCategory || addMutation.isPending}
                >
                  {!addMutation.isPending ? (
                    "Add"
                  ) : (
                    <Loader2Icon className="animate-spin" />
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}
