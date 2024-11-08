"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import clsx from "clsx";

interface TableServiceBillProps {
  registrationId: number;
  onDoctorCostChange: (cost: number) => void;
}

interface Patient {
  id: number;
  name: string;
}

interface Doctor {
  id: number;
  polyclinic_id: number;
  name: string;
  specialist: string;
  cost: string;
}

interface Polyclinic {
  id: number;
  name: string;
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

const TableServiceBill: React.FC<TableServiceBillProps> = ({
  registrationId,
  onDoctorCostChange,
}) => {
  const router = useRouter();
  const params = useParams();

  const tableHeaders = ["No", "Tagihan", "Harga Jasa"];

  const patientData: Patient = {
    id: 0,
    name: "",
  };

  const polyclinicData: Polyclinic = {
    id: 0,
    name: "",
  };

  const doctorData: Doctor = {
    id: 0,
    polyclinic_id: 0,
    name: "",
    specialist: "",
    cost: "",
  };

  const registrationData: Registration = {
    id: 0,
    patient_id: 0,
    polyclinic_id: 0,
    doctor_id: 0,
    registration_date: "",
    polyclinic: polyclinicData,
    patient: patientData,
    doctor: doctorData,
  };

  const [registration, setRegistration] =
    useState<Registration>(registrationData);

  useEffect(() => {
    const fetchRegistration = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/registrations/${id}`
        );
        setRegistration(response.data.registration);
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
  }, [params]);

  useEffect(() => {
    const costDoctor = registration.doctor.cost;
    onDoctorCostChange(Number(costDoctor));
  }, [registration]);

  return (
    <Table tableHead={tableHeaders}>
      <tr className="bg-basic-white">
        <td className="px-4 py-4 text-center">
          {registration ? registration.doctor_id : 0}
        </td>
        <td className="px-4 py-4 text-center">
          {registration ? registration.doctor.name : "-"}
        </td>
        <td className="px-4 py-4 text-center">
          {registration ? registration.doctor.cost : "-"}
        </td>
      </tr>
    </Table>
  );
};

export default TableServiceBill;
