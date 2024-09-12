"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";

interface Doctor {
  id: number;
  polyclinic_id: number;
  name: string;
  specialist: string;
}

interface PolyclincDetails {
  id: number;
  name: string;
  doctors: Doctor[];
}

export default function InputPharmacy() {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const polyclinicData: PolyclincDetails = {
    id: 0,
    name: "",
    doctors: [{ id: 0, polyclinic_id: 0, name: "", specialist: "" }],
  };
  const [polyclinic, setPolyclinic] =
    useState<PolyclincDetails>(polyclinicData);

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/polyclinics/${id}`
        );
        setPolyclinic(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (inputId) {
      const polyclinicId = Number(inputId);
      if (!isNaN(polyclinicId)) {
        fetchPatientDetails(polyclinicId);
      } else {
        console.error("Invalid medicine ID:", inputId);
        router.push("/error");
      }
    }
  }, [inputId]);

  useEffect(() => {
    // console.log("Updated Patient:", medicine.id);
  }, [polyclinic]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://api-simrs.serpihantech.com/api/polyclinics",
        {
          name: name,
        },
        {
          params: {
            name: name,
          },
        }
      );
      // console.log("Post response:", response.data);
      router.push("/polyclinics");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(
        `http://api-simrs.serpihantech.com/api/polyclinics/${id}`,
        {
          name: name || polyclinic.name,
        },
        {
          params: {
            name: name || polyclinic.name,
          },
        }
      );
      // console.log("Post response:", response.data);
      router.push("/polyclinics");
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
            onClick={() => router.push("/polyclinics")}
          >
            Daftar Poliklinik
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Tambah Data</p>
        </div>
        <div className="flex justify-start items-center gap-x-20 gap-y-4 w-full">
          <Input
            label="Kode Unit"
            type="text"
            onChange={(e) => setId((polyclinic.id = Number(e.target.value)))}
            placeholder={inputId ? polyclinic.id.toString() : "00"}
            name=""
            value={inputId ? polyclinic.id.toString() : id.toString()}
          />
          <Input
            label="Nama Unit"
            type="text"
            onChange={(e) => setName((polyclinic.name = e.target.value))}
            placeholder={inputId ? polyclinic.name : "Nama Obat"}
            name=""
            value={inputId ? polyclinic.name : name}
          />
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/polyclinics")}
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
