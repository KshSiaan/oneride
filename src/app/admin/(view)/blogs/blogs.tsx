"use client";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBlogsAdminApi } from "@/lib/api/core";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { blankImg } from "@/lib/config";
import { Skeleton } from "@/components/ui/skeleton";
import { dateExtractor, imgCreator } from "@/lib/func/functions";

export default function Blogs() {
  const [cookies] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: (): idk => {
      return getBlogsAdminApi(1, "", cookies.token);
    },
  });

  if (isPending) {
    return (
      <div className="w-full mt-6 space-y-6">
        <Skeleton className="h-12" />
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-12" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-12 col-span-2" />
          <Skeleton className="h-12" />
        </div>
      </div>
    );
  }
  const blogs = data.data.result;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Thumbnail</TableHead>
          <TableHead className="text-center">Blog Title</TableHead>
          <TableHead className="text-center">Author</TableHead>
          <TableHead className="text-center">Created Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.map((x: idk) => (
          <TableRow key={x._id}>
            <TableCell className="font-medium">
              <Image
                src={x?.thumbnail ? imgCreator(x.thumbnail) : blankImg}
                height={64}
                width={64}
                className="object-cover size-12 aspect-square"
                alt="thumbnail"
              />
            </TableCell>
            <TableCell
              style={{
                maxWidth: "150px", // adjust width
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={x.title} // shows full title on hover
            >
              {x.title}
            </TableCell>

            <TableCell>{x.author}</TableCell>
            <TableCell className="text-center">
              {dateExtractor(x.createdAt)}
            </TableCell>
            <TableCell className="text-center">
              <Badge className="bg-green-500">{x.status}</Badge>
            </TableCell>
            <TableCell className="text-center">
              <Button size="icon" variant="ghost" asChild>
                <Link href={`/news/${x._id}`}>
                  <EyeIcon />
                </Link>
              </Button>
              <Button size="icon" variant="ghost">
                <Link href={`blogs/${x._id}`}>
                  <EditIcon />
                </Link>
              </Button>
              <Button
                size="icon"
                className="text-red-500 hover:text-red-600"
                variant="ghost"
              >
                <Trash2Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
