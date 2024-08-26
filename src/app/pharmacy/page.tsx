"use client"
import Sidebar from "@/components/sidebar"
import TopBar from "@/components/topbar"
import CardDashboard from "@/components/card-dashboard"
import TableMedicines from "@/components/table/tableMedicine"

export default function Pharmacy () {
    const tableHeaders = ["Name", "Age", "Occupation"];
    return (
        <main className="flex">
            <div className="sidebar flex flex-row justify-start items-center">
                <Sidebar />
            </div>

            <div className="w-full flex flex-col bg-brand-10/[.16] gap-4">
                <div className="topbar flex justify-center items-center">
                <TopBar />
                </div>

                <div className="mx-4 flex justify-center items-center gap-4">
                    <div className="table p-4 bg-basic-white rounded-2xl border-2">
                        <TableMedicines />
                    </div>
                </div>
            </div>
        </main>
    )
}