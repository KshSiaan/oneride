import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const invoices = [
  {
    thumb: "/image/blog.jpg",
    title: "Exploring New Routes.....",
    author: "Liam ",
    date: "12/12/2025",
    status: "published",
  },
  {
    thumb: "/image/blog.jpg",
    title: "Exploring New Routes.....",
    author: "Liam ",
    date: "12/12/2025",
    status: "published",
  },
  {
    thumb: "/image/blog.jpg",
    title: "Exploring New Routes.....",
    author: "Liam ",
    date: "12/12/2025",
    status: "published",
  },
];

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Blog Management</h1>
          <p>Manage and monitor all platform users from one place.</p>
        </div>
        <Button className="rounded-md text-foreground">
          <PlusIcon />
          Create new blogs
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
          {invoices.map((invoice, x) => (
            <TableRow key={x}>
              <TableCell className="font-medium">
                <Image
                  src={invoice.thumb}
                  height={64}
                  width={64}
                  className="object-cover size-12 aspect-square!"
                  alt="thumbnail"
                />
              </TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell>{invoice.author}</TableCell>
              <TableCell className="text-center">{invoice.date}</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-500">{invoice.status}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button size="icon" variant="ghost" asChild>
                  <Link href="blogs/create">
                    <EyeIcon />
                  </Link>
                </Button>
                <Button size="icon" variant="ghost">
                  <Link href="blogs/edit">
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
    </section>
  );
}
