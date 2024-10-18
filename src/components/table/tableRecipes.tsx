"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "../button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

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
  doctor: Doctor[];
}

interface Payment {
  id: number;
  registration_id: number;
  validation: number;
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

export default function TableRecipes() {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Poliklinik",
    "Dokter",
    "Status Validasi",
  ];

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://api-simrs.serpihantech.com/api/registrations"
        );
        setRegistrations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/payments`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPayments();
  }, []);

  // Calculate the start and end indices for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecipes = registrations.slice(startIndex, endIndex);
  const totalPages = Math.ceil(registrations.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Table tableHead={tableHeaders}>
        {registrations.map((registration: Registration, index: number) => {
          return (
            <tr
              key={index}
              className={clsx("bg-basic-white cursor-pointer", {
                "bg-brand-10 bg-opacity-15": index % 2 != 0,
              })}
              onClick={() => {
                router.push(`recipe/${registration.id}`);
              }}
            >
              <td className="px-4 py-4 text-center">{registration.id}</td>
              <td className="px-4 py-4 text-center">
                {registration.patient.name}
              </td>
              <td className="px-4 py-4 text-center">
                {registration.patient.id}
              </td>
              <td className="px-4 py-4 text-center">
                {registration.polyclinic.name}
              </td>
              <td className="px-4 py-4 text-center">
                {registration.doctor.name}
              </td>
              {payments.map((payment: Payment, index: number) => {
                if (registration.id === payment.registration_id) {
                  return (
                    <td
                      key={index}
                      className={clsx("px-4 py-4 text-center text-body-bold", {
                        "text-alert-warning": payment.validation == 0,
                        "text-alert-success": payment.validation == 1,
                      })}
                    >
                      {payment.validation == 1
                        ? "Sudah Validasi"
                        : "Belum Validasi"}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </Table>

      <div className="pagination-controls flex justify-center items-center gap-2 mt-4">
        <Button
          label=""
          variant={currentPage === 1 ? "disable" : "primary"}
          size="very-small"
          rightIcon={<ArrowLeft2 size="24" />}
          onClick={handlePrevPage}
        />
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          label=""
          variant={currentPage === totalPages ? "disable" : "primary"}
          size="very-small"
          rightIcon={<ArrowRight2 size="24" />}
          onClick={handleNextPage}
        />
      </div>
    </div>
  );
}
