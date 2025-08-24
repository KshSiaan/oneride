"use client";
import { ChevronDownIcon, Loader2Icon, Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getOwnProfileApi } from "@/lib/api/core";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { idk } from "@/lib/utils";

export default function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [isClient, setIsClient] = useState(false);
  const { push } = useRouter();
  const token = cookies?.token;

  const { data, isPending, isError, error }: idk = useQuery({
    queryKey: ["user"],
    queryFn: () => getOwnProfileApi(token),
    enabled: !!token, // only run if token exists
  });

  if (isError) console.error(error);

  useEffect(() => {
    setIsClient(true); // run only on client
  }, []);

  if (!isClient) return null; // avoid SSR mismatch

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/news", label: "News & Update" },
    { href: "/nearby", label: "Events Near You" },
    { href: "/charter", label: "Charter a Ride" },
  ];

  const NavigationButtons = () => (
    <>
      {navLinks.map(({ href, label }) => (
        <Button key={href} variant="ghost" className="font-semibold!" asChild>
          <Link href={href} onClick={() => setIsOpen(false)}>
            {label}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <>
      <div className="h-18 relative" />
      <nav>
        <div className="py-4! px-4! md:px-8! flex items-center fixed w-full h-18 top-0 left-0 z-50 bg-background">
          {/* Left: Logo */}
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

          {/* Center: Navigation */}
          <div className="hidden lg:flex flex-1 justify-center gap-2 font-serif">
            <NavigationButtons />
          </div>
          {status}
          {/* Right: User / Menu */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {!token ? (
              <Button asChild className="rounded-sm text-foreground">
                <Link href="/auth">Log in</Link>
              </Button>
            ) : isPending ? (
              <div className="h-12 aspect-video flex items-center justify-center">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : isError ? (
              <Button asChild className="rounded-sm text-foreground">
                <Link href="/auth">Log in</Link>
              </Button>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="border p-2 rounded-lg flex flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={""} />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center items-start">
                        <h6>{data.data.name}</h6>
                        <p className="text-xs text-muted-foreground">
                          {data.data.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <ChevronDownIcon />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="border shadow bg-background/50"
                  side="bottom"
                  align="end"
                >
                  <div className="p-2 flex flex-col justify-start items-start space-y-4">
                    <Button className="w-full" asChild>
                      <Link href={"/profile"}>View Profile</Link>
                    </Button>
                    <Button
                      className="w-full"
                      variant={"outline"}
                      onClick={() => {
                        removeCookie("token", { path: "/" });
                        push("/");
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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
