import Table from "@/components/table"

interface Medicine {
  id: number,
  name: string,
  category: string,
  unit_price: string,
  stock: number
}

export async function getMedicines() {
    const response = await fetch(`http://192.168.18.31/api/medicines`, {
      method: 'GET'
    });
    return response.json();
};

export default async function TableMedicines () {
    const tableHeaders = ["ID", "Nama", "Kategori", "Harga", "Stok"];
    const medicines = await getMedicines()
    
    return (
        <Table tableHead={tableHeaders}>
          {medicines.data.map((patient: Medicine, index: number) => (
            <tr key={index} className={ index%2 == 0 ? "bg-brand-10" : "bg-basic-white"}>
              <td className="px-4 py-4 text-center">{patient.id}</td>
              <td className="px-4 py-4 text-center">{patient.name}</td>
              <td className="px-4 py-4 text-center">{patient.category}</td>
              <td className="px-4 py-4 text-center">{patient.unit_price}</td>
              <td className="px-4 py-4 text-center">{patient.stock}</td>
            </tr>
          ))}
        </Table>
    )
}