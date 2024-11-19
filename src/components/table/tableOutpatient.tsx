"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
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
  already_paid: string;
  polyclinic: Polyclinic;
  patient: Patient;
  doctor: Doctor;
}

export default function TableOutpatient() {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Poliklinik",
    "Dokter",
    "Status Rawat",
  ];

  const token = Cookies.get("token");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/registrations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
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
        const { data: response } = await axios.get(`${apiUrl}/payments`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPayments();
  }, []);

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
                router.push(`outpatient/assesment/${registration.id}`);
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
                        "text-alert-success":
                          registration.already_paid == "yes",
                        "text-alert-warning": registration.already_paid == null,
                      })}
                    >
                      {registration.already_paid == "yes"
                        ? "Sudah Rawat"
                        : "Belum Rawat"}
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
