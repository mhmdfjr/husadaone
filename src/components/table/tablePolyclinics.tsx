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
          "http://api-simrs.serpihantech.com/api/polyclinics"
        );
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

  return (
    <Table tableHead={tableHeaders}>
      {polyclinics.map((polyclinic: Polyclinic, index: number) => (
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
  );
};

export default TablePolyclinics;
