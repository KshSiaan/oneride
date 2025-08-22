import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { dateExtractor } from "@/lib/func/functions";

export default function BlogCard({
  _id,
  author,
  title,
  createdAt,
}: {
  _id?: string;
  author?: string;
  content?: string;
  title?: string;
  createdAt?: string;
}) {
  return (
    <Link href={`/news/${_id}`}>
      <Card className="p-6! overflow-hidden border-0 aspect-square flex flex-col justify-between items-start">
        <CardContent
          className="flex rounded-md items-center flex-1 w-full justify-center  overflow-hidden bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('/image/blog.jpg')` }}
        ></CardContent>
        <CardFooter className="flex flex-col w-full p-0! text-start! ">
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
