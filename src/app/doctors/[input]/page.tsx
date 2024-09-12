"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import DatePicker from "@/components/date-picker";

interface Polyclinic {
  id: number;
  name: string;
}

interface DoctorDetails {
  id: number;
  polyclinic_id: number;
  name: string;
  specialist: string;
  gender: string;
  place_of_birth: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  cost: string;
  polyclinic: Polyclinic;
}

export default function InputDoctor() {
  const [id, setId] = useState<number>(0);
  const [polyId, setPolyId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [cost, setCost] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const polyclinicData: Polyclinic = {
    id: 0,
    name: "",
  };

  const doctorData: DoctorDetails = {
    id: 0,
    polyclinic_id: 0,
    name: "",
    specialist: "",
    gender: "",
    place_of_birth: "",
    date_of_birth: "",
    phone_number: "",
    address: "",
    cost: "",
    polyclinic: polyclinicData,
  };
  const [doctor, setDoctor] = useState<DoctorDetails>(doctorData);
  const [polyclinic, setPolyclinic] = useState<Polyclinic>(polyclinicData);

  useEffect(() => {
    const fetchDoctorDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/doctors/${id}`
        );
        setDoctor(response.data);
        setPolyclinic(response.data.polyclinic);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (inputId) {
      const doctorId = Number(inputId);
      if (!isNaN(doctorId)) {
        fetchDoctorDetails(doctorId);
      } else {
        console.error("Invalid doctor ID:", inputId);
        router.push("/error");
      }
    }
  }, [inputId]);

  useEffect(() => {
    // console.log("Updated Patient:", medicine.id);
  }, [doctor]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://api-simrs.serpihantech.com/api/doctors",
        {
          polyclinic_id: polyId,
          name: name,
          specialist: specialist,
          gender: gender,
          place_of_birth: place,
          date_of_birth: "2003-04-13",
          phone_number: phone,
          address: address,
          cost: cost,
        },
        {
          params: {
            polyclinic_id: polyId,
            name: name,
            specialist: specialist,
            gender: gender,
            place_of_birth: place,
            date_of_birth: "2003-04-13",
            phone_number: phone,
            address: address,
            cost: cost,
          },
        }
      );
      console.log("Post response:", response.data);
      router.push("/doctors");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(
        `http://api-simrs.serpihantech.com/api/doctors/${id}`,
        {
          polyclinic_id: polyId || doctor.polyclinic_id,
          name: name || doctor.name,
          specialist: specialist || doctor.specialist,
          gender: gender || doctor.gender,
          place_of_birth: place || doctor.place_of_birth,
          date_of_birth: "2003-04-13",
          phone_number: phone || doctor.phone_number,
          address: address || doctor.address,
          cost: cost || doctor.cost,
        },
        {
          params: {
            polyclinic_id: polyId || doctor.polyclinic_id,
            name: name || doctor.name,
            specialist: specialist || doctor.specialist,
            gender: gender || doctor.gender,
            place_of_birth: place || doctor.place_of_birth,
            date_of_birth: "2003-04-13",
            phone_number: phone || doctor.phone_number,
            address: address || doctor.address,
            cost: cost || doctor.cost,
          },
        }
      );
      // console.log("Post response:", response.data);
      router.push("/doctors");
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
            onClick={() => router.push("/doctors")}
          >
            Daftar Dokter
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Tambah Data</p>
        </div>
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="ID Dokter"
              type="number"
              onChange={(e) => setId((doctor.id = Number(e.target.value)))}
              placeholder={inputId ? doctor.id.toString() : "000"}
              name=""
              value={inputId ? doctor.id.toString() : id.toString()}
            />
            <Input
              label="Nama Dokter"
              type="text"
              onChange={(e) => setName((doctor.name = e.target.value))}
              placeholder={inputId ? doctor.name : "Nama Dokter"}
              name=""
              value={inputId ? doctor.name : name}
            />
            <Input
              label="Spesialis"
              type="text"
              onChange={(e) =>
                setSpecialist((doctor.specialist = e.target.value))
              }
              placeholder={inputId ? doctor.specialist : "Spesialis"}
              name=""
              value={inputId ? doctor.specialist : specialist}
            />
            <Input
              label="Jenis Kelamin"
              type="select"
              onChange={(e) => setGender((doctor.gender = e.target.value))}
              placeholder={inputId ? doctor.gender : "Pilih Jenis Kelamin"}
              name=""
              value={inputId ? doctor.gender : gender}
              options={["L", "P"]}
            />
            <Input
              label="ID Poliklinik"
              type="number"
              onChange={(e) =>
                setPolyId((doctor.polyclinic_id = Number(e.target.value)))
              }
              placeholder={inputId ? doctor.polyclinic_id.toString() : "000"}
              name=""
              value={
                inputId ? doctor.polyclinic_id.toString() : polyId.toString()
              }
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex justify-start items-center gap-x-4 w-full">
              <Input
                label="Tempat Lahir"
                type="text"
                onChange={(e) =>
                  setPlace((doctor.place_of_birth = e.target.value))
                }
                placeholder={inputId ? doctor.place_of_birth : "Tempat Lahir"}
                name=""
                value={inputId ? doctor.place_of_birth : place}
              />
              <DatePicker title="Tanggal Lahir" name="" />
            </div>
            <Input
              label="Nomor Telepon"
              type="text"
              onChange={(e) => setPhone((doctor.phone_number = e.target.value))}
              placeholder={inputId ? doctor.phone_number : "000"}
              name=""
              value={inputId ? doctor.phone_number : phone}
            />
            <Input
              label="Alamat Dokter"
              type="text"
              onChange={(e) => setAddress((doctor.address = e.target.value))}
              placeholder={inputId ? doctor.address : "Alamat Dokter"}
              name=""
              value={inputId ? doctor.address : address}
            />
            <Input
              label="Harga Jasa"
              type="text"
              onChange={(e) => setCost((doctor.cost = e.target.value))}
              placeholder={inputId ? doctor.cost : "000"}
              name=""
              value={inputId ? doctor.cost : cost}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/doctors")}
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
