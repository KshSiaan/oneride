import { getOwnProfileApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  let user: idk;
  if (token) {
    user = await getOwnProfileApi(token ?? "");
  }

  if (user) {
    if (user?.data?.roles.includes("admin")) {
      redirect("/admin/dashboard");
    } else {
      return notFound();
    }
  }
  return (
    <>
      <Suspense fallback={"Please wait a second.."}>{children}</Suspense>
    </>
  );
}
