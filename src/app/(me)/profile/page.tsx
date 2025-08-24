"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React, { useState } from "react";
import Profile from "./profile";
import { useQuery } from "@tanstack/react-query";
import { getOwnProfileApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";

export default function Page() {
  const [updating, setUpdating] = useState(false);
  const [cookies] = useCookies(["token"]);
  const { data, isPending }: idk = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return getOwnProfileApi(cookies.token);
    },
  });

  return (
    <>
      <div className="w-full flex justify-between items-start">
        <h1 className="font-semibold text-2xl">Profile Details</h1>
        <Button
          onClick={() => {
            setUpdating(!updating);
          }}
          variant={updating ? "outline" : "default"}
        >
          <EditIcon /> {updating ? "Updating" : "Update"} Profile
        </Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-fit relative">
          <Avatar className="size-[140px]">
            <AvatarImage src={""} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="">
        <Profile
          updating={updating}
          setUpdating={setUpdating}
          data={data}
          isPending={isPending}
        />
      </div>
    </>
  );
}
