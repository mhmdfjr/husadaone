"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import clsx from "clsx";
import TableRecipeById from "@/components/table/tableRecipeById";
import Cookies from "js-cookie";

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

export default function ValidateRecipe() {
  const token = Cookies.get("token");
  const [medicineName, setMedicineName] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [usage, setUsage] = useState<string>("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const params = useParams();

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
    polyclinic_id: 0,
    name: "",
    specialist: "",
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

  const recipeData: Recipe = {
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

  const [childData, setChildData] = useState<Recipe>(recipeData);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleChildData = (data: Recipe) => {
    setChildData(data);
  };

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
        console.error("Invalid patient ID:", params.id);
        router.push("/error");
      }
    }
  }, [params]);

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(
        `${apiUrl}/payments-medicines/${id}`,
        {
          id: childData.id,
          payment_id: childData.payment_id,
          medicine_id: childData.medicine_id,
          amount: childData.amount,
          usage: childData.usage_rules,
        },
        {
          params: {
            amount: childData.amount,
            usage_rules: childData.usage_rules,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );
      router.push(`/pharmacy/recipe/${registration.id}`);
    } catch (error) {
      console.error("Failed to update recipe details:", error);
    }
  };

  const handleValidation = async (id: number) => {
    try {
      const response = await axios.get(`${apiUrl}/validation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "Application/json",
        },
      });
      router.push("/pharmacy/recipe");
    } catch (error) {
      console.error("Failed to update validation:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex flex-col justify-start items-center gap-4">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible scrollbar-hide">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/pharmacy/recipe")}
          >
            Resep
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Validasi Resep</p>
        </div>
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex justify-start items-center gap-4">
              <div className="basis-1/4">
                <Input
                  label="No Reg"
                  type="text"
                  onChange={() => {}}
                  placeholder=""
                  name=""
                  value={registration.id.toString()}
                />
              </div>
              <div className="basis-1/4">
                <Input
                  label="No RM"
                  type="text"
                  onChange={() => {}}
                  placeholder=""
                  name=""
                  value={registration.patient_id.toString()}
                />
              </div>
              <DatePicker
                title="Tanggal Penanganan"
                name=""
                value={registration ? registration.registration_date : null}
                onDateChange={handleDateChange}
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
              label="Dokter"
              type="text"
              onChange={() => {}}
              placeholder=""
              name=""
              value={registration.doctor.name}
            />
          </div>
        </div>
      </div>

      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll  scrollbar-hide">
        <TableRecipeById onDataChange={handleChildData} />
      </div>

      <div
        className={clsx(
          "w-full justify-center items-end gap-4 py-6 px-8 flex bg-basic-white rounded-2xl border-2 overflow-scroll scrollbar-hide",
          { hidden: !childData.isOn }
        )}
      >
        <div className="w-full flex justify-start items-end gap-4">
          <div className="w-full">
            <Input
              label="Nama Obat"
              type="text"
              onChange={(e) =>
                setMedicineName((childData.name = e.target.value))
              }
              placeholder={childData ? childData.name : ""}
              name=""
              value={childData ? childData.name : ""}
            />
          </div>
          <div className="w-full">
            <Input
              label="Jumlah"
              type="text"
              onChange={(e) =>
                setAmount((childData.amount = Number(e.target.value)))
              }
              placeholder={childData ? childData.amount.toString() : ""}
              name=""
              value={childData ? childData.amount.toString() : ""}
            />
          </div>
          <div className="w-full">
            <Input
              label="Aturan Pakai"
              type="select"
              onChange={(e) =>
                setUsage((childData.usage_rules = e.target.value))
              }
              placeholder={childData ? childData.usage_rules : "Pilih"}
              name=""
              value={childData ? childData.usage_rules : usage}
              options={[childData.usage_rules, "3x1", "2x1"]}
            />
          </div>
        </div>

        <Button
          label="Simpan"
          variant="primary"
          size="small"
          onClick={() => {
            handleEdit(childData.id);
          }}
        />
      </div>

      <div className="w-full flex gap-4 justify-end items-center">
        <Button
          label="Batal"
          variant="secondary"
          size="big"
          onClick={() => router.push("/pharmacy/recipe")}
        />
        <Button
          label="Validasi"
          variant="primary"
          size="big"
          onClick={() => handleValidation(registration.id)}
        />
      </div>
    </div>
  );
}
