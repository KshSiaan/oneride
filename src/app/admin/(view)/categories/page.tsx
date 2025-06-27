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
import { Edit3Icon, PlusIcon, Trash2 } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full mb-6!">
        <div className="space-y-3!">
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
        <CardContent>
          <div className="flex flex-row justify-between items-center py-2! px-4! border rounded-lg">
            <h3>Music & Concerts</h3>
            <div className="text-primary">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <Edit3Icon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit your category</DialogTitle>
                  </DialogHeader>
                  <div className="w-full">
                    <Input
                      placeholder="Category name"
                      defaultValue={"Sports"}
                    />
                  </div>
                  <div className="flex! items-center justify-center">
                    <Button className="text-foreground rounded-lg px-12!">
                      Update
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                      If you delete the category, it will be permanently removed
                      from your app
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-foreground rounded-lg" size="lg">
                <PlusIcon />
                Add a new category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your category </DialogTitle>
              </DialogHeader>
              <div className="w-full">
                <Input placeholder="Category name" />
              </div>
              <div className="flex! items-center justify-center">
                <Button className="text-foreground rounded-lg px-12!">
                  Add
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}
