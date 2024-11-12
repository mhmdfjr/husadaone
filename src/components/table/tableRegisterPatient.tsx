"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface Patient {
  id: number;
  name: string;
  gender: string;
  blood_type: string;
  place_of_birth: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  insurance: string;
  allergy: string;
  disability: string;
  pic_name: string;
  pic_status: string;
  pic_address: string;
}

interface TablePatientProps {
  onSelect: boolean;
  onDataChange: (data: Patient) => void;
}

const TableRegisterPatients: React.FC<TablePatientProps> = ({
  onSelect,
  onDataChange,
}) => {
  const [tableHeaders, setTableHeaders] = useState<string[]>([
    "ID",
    "Nama",
    "JK",
    "Tempat Lahir",
    "Tanggal Lahir",
    "Alamat",
    "Asuransi",
  ]);

  const [patients, setPatients] = useState<Patient[]>([]);
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
        const { data: response } = await axios.get(`${apiUrl}/patients`);
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [patients]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecipes = patients.slice(startIndex, endIndex);
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const handleCheckboxChange = (data: Patient) => {
    setSelectedOption(data.id);
    onDataChange(data);
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
        {paginatedRecipes.map((patient: Patient, index: number) => (
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
                checked={selectedOption == patient.id}
                className="cursor-pointer"
                onChange={() => handleCheckboxChange(patient)}
              />
            </td>
            <td className="px-4 py-4 text-center">{patient.id}</td>
            <td className="px-4 py-4 text-center">{patient.name}</td>
            <td className="px-4 py-4 text-center">{patient.gender}</td>
            <td className="px-4 py-4 text-center">{patient.place_of_birth}</td>
            <td className="px-4 py-4 text-center">{patient.date_of_birth}</td>
            <td className="px-4 py-4 text-center">{patient.address}</td>
            <td className="px-4 py-4 text-center">{patient.insurance}</td>
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

export default TableRegisterPatients;
