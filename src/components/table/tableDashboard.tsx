"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

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

export default function TableDashboard() {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Usia",
    "JK",
    "Poliklinik",
  ];

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://api-simrs.serpihantech.com/api/registrations"
        );
        setRegistrations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
}
