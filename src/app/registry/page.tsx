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
import Popup from "@/components/popup";
import Cookies from "js-cookie";

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
  const patientData = Cookies.get("patientData")
    ? JSON.parse(Cookies.get("patientData") as string)
    : {};
  const router = useRouter();
  const [id, setId] = useState<number>();
  const [medic, setMedic] = useState<number>();
  const [polyQueue, setPolyQueue] = useState<number>();
  const [polyName, setPolyName] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

  const handlePrintQueue = async () => {
    try {
      const { data: response } = await axios.get(`${apiUrl}/registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "Application/json",
        },
      });
      const latestRegistration = response.data[response.data.length - 1];
      const polyQueue = latestRegistration.poly_queue;
      const polyName = latestRegistration.polyclinic.name;

      setPolyQueue(polyQueue);
      setPolyName(polyName);

      const doc = new jsPDF({
        unit: "pt",
        format: [250, 250],
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Rumah Sakit Harapan Sehat", 30, 30);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(
        "Jl. Pemuda No.229, Bantarbolang, Kab. Pemalang, Jawa Tengah",
        10,
        45
      );
      doc.text("Telp: 0876-8383-8393   Email: harapansehat@gmail.com", 20, 55);

      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(20, 65, 233.5, 65);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Nomor Antrian", 125, 85, { align: "center" });
      doc.text(
        polyName ? polyName : "Poliklinik ___________________",
        120,
        100,
        {
          align: "center",
        }
      );

      doc.setFontSize(40);
      doc.text(polyQueue ? polyQueue.toString() : "0", 125, 160, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Dengan Sepenuh Hati", 125, 200, { align: "center" });

      doc.save("Tiket_Antrian_Poliklinik.pdf");

      Cookies.remove("newPatient");
      Cookies.remove("patientId");
      Cookies.remove("patientName");
      Cookies.remove("doctorId");
      Cookies.remove("doctorName");
      Cookies.remove("polyclinicId");
      Cookies.remove("polyclinicName");
      router.push("/registry");
    } catch (error) {
      console.error(error);
    }
  };

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
      handlePrintQueue();
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      console.error("Failed to post medicine details:", error);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handlePrintRegistration = () => {
    const doc = new jsPDF();
    const imgData = "/assets/SIMRS.png";

    if (imgData) {
      doc.addImage(imgData, "PNG", 20, 18, 29, 12);
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Rumah Sakit Harapan Sehat", 60, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Jl. Pemuda No.229, Bantarbolang, Kab. Pemalang, Jawa Tengah",
      60,
      25
    );
    doc.text("Telp: 0876-8383-8393   Email: harapansehat@gmail.com", 60, 30);

    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.line(20, 40, 190, 40);
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Kartu Registrasi Pasien", 105, 50, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text("No Reg :", 20, 60);
    {
      id ? doc.text(id.toString(), 40, 60) : doc.line(40, 60, 100, 60);
    }

    doc.text("Tanggal :", 20, 70);
    {
      selectedDate ? doc.text(selectedDate, 40, 70) : doc.line(40, 70, 100, 70);
    }

    doc.text("Nama :", 20, 80);
    {
      patientName ? doc.text(patientName, 40, 80) : doc.line(40, 80, 100, 80);
    }

    doc.text("TTL :", 20, 90);
    {
      patientData
        ? doc.text(
            `${patientData.place_of_birth} / ${patientData.date_of_birth}`,
            40,
            90
          )
        : doc.line(40, 90, 100, 90);
    }

    doc.text("Asuransi :", 20, 100);
    {
      patientData
        ? doc.text(patientData.insurance, 40, 100)
        : doc.line(40, 100, 100, 100);
    }

    doc.text("JK :", 20, 110);
    {
      patientData
        ? doc.text(patientData.gender, 40, 110)
        : doc.line(40, 110, 55, 110);
    }
    doc.text("Gol. Darah :", 58, 110);
    {
      patientData
        ? doc.text(patientData.blood_type, 85, 110)
        : doc.line(85, 110, 100, 110);
    }

    doc.text("No RM :", 110, 60);
    {
      patientId
        ? doc.text(patientId.toString(), 135, 60)
        : doc.line(135, 60, 190, 60);
    }

    doc.text("Alamat :", 110, 70);
    {
      patientData
        ? doc.text(patientData.address, 135, 70)
        : doc.line(135, 70, 190, 70);
    }

    doc.text("Alergi :", 110, 80);
    {
      patientData
        ? doc.text(patientData.allergy, 135, 80)
        : doc.line(135, 80, 190, 80);
    }

    doc.text("Kecacatan :", 110, 90);
    {
      patientData
        ? doc.text(patientData.disability, 135, 90)
        : doc.line(135, 90, 190, 90);
    }

    doc.text("Poliklinik :", 110, 100);
    {
      polyclinicName
        ? doc.text(polyclinicName, 135, 100)
        : doc.line(135, 100, 190, 100);
    }
    doc.text("Dokter :", 110, 110);
    {
      doctorName
        ? doc.text(doctorName, 135, 110)
        : doc.line(135, 110, 190, 110);
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Penanganan", 105, 125, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Subjektif :", 20, 135);
    doc.line(40, 135, 100, 135);
    doc.text("Objektif :", 110, 135);
    doc.line(135, 135, 190, 135);
    doc.line(20, 145, 100, 145);
    doc.line(110, 145, 190, 145);
    doc.line(20, 155, 100, 155);
    doc.line(110, 155, 190, 155);
    doc.line(20, 165, 100, 165);
    doc.line(110, 165, 190, 165);
    doc.line(20, 175, 100, 175);
    doc.line(110, 175, 190, 175);

    doc.text("Diagnosa :", 20, 185);
    doc.line(40, 185, 100, 185);
    doc.text("Peresepan :", 110, 185);
    doc.line(135, 185, 190, 185);
    doc.line(20, 195, 100, 195);
    doc.line(110, 195, 190, 195);
    doc.line(20, 205, 100, 205);
    doc.line(110, 205, 190, 205);
    doc.line(20, 215, 100, 215);
    doc.line(110, 215, 190, 215);
    doc.line(20, 225, 100, 225);
    doc.line(110, 225, 190, 225);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Dengan Sepenuh Hati - Rumah Sakit Harapan Sehat", 105, 290, {
      align: "center",
    });

    doc.save("Kartu_Registrasi_Pasien.pdf");
  };

  const handleCancel = () => {
    Cookies.remove("newPatient");
    Cookies.remove("patientId");
    Cookies.remove("patientName");
    Cookies.remove("doctorId");
    Cookies.remove("doctorName");
    Cookies.remove("polyclinicId");
    Cookies.remove("polyclinicName");
    router.refresh();
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
            onClick={() => handleCancel()}
          />
          <Button
            label="Cetak"
            variant="secondary"
            size="small"
            onClick={() => handlePrintRegistration()}
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
