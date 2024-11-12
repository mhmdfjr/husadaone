"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import axios from "axios";
import TableMedicineBill from "@/components/table/tableMedicineBill";
import TableServiceBill from "@/components/table/tableServiceBill";

interface Patient {
  id: number;
  name: string;
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
}

interface Registration {
  id: number;
  patient_id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
  already_paid: string;
  polyclinic: Polyclinic;
  doctor: Doctor;
  patient: Patient;
}

interface Pivot {
  payment_id: number;
  medicine_id: number;
  amount: number;
  usage_rules: string;
  id: number;
}

interface Medicine {
  payment_id: number;
  isOn: boolean;
  medicine_id: number;
  name: string;
  amount: number;
  usage_rules: string;
  id: number;
}

interface Payment {
  id: number;
  registration_id: number;
  validation: number;
  registration: Registration;
}

interface MedicineTable {
  id: number;
  name: string;
  category: string;
  unit: string;
  purchase_price: string;
  unit_price: string;
  stock: number;
  production_year: string;
  validity_period: string;
  pivot: Pivot;
}

export default function CashierDetails() {
  const [pay, setPay] = useState<number>(0);
  const [cashback, setCashback] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  const router = useRouter();
  const params = useParams();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const patientData: Patient = {
    id: 0,
    name: "",
  };

  const doctorData: Doctor = {
    id: 0,
    polyclinic_id: 0,
    name: "",
    specialist: "",
  };

  const polyclinicData: Polyclinic = {
    id: 0,
    name: "",
  };

  const registrationData: Registration = {
    id: 0,
    patient_id: 0,
    polyclinic_id: 0,
    doctor_id: 0,
    registration_date: "",
    already_paid: "",
    polyclinic: polyclinicData,
    patient: patientData,
    doctor: doctorData,
  };

  const medicineData: Medicine = {
    payment_id: 0,
    isOn: false,
    medicine_id: 0,
    name: "",
    amount: 0,
    usage_rules: "",
    id: 0,
  };

  const [registration, setRegistration] =
    useState<Registration>(registrationData);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchRegistration = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `${apiUrl}/registrations/${id}`
        );
        setRegistration(response.data.registration);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (params && params.id) {
      const registrationId = Number(params.id);
      if (!isNaN(registrationId)) {
        fetchRegistration(registrationId);
      } else {
        console.error("Invalid medicine ID:", params.id);
        router.push("/error");
      }
    }
  }, [params]);

  const [totalPriceMedicine, setTotalPriceMedicine] = useState<number>(0);
  const [doctorCost, setDoctorCost] = useState<number>(0);
  const [medicinesTable, setMedicinesTable] = useState<MedicineTable[]>([]);

  const handleTotalPriceChange = (totalPrice: number) => {
    setTotalPriceMedicine(totalPrice);
  };

  const handleDoctorCostChange = (cost: number) => {
    setDoctorCost(cost);
  };

  const handleMedicinesChange = (medicines: MedicineTable[]) => {
    setMedicinesTable(medicines);
  };

  const totalBills: number = totalPriceMedicine + doctorCost;

  useEffect(() => {
    {
      registration.already_paid === "yes"
        ? setStatus("Sudah Bayar")
        : setStatus("Belum Bayar");
    }
  }, [registration]);

  const handleSave = async (
    medicinesTable: MedicineTable[],
    registrationData: Registration
  ) => {
    try {
      const response = axios.put(
        `${apiUrl}/registrations/${registrationData.id}`,
        {
          patient_id: registrationData.patient_id,
          polyclinic_id: registrationData.polyclinic_id,
          doctor_id: registrationData.doctor_id,
          registration_date: registrationData.registration_date,
          already_paid: status === "Sudah Bayar" ? "yes" : null,
        },
        {
          params: {
            patient_id: registrationData.patient_id,
            polyclinic_id: registrationData.polyclinic_id,
            doctor_id: registrationData.doctor_id,
            registration_date: registrationData.registration_date,
            already_paid: status === "Sudah Bayar" ? "yes" : null,
          },
        }
      );
      router.push("/pharmacy/cashier");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }

    medicinesTable.map((medicineTable: MedicineTable, index: number) => {
      try {
        const response = axios.put(
          `${apiUrl}/medicines/${medicineTable.id}`,
          {
            name: medicineTable.name,
            category: medicineTable.category,
            unit: medicineTable.unit,
            purchase_price: medicineTable.purchase_price,
            unit_price: medicineTable.unit_price,
            stock:
              status === "Sudah Bayar"
                ? medicineTable.stock - medicineTable.pivot.amount
                : medicineTable.stock,
            production_year: medicineTable.production_year,
            validity_period: medicineTable.validity_period,
          },
          {
            params: {
              name: medicineTable.name,
              category: medicineTable.category,
              unit: medicineTable.unit,
              purchase_price: medicineTable.purchase_price,
              unit_price: medicineTable.unit_price,
              stock:
                status === "Sudah Bayar"
                  ? medicineTable.stock - medicineTable.pivot.amount
                  : medicineTable.stock,
              production_year: medicineTable.production_year,
              validity_period: medicineTable.validity_period,
            },
          }
        );
        router.push("/pharmacy/cashier");
      } catch (error) {
        console.error("Failed to post medicine details:", error);
      }
    });
  };

  const handleCLick = () => {};

  return (
    <>
      <div className="mx-4 flex justify-start items-center gap-4">
        <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible ">
          <div className="flex justify-start items-center text-body-sm cursor-pointer">
            <p
              className="text-gray-medium-light p-2"
              onClick={() => router.push("/pharmacy/cashier")}
            >
              Kasir
            </p>
            <ArrowRight2 size="16" className="text-gray-medium-light" />
            <p className="text-brand-40 p-2">Pembayaran</p>
          </div>

          <div className="flex justify-start items-center gap-4">
            <div className="basis-1/4">
              <Input
                label="No Reg"
                type="text"
                onChange={() => {}}
                placeholder={registration ? registration.id.toString() : ""}
                name=""
                value={registration ? registration.id.toString() : ""}
              />
            </div>
            <div className="basis-1/4">
              <Input
                label="No RM"
                type="text"
                onChange={() => {}}
                placeholder={
                  registration ? registration.patient.id.toString() : ""
                }
                name=""
                value={
                  registration ? registration.patient.id.toString() : "000"
                }
              />
            </div>
            <DatePicker
              title="Tanggal Penanganan"
              name=""
              value={registration ? registration.registration_date : null}
              onDateChange={handleDateChange}
            />
            <Input
              label="Nama Pasien"
              type="text"
              onChange={() => {}}
              placeholder={registration ? registration.patient.name : ""}
              name=""
              value={registration ? registration.patient.name : ""}
            />
          </div>
        </div>
      </div>

      <div className="mx-4 flex justify-start items-center gap-4 ">
        <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
          <p className="text-h8-bold text-basic-black">
            Tagihan Jasa Pemeriksaan
          </p>
          <TableServiceBill
            registrationId={registration.id}
            onDoctorCostChange={handleDoctorCostChange}
          />
          <div className="w-full flex justify-end items-center gap-4">
            <p className="text-h8-bold text-basic-black">Subtotal : </p>
            <div className="w-60 py-4 bg-brand-10 flex justify-center items-center rounded-lg">
              <p className="text-body-bold text-basic-black">Rp.{doctorCost}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 flex justify-start items-center gap-4 ">
        <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
          <p className="text-h8-bold text-basic-black">Tagihan Obat</p>
          <TableMedicineBill
            registrationId={registration.id}
            onTotalPriceChange={handleTotalPriceChange}
            onMedicinesChange={handleMedicinesChange}
          />
          <div className="w-full flex justify-end items-center gap-4">
            <p className="text-h8-bold text-basic-black">Subtotal : </p>
            <div className="w-60 py-4 bg-brand-10 flex justify-center items-center rounded-lg">
              <p className="text-body-bold text-basic-black">
                Rp.{totalPriceMedicine}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 flex justify-start items-center gap-4 ">
        <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
          <div className="flex justify-between items-center">
            <p className="text-h8-bold text-basic-black">Pembayaran</p>
            <div className="flex justify-center items-center gap-4">
              <p className="text-h8-bold text-basic-black">Total Tagihan : </p>
              <div className="w-60 py-4 bg-brand-30 flex justify-center items-center rounded-lg">
                <p className="text-h7-bold text-basic-black">Rp.{totalBills}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start items-center gap-20">
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <Input
                label="Nominal Bayar"
                type="number"
                onChange={(e) => setPay(Number(e.target.value))}
                placeholder=""
                name=""
                value={pay.toString()}
              />
              <Input
                label="Kembali"
                type="number"
                onChange={() => {}}
                placeholder=""
                name=""
                value={pay === 0 ? "000" : (pay - totalBills).toString()}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <Input
                label="Jenis Pembayaran"
                type="select"
                onChange={(e) => {}}
                placeholder="Pilih"
                name=""
                value="Tunai"
                options={["Tunai", "Non Tunai"]}
              />
              <Input
                label="Status Pembayaran"
                type="select"
                onChange={(e) => setStatus(e.target.value)}
                placeholder=""
                name=""
                value={status}
                options={["Sudah Bayar", "Belum Bayar"]}
              />
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-4">
            <Button
              label="Batal"
              variant="secondary"
              size="small"
              onClick={() => router.push("/pharmacy/cashier")}
            />
            <Button
              label="Nota"
              variant="secondary"
              size="small"
              onClick={() => {}}
            />
            <Button
              label="Simpan"
              variant="primary"
              size="small"
              onClick={() => handleSave(medicinesTable, registration)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
