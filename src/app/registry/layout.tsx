import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";

export default function RegistryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" w-full min-h-screen h-full bg-brand-10/[.16] pb-4">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <div className="ml-64 flex flex-col gap-4">
        <TopBar />
        {children}
      </div>
    </main>
  );
}
