"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableRegisterPatients from "@/components/table/tableRegisterPatient";
import { TickSquare, ArrowRight2 } from "iconsax-react";

interface Patient {
  id: number;
  name: string;
  gender: string;
  blood_type: string;
  place_of_birth: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  insurance: string;
  allergy: string;
  disability: string;
  pic_name: string;
  pic_status: string;
  pic_address: string;
}

export default function InputPatientData() {
  const [select, setSelect] = useState<boolean>(false);
  const router = useRouter();
  const [childData, setChildData] = useState<Patient>({
    id: 0,
    name: "",
    gender: "",
    blood_type: "",
    place_of_birth: "",
    date_of_birth: "",
    phone_number: "",
    address: "",
    insurance: "",
    allergy: "",
    disability: "",
    pic_name: "",
    pic_status: "",
    pic_address: "",
  });
  const handleChildData = (data: Patient) => {
    setChildData(data);
  };

  const handleCLick = () => {
    localStorage.setItem("patientId", JSON.stringify(childData));
    router.push("/registry");
  };

  const handleSelect = () => {
    setSelect(!select);
  };

  return (
    <div className="mx-4 flex justify-center items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/registry")}
          >
            Registrasi Pasien{" "}
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Data Pasien</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="submenu flex">
            <Button
              label="Input RM"
              variant="submenu"
              size="small"
              onClick={() => router.push("input")}
            />
            <Button
              label="Data Pasien"
              variant="submenu-active"
              size="small"
              onClick={() => router.push("patient")}
            />
          </div>
          <div className="flex gap-4">
            <Button
              label={select ? "Batal" : "Pilih"}
              variant="tertiary"
              rightIcon={<TickSquare size="24" />}
              size="small"
              onClick={handleSelect}
            />
            <Button
              label="Edit"
              variant={select ? "secondary" : "disable"}
              size="small"
              onClick={() => {
                {
                  childData
                    ? router.push(`patient/input?input=${childData.id}`)
                    : null;
                }
              }}
            />
            <Button
              label="Simpan"
              variant="primary"
              size="small"
              onClick={() => handleCLick()}
            />
          </div>
        </div>
        <TableRegisterPatients
          onSelect={select}
          onDataChange={handleChildData}
        />
      </div>
    </div>
  );
}
