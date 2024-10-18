"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import TableDashboard from "@/components/table/tableDashboard";

interface PatientDetails {
  id: number;
  medic: number;
  name: string;
  allergy: string;
  disability: string;
}

export default function EditPatientData() {
  const [id, setId] = useState<number>(0);
  const [medic, setMedic] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [allergy, setAllergy] = useState<string>("");
  const [disability, setDisability] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const patientData: PatientDetails = {
    id: 0,
    medic: 0,
    name: "",
    allergy: "",
    disability: "",
  };
  const [patients, setPatients] = useState<PatientDetails>(patientData);

  useEffect(() => {
    const fetchNurseDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/patients/${id}`
        );
        setPatients(response.data);
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

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex flex-col justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/registry")}
          >
            Registrasi Pasien
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/registry/patient")}
          >
            Data Pasien
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Riwayat Pemeriksaan</p>
        </div>
        <div className="flex justify-start items-start gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex gap-4">
              <Input
                label="No Registrasi"
                type="number"
                onChange={(e) => setId(Number(e.target.value))}
                placeholder="000"
                name=""
                value={id.toString()}
              />
              <Input
                label="No RM"
                type="number"
                onChange={(e) => setMedic(Number(e.target.value))}
                placeholder="000"
                name=""
                value={medic.toString()}
              />
            </div>
            <Input
              label="Nama Pasien"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama"
              name=""
              value={name}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Alergi"
              type="text"
              onChange={(e) => setAllergy(e.target.value)}
              placeholder="Alergi"
              name=""
              value={allergy}
            />
            <Input
              label="Kecacatan"
              type="text"
              onChange={(e) => setDisability(e.target.value)}
              placeholder="Kecacatan"
              name=""
              value={disability}
            />
          </div>
        </div>
      </div>

      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <p className="text-h8-bold text-basic-black">Riwayat Pemeriksaan</p>
        <TableDashboard />
      </div>
    </div>
  );
}
