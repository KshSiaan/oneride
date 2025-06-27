"use client";
// import {
//   CategoriesIcon,
//   DashboardIcon,
//   ProductListingIcon,
//   SettingIcon,
//   SubscriptionIcon,
//   UsersIcon,
//   WithdrawIcon,
// } from "./localIcons";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  LayoutDashboardIcon,
  CalendarCheckIcon,
  TicketIcon,
  LayoutGridIcon,
  BookmarkIcon,
  UsersIcon,
  BusIcon,
  HandshakeIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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

export default function AdminSideMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState("dashboard");

  useEffect(() => {
    const pathParts = pathname.split("/");
    const extractedKey = pathParts[pathParts.length - 1] || "dashboard";
    setCurrent(extractedKey);
  }, [pathname]);

  const handleClick = (key: string) => {
    if (key === "/home") {
      router.push(key);
      return;
    }
    setCurrent(key);
    router.push(`/admin/${key}`);
  };

  const items = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <LayoutDashboardIcon className="size-6" />,
    },
    {
      label: "Events",
      key: "events",
      icon: <CalendarCheckIcon className="size-6" />,
    },
    {
      label: "Ticketing",
      key: "ticketing",
      icon: <TicketIcon className="size-6" />,
    },
    {
      label: "Categories",
      key: "categories",
      icon: <LayoutGridIcon className="size-6" />,
    },
    {
      label: "Bookings",
      key: "bookings",
      icon: <BookmarkIcon className="size-6" />,
    },
    {
      label: "Users",
      key: "users",
      icon: <UsersIcon className="size-6" />,
    },
    {
      label: "Charter Requests",
      key: "charter",
      icon: <BusIcon className="size-6" />,
    },
    {
      label: "Partner Inquiries",
      key: "partner",
      icon: <HandshakeIcon className="size-6" />,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingsIcon className="size-6" />,
    },
  ];
  return (
    <div className="flex flex-col justify-between gap-2 !pt-6 h-full">
      <Image
        height={100}
        width={200}
        alt="logo"
        src="/logo.png"
        className="block mx-auto! mb-6!"
      />
      <div className="m-6! bg-secondary rounded-lg p-4! flex-1 flex flex-col justify-start items-start gap-4">
        {items.map((x, i) => (
          <div key={i} className="w-full">
            <Button
              onClick={() => handleClick(x.key)}
              variant={"ghost"}
              size="lg"
              className={cn("w-full justify-start gap-2 rounded", {
                "!text-primary font-bold": current === x.key,
              })}
            >
              {x.icon} {x.label}
            </Button>
          </div>
        ))}
        <div className="flex-1 flex justify-end items-end w-full">
          <div className="w-full rounded-lg font-sans flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-start items-start gap-0">
                <h5 className="">Admin</h5>
                <p className="text-sm font-light">admin.holt@example.com</p>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="rounded-lg text-primary"
                  size="icon"
                  variant="ghost"
                >
                  <LogOutIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Log out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out? You’ll need to sign in
                    again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Log Out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
