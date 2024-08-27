import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";

export default function PharmacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" w-full h-screen">
      <Sidebar />
      <div className="ml-60 h-full h-min-screeen flex flex-col bg-brand-10/[.16] gap-4">
        <TopBar />
        {children}
      </div>
    </main>
  );
}
