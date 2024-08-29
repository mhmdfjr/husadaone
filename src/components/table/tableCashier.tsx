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

interface Cashier {
  id: number;
  name: string;
  registration: Regis[];
}

// export async function getCashier() {
//     const response = await fetch(`http://api-simrs.serpihantech.com/api/patients`, {
//       method: 'GET'
//     });
//     return response.json();
// };

export default function TableCashier() {
  // const cashiers = await getCashier()
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Poliklinik",
    "Dokter",
    "Status Validasi",
  ];
  const [data, setData] = useState([]);
  const router = useRouter();

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
      {data.map((cashier: Cashier, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white", {
            "bg-brand-10 bg-opacity-15": index % 2 != 0,
          })}
          onClick={() => {
            router.push(`cashier/${cashier.id}`);
          }}
        >
          <td className="px-4 py-4 text-center">{cashier.id}</td>
          <td className="px-4 py-4 text-center">{cashier.name}</td>
          <td className="px-4 py-4 text-center">
            {cashier.registration.length > 0
              ? cashier.registration[cashier.registration.length - 1].id
              : "-"}
          </td>
          <td className="px-4 py-4 text-center">
            {cashier.registration.length > 0
              ? cashier.registration[cashier.registration.length - 1]
                  .polyclinic_id
              : "-"}
          </td>
          <td className="px-4 py-4 text-center">
            {cashier.registration.length > 0
              ? cashier.registration[cashier.registration.length - 1].doctor_id
              : "-"}
          </td>
        </tr>
      ))}
    </Table>
  );
}
