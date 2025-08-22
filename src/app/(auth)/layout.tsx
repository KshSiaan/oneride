import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";

import { cookies } from "next/headers";
import LogoutPage from "./logout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    return <LogoutPage />;
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
