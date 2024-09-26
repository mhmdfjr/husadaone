import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";

export default function PatientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full min-h-screen bg-[#D5E5FF] bg-opacity-15">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        {children}
      </div>
    </main>
  );
}
