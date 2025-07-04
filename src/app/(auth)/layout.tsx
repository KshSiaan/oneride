import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
// import { Button } from "@/components/ui/button";
// import { MessageSquareTextIcon } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
