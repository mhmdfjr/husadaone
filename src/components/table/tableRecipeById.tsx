"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Edit } from "iconsax-react";
import axios from "axios";

interface MedicineDetails {
  id: number;
  name: string;
  stock: number;
}

export default function TableRecipeById() {
  const tableHeaders = [
    "Kode Obat",
    "Nama Obat",
    "Jumlah",
    "Aturan Pakai",
    "Aksi",
  ];
  const router = useRouter();
  const params = useParams();
  const medicineData: MedicineDetails = {
    id: 0,
    name: "",
    stock: 0,
  };
  const [medicine, setMedicine] = useState<MedicineDetails>(medicineData);

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/medicines/${id}`
        );
        setMedicine(response.data);
        console.log("Response:", response.data.id);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (params && params.id) {
      const medicineId = Number(params.id);
      if (!isNaN(medicineId)) {
        fetchPatientDetails(medicineId);
      } else {
        console.error("Invalid medicine ID:", params.id);
        router.push("/error");
      }
    }
  }, [params]);

  useEffect(() => {
    console.log("Updated Patient:", medicine.id);
  }, [medicine]);

  return (
    <Table tableHead={tableHeaders}>
      <tr className="bg-basic-white">
        <td className="px-4 py-4 text-center">{medicine.id}</td>
        <td className="px-4 py-4 text-center">{medicine.name}</td>
        <td className="px-4 py-4 text-center">{medicine.stock}</td>
        <td className="px-4 py-4 text-center">3x1</td>
        <td className="px-4 py-4 text-center flex justify-center items-center text-brand-base cursor-pointer">
          <Edit size="24" />
        </td>
      </tr>
    </Table>
  );
}
