"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function ResponsiveNavbar() {
  const path = usePathname();
  const navig = useRouter();
  const shouldScroll = useRef(false);
  const [scrollTo, setScrollTo] = useState("hiw");
  const [isOpen, setIsOpen] = useState(false);

  function scroller(x: string) {
    if (x === "hiw") {
      window.scrollBy({
        top: window.innerHeight * 1,
        behavior: "smooth",
      });
    } else if (x === "fh") {
      window.scrollBy({
        top: window.innerHeight * 1.8,
        behavior: "smooth",
      });
    } else if (x === "fp") {
      window.scrollBy({
        top: window.innerHeight * 2.7,
        behavior: "smooth",
      });
    }
  }

  const handleScroll = (x: string) => {
    setScrollTo(x);
    setIsOpen(false); // Close mobile menu
    if (path === "/") {
      scroller(x);
    } else {
      shouldScroll.current = true;
      navig.push("/");
    }
  };

  useEffect(() => {
    if (shouldScroll.current && path === "/") {
      scroller(scrollTo);
      shouldScroll.current = false;
    }
  }, [path]);

  const NavigationButtons = () => (
    <>
      <Button variant="ghost" className="font-semibold!" asChild>
        <Link href="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="font-semibold!"
        onClick={() => handleScroll("hiw")}
      >
        Events
      </Button>
      <Button
        variant="ghost"
        className="font-semibold!"
        onClick={() => handleScroll("fh")}
      >
        About
      </Button>
      <Button
        variant="ghost"
        className="font-semibold!"
        onClick={() => handleScroll("fp")}
      >
        Events near you
      </Button>
      <Button variant="ghost" asChild>
        <Link
          href="/get-service"
          className="font-semibold!"
          onClick={() => setIsOpen(false)}
        >
          Charter a bus
        </Link>
      </Button>
    </>
  );

  return (
    <nav className="">
      {/* Main navigation bar - responsive */}
      <div className="py-4! px-4! md:px-8! flex flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            height={80}
            width={120}
            className="w-[60px] md:w-[80px] lg:w-[100px]"
            alt="Pool Valet Logo"
          />
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden lg:flex gap-2  font-serif`}>
          <NavigationButtons />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button className="rounded-sm text-foreground">Log in</Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left"></SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6!">
                <NavigationButtons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
