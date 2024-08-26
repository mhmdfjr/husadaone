import Table from "@/components/table"
import clsx from "clsx"

interface Medicine {
  id: number,
  name: string,
  category: string,
  unit: string,
  purchase_price: string,
  unit_price: string,
  stock: number
  production_year: string,
  validity_period: string
}

export async function getMedicines() {
    const response = await fetch(`http://192.168.18.31/api/medicines`, {
      method: 'GET'
    });
    return response.json();
};

export default async function TableMedicines () {
    const tableHeaders = ["ID", "Nama", "Kategori", "Satuan", "Harga Beli", "Harga Satuan", "Stok", "Produksi", "Kadaluarsa"];
    const medicines = await getMedicines()
    
    return (
        <Table tableHead={tableHeaders}>
          {medicines.data.map((patient: Medicine, index: number) => (
            <tr key={index} className={clsx("bg-basic-white", {"bg-brand-10 bg-opacity-15": (index%2 == 0)}) }>
              <td className="px-4 py-4 text-center">{patient.id}</td>
              <td className="px-4 py-4 text-center">{patient.name}</td>
              <td className="px-4 py-4 text-center">{patient.category}</td>
              <td className="px-4 py-4 text-center">{patient.unit}</td>
              <td className="px-4 py-4 text-center">{patient.purchase_price}</td>
              <td className="px-4 py-4 text-center">{patient.unit_price}</td>
              <td className="px-4 py-4 text-center">{patient.stock}</td>
              <td className="px-4 py-4 text-center">{patient.production_year}</td>
              <td className="px-4 py-4 text-center">{patient.validity_period}</td>
            </tr>
          ))}
        </Table>
    )
}