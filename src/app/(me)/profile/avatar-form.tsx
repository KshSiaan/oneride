"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateUserProfileApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function AvatarForm() {
  const [cookies] = useCookies(["token"]);
  const [file, setFile] = useState<File | null>(null);

  const qCl = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["profile_update"],
    mutationFn: (data: FormData) => updateUserProfileApi(data, cookies.token),
    onError: (err) => {
      toast.error(err.message ?? "Failed to upload your avatar");
    },
    onSuccess: (data: idk) => {
      toast.success(data.message ?? "Successfully updated avatar");
      qCl.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadAvatar = () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    const form = new FormData();
    form.append("image", file);
    mutate(form);
  };

  return (
    <>
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </div>
      <DialogFooter>
        <Button onClick={uploadAvatar}>Upload</Button>
      </DialogFooter>
    </>
  );
}
