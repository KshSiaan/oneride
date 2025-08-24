import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import Bread from "@/components/core/bread";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Navs from "./navs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <Bread />
      <main className="min-h-dvh w-full py-12 font-serif!">
        <section className="w-4/5 mx-auto h-full md:grid grid-cols-7 items-start gap-6">
          <Navs />
          {/* Main content */}
          <div className="col-span-3 border p-6">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
