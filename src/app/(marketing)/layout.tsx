import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAB from "@/components/FAB";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <FAB />
    </>
  );
}
