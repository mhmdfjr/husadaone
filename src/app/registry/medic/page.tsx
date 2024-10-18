"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import { setPriority } from "os";

export default function InputMedic() {
  const [medic, setMedic] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("");
  const [allergy, setAllergy] = useState<string>("");
  const [birthPlace, setBirthPlace] = useState<string>("");
  const [addressPatient, setAddressPatient] = useState<string>("");
  const [disability, setDisability] = useState<string>("");
  const [namePic, setNamePic] = useState<string>("");
  const [statusPic, setStatusPic] = useState<string>("");
  const [addressPic, setAddressPic] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [registerDate, setRegisterDate] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const handleBirthDate = (date: string) => {
    setBirthDate(date);
  };

  const handleRegisterDate = (date: string) => {
    setRegisterDate(date);
  };

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/registry")}
          >
            Registrasi Pasien{" "}
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Input RM</p>
        </div>

        <div className="submenu flex">
          <Button
            label="Input RM"
            variant="submenu-active"
            size="small"
            onClick={() => router.push("medic")}
          />
          <Button
            label="Data Pasien"
            variant="submenu"
            size="small"
            onClick={() => router.push("patient")}
          />
        </div>

        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="No Rekam Medis"
              type="number"
              onChange={(e) => setMedic(Number(e.target.value))}
              placeholder=""
              name=""
              value={medic.toString()}
            />
            <DatePicker
              title="Tanggal Pertama Daftar"
              name=""
              value={null}
              onDateChange={handleRegisterDate}
            />
            <Input
              label="Nama Pasien"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              name=""
              value={name}
            />
            <div className="w-full flex gap-4">
              <Input
                label="Jenis Kelamin"
                type="select"
                onChange={(e) => setGender(e.target.value)}
                placeholder="Pilih"
                name=""
                value={gender}
                options={["L", "P"]}
              />
              <Input
                label="Gol. Darah"
                type="select"
                onChange={(e) => setBloodType(e.target.value)}
                placeholder="Pilih"
                name=""
                value={bloodType}
                options={["A", "B", "O", "AB"]}
              />
            </div>
            <div className="w-full flex gap-4">
              <Input
                label="Tempat Lahir"
                type="text"
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder=""
                name=""
                value={birthPlace}
              />
              <DatePicker
                title="Tanggal Lahir"
                name=""
                value={null}
                onDateChange={handleBirthDate}
              />
            </div>
            <Input
              label="Alamat Pasien"
              type="text"
              onChange={(e) => setAddressPatient(e.target.value)}
              placeholder=""
              name=""
              value={addressPatient}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Jenis Asuransi"
              type="select"
              onChange={(e) => setInsurance(e.target.value)}
              placeholder="Pilih"
              name=""
              value={insurance}
              options={["Umum", "BPJS", "Swasta"]}
            />
            <Input
              label="Alergi"
              type="text"
              onChange={(e) => setAllergy(e.target.value)}
              placeholder=""
              name=""
              value={allergy}
            />
            <Input
              label="Kecacatan"
              type="text"
              onChange={(e) => setDisability(e.target.value)}
              placeholder=""
              name=""
              value={disability}
            />
            <Input
              label="Nama Penanggung Jawab"
              type="text"
              onChange={(e) => setNamePic(e.target.value)}
              placeholder=""
              name=""
              value={namePic}
            />
            <Input
              label="Status Penanggung Jawab"
              type="select"
              onChange={(e) => setStatusPic(e.target.value)}
              placeholder="Pilih"
              name=""
              value={statusPic}
              options={["Ayah", "Ibu", "Saudara"]}
            />
            <Input
              label="Alamat Penanggung Jawab"
              type="text"
              onChange={(e) => setAddressPic(e.target.value)}
              placeholder=""
              name=""
              value={addressPic}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/registry")}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
