"use client";
import React from "react";
import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";
import { getTermsOfServiceApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export default function Tnc() {
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["tnc"],
    queryFn: (): idk => {
      return getTermsOfServiceApi(cookies.token);
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <>
      <article
        className="prose prose-invert max-w-full p-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.data[0].content),
        }}
      />
    </>
  );
}
