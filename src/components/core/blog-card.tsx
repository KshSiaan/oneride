import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";

export default function BlogCard() {
  return (
    <Link href={"/news/blog"}>
      <Card className="p-6! overflow-hidden border-0 aspect-square flex flex-col justify-between items-start">
        <CardContent
          className="flex rounded-md items-center flex-1 w-full justify-center  overflow-hidden bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('/image/blog.jpg')` }}
        ></CardContent>
        <CardFooter className="flex flex-col w-full p-0! text-start! ">
          <h3 className="text-lg font-semibold w-full">
            Exploring New Routes: Your Next Adventure Awaits
          </h3>
          <p className="w-full text-muted-foreground">
            Published on: July 1, 2024
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
