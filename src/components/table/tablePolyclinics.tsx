"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface Polyclinic {
  id: number;
  name: string;
}

interface TablePolyclinicsProps {
  onSelect: boolean;
  onDataChange: (data: number) => void;
}

const TablePolyclinics: React.FC<TablePolyclinicsProps> = ({
  onSelect,
  onDataChange,
}) => {
  const [tableHeaders, setTableHeaders] = useState<string[]>(["ID", "Nama"]);

  const [polyclinics, setPolyclinics] = useState<Polyclinic[]>([]);
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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/polyclinics`);
        setPolyclinics(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [polyclinics]);

  const handleCheckboxChange = (id: number) => {
    setSelectedOption(id);
    onDataChange(id);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecipes = polyclinics.slice(startIndex, endIndex);
  const totalPages = Math.ceil(polyclinics.length / itemsPerPage);

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
        {paginatedRecipes.map((polyclinic: Polyclinic, index: number) => (
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
                checked={selectedOption == polyclinic.id}
                className="cursor-pointer"
                onChange={() => handleCheckboxChange(polyclinic.id)}
              />
            </td>
            <td className="px-4 py-4 text-center">{polyclinic.id}</td>
            <td className="px-4 py-4 text-center">{polyclinic.name}</td>
          </tr>
        ))}
      </Table>

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

export default TablePolyclinics;
