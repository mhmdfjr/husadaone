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

interface Doctor {
  id: number;
  polyclinic_id: number;
  name: string;
  specialist: string;
}

interface Polyclinic {
  id: number;
  name: string;
  doctor: Doctor[];
}

export default function ValidateRecipe() {
  const [registration, setRegistration] = useState<number>();
  const [medic, setMedic] = useState<number>();
  const [name, setName] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [polyclinic, setPolyclinic] = useState<string>("");

  const router = useRouter();
  const params = useParams();

  const patientData: Patient = {
    id: 0,
    name: "",
    registration: [
      { id: 0, polyclinic_id: 0, doctor_id: 0, registration_date: "" },
    ],
  };

  const polyclinicData: Polyclinic = {
    id: 0,
    name: "",
    doctor: [{ id: 0, polyclinic_id: 0, name: "", specialist: "" }],
  };

  const doctorData: Doctor = {
    id: 0,
    polyclinic_id: 0,
    name: "",
    specialist: "",
  };

  const [patients, setPatients] = useState<Patient>(patientData);
  const [polyclinics, setPolyclinics] = useState<Polyclinic>(polyclinicData);
  const [doctors, setDoctors] = useState<Doctor>(doctorData);

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
        setPatients(response.data);
        // console.log("Response:", response.data);
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
    const fetchPolyclinicById = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/polyclinics/${id}`
        );
        setPolyclinics(response.data);
        // console.log("Response:", polyclinics);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (
      patients.registration &&
      patients.registration[patients.registration.length - 1].polyclinic_id
    ) {
      const polyclinicId =
        patients.registration[patients.registration.length - 1].polyclinic_id;
      if (!isNaN(polyclinicId)) {
        fetchPolyclinicById(polyclinicId);
      } else {
        console.error("Invalid medicine ID:", params.id);
        router.push("/error");
      }
    }
  }, [patients]);

  useEffect(() => {
    const fetchDoctorById = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/doctors/${id}`
        );
        setDoctors(response.data);
        // console.log("Response:", polyclinics);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (
      patients.registration &&
      patients.registration[patients.registration.length - 1].doctor_id
    ) {
      const doctorId =
        patients.registration[patients.registration.length - 1].doctor_id;
      if (!isNaN(doctorId)) {
        fetchDoctorById(doctorId);
      } else {
        console.error("Invalid medicine ID:", params.id);
        router.push("/error");
      }
    }
  }, [patients]);

  useEffect(() => {
    // console.log("Updated Patient:", patients);
  }, [patients]);

  const handleCLick = () => {};

  // console.log(childData);

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
                    setRegistration((patients.id = Number(e.target.value)))
                  }
                  placeholder={patients ? patients.id.toString() : "000"}
                  name=""
                  value={patients ? patients.id.toString() : ""}
                />
              </div>
              <div className="basis-1/4">
                <Input
                  label="No RM"
                  type="text"
                  onChange={(e) =>
                    setMedic(
                      (patients.registration[
                        patients.registration.length - 1
                      ].id = Number(e.target.value))
                    )
                  }
                  placeholder={
                    patients.registration.length > 0
                      ? patients.registration[
                          patients.registration.length - 1
                        ].id.toString()
                      : "00000"
                  }
                  name=""
                  value={
                    patients.registration.length > 0
                      ? patients.registration[
                          patients.registration.length - 1
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
              onChange={(e) => setName((patients.name = e.target.value))}
              placeholder={patients ? patients.name : "Nama Pasien"}
              name=""
              value={patients ? patients.name : ""}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Poliklinik"
              type="text"
              onChange={(e) =>
                setPolyclinic((polyclinics.name = e.target.value))
              }
              placeholder={polyclinics ? polyclinics.name : "Nama Poliklinik"}
              name=""
              value={polyclinics ? polyclinics.name : "Nama Poliklinik"}
            />
            <Input
              label="Dokter"
              type="text"
              onChange={(e) => setDoctor((doctors.name = e.target.value))}
              placeholder={doctors ? doctors.name : "Nama Dokter"}
              name=""
              value={doctors ? doctors.name : ""}
            />
          </div>
        </div>
      </div>

      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <TableRecipeById onDataChange={handleChildData} />
      </div>

      <div
        className={clsx(
          "w-full justify-center items-end gap-4 py-6 px-8 flex bg-basic-white rounded-2xl border-2 overflow-scroll",
          { hidden: !childData }
        )}
      >
        <div className="w-full flex justify-start items-end gap-4">
          <div className="w-full">
            <Input
              label="Nama Obat"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={patients ? patients.name : "Nama Pasien"}
              name=""
              value={patients ? patients.name : ""}
            />
          </div>
          <div className="w-full">
            <Input
              label="Jumlah"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={patients ? patients.name : "Nama Pasien"}
              name=""
              value={patients ? patients.name : ""}
            />
          </div>
          <div className="w-full">
            <Input
              label="Satuan"
              type="select"
              onChange={(e) => setName(e.target.value)}
              placeholder={patients ? patients.name : "Nama Pasien"}
              name=""
              value={patients ? patients.name : ""}
              options={[patients.name, "3x1", "2x1"]}
            />
          </div>
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
