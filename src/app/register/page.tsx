"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import CardDashboard from "@/components/card-dashboard";
import TablePatients from "@/components/table/tablePatients";
import TableHighlightMedicine from "@/components/table/tableHighlightMedicine";

export default function Register() {
  const [patients, setPatients] = useState<any[]>([]);
  const [patientCount, setPatientCount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [doctorsCount, setDoctorsCount] = useState<number>(0);
  const [nursesCount, setNursesCount] = useState<number>(0);

  useEffect(() => {
    axios
      .get("http://192.168.18.31:8000/api/patients")
      .then((response) => {
        const data = response.data;
        console.log("Patients API response:", data);
        if (data && Array.isArray(data.data)) {
          const patientsData = data.data;
          setPatients(patientsData);
          setPatientCount(patientsData.length);
          console.log("Patient count:", patientsData.length);

          const latestUpdate = patientsData.reduce(
            (latest: string, patient: any) => {
              const patientDate = new Date(patient.updated_at);
              return patientDate > new Date(latest)
                ? patient.updated_at
                : latest;
            },
            "1970-01-01T00:00:00Z"
          );

          setLastUpdated(latestUpdate);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching patients:", error));

    // Hit Dokter
    axios
      .get("http://192.168.18.31:8000/api/doctors")
      .then((response) => {
        const data = response.data;
        console.log("Doctors API response:", data);
        if (data && Array.isArray(data.data)) {
          setDoctorsCount(data.data.length);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching doctors:", error));

    // Hit Perawat
    axios
      .get("http://192.168.18.31:8000/api/nurses")
      .then((response) => {
        const data = response.data;
        console.log("Nurses API response:", data);
        if (data && Array.isArray(data.data)) {
          setNursesCount(data.data.length);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching nurses:", error));
  }, []);

  const formattedLastUpdated = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString()
    : "-";

  return (
    <main className="w-full h-screen">
      <Sidebar />

      <div className="ml-60 flex h-screen flex-col bg-brand-10/[.16] gap-4">
        <TopBar />

        <div className="flex justify-start gap-x-20 items-center mx-4">
          <CardDashboard
            title="Jumlah Pasien"
            sum={patientCount}
            date={formattedLastUpdated}
          />
          <CardDashboard
            title="Jumlah Dokter"
            sum={doctorsCount}
            date={formattedLastUpdated}
          />
          <CardDashboard
            title="Jumlah Perawat"
            sum={nursesCount}
            date={formattedLastUpdated}
          />
          <CardDashboard
            title="Another Metric"
            sum={23}
            date={formattedLastUpdated}
          />
        </div>

        <div className="mx-4 flex justify-start items-start gap-4">
          <div className="table p-4 bg-basic-white rounded-2xl border-2">
            <p className="text-h8-bold text-basic-black">Pasien Terbaru</p>
            <TablePatients />
          </div>
          <div className="table p-4 bg-basic-white rounded-2xl border-2">
            <p className="text-h8-bold text-basic-black">Stok Obat</p>
            <TableHighlightMedicine />
          </div>
        </div>
      </div>
    </main>
  );
}
