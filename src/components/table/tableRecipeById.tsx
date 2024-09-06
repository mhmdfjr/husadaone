"use client";
import Table from "@/components/table";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Edit } from "iconsax-react";
import axios from "axios";
import clsx from "clsx";

interface Medicine {
  id: number;
  name: string;
  stock: number;
}

interface Payment {
  id: number;
  registration_id: number;
  total_cost: string;
  medicine: Medicine[];
}

interface Registration {
  id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
}

interface Patient {
  id: number;
  name: string;
  registration: Registration[];
}

interface TableRecipeByIdProps {
  onDataChange: (data: boolean) => void;
}

const TableRecipeById: React.FC<TableRecipeByIdProps> = ({ onDataChange }) => {
  const router = useRouter();
  const params = useParams();

  const tableHeaders = [
    "Kode Obat",
    "Nama Obat",
    "Jumlah",
    "Aturan Pakai",
    "Aksi",
  ];

  const patientData: Patient = {
    id: 0,
    name: "",
    registration: [
      { id: 0, polyclinic_id: 0, doctor_id: 0, registration_date: "" },
    ],
  };

  const paymentData: Payment[] = [
    {
      id: 0,
      registration_id: 0,
      total_cost: "",
      medicine: [
        {
          id: 0,
          name: "",
          stock: 0,
        },
      ],
    },
  ];

  const medicineData: Medicine[] = [
    {
      id: 0,
      name: "",
      stock: 0,
    },
  ];

  const [patients, setPatients] = useState<Patient>(patientData);
  const [payments, setPayments] = useState<Payment[]>(paymentData);
  const [medicines, setMedicines] = useState<Medicine[]>(medicineData);

  const [selectedOption, setSelectedOption] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/patients/${id}`
        );
        setPatients(response.data);
        // console.log("Response:", response.data);
        console.log("ID Pasien : ", patients.id);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (params && params.id) {
      const patientId = Number(params.id);
      if (!isNaN(patientId)) {
        fetchPatientDetails(patientId);
      } else {
        console.error("Invalid medicine ID:", params.id);
        router.push("/error");
      }
    }
  }, [params]);

  // useEffect(() => {
  //   const fetchPayments = async (id: number) => {
  //     try {
  //       const { data: response } = await axios.get(
  //         `http://api-simrs.serpihantech.com/api/patients/${id}`
  //       );
  //       setPayments(response.data);
  //       console.log("Response:", response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch patient details:", error);
  //     }
  //   };

  //   if (
  //     patients &&
  //     patients.registration &&
  //     patients.registration[patients.registration.length - 1].id
  //   ) {
  //     const paymentId =
  //       patients.registration[patients.registration.length - 1].id;
  //     if (!isNaN(paymentId)) {
  //       fetchPayments(paymentId);
  //     } else {
  //       console.error("Invalid medicine ID:", params.id);
  //       router.push("/error");
  //     }
  //   }
  // }, [params]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/payments`
        );
        setPayments(response.data);
        console.log("Response Payments:", response.data[0].medicine);
        // console.log("Payment : ", payments);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };
    fetchPayments();
  }, [params]);

  useEffect(() => {
    if (patients && patients.id && payments.length > 0) {
      const matchingPayments = payments.filter(
        (payment: Payment) => payment.registration_id === patients.id
      );
      if (matchingPayments.length > 0) {
        console.log("Matching payments found:", matchingPayments[0]);
        const fetchMedicineById = async (id: number) => {
          try {
            const { data: response } = await axios.get(
              `http://api-simrs.serpihantech.com/api/medicines/${id}`
            );
            setMedicines([response.data]);
            console.log("Response : ", response.data);
            console.log("Medicines :", medicines);
          } catch (error) {
            console.error("Failed to fetch patient details:", error);
          }
        };
        if (matchingPayments) {
          const medicineId = 1;
          if (!isNaN(medicineId)) {
            fetchMedicineById(medicineId);
          } else {
            console.error("Invalid medicine ID:", params.id);
            router.push("/error");
          }
        }
      } else {
        console.log("No matching payments found for patient ID:", patients.id);
      }
    }
  }, [payments]);

  // useEffect(() => {
  //   if (patients && patients.id) {
  //     {
  //       payments.map((payment: Payment, index: number) => {
  //         if (payment.registration_id === patients.id) {
  //           console.log(payment.medicine);
  //         } else {
  //           console.log("false");
  //         }
  //       });
  //     }
  //   }
  // }, [patients, payments]);

  useEffect(() => {
    console.log("Updated Medicines:", medicines);
  }, [medicines]);

  const handelAction = (isSelected: boolean) => {
    setSelectedOption(!isSelected);
    onDataChange(!isSelected);
  };

  return (
    <Table tableHead={tableHeaders}>
      {medicines.map((medicine: Medicine, index: number) => (
        <tr key={index} className="bg-basic-white">
          <td className="px-4 py-4 text-center">{medicine.id}</td>
          <td className="px-4 py-4 text-center">{medicine.name}</td>
          <td className="px-4 py-4 text-center">{medicine.stock}</td>
          <td className="px-4 py-4 text-center">3x1</td>
          <td
            className={clsx(
              "px-4 py-4 text-center flex justify-center items-center cursor-pointer",
              {
                "text-gray-medium-light": selectedOption,
                "text-brand-base": !selectedOption,
              }
            )}
          >
            <Edit size="24" onClick={() => handelAction(selectedOption)} />
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default TableRecipeById;
