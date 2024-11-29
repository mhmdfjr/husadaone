"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Edit } from "iconsax-react";
import axios from "axios";
import clsx from "clsx";
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
  const token = Cookies.get("token");
  const router = useRouter();
  const params = useParams();

  const tableHeaders = [
    "Kode Obat",
    "Nama Obat",
    "Jumlah",
    "Aturan Pakai",
    "Aksi",
  ];

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

  const [medicines, setMedicines] = useState<Medicine[]>(medicineData);

  const [selectedOption, setSelectedOption] = useState<boolean>(false);
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
        setMedicines(response.data.keranjang[0].medicines);
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
