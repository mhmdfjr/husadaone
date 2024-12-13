"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import Cookies from "js-cookie";

interface Patient {
  id: number;
  name: string;
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
  poly_queue: number;
  path_audio: string;
  registration_date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnosis: string;
  recipe: string;
  already_paid: string;
  polyclinic: Polyclinic;
  patient: Patient;
  doctor: Doctor;
}

export default function InputOutpatient() {
  const token = Cookies.get("token");
  const [diagnose, setDiagnose] = useState<string>("");
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("id");

  const patientData: Patient = {
    id: 0,
    name: "",
  };

  const polyclinicData: Polyclinic = {
    id: 0,
    name: "",
  };

  const doctorData: Doctor = {
    id: 0,
    name: "",
  };

  const registrationData: Registration = {
    id: 0,
    patient_id: 0,
    polyclinic_id: 0,
    doctor_id: 0,
    poly_queue: 0,
    path_audio: "",
    registration_date: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    diagnosis: "",
    recipe: "",
    already_paid: "",
    polyclinic: polyclinicData,
    patient: patientData,
    doctor: doctorData,
  };

  const [registration, setRegistration] =
    useState<Registration>(registrationData);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `${apiUrl}/registrations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "Application/json",
            },
          }
        );
        setRegistration(response.data.registration);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (params && params.id) {
      const registrationId = Number(params.id);
      if (!isNaN(registrationId)) {
        fetchPatientDetails(registrationId);
      } else {
        console.error("Invalid patient ID:", params.input);
        router.push("/error");
      }
    }
  }, [params]);

  const handleSave = async (id: number) => {
    try {
      const response = await axios.put(
        `${apiUrl}/registrations/${id}`,
        {
          patient_id: registration.patient_id,
          polyclinic_id: registration.polyclinic_id,
          doctor_id: registration.doctor_id,
          registration_date: registration.registration_date,
          subjective: registration.subjective,
          objective: registration.objective,
          assessment: registration.assessment,
          plan: registration.plan,
          diagnosis: diagnose,
          already_paid: registration.already_paid,
        },
        {
          params: {
            patient_id: registration.patient_id,
            polyclinic_id: registration.polyclinic_id,
            doctor_id: registration.doctor_id,
            registration_date: registration.registration_date,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );
      router.push(`/services/outpatient/prescription/${registration.id}`);
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/services/outpatient")}
          >
            Penanganan
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/services/outpatient")}
          >
            Rawat Jalan
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Pasien</p>
        </div>

        <div className="submenu flex">
          <Button
            label="Pemeriksaan"
            variant="submenu"
            size="small"
            onClick={() =>
              router.push(`/services/outpatient/assesment/${params.id}`)
            }
          />
          <Button
            label="Diagnosa"
            variant="submenu-active"
            size="small"
            onClick={() =>
              router.push(`/services/outpatient/diagnose/${params.id}`)
            }
          />
          <Button
            label="Peresepan"
            variant="submenu"
            size="small"
            onClick={() =>
              router.push(`/services/outpatient/prescription/${params.id}`)
            }
          />
        </div>

        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="w-full flex gap-4">
              <Input
                label="No Reg"
                type="number"
                onChange={() => {}}
                placeholder=""
                name=""
                value={registration.id.toString()}
              />
              <Input
                label="No RM"
                type="number"
                onChange={() => {}}
                placeholder=""
                name=""
                value={registration.patient_id.toString()}
              />
            </div>
            <DatePicker
              title="Tanggal"
              name=""
              value={registration.registration_date}
              onDateChange={() => {}}
            />
            <Input
              label="Nama Pasien"
              type="text"
              onChange={() => {}}
              placeholder=""
              name=""
              value={registration.patient.name}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Poliklinik"
              type="text"
              onChange={() => {}}
              placeholder=""
              name=""
              value={registration.polyclinic.name}
            />
            <Input
              label="Nama Dokter"
              type="text"
              onChange={() => {}}
              placeholder=""
              name=""
              value={registration.doctor.name}
            />
            <Input
              label="Diagnosa"
              type="text"
              onChange={(e) =>
                setDiagnose((registration.diagnosis = e.target.value))
              }
              placeholder=""
              name=""
              value={registration ? registration.diagnosis : diagnose}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/services/outpatient")}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={() => handleSave(registration.id)}
          />
        </div>
      </div>
    </div>
  );
}
