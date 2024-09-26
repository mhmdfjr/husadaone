"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Nurse {
  id: number;
  name: string;
  gender: string;
  place_of_birth: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
}

interface TableNursesProps {
  onSelect: boolean;
  onDataChange: (data: number) => void;
}

const TableNurses: React.FC<TableNursesProps> = ({
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
    "No Telp",
  ]);

  const [nurses, setNurses] = useState<Nurse[]>([]);
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
          "https://api-simrs.serpihantech.com/api/nurses"
        );
        setNurses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [nurses]);

  const handleCheckboxChange = (id: number) => {
    setSelectedOption(id);
    onDataChange(id);
  };

  return (
    <Table tableHead={tableHeaders}>
      {nurses.map((nurse: Nurse, index: number) => (
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
              checked={selectedOption == nurse.id}
              className="cursor-pointer"
              onChange={() => handleCheckboxChange(nurse.id)}
            />
          </td>
          <td className="px-4 py-4 text-center">{nurse.id}</td>
          <td className="px-4 py-4 text-center">{nurse.name}</td>
          <td className="px-4 py-4 text-center">{nurse.gender}</td>
          <td className="px-4 py-4 text-center">{nurse.place_of_birth}</td>
          <td className="px-4 py-4 text-center">{nurse.date_of_birth}</td>
          <td className="px-4 py-4 text-center">{nurse.address}</td>
          <td className="px-4 py-4 text-center">{nurse.phone_number}</td>
        </tr>
      ))}
    </Table>
  );
};

export default TableNurses;
