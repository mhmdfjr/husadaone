"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import TablePrescription from "@/components/table/tablePrescription";
import axios from "axios";
import Cookies from "js-cookie";
import jsPDF from "jspdf";

interface Pivot {
  payment_id: number;
  medicine_id: number;
  amount: number;
  usage_rules: string;
  id: number;
}

interface Medicine {
  id: number;
  name: string;
  stock: number;
  pivot: Pivot;
}

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
  registration_date: string;
  polyclinic: Polyclinic;
  patient: Patient;
  doctor: Doctor;
}

interface Recipe {
  payment_id: number;
  isOn: boolean;
  medicine_id: number;
  name: string;
  amount: number;
  usage_rules: string;
  id: number;
}

export default function InputOutpatient() {
  const token = Cookies.get("token");
  const [amount, setAmount] = useState<number>(0);
  const [usage, setUsage] = useState<string>("");
  const [pharmacyQueue, setPharmacyQueue] = useState<number>();

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

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
    registration_date: "",
    polyclinic: polyclinicData,
    patient: patientData,
    doctor: doctorData,
  };

  const pivotData: Pivot = {
    payment_id: 0,
    medicine_id: 0,
    amount: 0,
    usage_rules: "",
    id: 0,
  };

  const medicineData: Medicine = {
    id: 0,
    name: "",
    stock: 0,
    pivot: pivotData,
  };

  const medicinesData: Medicine[] = [medicineData];

  const [medicineName, setMedicineName] = useState<string>(""); // Medicine name typed in input
  const [medicine, setMedicine] = useState<Medicine>(medicineData); // Selected medicine object
  const [medicines, setMedicines] = useState<Medicine[]>(medicinesData);
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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/medicines`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
        setMedicines(response.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };
    fetchPayments();
  }, [params]);

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/payments-medicines`,
        {
          payment_id: registration.id,
          medicine_id: filteredMedicines
            ? filteredMedicines[0].id
            : medicine.id,
          amount: amount,
          usage_rules: usage,
        },
        {
          params: {
            payment_id: registration.id,
            medicine_id: filteredMedicines
              ? filteredMedicines[0].id
              : medicine.id,
            amount: amount,
            usage_rules: usage,
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

  const handlePrintQueue = async (id: number) => {
    try {
      const { data: response } = await axios.get(`${apiUrl}/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "Application/json",
        },
      });
      const queue = response.data.payment.payment_queue;
      setPharmacyQueue(queue);

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
      doc.text("Nomor Antrian Apotek", 120, 85, { align: "center" });

      doc.setFontSize(40);
      doc.text(queue ? queue.toString() : "0", 125, 160, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Dengan Sepenuh Hati", 125, 200, { align: "center" });

      doc.save("Tiket_Antrian_Apotek.pdf");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (id: number) => {
    try {
      const response = await axios.post(
        `${apiUrl}/apotek/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );
      handlePrintQueue(id);
      router.push(`/services/outpatient`);
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const filtered = medicines.filter((medicineItem) =>
      medicineItem.name.toLowerCase().includes(medicineName.toLowerCase())
    );
    setFilteredMedicines(filtered);
  }, [medicineName, medicine, medicines]);

  const handleMedicineSelect = (selectedMedicine: Medicine) => {
    setMedicine(selectedMedicine);
    setMedicineName(selectedMedicine.name);
    setIsFocused(false);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="mx-4 flex flex-col justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible scrollbar-hide">
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
            variant="submenu"
            size="small"
            onClick={() =>
              router.push(`/services/outpatient/diagnose/${params.id}`)
            }
          />
          <Button
            label="Peresepan"
            variant="submenu-active"
            size="small"
            onClick={() =>
              router.push(`/services/outpatient/prescription/${params.id}`)
            }
          />
        </div>

        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="w-full flex gap-4">
              <div className="basis-1/2">
                <Input
                  label="No Reg"
                  type="number"
                  onChange={() => {}}
                  placeholder=""
                  name=""
                  value={registration.id.toString()}
                />
              </div>
              <div className="basis-1/2">
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
            </div>
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

      <div className="w-full py-6 px-8 flex justify-center items-end bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible scrollbar-hide">
        <div className="w-full flex justify-start items-end gap-4">
          <div className="w-full relative">
            <Input
              label="Nama Obat"
              type="text"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder=""
              name=""
              value={medicineName}
            />
            {isFocused && filteredMedicines.length > 0 && (
              <ul className="w-full max-h-72 overflow-scroll scrollbar-hide bg-white border border-gray-300 rounded-md mt-2 absolute z-50">
                {filteredMedicines.map((med) => (
                  <li
                    key={med.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleMedicineSelect(med)}
                  >
                    {med.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full">
            <Input
              label="Jumlah"
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder=""
              name=""
              value={amount.toString()}
            />
          </div>
          <div className="w-full">
            <Input
              label="Aturan Pakai"
              type="text"
              onChange={(e) => setUsage(e.target.value)}
              placeholder=""
              name=""
              value={usage}
            />
          </div>
        </div>
        <Button
          label="Tambah"
          variant="primary"
          size="small"
          onClick={() => handleAdd()}
        />
      </div>

      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll scrollbar-hide">
        <TablePrescription medicineName={medicine} />
      </div>
    </div>
  );
}
