"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import clsx from "clsx";
import TableRecipeById from "@/components/table/tableRecipeById";

interface PatientRegistration {
  id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
}

interface PatientDetails {
  id: number;
  name: string;
  registration: PatientRegistration[];
}

export default function ValidateRecipe() {
  const [registration, setRegistration] = useState<number>();
  const [medic, setMedic] = useState<number>();
  const [name, setName] = useState<string>("");
  const [polyclinic, setPolyclinic] = useState<number>();
  const [doctor, setDoctor] = useState<number>();

  const router = useRouter();
  const params = useParams();

  const patientData: PatientDetails = {
    id: 0,
    name: "",
    registration: [
      { id: 0, polyclinic_id: 0, doctor_id: 0, registration_date: "" },
    ],
  };
  const [patient, setPatient] = useState<PatientDetails>(patientData);

  const [childData, setChildData] = useState<boolean>(false);
  const handleChildData = (data: boolean) => {
    setChildData(data);
  };

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/patients/${id}`
        );
        setPatient(response.data);
        console.log("Response:", response.data);
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

  useEffect(() => {
    console.log("Updated Patient:", patient);
  }, [patient]);

  const handleCLick = () => {};

  console.log(childData);

  return (
    <div className="mx-4 flex flex-col justify-start items-center gap-4">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible ">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/pharmacy/recipe")}
          >
            Resep
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Validasi Resep</p>
        </div>
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex justify-start items-center gap-4">
              <div className="basis-1/4">
                <Input
                  label="No Reg"
                  type="text"
                  onChange={(e) =>
                    setRegistration((patient.id = Number(e.target.value)))
                  }
                  placeholder={patient ? patient.id.toString() : "000"}
                  name=""
                  value={patient ? patient.id.toString() : ""}
                />
              </div>
              <div className="basis-1/4">
                <Input
                  label="No RM"
                  type="text"
                  onChange={(e) =>
                    setMedic(
                      (patient.registration[
                        patient.registration.length - 1
                      ].id = Number(e.target.value))
                    )
                  }
                  placeholder={
                    patient.registration.length > 0
                      ? patient.registration[
                          patient.registration.length - 1
                        ].id.toString()
                      : "00000"
                  }
                  name=""
                  value={
                    patient.registration.length > 0
                      ? patient.registration[
                          patient.registration.length - 1
                        ].id.toString()
                      : ""
                  }
                />
              </div>
              <DatePicker title="Tanggal Penanganan" name="" />
            </div>
            <Input
              label="Nama Pasien"
              type="text"
              onChange={(e) => setName((patient.name = e.target.value))}
              placeholder={patient ? patient.name : "Nama Pasien"}
              name=""
              value={patient ? patient.name : ""}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Poliklinik"
              type="text"
              onChange={(e) =>
                setPolyclinic(
                  (patient.registration[
                    patient.registration.length - 1
                  ].polyclinic_id = Number(e.target.value))
                )
              }
              placeholder={
                patient.registration.length > 0
                  ? patient.registration[
                      patient.registration.length - 1
                    ].polyclinic_id.toString()
                  : "Nama Poliklinik"
              }
              name=""
              value={
                patient.registration.length > 0
                  ? patient.registration[
                      patient.registration.length - 1
                    ].polyclinic_id.toString()
                  : ""
              }
            />
            <Input
              label="Dokter"
              type="text"
              onChange={(e) =>
                setDoctor(
                  (patient.registration[
                    patient.registration.length - 1
                  ].doctor_id = Number(e.target.value))
                )
              }
              placeholder={
                patient.registration.length > 0
                  ? patient.registration[
                      patient.registration.length - 1
                    ].doctor_id.toString()
                  : "Nama Dokter"
              }
              name=""
              value={
                patient.registration.length > 0
                  ? patient.registration[
                      patient.registration.length - 1
                    ].doctor_id.toString()
                  : ""
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <TableRecipeById onDataChange={handleChildData} />
      </div>

      <div
        className={clsx(
          "w-full justify-start items-end py-6 px-8 flex bg-basic-white rounded-2xl gap-4 border-2 overflow-scroll",
          { hidden: !childData }
        )}
      >
        <div>
          <Input
            label="Nama Obat"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder={patient ? patient.name : "Nama Pasien"}
            name=""
            value={patient ? patient.name : ""}
          />
        </div>
        <div>
          <Input
            label="Jumlah"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder={patient ? patient.name : "Nama Pasien"}
            name=""
            value={patient ? patient.name : ""}
          />
        </div>
        <div>
          <Input
            label="Aturan Pakai"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder={patient ? patient.name : "Nama Pasien"}
            name=""
            value={patient ? patient.name : ""}
          />
        </div>

        <Button
          label="Simpan"
          variant="primary"
          size="small"
          onClick={handleCLick}
        />
      </div>

      <div className="w-full flex gap-4 justify-end items-center">
        <Button
          label="Batal"
          variant="secondary"
          size="big"
          onClick={() => router.push("/pharmacy/recipe")}
        />
        <Button
          label="Simpan"
          variant="primary"
          size="big"
          onClick={handleCLick}
        />
      </div>
    </div>
  );
}
