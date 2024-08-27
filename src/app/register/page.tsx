import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import CardDashboard from "@/components/card-dashboard";
import TablePatients from "@/components/table/tablePatients";
import TableHighlightMedicine from "@/components/table/tableHighlightMedicine";

export default function Register() {
  return (
    <main className=" w-full h-screen">
      <Sidebar />

      <div className="ml-60 flex flex-col bg-brand-10/[.16] gap-4">
        <TopBar />

        <div className="flex justify-start gap-x-20 items-center mx-4">
          <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
          <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
          <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
          <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
        </div>

        <div className="mx-4 flex justify-start items-start gap-4">
          <div className="table p-4 bg-basic-white rounded-2xl border-2">
            <p className="text-h8-bold text-basic-black">Pasien Terbaru</p>
            <TablePatients />
          </div>
          <div className="table p-4 bg-basic-white rounded-2xl border-2">
            <p className="text-h8-bold text-basic-black">Stok Obat</p>
            <TableHighlightMedicine />
          </div>
        </div>
      </div>
    </main>
  );
}
