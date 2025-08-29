import Sidebar from "@/components/core/admin-side-menu";
import { getOwnProfileApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "OneRide Admin Panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return redirect("/admin/login");
  }

  const me: idk = await getOwnProfileApi(token);

  if (!me.data.roles.includes("admin")) {
    return redirect("/");
  }

  return (
    <main className="grid grid-cols-11 font-serif">
      <div className="col-span-2">
        <div className="h-dvh w-full sticky top-0 left-0">
          <Sidebar />
        </div>
      </div>
      <div className="col-span-9 flex flex-col justify-start items-start">
        <div className="h-[34px]" />
        <div className="w-full flex-1">{children}</div>
      </div>
    </main>
  );
}
