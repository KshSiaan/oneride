"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const { push } = useRouter();
  const NavigationButtons = () => (
    <>
      <Button variant="ghost" className="font-semibold!" asChild>
        <Link href="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
      </Button>
      <Button variant="ghost" className="font-semibold!" asChild>
        <Link href="/events" onClick={() => setIsOpen(false)}>
          Events
        </Link>
      </Button>
      <Button variant="ghost" className="font-semibold!" asChild>
        <Link href="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>
      </Button>
      <Button variant="ghost" className="font-semibold!" asChild>
        <Link href="/news" onClick={() => setIsOpen(false)}>
          News & Update
        </Link>
      </Button>
      <Button variant="ghost" className="font-semibold!" asChild>
        <Link href="/nearby" onClick={() => setIsOpen(false)}>
          Events Near you
        </Link>
      </Button>
      <Button variant="ghost" className="font-semibold!" asChild>
        <Link href="/charter" onClick={() => setIsOpen(false)}>
          Charter a ride
        </Link>
      </Button>
    </>
  );

  return (
    <>
      <div className="h-16 relative" />
      <nav>
        <div className="py-4! px-4! md:px-8! flex flex-row justify-between items-center fixed w-full h-16 top-0 left-0 z-50 bg-background">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                height={80}
                width={120}
                className="w-[60px] md:w-[80px] lg:w-[100px]"
                alt="Pool Valet Logo"
              />
            </Link>
          </div>

          <div className="hidden lg:flex gap-2 font-serif">
            <NavigationButtons />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {!cookies.token ? (
              <Button className="rounded-sm text-foreground" asChild>
                <Link href="/auth">Log in</Link>
              </Button>
            ) : (
              <Button
                className="rounded-sm text-foreground"
                onClick={() => {
                  removeCookie("token");
                  push("/");
                }}
              >
                Log Out
              </Button>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="p-6! pb-0!">
                  <SheetTitle className="text-left w-full flex justify-center items-center">
                    <Image
                      height={200}
                      width={400}
                      src="/logo.png"
                      alt="logo"
                      className="w-1/2"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  <NavigationButtons />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
