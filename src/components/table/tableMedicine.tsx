"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

interface TableMedicinesProps {
  onSelect: boolean;
  onDataChange: (data: number) => void;
}

const TableMedicines: React.FC<TableMedicinesProps> = ({
  onSelect,
  onDataChange,
}) => {
  const [tableHeaders, setTableHeaders] = useState<string[]>([
    "ID",
    "Nama",
    "Kategori",
    "Satuan",
    "Harga Beli",
    "Harga Satuan",
    "Stok",
    "Produksi",
    "Kadaluarsa",
  ]);

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (onSelect) {
      setTableHeaders((headers) => ["Pilih", ...headers]);
    } else {
      setTableHeaders((headers) =>
        headers.filter((header) => header !== "Pilih")
      );
    }
  }, [onSelect]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://api-simrs.serpihantech.com/api/medicines"
        );
        setMedicines(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [medicines]);

  const handleCheckboxChange = (id: number) => {
    setSelectedOption(id);
    onDataChange(id);
  };

  return (
    <Table tableHead={tableHeaders}>
      {medicines.map((medicine: Medicine, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white cursor-pointer", {
            "bg-brand-10 bg-opacity-15": index % 2 != 0,
          })}
          onClick={() => {}}
        >
          <td
            className={clsx("px-4 py-4 text-center", {
              hidden: onSelect == false,
              block: onSelect == true,
            })}
          >
            <input
              type="checkbox"
              checked={selectedOption == medicine.id}
              className="cursor-pointer"
              onChange={() => handleCheckboxChange(medicine.id)}
            />
          </td>
          <td className="px-4 py-4 text-center">{medicine.id}</td>
          <td className="px-4 py-4 text-center">{medicine.name}</td>
          <td className="px-4 py-4 text-center">{medicine.category}</td>
          <td className="px-4 py-4 text-center">{medicine.unit}</td>
          <td className="px-4 py-4 text-center">{medicine.purchase_price}</td>
          <td className="px-4 py-4 text-center">{medicine.unit_price}</td>
          <td className="px-4 py-4 text-center">{medicine.stock}</td>
          <td className="px-4 py-4 text-center">{medicine.production_year}</td>
          <td className="px-4 py-4 text-center">{medicine.validity_period}</td>
        </tr>
      ))}
    </Table>
  );
};

export default TableMedicines;
