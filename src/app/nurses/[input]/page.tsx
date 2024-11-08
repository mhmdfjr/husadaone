"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import DatePicker from "@/components/date-picker";

interface NurseDetails {
  id: number;
  name: string;
  gender: string;
  place_of_birth: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
}

export default function InputNurse() {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const nurseData: NurseDetails = {
    id: 0,
    name: "",
    gender: "",
    place_of_birth: "",
    date_of_birth: "",
    phone_number: "",
    address: "",
  };
  const [nurse, setNurse] = useState<NurseDetails>(nurseData);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchNurseDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/nurses/${id}`
        );
        setNurse(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (inputId) {
      const nurseId = Number(inputId);
      if (!isNaN(nurseId)) {
        fetchNurseDetails(nurseId);
      } else {
        console.error("Invalid medicine ID:", inputId);
        router.push("/error");
      }
    }
  }, [inputId]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "https://api-simrs.serpihantech.com/api/nurses",
        {
          name: name,
          gender: gender,
          place_of_birth: place,
          date_of_birth: selectedDate,
          phone_number: phone,
          address: address,
        },
        {
          params: {
            name: name,
            gender: gender,
            place_of_birth: place,
            date_of_birth: selectedDate,
            phone_number: phone,
            address: address,
          },
        }
      );
      router.push("/nurses");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(
        `https://api-simrs.serpihantech.com/api/nurses/${id}`,
        {
          name: name || nurse.name,
          gender: gender || nurse.gender,
          place_of_birth: place || nurse.place_of_birth,
          date_of_birth: selectedDate || nurse.date_of_birth,
          phone_number: phone || nurse.phone_number,
          address: address || nurse.address,
        },
        {
          params: {
            name: name || nurse.name,
            gender: gender || nurse.gender,
            place_of_birth: place || nurse.place_of_birth,
            date_of_birth: selectedDate || nurse.date_of_birth,
            phone_number: phone || nurse.phone_number,
            address: address || nurse.address,
          },
        }
      );
      router.push("/nurses");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/nurses")}
          >
            Daftar Perawat
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Tambah Data</p>
        </div>
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Nama Perawat"
              type="text"
              onChange={(e) => setName((nurse.name = e.target.value))}
              placeholder={inputId ? nurse.name : ""}
              name=""
              value={inputId ? nurse.name : name}
            />
            <Input
              label="Jenis Kelamin"
              type="select"
              onChange={(e) => setGender((nurse.gender = e.target.value))}
              placeholder={inputId ? nurse.gender : "Pilih"}
              name=""
              value={inputId ? nurse.gender : gender}
              options={["L", "P"]}
            />
            <Input
              label="Nomor Telepon"
              type="text"
              onChange={(e) => setPhone((nurse.phone_number = e.target.value))}
              placeholder={inputId ? nurse.phone_number : ""}
              name=""
              value={inputId ? nurse.phone_number : phone}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Tempat Lahir"
              type="text"
              onChange={(e) =>
                setPlace((nurse.place_of_birth = e.target.value))
              }
              placeholder={inputId ? nurse.place_of_birth : ""}
              name=""
              value={inputId ? nurse.place_of_birth : place}
            />
            <DatePicker
              title="Tanggal Lahir"
              name=""
              value={nurse.date_of_birth}
              onDateChange={handleDateChange}
            />
            <Input
              label="Alamat Perawat"
              type="text"
              onChange={(e) => setAddress((nurse.address = e.target.value))}
              placeholder={inputId ? nurse.address : ""}
              name=""
              value={inputId ? nurse.address : address}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/nurses")}
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
