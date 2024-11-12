"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import clsx from "clsx";

interface TableMedicineBillProps {
  registrationId: number;
  onTotalPriceChange: (totalPrice: number) => void;
  onMedicinesChange: (medicines: Medicine[]) => void;
}

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
  category: string;
  unit: string;
  purchase_price: string;
  unit_price: string;
  stock: number;
  production_year: string;
  validity_period: string;
  pivot: Pivot;
}

interface Payment {
  id: number;
  registration_id: number;
  total_cost: string;
  medicines: Medicine[];
}

const TableMedicineBill: React.FC<TableMedicineBillProps> = ({
  registrationId,
  onTotalPriceChange,
  onMedicinesChange,
}) => {
  const router = useRouter();
  const params = useParams();

  const tableHeaders = [
    "No",
    "Tagihan",
    "Jumlah",
    "Harga Satuan",
    "Total Harga",
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
      category: "",
      unit: "",
      purchase_price: "",
      unit_price: "",
      stock: 0,
      production_year: "",
      validity_period: "",
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

  const [payments, setPayments] = useState<Payment[]>(paymentData);
  const [medicines, setMedicines] = useState<Medicine[]>(medicineData);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchRegistration = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `${apiUrl}/registrations/${id}`
        );
        setMedicines(response.data.keranjang[0].medicines);
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
  }, [params, apiUrl, router]);

  useEffect(() => {
    onMedicinesChange(medicines);
  }, [medicines, onMedicinesChange]);

  let totalPriceMedicine: number = 0;
  const countPriceMedicine = (unit_price: string, amount: number) => {
    const priceMedicine = Number(unit_price) * amount;
    totalPriceMedicine += priceMedicine;
    return priceMedicine;
  };

  useEffect(() => {
    let newTotalPrice = 0;
    medicines.forEach((medicine) => {
      newTotalPrice += countPriceMedicine(
        medicine.unit_price,
        medicine.pivot.amount
      );
    });
    onTotalPriceChange(newTotalPrice);
  }, [medicines]);

  return (
    <Table tableHead={tableHeaders}>
      {medicines.map((medicine: Medicine, index: number) => (
        <tr key={index} className="bg-basic-white">
          <td className="px-4 py-4 text-center">{medicine.id}</td>
          <td className="px-4 py-4 text-center">{medicine.name}</td>
          <td className="px-4 py-4 text-center">{medicine.pivot.amount}</td>
          <td className="px-4 py-4 text-center">{medicine.unit_price}</td>
          <td className="px-4 py-4 text-center">
            {countPriceMedicine(medicine.unit_price, medicine.pivot.amount)}
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default TableMedicineBill;
