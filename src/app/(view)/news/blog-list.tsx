import BlogCard from "@/components/core/blog-card";
import { getBlogsApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import React from "react";

export default async function BlogList() {
  const call: idk = await getBlogsApi("");

  return call.data.result.map(
    (x: { _id: string; author: string; createdAt: string; title: string }) => (
      <BlogCard
        _id={x._id}
        title={x.title}
        author={x.author}
        createdAt={x.createdAt}
        key={x._id}
      />
    )
  );
}
