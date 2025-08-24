"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { User2Icon, KeyRoundIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/func/logout-button";
import { usePathname } from "next/navigation";

export default function Navs() {
  const pathname = usePathname(); // e.g., "/profile/change-pass"
  const prefix = "/profile";

  const links = [
    {
      href: `${prefix}`,
      icon: <User2Icon className="ml-12" />,
      label: "My Profile",
    },
    {
      href: `${prefix}/change-pass`,
      icon: <KeyRoundIcon className="ml-12" />,
      label: "Change Password",
    },
  ];

  return (
    <div className="col-span-2 py-6 border shadow space-y-4">
      {links.map(({ href, icon, label }) => {
        const isActive = pathname === href; // strict match only

        return (
          <Button
            key={href}
            className="w-full justify-start"
            variant={isActive ? "default" : "ghost"}
            asChild
          >
            <Link href={href}>
              {icon} {label}
            </Link>
          </Button>
        );
      })}

      <LogoutButton className="w-full justify-start" variant="ghost" asChild>
        <div>
          <LogOutIcon className="ml-12" /> Logout
        </div>
      </LogoutButton>
    </div>
  );
}
