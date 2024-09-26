import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";

export default function PatientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" w-full min-h-screen h-full bg-brand-10/[.16] pb-4">
      <Sidebar />
      <div className="ml-60 flex flex-col gap-4">
        <TopBar />
        {children}
      </div>
    </main>
  );
}
