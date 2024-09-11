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

interface TableServiceBillProps {
  dataPatient: PatientDetails;
  onDoctorCostChange: (cost: number) => void;
}

interface Doctor {
  id: number;
  name: string;
  specialist: string;
  cost: string;
}

interface Payment {
  id: number;
  registration_id: number;
  total_cost: string;
  doctor: Doctor;
}

const TableServiceBill: React.FC<TableServiceBillProps> = ({
  dataPatient,
  onDoctorCostChange,
}) => {
  const router = useRouter();
  const params = useParams();

  const tableHeaders = ["No", "Tagihan", "Harga Jasa"];

  const doctorData: Doctor = {
    id: 0,
    name: "",
    specialist: "",
    cost: "",
  };

  const paymentData: Payment[] = [
    {
      id: 0,
      registration_id: 0,
      total_cost: "",
      doctor: doctorData,
    },
  ];

  const [payments, setPayments] = useState<Payment[]>(paymentData);
  const [doctor, setDoctor] = useState<Doctor>(doctorData);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/payments`
        );
        setPayments(response.data);
        // console.log("Response Payments:", response.data);
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
        // console.log("Matching payments found:", matchingPayments[0]);
        setDoctor(matchingPayments[0].doctor);
        const fetchDoctorById = async (id: number) => {
          try {
            const { data: response } = await axios.get(
              `http://api-simrs.serpihantech.com/api/payments/${id}`
            );
            const newDoctor = response.data.doctor;
            setDoctor(newDoctor);
            if (newDoctor.cost) {
              onDoctorCostChange(Number(newDoctor.cost));
            }
          } catch (error) {
            console.error("Failed to fetch doctor details:", error);
          }
        };

        if (dataPatient.registration.length > 0) {
          const doctorId =
            dataPatient.registration[dataPatient.registration.length - 1]
              .doctor_id;
          if (!isNaN(doctorId)) {
            fetchDoctorById(doctorId);
          } else {
            console.error("Invalid doctor ID:", params.id);
            router.push("/error");
          }
        }
      }
    }
  }, [payments]);

  return (
    <Table tableHead={tableHeaders}>
      <tr className="bg-basic-white">
        <td className="px-4 py-4 text-center">{doctor ? doctor.id : 0}</td>
        <td className="px-4 py-4 text-center">{doctor ? doctor.name : "-"}</td>
        <td className="px-4 py-4 text-center">{doctor ? doctor.cost : "-"}</td>
      </tr>
    </Table>
  );
};

export default TableServiceBill;
