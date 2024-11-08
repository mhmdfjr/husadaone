"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Registration {
  id: number;
  patient_id: number;
  registration_date: string;
  subjective: string;
  objective: string;
  plan: string;
  assessment: string;
  diagnosis: string;
}

interface Patient {
  id: number;
  name: string;
  registration: Registration[];
}

export default function TableRegisterPatientDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const tableHeaders = [
    "Tanggal",
    "Subjektif",
    "Objecktif",
    "Assesment",
    "Planning",
    "Diagnosis",
  ];

  const patientData = {
    id: 0,
    name: "",
    registration: [
      {
        id: 0,
        patient_id: 0,
        registration_date: "",
        subjective: "",
        objective: "",
        assessment: "",
        plan: "",
        diagnosis: "",
      },
    ],
  };

  const [patient, setPatient] = useState<Patient>(patientData);

  useEffect(() => {
    const fetchNurseDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/patients/${id}`
        );
        setPatient(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (inputId) {
      const patientId = Number(inputId);
      if (!isNaN(patientId)) {
        fetchNurseDetails(patientId);
      } else {
        console.error("Invalid medicine ID:", inputId);
        router.push("/error");
      }
    }
  }, [inputId]);

  return (
    <Table tableHead={tableHeaders}>
      {patient.registration.map((registration: Registration, index: number) => {
        return (
          <tr
            key={index}
            className={clsx("bg-basic-white cursor-pointer", {
              "bg-brand-10 bg-opacity-15": index % 2 != 0,
            })}
          >
            <td className="px-4 py-4 text-center">
              {registration.registration_date}
            </td>
            <td className="px-4 py-4 text-center">{registration.subjective}</td>
            <td className="px-4 py-4 text-center">{registration.objective}</td>
            <td className="px-4 py-4 text-center">{registration.plan}</td>
            <td className="px-4 py-4 text-center">{registration.assessment}</td>
            <td className="px-4 py-4 text-center">{registration.diagnosis}</td>
          </tr>
        );
      })}
    </Table>
  );
}
