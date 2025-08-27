"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { addTermsOfServiceApi, getTermsOfServiceApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Editor } from "primereact/editor";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [cookies] = useCookies(["token"]);
  const [content, setContent] = useState("");

  // Fetch existing Terms & Conditions
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["tnc"],
    queryFn: async (): Promise<idk> => getTermsOfServiceApi(cookies.token),
  });
  useEffect(() => {
    if (isSuccess) {
      setContent(data.data[0].content);
    }

    return () => {};
  }, [isSuccess]);

  // Mutation to update T&C
  const { mutate, isPending: isUpdating } = useMutation({
    mutationKey: ["tnc_update"],
    mutationFn: (newContent: string) =>
      addTermsOfServiceApi({ content: newContent }, cookies.token),
    onError: (err) => {
      toast.error(err.message ?? "Failed to update Terms & Conditions");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully Updated the Terms");
    },
  });

  return (
    <section className="p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
          <p>Admin can edit personal information</p>
        </div>
      </div>

      {isPending ? (
        <div className="w-full">
          <Skeleton className="h-[50dvh]" />
          <div className="p-6 flex justify-end gap-6">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>
      ) : (
        <Card className="mt-6">
          <CardContent>
            <Editor
              style={{ height: "50dvh" }}
              value={content}
              onTextChange={(e) => setContent(e.htmlValue ?? "")}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="text-foreground rounded-md w-full"
              onClick={() => mutate(content)}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Terms & Conditions"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </section>
  );
}
