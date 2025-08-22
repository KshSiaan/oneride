"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function LogoutButton({ text }: { text: string }) {
  const [, , removeCookie] = useCookies(["token"]);
  const { push } = useRouter();
  return (
    <Button
      onClick={() => {
        removeCookie("token", { path: "/" });
        push("/");
      }}
    >
      {text}
    </Button>
  );
}
