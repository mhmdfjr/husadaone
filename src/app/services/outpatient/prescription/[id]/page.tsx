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
  const [audio, setAudio] = useState<string>("");

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
      setAudio(response.data);
      router.push(`/services/outpatient/prescription/${registration.id}`);
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  // const [childData, setChildData] = useState<Medicine[]>(medicinesData);

  // const handleChildData = (data: Medicine[]) => {
  //   setChildData(data);
  // };

  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]); // Track filtered medicines based on search input
  const [isFocused, setIsFocused] = useState<boolean>(false); // Track focus state

  useEffect(() => {
    // Filter the medicines based on the "Nama Obat" input
    const filtered = medicines.filter((medicineItem) =>
      medicineItem.name.toLowerCase().includes(medicineName.toLowerCase())
    );
    setFilteredMedicines(filtered);
  }, [medicineName, medicine, medicines]); // Update filtered medicines when the input or childData changes

  const handleMedicineSelect = (selectedMedicine: Medicine) => {
    setMedicine(selectedMedicine);
    setMedicineName(selectedMedicine.name); // Set selected medicine to input field
    setIsFocused(false); // Hide the dropdown after selection
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="mx-4 flex flex-col justify-start items-center gap-4 ">
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
            onClick={() => router.push("/registry")}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={() => handleSave(registration.id)}
          />
        </div>
      </div>

      {/* Medicine search and input section */}
      <div className="w-full py-6 px-8 flex justify-center items-end bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="w-full flex justify-start items-end gap-4">
          <div className="w-full relative">
            <Input
              label="Nama Obat"
              type="text"
              onFocus={() => setIsFocused(true)} // Show list when focused
              onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Hide list after clicking away (delay to allow item click)
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder=""
              name=""
              value={medicineName} // Update with medicineName input
            />
            {isFocused && filteredMedicines.length > 0 && (
              <ul className="w-full max-h-72 overflow-scroll bg-white border border-gray-300 rounded-md mt-2 absolute z-50">
                {filteredMedicines.map((med) => (
                  <li
                    key={med.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleMedicineSelect(med)} // Set medicine on click
                  >
                    {med.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Amount and usage inputs */}
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

      {/* Prescription table */}
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <TablePrescription
          medicineName={medicine}
          // onDataChange={handleChildData}
        />
      </div>
    </div>
  );
}
