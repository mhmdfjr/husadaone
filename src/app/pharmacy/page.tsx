"use client"
import Sidebar from "@/components/sidebar"
import TopBar from "@/components/topbar"
import Button from "@/components/button"
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
                        <div className="flex justify-between">
                            <div className="flex">
                                <Button label="Input Resep" variant="submenu" size="small" />
                                <Button label="Stok Obat" variant="submenu" size="small" />
                                <Button label="Kasir" variant="submenu" size="small" />
                            </div>

                            <div className="flex">
                                <Button label="Batal" variant="secondary" size="small" />
                                <Button label="Edit" variant="secondary" size="small" />
                                <Button label="Hapus" variant="disable" size="small" />
                                <Button label="Tambah" variant="disable" size="small" />
                            </div>
                        </div>
                        <TableMedicines />
                    </div>
                </div>
            </div>
        </main>
    )
}