import { useEffect, useState } from "react";
import Table from "@/components/table";
import clsx from "clsx";
import axios from "axios";

interface Medicine {
  id: number;
  name: string;
  category: string;
  unit_price: string;
  stock: number;
}

function getMedicines() {
  return axios
    .get("http://192.168.18.31:8000/api/medicines")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching medicines:", error);
      return { data: [] };
    });
}

export default function TableHighlightMedicine() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMedicines().then((data) => {
      setMedicines(data.data);
      setLoading(false);
    });
  }, []);

  const tableHeaders = ["ID", "Nama", "Kategori", "Harga Satuan", "Stok"];

  if (loading) {
    return (
      <div className="flex justify-start items-center animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <Table tableHead={tableHeaders}>
      {medicines.map((medicine: Medicine, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white", {
            "bg-brand-10 bg-opacity-15": index % 2 === 0,
          })}
        >
          <td className="px-4 py-4 text-center">{medicine.id}</td>
          <td className="px-4 py-4 text-center">{medicine.name}</td>
          <td className="px-4 py-4 text-center">{medicine.category}</td>
          <td className="px-4 py-4 text-center">{medicine.unit_price}</td>
          <td className="px-4 py-4 text-center">{medicine.stock}</td>
        </tr>
      ))}
    </Table>
  );
}
