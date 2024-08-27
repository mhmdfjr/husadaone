"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";

interface Medicine {
  id: number;
  name: string;
  category: string;
  unit: string;
  purchase_price: string;
  unit_price: string;
  stock: number;
  production_year: string;
  validity_period: string;
}

export default function TableMedicines() {
  const tableHeaders = [
    "   ",
    "ID",
    "Nama",
    "Kategori",
    "Satuan",
    "Harga Beli",
    "Harga Satuan",
    "Stok",
    "Produksi",
    "Kadaluarsa",
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api-simrs.serpihantech.com/api/medicines"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table tableHead={tableHeaders}>
      {data.map((patient: Medicine, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white", {
            "bg-brand-10 bg-opacity-15": index % 2 == 0,
          })}
        >
          <td className="px-4 py-4 text-center">
            <input type="checkbox" className="" />
          </td>
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
  );
}
