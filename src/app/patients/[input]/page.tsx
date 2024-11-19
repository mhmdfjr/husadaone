"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import Cookies from "js-cookie";

interface PatientDetails {
  id: number;
  name: string;
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  address: string;
  phone_number: string;
  insurance: string;
  pic_name: string;
  pic_status: string;
  pic_address: string;
}

export default function InputPatient() {
  const token = Cookies.get("token");
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("");
  const [picName, setPicName] = useState<string>("");
  const [picStatus, setPicStatus] = useState<string>("");
  const [picAddress, setPicAddress] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const patientData: PatientDetails = {
    id: 0,
    name: "",
    gender: "",
    place_of_birth: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    insurance: "",
    pic_name: "",
    pic_status: "",
    pic_address: "",
  };
  const [patients, setPatients] = useState<PatientDetails>(patientData);

  useEffect(() => {
    const fetchNurseDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (inputId) {
      const patientId = Number(inputId);
      if (!isNaN(patientId)) {
        fetchNurseDetails(patientId);
      } else {
        console.error("Invalid medicine ID:", inputId);
        router.push("/error");
      }
    }
  }, [inputId]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/patients`,
        {
          name: name,
          place_of_birth: place,
          date_of_birth: "2003-04-13",
          gender: gender,
          phone_number: phone,
          address: address,
          insurance: insurance,
        },
        {
          params: {
            name: name,
            place_of_birth: place,
            date_of_birth: "2003-04-13",
            gender: gender,
            phone_number: phone,
            address: address,
            insurance: insurance,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );
      router.push("/patients");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(
        `${apiUrl}/patients/${id}`,
        {
          name: name || patients.name,
          place_of_birth: place || patients.place_of_birth,
          date_of_birth: "2003-04-13",
          gender: gender || patients.gender,
          phone_number: phone || patients.phone_number,
          address: address || patients.address,
          insurance: insurance || patients.insurance,
        },
        {
          params: {
            name: name || patients.name,
            place_of_birth: place || patients.place_of_birth,
            date_of_birth: "2003-04-13",
            gender: gender || patients.gender,
            phone_number: phone || patients.phone_number,
            address: address || patients.address,
            insurance: insurance || patients.insurance,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );
      router.push("/patients");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/patients")}
          >
            Daftar Pasien
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Tambah Data</p>
        </div>
        <div className="flex justify-start items-start gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Nama Pasien"
              type="text"
              onChange={(e) => setName((patients.name = e.target.value))}
              placeholder={inputId ? patients.name : ""}
              name=""
              value={inputId ? patients.name : name}
            />
            <div className="w-full flex justify-center items-center gap-4">
              <Input
                label="Tempat Lahir"
                type="text"
                onChange={(e) =>
                  setPlace((patients.place_of_birth = e.target.value))
                }
                placeholder={inputId ? patients.place_of_birth : ""}
                name=""
                value={inputId ? patients.place_of_birth : place}
              />
              <Input
                label="Usia"
                type="number"
                onChange={(e) => setAge((patients.id = Number(e.target.value)))}
                placeholder={inputId ? patients.id.toString() : ""}
                name=""
                value={inputId ? patients.id.toString() : age.toString()}
              />
              <Input
                label="Jenis Kelamin"
                type="select"
                onChange={(e) => setGender((patients.gender = e.target.value))}
                placeholder={inputId ? patients.gender : "Pilih"}
                name=""
                value={inputId ? patients.gender : gender}
                options={["L", "P"]}
              />
            </div>
            <Input
              label="Asuransi"
              type="select"
              onChange={(e) =>
                setInsurance((patients.insurance = e.target.value))
              }
              placeholder={inputId ? patients.insurance : "Pilih"}
              name=""
              value={inputId ? patients.insurance : insurance}
              options={["BPJS", "Umum"]}
            />
            <Input
              label="Nomor Telepon Pasien"
              type="text"
              onChange={(e) =>
                setPhone((patients.phone_number = e.target.value))
              }
              placeholder={inputId ? patients.phone_number : ""}
              name=""
              value={inputId ? patients.phone_number : phone}
            />
            <Input
              label="Alamat Pasien"
              type="text"
              onChange={(e) => setAddress((patients.address = e.target.value))}
              placeholder={inputId ? patients.address : ""}
              name=""
              value={inputId ? patients.address : address}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Nama Penanggung Jawab"
              type="text"
              onChange={(e) => setPicName((patients.pic_name = e.target.value))}
              placeholder={inputId ? patients.pic_name : ""}
              name=""
              value={inputId ? patients.pic_name : picName}
            />
            <Input
              label="Status Penanggung Jawab"
              type="select"
              onChange={(e) =>
                setPicStatus((patients.pic_status = e.target.value))
              }
              placeholder={inputId ? patients.pic_status : "Pilih"}
              name=""
              value={inputId ? patients.pic_status : picStatus}
              options={["Ayah", "Ibu", "Anak", "Saudara"]}
            />
            <Input
              label="Alamat Penanggung Jawab"
              type="text"
              onChange={(e) =>
                setPicAddress((patients.pic_address = e.target.value))
              }
              placeholder={inputId ? patients.pic_address : ""}
              name=""
              value={inputId ? patients.pic_address : picAddress}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/patients")}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={() =>
              inputId ? handleEdit(Number(inputId)) : handleSave()
            }
          />
        </div>
      </div>
    </div>
  );
}
