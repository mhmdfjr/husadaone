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

interface PatientRegistration {
  id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
}

interface PatientDetails {
  id: number;
  name: string;
  registration: PatientRegistration[];
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

interface Registration {
  id: number;
  patient_id: number;
  already_paid: string;
}

interface Payment {
  id: number;
  registration_id: number;
  validation: number;
  registration: Registration;
}

export default function CashierDetails() {
  const [registration, setRegistration] = useState("");
  const [medic, setMedic] = useState("");
  const [name, setName] = useState("");
  const [pay, setPay] = useState<number>(0);
  const [cashback, setCashback] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [payments, setPayments] = useState<Payment[]>([]);

  const router = useRouter();
  const params = useParams();

  const patientData: PatientDetails = {
    id: 0,
    name: "",
    registration: [
      { id: 0, polyclinic_id: 0, doctor_id: 0, registration_date: "" },
    ],
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

  const [patient, setPatient] = useState<PatientDetails>(patientData);

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/patients/${id}`
        );
        setPatient(response.data);
        console.log("Patient:", response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (params && params.id) {
      const patientId = Number(params.id);
      if (!isNaN(patientId)) {
        fetchPatientDetails(patientId);
      } else {
        console.error("Invalid medicine ID:", params.id);
        router.push("/error");
      }
    }
  }, [params]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/payments`
        );
        setPayments(response.data);
        console.log("Payments", response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPayments();
  }, []);

  const [totalPriceMedicine, setTotalPriceMedicine] = useState<number>(0);
  const [doctorCost, setDoctorCost] = useState<number>(0);

  const handleTotalPriceChange = (totalPrice: number) => {
    setTotalPriceMedicine(totalPrice);
  };

  const handleDoctorCostChange = (cost: number) => {
    setDoctorCost(cost);
  };

  const totalBills: number = totalPriceMedicine + doctorCost;

  useEffect(() => {
    {
      patient.registration.length > 0
        ? payments.map((payment: Payment, index: number) => {
            if (patient.registration[0].id == payment.registration_id) {
              payment.registration.already_paid === "yes"
                ? setStatus("Sudah Bayar")
                : setStatus("Belum Bayar");
            }
          })
        : "";
    }
  }, [payments]);

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
                onChange={(e) => setRegistration(e.target.value)}
                placeholder={patient ? patient.id.toString() : "000"}
                name=""
                value={patient ? patient.id.toString() : ""}
              />
            </div>
            <div className="basis-1/4">
              <Input
                label="No RM"
                type="text"
                onChange={(e) => setMedic(e.target.value)}
                placeholder={
                  patient.registration.length > 0
                    ? patient.registration[
                        patient.registration.length - 1
                      ].id.toString()
                    : "00000"
                }
                name=""
                value={
                  patient.registration.length > 0
                    ? patient.registration[
                        patient.registration.length - 1
                      ].id.toString()
                    : ""
                }
              />
            </div>
            <DatePicker title="Tanggal Penanganan" name="" />
            <Input
              label="Nama Pasien"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={patient ? patient.name : "Nama Pasien"}
              name=""
              value={patient ? patient.name : ""}
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
            dataPatient={patient}
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
            dataPatient={patient}
            onTotalPriceChange={handleTotalPriceChange}
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
                placeholder="0000"
                name=""
                value={pay.toString()}
              />
              <Input
                label="Kembali"
                type="number"
                onChange={() => {}}
                placeholder="0000"
                name=""
                value={pay === 0 ? "000" : (pay - totalBills).toString()}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <Input
                label="Jenis Pembayaran"
                type="select"
                onChange={(e) => {}}
                placeholder="Pilih Pembayaran"
                name=""
                value="Tunai"
                options={["Tunai", "Non Tunai"]}
              />
              <Input
                label="Status Pembayaran"
                type="select"
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
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
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
