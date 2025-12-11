import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { dateExtractor } from "@/lib/func/functions";

interface BlogCardProps {
  _id?: string;
  author?: string;
  title?: string;
  thumbnail?: string;
  createdAt?: string;
}

export default function BlogCard({
  _id,
  author,
  title,
  createdAt,
  thumbnail,
}: BlogCardProps) {
  // Determine image URL safely
  let imgUrl: string;
  try {
    if (thumbnail) {
      // If thumbnail is already full URL
      if (thumbnail.startsWith("http") || thumbnail.startsWith("https")) {
        imgUrl = thumbnail;
      } else if (process.env.NEXT_PUBLIC_SERVER) {
        // Combine with server URL
        imgUrl = new URL(thumbnail, process.env.NEXT_PUBLIC_SERVER).toString();
      } else {
        imgUrl = "/image/blog.jpg"; // fallback
      }
    } else {
      imgUrl = "/image/blog.jpg"; // fallback if no thumbnail
    }
  } catch (err) {
    imgUrl = "/image/blog.jpg"; // fallback on any error
  }

  return (
    <Link href={`/news/${_id}`}>
      <Card className="p-6! overflow-hidden border-0 aspect-square flex flex-col justify-between items-start">

        {/* IMAGE SECTION */}
        <CardContent className="flex rounded-md items-center flex-1 w-full justify-center overflow-hidden">
          <Image
            src={imgUrl}
            height={500}
            width={500}
            alt={title ?? "Blog Thumbnail"}
            className="w-full aspect-video object-cover rounded-md"
            unoptimized={imgUrl.startsWith("http") ? true : false} // Optional for external URLs
          />
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="flex flex-col w-full p-0! text-start!">
          <h3 className="text-lg font-semibold w-full">{title ?? "N/A"}</h3>
          <p className="w-full">Author: {author ?? "N/A"}</p>
          <p className="w-full text-muted-foreground">
            Published on: {createdAt ? dateExtractor(createdAt) : "N/A"}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
