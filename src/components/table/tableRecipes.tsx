"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Regis {
  id: number;
  polyclinic_id: number;
  doctor_id: number;
}

interface Recipe {
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

interface Payment {
  id: number;
  registration_id: number;
  validation: number;
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

  const [patients, setPatients] = useState<Recipe[]>([]);
  const [polyclinics, setPolyclinics] = useState<Polyclinic[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://api-simrs.serpihantech.com/api/patients"
        );
        setPatients(response.data);
        // console.log("Response Patients: ", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPolyclinics = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/polyclinics`
        );
        setPolyclinics(response.data);
        // console.log("Response Polyclinics:", response.data);
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
        setDoctors(response.data);
        // console.log("Response Doctors:", response.data);
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
        setPayments(response.data);
        // console.log("Response Payments :", response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPayments();
  }, []);

  return (
    <Table tableHead={tableHeaders}>
      {patients.map((recipe: Recipe, index: number) => {
        return (
          <tr
            key={index}
            className={clsx("bg-basic-white cursor-pointer", {
              "bg-brand-10 bg-opacity-15": index % 2 != 0,
            })}
            onClick={() => {
              router.push(`recipe/${recipe.id}`);
            }}
          >
            <td className="px-4 py-4 text-center">{recipe.id}</td>
            <td className="px-4 py-4 text-center">{recipe.name}</td>
            <td className="px-4 py-4 text-center">
              {recipe.registration.length > 0
                ? recipe.registration[recipe.registration.length - 1].id
                : "-"}
            </td>

            {recipe.registration.length > 0 ? (
              polyclinics.map((polyclinic: Polyclinic, index: number) => {
                if (
                  recipe.registration[recipe.registration.length - 1]
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

            {recipe.registration.length > 0 ? (
              doctors.map((doctor: Doctor, index: number) => {
                if (
                  recipe.registration[recipe.registration.length - 1]
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

            {recipe.registration.length > 0 ? (
              payments.map((payment: Payment, index: number) => {
                if (
                  recipe.registration[recipe.registration.length - 1].id ==
                  payment.registration_id
                ) {
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
              })
            ) : (
              <td key={index} className="px-4 py-4 text-center">
                -
              </td>
            )}
          </tr>
        );
      })}
    </Table>
  );
}
