import Sidebar from "@/components/core/admin-side-menu";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "OneRide Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grid grid-cols-11 font-serif">
        <div className="col-span-2 ">
          <div className="h-dvh! w-full sticky top-0 left-0 ">
            <Sidebar />
          </div>
        </div>
        <div className="col-span-9 flex flex-col justify-start items-start">
          <div className="h-[34px]"></div>
          <div className="w-full flex-1">{children}</div>
        </div>
      </main>
    </>
  );
}
