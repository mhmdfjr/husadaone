"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

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

// interface Doctor {
//   id: number;
//   name: string;
//   specialist: string;
// }

// interface Polyclinic {
//   id: number;
//   name: string;
//   doctor: Doctor;
// }

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
  // const [id, setId] = useState<number | null>();
  // const [polyclinic, setPolyclinic] = useState<Polyclinic>();
  const router = useRouter();
  // const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api-simrs.serpihantech.com/api/patients"
        );
        setPatient(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchPolyclinics = async (id: number) => {
  //     try {
  //       const { data: response } = await axios.get(
  //         `http://api-simrs.serpihantech.com/api/polyclinics/${id}`
  //       );
  //       setPolyclinic(response.data);
  //       console.log("Response:", response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch patient details:", error);
  //     }
  //   };

  //   if (polyclinic) {
  //     const polyclinicId = Number(id);
  //     if (!isNaN(polyclinicId)) {
  //       fetchPolyclinics(polyclinicId);
  //     } else {
  //       console.error("Invalid polyclinic ID:", id);
  //       router.push("/error");
  //     }
  //   }
  // }, [polyclinic]);

  return (
    <Table tableHead={tableHeaders}>
      {patient.map((recipe: Recipe, index: number) => {
        // if (recipe.registration.length > 0) {
        //   setId(recipe.registration[recipe.registration.length - 1].id);
        // }
        return (
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
            <td className="px-4 py-4 text-center text-alert-warning text-body-bold">
              Belum
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
