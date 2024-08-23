import Sidebar from "@/components/sidebar"
import TopBar from "@/components/topbar"
import CardDashboard from "@/components/card-dashboard"
import TablePatients from "@/components/table/tablePatients"
import TableMedicines from "@/components/table/tableMedicine"

export default function Register () {
    return (
        <main className="flex">
            <div className="sidebar flex flex-row justify-start items-center">
                <Sidebar />
            </div>

            <div className="w-full flex flex-col bg-brand-10/[.16] gap-4">
                <div className="topbar flex justify-center items-center">
                <TopBar />
                </div>

                <div className="flex justify-between items-center mx-4">
                    <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
                    <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
                    <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
                    <CardDashboard title="Dokter" sum={23} date={"12 Sept 2024"} />
                </div>

                <div className="mx-4 flex justify-center items-start gap-4">
                    <div className="table p-4 bg-basic-white rounded-2xl border-2">
                        <p className="text-h8-bold text-basic-black">Pasien Terbaru</p>
                        <TablePatients />
                    </div>
                    <div className="table p-4 bg-basic-white rounded-2xl border-2">
                        <p className="text-h8-bold text-basic-black">Stok Obat</p>
                        <TableMedicines />
                    </div>
                </div>
            </div>
        </main>
    )
}