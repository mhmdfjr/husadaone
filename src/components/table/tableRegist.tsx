import { useEffect, useState } from "react";
import Table from "@/components/table";
import axios from "axios";

interface Polyclinic {
  name: string;
}

interface Patient {
  id: number;
  name: string;
  gender: string;
  date_of_birth: string;
}

interface Regist {
  id: number;
  patient: Patient;
  polyclinic: Polyclinic;
}

function getPatients() {
  return axios
    .get("http://192.168.18.31:8000/api/registrations")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching patients:", error);
      return { data: [] };
    });
}

export default function TablePatients() {
  const [regist, setRegist] = useState<Regist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients().then((data) => {
      console.log("API Response Data:", data);
      setRegist(Array.isArray(data) ? data : data.data || []);
      setLoading(false);
    });
  }, []);

  const tableHeaders = [
    "No Regis",
    "Nama",
    "No RM",
    "Usia",
    "JK",
    "Poliklinik",
  ];

  if (loading) {
    return (
      <div className="flex justify-start items-center animate-pulse">
        Loading...
      </div>
    );
  }

  if (!Array.isArray(regist)) {
    return (
      <div>
        Error: Expected an array of registrations. Data received:{" "}
        {JSON.stringify(regist)}
      </div>
    );
  }

  // Helper function to calculate age based on date_of_birth
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

  return (
    <Table tableHead={tableHeaders}>
      {regist.map((regist, index) => (
        <tr
          key={index}
          className={`w-full${
            index % 2 === 0 ? "bg-brand-10 bg-opacity-15" : "bg-white"
          }`}
        >
          <td className="px-6 py-4 text-center">{regist.id}</td>
          <td className="px-10 py-4 text-center">{regist.patient.name}</td>
          <td className="px-6 py-4 text-center">{regist.patient.id}</td>
          <td className="px-4 py-4 text-center">
            {calculateAge(regist.patient.date_of_birth)}
          </td>
          <td className="px-4 py-4 text-center">{regist.patient.gender}</td>
          <td className="px-2 py-4 text-center">{regist.polyclinic.name}</td>
        </tr>
      ))}
    </Table>
  );
}
