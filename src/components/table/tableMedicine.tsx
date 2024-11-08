"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
  }, []);

  // Calculate the start and end indices for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMedicines = medicines.slice(startIndex, endIndex);
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  const handleCheckboxChange = (id: number) => {
    setSelectedOption(id);
    onDataChange(id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Table tableHead={tableHeaders}>
        {paginatedMedicines.map((medicine: Medicine, index: number) => (
          <tr
            key={index}
            className={clsx("bg-basic-white cursor-pointer", {
              "bg-brand-10 bg-opacity-15": index % 2 !== 0,
            })}
          >
            <td
              className={clsx("px-4 py-4 text-center", {
                hidden: onSelect === false,
                block: onSelect === true,
              })}
            >
              <input
                type="checkbox"
                checked={selectedOption === medicine.id}
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
            <td className="px-4 py-4 text-center">
              {medicine.production_year}
            </td>
            <td className="px-4 py-4 text-center">
              {medicine.validity_period}
            </td>
          </tr>
        ))}
      </Table>

      {/* Pagination controls */}
      <div className="pagination-controls flex justify-center items-center gap-2 mt-4">
        <Button
          label=""
          variant={currentPage === 1 ? "disable" : "primary"}
          size="very-small"
          rightIcon={<ArrowLeft2 size="24" />}
          onClick={handlePrevPage}
        />
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          label=""
          variant={currentPage === totalPages ? "disable" : "primary"}
          size="very-small"
          rightIcon={<ArrowRight2 size="24" />}
          onClick={handleNextPage}
        />
      </div>
    </div>
  );
};

export default TableMedicines;
