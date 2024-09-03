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

interface Doctor {
  id: number;
  polyclinic_id: number;
  name: string;
  specialist: string;
}

interface Polyclinic {
  id: number;
  name: string;
  doctor: Doctor[];
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

  const [patient, setPatient] = useState<Cashier[]>([]);
  const [polyclinics, setPolyclinic] = useState<Polyclinic[]>([]);
  const [doctors, setDoctor] = useState<Doctor[]>([]);
  const [id, setId] = useState<number | null>();
  const router = useRouter();
  // const params = useParams();

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

  useEffect(() => {
    const fetchPolyclinics = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/polyclinics`
        );
        setPolyclinic(response.data);
        // console.log("Response:", response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPolyclinics();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/doctors`
        );
        setDoctor(response.data);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <Table tableHead={tableHeaders}>
      {patient.map((cashier: Cashier, index: number) => (
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
              : "No Medic"}
          </td>

          {cashier.registration.length > 0 ? (
            polyclinics.map((polyclinic: Polyclinic, index: number) => {
              if (
                cashier.registration[cashier.registration.length - 1]
                  .polyclinic_id == polyclinic.id
              ) {
                return (
                  <td key={index} className="px-4 py-4 text-center">
                    {polyclinic.name}
                  </td>
                );
              }
            })
          ) : (
            <td key={index} className="px-4 py-4 text-center">
              No Polyclinic
            </td>
          )}

          {cashier.registration.length > 0 ? (
            doctors.map((doctor: Doctor, index: number) => {
              if (
                cashier.registration[cashier.registration.length - 1]
                  .doctor_id == doctor.id
              ) {
                return (
                  <td key={index} className="px-4 py-4 text-center">
                    {doctor.name}
                  </td>
                );
              }
            })
          ) : (
            <td key={index} className="px-4 py-4 text-center">
              No Doctor
            </td>
          )}

          <td className="px-4 py-4 text-center text-alert-warning text-body-bold">
            Belum
          </td>
        </tr>
      ))}
    </Table>
  );
}
