"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

interface Payment {
  id: number;
  registration_id: number;
  total_cost: string;
  medicines: Medicine[];
}

interface TablePrescription {
  medicineName?: Medicine;
}

const TablePrescription: React.FC<TablePrescription> = ({ medicineName }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const params = useParams();

  const tableHeaders = ["Kode Obat", "Nama Obat", "Jumlah", "Aturan Pakai"];

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

  const [medicine, setMedicine] = useState<Medicine>(medicineData);
  const [medicines, setMedicines] = useState<Medicine[]>(medicinesData);

  const paymentData: Payment = {
    id: 0,
    registration_id: 0,
    total_cost: "",
    medicines: medicinesData,
  };

  const [payment, setPayment] = useState<Payment>(paymentData);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/payments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
        setPayment(response.data.payment);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (params && params.id) {
      const paymentId = Number(params.id);
      if (!isNaN(paymentId)) {
        fetchPatientDetails(paymentId);
      } else {
        console.error("Invalid patient ID:", params.input);
        router.push("/error");
      }
    }
  }, [params]);

  return (
    <Table tableHead={tableHeaders}>
      {payment.medicines.map((medicine: Medicine, index: number) => (
        <tr key={index} className="bg-basic-white">
          <td className="px-4 py-4 text-center">{medicine.id}</td>
          <td className="px-4 py-4 text-center">{medicine.name}</td>
          <td className="px-4 py-4 text-center">{medicine.pivot.amount}</td>
          <td className="px-4 py-4 text-center">
            {medicine.pivot.usage_rules}
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default TablePrescription;
