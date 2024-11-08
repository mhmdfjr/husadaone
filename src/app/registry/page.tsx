"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import TableRegist from "@/components/table/tableRegist";
import { Add } from "iconsax-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "@/components/date-picker";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Data {
  name: string;
  age: number;
  address: string;
}

interface Patient {
  id: number;
  name: string;
  gender: string;
  blood_type: string;
  place_of_birth: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  insurance: string;
  allergy: string;
  disability: string;
  pic_name: string;
  pic_status: string;
  pic_address: string;
}

interface Registration {
  id: number;
  patient_id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnosis: string;
  recipe: string;
  already_paid: string;
  patient: Patient;
}

interface Polyclinic {
  id: number;
  name: string;
}

interface SelectDoctor {
  id: number;
  name: string;
}

const Registry = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [regis, setRegis] = useState("");
  const [nama, setNama] = useState("");
  const [noRM, setNoRM] = useState("");
  const [poli, setPoli] = useState("");
  const [doctor, setDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const registrationData = {
    id: 0,
    patient_id: 0,
    polyclinic_id: 0,
    doctor_id: 0,
    registration_date: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    diagnosis: "",
    recipe: "",
    already_paid: "",
    patient: {
      id: 0,
      name: "",
      gender: "",
      blood_type: "",
      place_of_birth: "",
      date_of_birth: "",
      phone_number: "",
      address: "",
      insurance: "",
      allergy: "",
      disability: "",
      pic_name: "",
      pic_status: "",
      pic_address: "",
    },
  };

  const [state, setState] = useState<Data>({
    name: "John Doe",
    age: 30,
    address: "1234 Example St, City, Country",
  });

  const [patientId, setPatientId] = useState<Patient>({
    id: 0,
    name: "",
    gender: "",
    blood_type: "",
    place_of_birth: "",
    date_of_birth: "",
    phone_number: "",
    address: "",
    insurance: "",
    allergy: "",
    disability: "",
    pic_name: "",
    pic_status: "",
    pic_address: "",
  });
  const [polyclinicId, setPolyclinicId] = useState<Polyclinic>({
    id: 0,
    name: "",
  });
  const [doctorId, setDoctorId] = useState<SelectDoctor>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    const storagePatient = localStorage.getItem("patientId");
    const storagePolyclinic = localStorage.getItem("polyclinicId");
    const storageDoctor = localStorage.getItem("doctorId");

    if (storagePatient) {
      setPatientId(JSON.parse(storagePatient) as Patient);
    }
    if (storagePolyclinic) {
      setPolyclinicId(JSON.parse(storagePolyclinic) as Polyclinic);
    }
    if (storageDoctor) {
      setDoctorId(JSON.parse(storageDoctor) as SelectDoctor);
    }
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "https://api-simrs.serpihantech.com/api/registrations",
        {
          patient_id: patientId.id,
          polyclinic_id: polyclinicId.id,
          doctor_id: doctorId.id,
          registration_date: selectedDate,
        },
        {
          params: {
            patient_id: patientId.id,
            polyclinic_id: polyclinicId.id,
            doctor_id: doctorId.id,
            registration_date: selectedDate,
          },
        }
      );
      router.push("/registry");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Rumah Sakit Harapan Sehat", 10, 10);
    doc.text("Regitrasi Pasien", 10, 20);
    const tableData = [
      ["Name", state.name],
      ["Age", state.age.toString()],
      ["Address", state.address],
    ];

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: tableData,
    });

    doc.save("state-object-table.pdf");
  };

  return (
    <div className="mx-4 flex flex-col justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible ">
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="No Registrasi"
              name="regis"
              type="text"
              value={regis}
              onChange={() => {}}
            />
            <DatePicker
              title="Tanggal Registrasi"
              name=""
              value={selectedDate}
              onDateChange={handleDateChange}
            />
            <Input
              label="Nama"
              name="nama"
              type="text"
              value={patientId ? patientId.name : nama}
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="No Rekam Medis"
                name="noRM"
                type="text"
                value={patientId ? patientId.id.toString() : ""}
                onChange={() => {}}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => router.push("/registry/medic")}
                size="very-small"
                variant="secondary"
              />
            </div>
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="Poliklinik yang Dituju"
                name="poli"
                type="text"
                value={polyclinicId ? polyclinicId.name : ""}
                onChange={() => {}}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => router.push("/registry/polyclinic")}
                size="very-small"
                variant="secondary"
              />
            </div>
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="Dokter yang Dituju"
                name="doctor"
                type="text"
                value={doctorId ? doctorId.name : ""}
                onChange={() => {}}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => router.push("/registry/doctor")}
                size="very-small"
                variant="secondary"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => {}}
          />
          <Button
            label="Cetak"
            variant="secondary"
            size="small"
            onClick={() => handlePrint()}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={() => handleSave()}
          />
        </div>
      </div>
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <TableRegist />
      </div>
    </div>
  );
};

export default Registry;
