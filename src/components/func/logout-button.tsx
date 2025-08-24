"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
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

// Infer all props from Button
type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

export default function LogoutButton(props: ButtonProps) {
  const [, , removeCookie] = useCookies(["token"]);
  const { push } = useRouter();

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    push("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log you out of your account. You’ll need to log in again
            to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
