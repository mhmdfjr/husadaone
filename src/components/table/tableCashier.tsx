"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Regis {
  id: number;
  polyclinic_id: number;
  doctor_id: number;
}

interface Cashier {
  id: number;
  name: string;
  registration: Regis[];
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

interface Registration {
  id: number;
  patient_id: number;
  already_paid: string;
}

interface Payment {
  id: number;
  registration_id: number;
  validation: number;
  registration: Registration;
}

export default function TableRecipes() {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Poliklinik",
    "Dokter",
    "Status Bayar",
  ];

  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const [polyclinics, setPolyclinic] = useState<Polyclinic[]>([]);
  const [doctors, setDoctor] = useState<Doctor[]>([]);
  const [payments, setPayment] = useState<Payment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api-simrs.serpihantech.com/api/patients"
        );
        setCashiers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // console.log("Cashiers", cashiers);

  useEffect(() => {
    const fetchPolyclinics = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/polyclinics`
        );
        setPolyclinic(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPolyclinics();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/doctors`
        );
        setDoctor(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/payments`
        );
        setPayment(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPayments();
  }, []);

  // console.log("Payments :", payments);

  return (
    <Table tableHead={tableHeaders}>
      {cashiers.map((cashier: Cashier, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white cursor-pointer", {
            "bg-brand-10 bg-opacity-15": index % 2 != 0,
          })}
          onClick={() => {
            router.push(`cashier/${cashier.id}`);
          }}
        >
          <td className="px-4 py-4 text-center">{cashier.id}</td>
          <td className="px-4 py-4 text-center">{cashier.name}</td>
          <td className="px-4 py-4 text-center">
            {cashier.registration.length > 0
              ? cashier.registration[cashier.registration.length - 1].id
              : "-"}
          </td>

          {cashier.registration.length > 0 ? (
            polyclinics.map((polyclinic: Polyclinic, index: number) => {
              if (
                cashier.registration[cashier.registration.length - 1]
                  .polyclinic_id == polyclinic.id
              ) {
                return (
                  <td key={index} className="px-4 py-4 text-center">
                    {polyclinic.name}
                  </td>
                );
              }
            })
          ) : (
            <td key={index} className="px-4 py-4 text-center">
              -
            </td>
          )}

          {cashier.registration.length > 0 ? (
            doctors.map((doctor: Doctor, index: number) => {
              if (
                cashier.registration[cashier.registration.length - 1]
                  .doctor_id == doctor.id
              ) {
                return (
                  <td key={index} className="px-4 py-4 text-center">
                    {doctor.name}
                  </td>
                );
              }
            })
          ) : (
            <td key={index} className="px-4 py-4 text-center">
              -
            </td>
          )}

          {cashier.registration.length > 0 ? (
            payments.map((payment: Payment, index: number) => {
              if (cashier.registration[0].id == payment.registration_id) {
                return (
                  <td
                    key={index}
                    className={clsx("px-4 py-4 text-center text-body-bold", {
                      "text-alert-success":
                        payment.registration.already_paid === "yes",
                      "text-alert-warning": !payment.registration.already_paid,
                    })}
                  >
                    {payment.registration.already_paid === "yes"
                      ? "Sudah Bayar"
                      : "Belum Bayar"}
                  </td>
                );
              }
            })
          ) : (
            <td key={index} className="px-4 py-4 text-center">
              -
            </td>
          )}
        </tr>
      ))}
    </Table>
  );
}
