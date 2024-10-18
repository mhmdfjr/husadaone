"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Edit } from "iconsax-react";
import axios from "axios";
import clsx from "clsx";

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

interface Payment {
  id: number;
  registration_id: number;
  total_cost: string;
  medicines: Medicine[];
}

interface Registration {
  id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
}

interface Patient {
  id: number;
  name: string;
  registration: Registration[];
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

interface TableRecipeByIdProps {
  onDataChange: (data: Recipe) => void;
}

const TableRecipeById: React.FC<TableRecipeByIdProps> = ({ onDataChange }) => {
  const router = useRouter();
  const params = useParams();

  const tableHeaders = [
    "Kode Obat",
    "Nama Obat",
    "Jumlah",
    "Aturan Pakai",
    "Aksi",
  ];

  const patientData: Patient = {
    id: 0,
    name: "",
    registration: [
      { id: 0, polyclinic_id: 0, doctor_id: 0, registration_date: "" },
    ],
  };

  const pivotData: Pivot = {
    payment_id: 0,
    medicine_id: 0,
    amount: 0,
    usage_rules: "",
    id: 0,
  };

  const medicineData: Medicine[] = [
    {
      id: 0,
      name: "",
      stock: 0,
      pivot: pivotData,
    },
  ];

  const paymentData: Payment[] = [
    {
      id: 0,
      registration_id: 0,
      total_cost: "",
      medicines: medicineData,
    },
  ];

  const [patients, setPatients] = useState<Patient>(patientData);
  const [payments, setPayments] = useState<Payment[]>(paymentData);
  const [medicines, setMedicines] = useState<Medicine[]>(medicineData);

  const [selectedOption, setSelectedOption] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/patients/${id}`
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (params && params.id) {
      const patientId = Number(params.id);
      if (!isNaN(patientId)) {
        fetchPatientDetails(patientId);
      } else {
        console.error("Invalid patient ID:", params.id);
        router.push("/error");
      }
    }
  }, [params]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/payments`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };
    fetchPayments();
  }, [params]);

  useEffect(() => {
    if (patients && patients.id && payments.length > 0) {
      const matchingPayments = payments.filter(
        (payment: Payment) => payment.registration_id === patients.id
      );
      if (matchingPayments.length > 0) {
        if (matchingPayments) {
          setMedicines(matchingPayments[0].medicines);
        }
      }
    }
  }, [payments]);

  const handelAction = (data: Recipe) => {
    setSelectedOption(!data.isOn);
    onDataChange({
      payment_id: data.payment_id,
      isOn: !data.isOn,
      medicine_id: data.medicine_id,
      name: data.name,
      amount: data.amount,
      usage_rules: data.usage_rules,
      id: data.id,
    });
  };

  return (
    <Table tableHead={tableHeaders}>
      {medicines.map((medicine: Medicine, index: number) => (
        <tr key={index} className="bg-basic-white">
          <td className="px-4 py-4 text-center">{medicine.id}</td>
          <td className="px-4 py-4 text-center">{medicine.name}</td>
          <td className="px-4 py-4 text-center">{medicine.pivot.amount}</td>
          <td className="px-4 py-4 text-center">
            {medicine.pivot.usage_rules}
          </td>
          <td
            className={clsx(
              "px-4 py-4 text-center flex justify-center items-center cursor-pointer",
              {
                "text-gray-medium-light": selectedOption,
                "text-brand-base": !selectedOption,
              }
            )}
          >
            <Edit
              size="24"
              onClick={() =>
                handelAction({
                  payment_id: medicine.pivot.payment_id,
                  isOn: selectedOption,
                  medicine_id: medicine.id,
                  name: medicine.name,
                  amount: medicine.pivot.amount,
                  usage_rules: medicine.pivot.usage_rules,
                  id: medicine.pivot.id,
                })
              }
            />
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default TableRecipeById;
