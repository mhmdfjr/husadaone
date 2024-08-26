import { useEffect, useState } from "react";
import Table from "@/components/table";
import clsx from "clsx";
import axios from "axios";

interface Patient {
  id: number;
  name: string;
  gender: string;
  address: string;
  medical_history: string;
}

function getPatients() {
  return axios
    .get("http://192.168.18.31:8000/api/patients")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching patients:", error);
      return { data: [] };
    });
}

export default function TablePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients().then((data) => {
      setPatients(data.data);
      setLoading(false);
    });
  }, []);

  const tableHeaders = ["ID", "Nama", "JK", "Alamat", "Penyakit"];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Table tableHead={tableHeaders}>
      {patients.map((patient: Patient, index: number) => (
        <tr
          key={index}
          className={clsx("bg-basic-white", {
            "bg-brand-10 bg-opacity-15": index % 2 === 0,
          })}
        >
          <td className="px-4 py-4 text-center">{patient.id}</td>
          <td className="px-4 py-4 text-center">{patient.name}</td>
          <td className="px-4 py-4 text-center">{patient.gender}</td>
          <td className="px-4 py-4 text-center">{patient.address}</td>
          <td className="px-4 py-4 text-center">
            {patient.medical_history || "Tidak ada data"}
          </td>
        </tr>
      ))}
    </Table>
  );
}
