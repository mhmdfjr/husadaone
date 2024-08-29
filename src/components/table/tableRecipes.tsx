"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Regis {
  id: number;
  polyclinic_id: number;
  doctor_id: number;
}

interface Recipe {
  id: number;
  name: string;
  registration: Regis[];
}

export default function TableRecipes() {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Poliklinik",
    "Dokter",
    "Status Validasi",
  ];
  const [patient, setPatient] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api-simrs.serpihantech.com/api/patients"
        );
        setPatient(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table tableHead={tableHeaders}>
      {patient.map((recipe: Recipe, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white cursor-pointer", {
            "bg-brand-10 bg-opacity-15": index % 2 != 0,
          })}
          onClick={() => {
            router.push(`recipe/${recipe.id}`);
          }}
        >
          <td className="px-4 py-4 text-center">{recipe.id}</td>
          <td className="px-4 py-4 text-center">{recipe.name}</td>
          <td className="px-4 py-4 text-center">
            {recipe.registration.length > 0
              ? recipe.registration[recipe.registration.length - 1].id
              : "-"}
          </td>
          <td className="px-4 py-4 text-center">
            {recipe.registration.length > 0
              ? recipe.registration[recipe.registration.length - 1]
                  .polyclinic_id
              : "-"}
          </td>
          <td className="px-4 py-4 text-center">
            {recipe.registration.length > 0
              ? recipe.registration[recipe.registration.length - 1].doctor_id
              : "-"}
          </td>
        </tr>
      ))}
    </Table>
  );
}
