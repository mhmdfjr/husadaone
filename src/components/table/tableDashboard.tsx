"use client";
import Table from "@/components/table";
import axios from "axios";
import clsx from "clsx";
import { useState, useEffect, useMemo } from "react";
import Button from "../button";
import { ArrowRight2, ArrowLeft2 } from "iconsax-react";
import Cookies from "js-cookie";

interface TableDashboardProps {
  date?: string;
}

interface Patient {
  id: number;
  name: string;
  gender: string;
  date_of_birth: string;
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
  created_at: string;
  polyclinic: Polyclinic;
  patient: Patient;
}

const TableDashboard: React.FC<TableDashboardProps> = ({ date }) => {
  const tableHeaders = [
    "No Reg",
    "Nama Pasien",
    "No RM",
    "Usia",
    "JK",
    "Poliklinik",
  ];

  const token = Cookies.get("token");
  const selectedDate = date;
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/registrations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const sortedRegistrations = response.data.sort(
          (a: Registration, b: Registration) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setRegistrations(sortedRegistrations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [apiUrl, token]);

  const calculateAge = (date_of_birth: string) => {
    const birthDate = new Date(date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredRegistrations = useMemo(() => {
    if (!date) return registrations;
    return registrations.filter(
      (registration) => registration.registration_date === date
    );
  }, [registrations, date]);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [date]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRegistrations = filteredRegistrations.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

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
        {paginatedRegistrations.map(
          (registration: Registration, index: number) => {
            return (
              <tr
                key={index}
                className={clsx("bg-basic-white cursor-pointer", {
                  "bg-brand-10 bg-opacity-15": index % 2 != 0,
                })}
              >
                <td className="px-4 py-4 text-center">{registration.id}</td>
                <td className="px-4 py-4 text-center">
                  {registration.patient.name}
                </td>
                <td className="px-4 py-4 text-center">
                  {registration.patient.id}
                </td>
                <td className="px-4 py-4 text-center">
                  {calculateAge(registration.patient.date_of_birth)}
                </td>
                <td className="px-4 py-4 text-center">
                  {registration.patient.gender}
                </td>
                <td className="px-4 py-4 text-center">
                  {registration.polyclinic.name}
                </td>
              </tr>
            );
          }
        )}
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
};

export default TableDashboard;
