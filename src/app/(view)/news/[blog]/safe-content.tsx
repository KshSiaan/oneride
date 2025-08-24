"use client";
import React from "react";
import DOMPurify from "dompurify";
export default function SafeComponent({ data }: { data: string }) {
  return (
    <article
      className="text-xl text-muted-foreground leading-relaxed max-w-3xl"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}
    ></article>
  );
}
