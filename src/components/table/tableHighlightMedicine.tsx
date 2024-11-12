"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";

interface Medicine {
  id: number;
  name: string;
  category: string;
  unit_price: string;
  stock: number;
}

// export async function getMedicines() {
//   const response = await fetch(`https://192.168.18.31/api/medicines`, {
//     method: "GET",
//   });
//   return response.json();
// }

export default function TableHighlightMedicine() {
  const tableHeaders = ["ID", "Nama", "Kategori", "Harga Satuan", "Stok"];
  const [data, setData] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/medicines`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [apiUrl]);

  return (
    <Table tableHead={tableHeaders}>
      {data.map((patient: Medicine, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white", {
            "bg-brand-10 bg-opacity-15": index % 2 != 0,
          })}
        >
          <td className="px-4 py-4 text-center">{patient.id}</td>
          <td className="px-4 py-4 text-center">{patient.name}</td>
          <td className="px-4 py-4 text-center">{patient.category}</td>
          <td className="px-4 py-4 text-center">{patient.unit_price}</td>
          <td className="px-4 py-4 text-center">{patient.stock}</td>
        </tr>
      ))}
    </Table>
  );
}
