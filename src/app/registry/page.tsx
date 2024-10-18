"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import TableRegist from "@/components/table/tableRegist";
import { Add } from "iconsax-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/date-picker";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Data {
  name: string;
  age: number;
  address: string;
}

const Registry = () => {
  const router = useRouter();
  const [regis, setRegis] = useState("");
  const [nama, setNama] = useState("");
  const [noRM, setNoRM] = useState("");
  const [poli, setPoli] = useState("");
  const [doctor, setDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [state, setState] = useState<Data>({
    name: "John Doe",
    age: 30,
    address: "1234 Example St, City, Country",
  });

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "https://api-simrs.serpihantech.com/api/registrations",
        {
          patient_id: nama,
          polyclinic_id: poli,
          doctor_id: doctor,
          registration_date: selectedDate,
        },
        {
          params: {
            patient_id: nama,
            polyclinic_id: poli,
            doctor_id: doctor,
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
              onChange={(e) => setRegis(e.target.value)}
            />
            <DatePicker
              title="Tanggal Registrasi"
              name=""
              value={null}
              onDateChange={handleDateChange}
            />
            <Input
              label="Nama"
              name="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="No Rekam Medis"
                name="noRM"
                type="text"
                value={noRM}
                onChange={(e) => setNoRM(e.target.value)}
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
                value={poli}
                onChange={(e) => setPoli(e.target.value)}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {}}
                size="very-small"
                variant="secondary"
              />
            </div>
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="Dokter yang Dituju"
                name="doctor"
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {}}
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
