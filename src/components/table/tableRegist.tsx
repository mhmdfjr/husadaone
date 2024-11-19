"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash } from "iconsax-react";
import Cookies from "js-cookie";

interface Patient {
  id: number;
  name: string;
  gender: string;
  date_of_birth: string;
}

interface Doctor {
  id: number;
  name: string;
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
  already_paid: string;
  polyclinic: Polyclinic;
  patient: Patient;
  doctor: Doctor;
}

export default function TableRegist() {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Poliklinik",
    "Dokter",
    "Status Rawat",
    "Aksi",
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
  }, [registrations]);

  const deleteRegistration = async (id: number) => {
    try {
      const response = await axios.delete(`${apiUrl}/registrations/${id}`);
      router.push("/registry");
    } catch (error) {
      console.error("Failed to delete registration:", error);
    }
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
          >
            <td className="px-4 py-4 text-center">{registration.id}</td>
            <td className="px-4 py-4 text-center">
              {registration.patient.name}
            </td>
            <td className="px-4 py-4 text-center">{registration.patient.id}</td>
            <td className="px-4 py-4 text-center">
              {registration.polyclinic.name}
            </td>
            <td className="px-4 py-4 text-center">
              {registration.doctor.name}
            </td>
            <td
              className={clsx("px-4 py-4 text-center text-body-bold", {
                "text-alert-success": registration.already_paid == "yes",
                "text-alert-warning": registration.already_paid == null,
              })}
            >
              {registration.already_paid == "yes"
                ? "Sudah Rawat"
                : "Belum Rawat"}
            </td>
            <td className="px-2 py-4 text-center">
              <div className="flex items-center gap-x-5 ml-12">
                <Edit
                  size="24"
                  color="#2F7BFE"
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(
                      `registry/medic/input?input=${registration.id}`
                    );
                  }}
                />
                <Trash
                  size="24"
                  color="#E90C1B"
                  className="cursor-pointer"
                  onClick={() => deleteRegistration(registration.id)}
                />
              </div>
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
