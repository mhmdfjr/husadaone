"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface TableDashboardProps {
  date?: Date;
}

interface Patient {
  id: number;
  name: string;
  gender: string;
  date_of_birth: string;
}

interface Polyclinic {
  id: number;
  name: string;
}

interface Registration {
  id: number;
  patient_id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
  polyclinic: Polyclinic;
  patient: Patient;
}

const TableDashboard: React.FC<TableDashboardProps> = ({ date }) => {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Usia",
    "JK",
    "Poliklinik",
  ];

  const token = Cookies.get("token");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/registrations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setRegistrations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [apiUrl]);

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

  const calculateAge = (date_of_birth: string) => {
    const birthDate = new Date(date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Table tableHead={tableHeaders}>
      {registrations.map((registration: Registration, index: number) => {
        return (
          <tr
            key={index}
            className={clsx("bg-basic-white cursor-pointer", {
              "bg-brand-10 bg-opacity-15": index % 2 != 0,
            })}
            onClick={() => {
              router.push(`recipe/${registration.id}`);
            }}
          >
            <td className="px-4 py-4 text-center">{registration.id}</td>
            <td className="px-4 py-4 text-center">
              {registration.patient.name}
            </td>
            <td className="px-4 py-4 text-center">{registration.patient.id}</td>
            <td className="px-4 py-4 text-center">
              {calculateAge(registration.patient.date_of_birth)}
            </td>
            <td className="px-4 py-4 text-center">
              {registration.patient.gender}
            </td>
            <td className="px-4 py-4 text-center">
              {registration.polyclinic.name}
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

export default TableDashboard;
