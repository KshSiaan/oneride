import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { siFacebook, siInstagram, siTiktok } from "simple-icons/icons";

export default function Footer() {
  return (
    <footer className="px-[5%]! pt-12! pb-24! bg-background border-t-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div className="space-y-3!">
        <Image
          src="/logo.png"
          height={1024}
          width={1024}
          className="w-1/2"
          alt="icon"
        />
        <p>info@poolvalet.com</p>
        <p className="text-sm font-semibold text-accent-foreground">
          Customer Supports:
        </p>
        <p className="text-lg font-semibold">(629) 00001111</p>
        <p>8494 Signal Hill Road Manassas, Va</p>
      </div>

      <div className="space-y-3! flex flex-col">
        <h3 className="text-lg font-bold">QUICK LINKS</h3>
        <Link href="/">Home</Link>
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/events">Events Near You</Link>
        <Link href="/allies">Allies</Link>
      </div>

      <div className="space-y-3! flex flex-col">
        <h3 className="text-lg font-bold">SUPPORT</h3>
        <Link href="/faq">FAQs</Link>
        <Link href="/tnc">Terms & services</Link>
        <Link href="/partner">Partner with us</Link>
      </div>

      <div className="space-y-3! flex flex-col">
        <h3 className="text-lg font-bold">Contact with us</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                className="w-8 h-8 text-black"
              >
                <title>TikTok</title>
                <path d={siTiktok.path} />
              </svg>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                className="w-8 h-8 text-black"
              >
                <title>Instagram</title>
                <path d={siInstagram.path} />
              </svg>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                className="w-8 h-8 text-black"
              >
                <title>Facebook</title>
                <path d={siFacebook.path} />
              </svg>
            </Link>
          </Button>
          {/* <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <Image
                src="/icon/linkedin.svg"
                height={64}
                width={64}
                className="size-4"
                alt="ico"
              />
            </Link>
          </Button> */}
        </div>
      </div>
    </footer>
  );
}
