"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import TableRegist from "@/components/table/tableRegist";
import { Add } from "iconsax-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/date-picker";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Popup from "@/components/popup";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

interface Data {
  name: string;
  age: number;
  address: string;
}

const Registry = () => {
  const token = Cookies.get("token");
  const newPatient = Cookies.get("newPatient");
  const patientId = Cookies.get("patientId");
  const patientName = Cookies.get("patientName");
  const doctorId = Cookies.get("doctorId");
  const doctorName = Cookies.get("doctorName");
  const polyclinicId = Cookies.get("polyclinicId");
  const polyclinicName = Cookies.get("polyclinicName");
  const router = useRouter();
  const [id, setId] = useState<number>();
  const [medic, setMedic] = useState<number>();
  const [isSuccess, setIsSuccess] = useState<boolean | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [state, setState] = useState<Data>({
    name: "John Doe",
    age: 30,
    address: "1234 Example St, City, Country",
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/registrations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
        setId(response.data[response.data.length - 1].id + 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
        if (newPatient == "true") {
          setMedic(response.data[response.data.length - 1].id);
        } else {
          setMedic(0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/registrations`,
        {
          patient_id: patientId
            ? Number(patientId)
            : newPatient
            ? medic
              ? medic
              : ""
            : "",
          polyclinic_id: Number(polyclinicId),
          doctor_id: Number(doctorId),
          registration_date: selectedDate,
        },
        {
          params: {
            patient_id: patientId
              ? Number(patientId)
              : newPatient
              ? medic
                ? medic
                : ""
              : "",
            polyclinic_id: Number(polyclinicId),
            doctor_id: Number(doctorId),
            registration_date: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      Cookies.remove("newPatient");
      Cookies.remove("patientId");
      Cookies.remove("patientName");
      Cookies.remove("doctorId");
      Cookies.remove("doctorName");
      Cookies.remove("polyclinicId");
      Cookies.remove("polyclinicName");
      router.push("/registry");
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      console.error("Failed to post medicine details:", error);
    } finally {
      setIsModalOpen(true);
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
      <div
        onClick={() => {
          isModalOpen ? setIsModalOpen(false) : "";
        }}
        className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible scrollbar-none"
      >
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="No Registrasi"
              name="regis"
              type="text"
              value={id ? id.toString() : ""}
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
              value={patientName ? patientName : ""}
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="No Rekam Medis"
                name="noRM"
                type="text"
                value={
                  patientId
                    ? patientId
                    : newPatient
                    ? medic
                      ? medic.toString()
                      : ""
                    : ""
                }
                onChange={() => {}}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {
                  Cookies.remove("newPatient");
                  Cookies.remove("patientId");
                  Cookies.remove("patientName");
                  router.push("/registry/medic");
                }}
                size="very-small"
                variant="secondary"
              />
            </div>
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="Poliklinik yang Dituju"
                name="poli"
                type="text"
                value={polyclinicName ? polyclinicName : ""}
                onChange={() => {}}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {
                  Cookies.remove("polyclinicId");
                  Cookies.remove("polyclinicName");
                  router.push("/registry/polyclinic");
                }}
                size="very-small"
                variant="secondary"
              />
            </div>
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="Dokter yang Dituju"
                name="doctor"
                type="text"
                value={doctorName ? doctorName : ""}
                onChange={() => {}}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {
                  Cookies.remove("doctorId");
                  Cookies.remove("doctorName");
                  router.push("/registry/doctor");
                }}
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
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2">
        <TableRegist />
      </div>
      {isModalOpen && (
        <Popup
          variant={isSuccess ? "success" : "danger"}
          icon={isSuccess ? "tick" : "warning"}
          withButton={false}
          description={
            isSuccess
              ? ["Registrasi berhasil", ""]
              : ["Registrasi gagal", "Coba ulangi beberapa saat lagi"]
          }
          buttonLabel={["Selesai", "Keluar"]}
        />
      )}
    </div>
  );
};

export default Registry;
