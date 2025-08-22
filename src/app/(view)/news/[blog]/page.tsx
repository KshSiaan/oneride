import { Suspense } from "react";
import Blog from "./blog";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ blog: string | null }>;
}) {
  const store = await params;
  const blog = store.blog;

  if (!blog) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 animate-pulse">
            {/* Top meta row */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-20 rounded-full" />{" "}
              {/* status badge */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />{" "}
                {/* calendar icon */}
                <Skeleton className="h-4 w-24" /> {/* date */}
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" /> {/* user icon */}
                <Skeleton className="h-4 w-20" /> {/* author */}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-10 w-2/3" />
            </div>

            {/* Article content */}
            <div className="space-y-4 max-w-3xl">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-11/12" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-10/12" />
              <Skeleton className="h-6 w-4/5" />

              {/* Simulate paragraph break */}
              <div className="h-6" />
              <Skeleton className="h-6 w-11/12" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        }
      >
        <Blog id={blog} />
      </Suspense>
    </main>
  );
}
