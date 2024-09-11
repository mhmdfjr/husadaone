"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import clsx from "clsx";

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

interface TableMedicineBillProps {
  dataPatient: PatientDetails;
  onTotalPriceChange: (totalPrice: number) => void;
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
  stock: number;
  unit_price: string;
  pivot: Pivot;
}

interface Payment {
  id: number;
  registration_id: number;
  total_cost: string;
  medicines: Medicine[];
}

const TableMedicineBill: React.FC<TableMedicineBillProps> = ({
  dataPatient,
  onTotalPriceChange,
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
      stock: 0,
      unit_price: "",
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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/payments`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };
    fetchPayments();
  }, [params]);

  useEffect(() => {
    if (dataPatient && dataPatient.id && payments.length > 0) {
      const matchingPayments = payments.filter(
        (payment: Payment) => payment.registration_id === dataPatient.id
      );
      if (matchingPayments.length > 0) {
        if (matchingPayments) {
          setMedicines(matchingPayments[0].medicines);
        }
      }
    }
  }, [payments]);

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

  useEffect(() => {
    // console.log("Updated Medicines:", medicines);
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
