"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import CardDashboard from "@/components/card-dashboard";
import Calender from "@/components/calender";
import TableRegist from "@/components/table/tableDashboard";

export default function Register() {
  const [patients, setPatients] = useState<any[]>([]);
  const [patientCount, setPatientCount] = useState<string>("-");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [doctorsCount, setDoctorsCount] = useState<string>("-");
  const [nursesCount, setNursesCount] = useState<string>("-");
  const [polyclinicCount, setPolyclinicCount] = useState<string>("-");

  useEffect(() => {
    axios
      .get("https://api-simrs.serpihantech.com/api/patients")
      .then((response) => {
        const data = response.data;
        console.log("Patients API response:", data);
        if (data && Array.isArray(data.data)) {
          const patientsData = data.data;
          setPatients(patientsData);
          setPatientCount(
            patientsData.length < 10
              ? `0${patientsData.length}`
              : patientsData.length
          );
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

    axios
      .get("https://api-simrs.serpihantech.com/api/doctors")
      .then((response) => {
        const data = response.data;
        console.log("Doctors API response:", data);
        if (data && Array.isArray(data.data)) {
          setDoctorsCount(
            data.data.length < 10 ? `0${data.data.length}` : data.data.length
          );
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching doctors:", error));

    axios
      .get("https://api-simrs.serpihantech.com/api/nurses")
      .then((response) => {
        const data = response.data;
        console.log("Nurses API response:", data);
        if (data && Array.isArray(data.data)) {
          setNursesCount(`0${data.data.length}`);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching nurses:", error));

    axios
      .get("https://api-simrs.serpihantech.com/api/polyclinics")
      .then((response) => {
        const data = response.data;
        console.log("Polyclinic API response:", data);
        if (data && Array.isArray(data.data)) {
          setPolyclinicCount(
            data.data.length < 10 ? `0${data.data.length}` : data.data.length
          );
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching polyclinic:", error));
  }, []);

  const formattedLastUpdated = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString()
    : "-";

  return (
    <div className="flex w-full min-h-screen bg-[#D5E5FF]  bg-opacity-15">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      <main className="flex-1 ml-60 ">
        <TopBar />

        <div className="p-4">
          <div className="flex justify-between gap-x-4 mb-6">
            <CardDashboard
              title="Total Pasien"
              sum={patientCount}
              date={formattedLastUpdated}
            />
            <CardDashboard
              title="Total Dokter"
              sum={doctorsCount}
              date={formattedLastUpdated}
            />
            <CardDashboard
              title="Total Perawat"
              sum={nursesCount}
              date={formattedLastUpdated}
            />
            <CardDashboard
              title="Total Poliklinik"
              sum={polyclinicCount}
              date={formattedLastUpdated}
            />
          </div>

          <div className="flex gap-x-5">
            <div className="flex-grow p-4 bg-white rounded-2xl">
              <p className="text-h8-bold text-basic-black mb-6 mt-2">
                Pasien Terbaru
              </p>
              <TableRegist />
            </div>
            <div className="w-[414px] p-4 bg-white rounded-2xl">
              <p className="text-h8-bold text-basic-black mb-4">Kalender</p>
              <Calender />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
