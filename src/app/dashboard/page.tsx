"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CardDashboard from "@/components/card-dashboard";
import Calender from "@/components/calender";
import TableDashboard from "@/components/table/tableDashboard";

export default function Dashboard() {
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
        if (data && Array.isArray(data.data)) {
          const patientsData = data.data;
          setPatients(patientsData);
          setPatientCount(
            patientsData.length < 10
              ? `0${patientsData.length}`
              : patientsData.length
          );

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
    <div className="mx-4 flex flex-col justify-start items-center gap-4 ">
      <div className="flex w-full justify-between gap-x-4">
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

      <div className="mx-4 flex justify-start items-start gap-4 ">
        <div className="py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll basis-3/4">
          <p className="text-h8-bold text-basic-black">Pasien Terbaru</p>
          <TableDashboard />
        </div>
        <div className="py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
          <p className="text-h8-bold text-basic-black mb-4">Kalender</p>
          <Calender />
        </div>
      </div>
    </div>
  );
}
