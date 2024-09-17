"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Patient {
  id: number;
  name: string;
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  address: string;
  insurance: string;
}

interface TablePatientProps {
  onSelect: boolean;
  onDataChange: (data: number) => void;
}

const TablePatients: React.FC<TablePatientProps> = ({
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
          "http://api-simrs.serpihantech.com/api/patients"
        );
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [patients]);

  const handleCheckboxChange = (id: number) => {
    setSelectedOption(id);
    onDataChange(id);
  };

  return (
    <Table tableHead={tableHeaders}>
      {patients.map((patient: Patient, index: number) => (
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
              onChange={() => handleCheckboxChange(patient.id)}
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
  );
};

export default TablePatients;
