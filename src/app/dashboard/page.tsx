"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import CardDashboard from "@/components/card-dashboard";
import Calender from "@/components/calender";
import TableRegist from "@/components/table/tableRegist";
export default function Register() {
  const [patients, setPatients] = useState<any[]>([]);
  const [patientCount, setPatientCount] = useState<string>("-");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [doctorsCount, setDoctorsCount] = useState<string>("-");
  const [nursesCount, setNursesCount] = useState<string>("-");
  const [polyclinicCount, setPolyclinicCount] = useState<string>("-");

  useEffect(() => {
    axios
      .get("http://192.168.18.31:8000/api/patients")
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
      .get("http://192.168.18.31:8000/api/doctors")
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
      .get("http://192.168.18.31:8000/api/nurses")
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
      .get("http://192.168.18.31:8000/api/polyclinics")
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
    <main className="w-[99%] min-h-screen">
      <Sidebar />

      <div className="ml-60 -z-50 min-h-screen flex flex-col bg-[#D5E5FF] bg-opacity-15 gap-4">
        <TopBar />

        <div className="w-full flex  mt-5 justify-center gap-x-12 items-center mx-4">
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

        <div className="w-full mx-4 h-auto flex justify-center items-start mt-5  gap-x-5">
          <div className=" p-4 bg-white rounded-2xl">
            <p className="text-h8-bold text-basic-black mb-6 mt-2">
              Pasien Terbaru
            </p>
            <TableRegist />
          </div>
          <div className=" w-[414px] h-auto px-5  py-4 bg-white rounded-2xl ">
            <p className="text-h8-bold text-basic-black  mt-2 ">Kalender</p>
            <div className="w-full h-full flex items-start">
              <Calender />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
