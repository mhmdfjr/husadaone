"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Polyclinic {
  id: number;
  name: string;
}

interface Doctor {
  id: number;
  name: string;
  specialist: string;
  gender: string;
  place_of_birth: string;
  polyclinic: Polyclinic;
}

interface TableDoctorsProps {
  onSelect: boolean;
  onDataChange: (data: number) => void;
}

const TableDoctors: React.FC<TableDoctorsProps> = ({
  onSelect,
  onDataChange,
}) => {
  const [tableHeaders, setTableHeaders] = useState<string[]>([
    "ID",
    "Nama",
    "Specialist",
    "Poliklinik",
    "JK",
    "Tempat Lahir",
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
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
          "https://api-simrs.serpihantech.com/api/doctors"
        );
        setDoctors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [doctors]);

  const handleCheckboxChange = (id: number) => {
    setSelectedOption(id);
    onDataChange(id);
  };

  return (
    <Table tableHead={tableHeaders}>
      {doctors.map((doctor: Doctor, index: number) => (
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
              checked={selectedOption == doctor.id}
              className="cursor-pointer"
              onChange={() => handleCheckboxChange(doctor.id)}
            />
          </td>
          <td className="px-4 py-4 text-center">{doctor.id}</td>
          <td className="px-4 py-4 text-center">{doctor.name}</td>
          <td className="px-4 py-4 text-center">{doctor.specialist}</td>
          <td className="px-4 py-4 text-center">{doctor.polyclinic.name}</td>
          <td className="px-4 py-4 text-center">{doctor.gender}</td>
          <td className="px-4 py-4 text-center">{doctor.place_of_birth}</td>
        </tr>
      ))}
    </Table>
  );
};

export default TableDoctors;
