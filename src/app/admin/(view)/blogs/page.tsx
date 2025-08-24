import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import Blogs from "./blogs";
import Link from "next/link";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Blog Management</h1>
          <p>Manage and monitor all platform users from one place.</p>
        </div>
        <Button className="rounded-md text-foreground" asChild>
          <Link href={`blogs/create`}>
            <PlusIcon />
            Create new blogs
          </Link>
        </Button>
      </div>
      <Blogs />
    </section>
  );
}
