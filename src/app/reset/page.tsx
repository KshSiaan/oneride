import AuthForms from "./reset-form";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <AuthForms />
      </main>
      <Footer />
    </>
  );
}
