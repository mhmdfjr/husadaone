"use client";
import Table from "@/components/table";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";

interface Patient {
  id: number;
  name: string;
  gender: string;
  address: string;
  medical_history: string;
}

// export async function getPatients() {
//     const response = await fetch(`http://api-simrs.serpihantech.com/api/patients`, {
//       method: 'GET'
//     });
//     return response.json();
// };

export default function TablePatients() {
  const tableHeaders = ["ID", "Nama", "JK", "Alamat", "Penyakit"];
  // const patients = await getPatients()
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api-simrs.serpihantech.com/api/patients"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table tableHead={tableHeaders}>
      {data.map((patient: Patient, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white", {
            "bg-brand-10 bg-opacity-15": index % 2 == 0,
          })}
        >
          <td className="px-4 py-4 text-center">{patient.id}</td>
          <td className="px-4 py-4 text-center">{patient.name}</td>
          <td className="px-4 py-4 text-center">{patient.gender}</td>
          <td className="px-4 py-4 text-center">{patient.address}</td>
          <td className="px-4 py-4 text-center">
            {patient.medical_history || "Tidak ada data"}
          </td>
        </tr>
      ))}
    </Table>
  );
}
