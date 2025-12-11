import BlogCard from "@/components/core/blog-card";
import { getBlogsApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import React from "react";

export default async function BlogList() {
  const call: idk = await getBlogsApi("");
 console.log("API RESPONSE:", call); // ➜ Shows in server terminal only
 
  return call.data.result.map(
    (x: { _id: string; author: string;  createdAt: string; title: string; thumbnail?: String }) => (
    
      <BlogCard
        _id={x._id}
        title={x.title}
        author={x.author}
        thumbnail={x.thumbnail}
        createdAt={x.createdAt}
        key={x._id}
      />
    )
  );
}
