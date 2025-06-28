import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import Bread from "@/components/core/bread";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Bread />
      {children}
      <Footer />
    </>
  );
}
