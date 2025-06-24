import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="h-[40dvh] w-screen flex justify-center items-center">
      <Button asChild>
        <Link href="/">
          Go back to homepage <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
