"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";

interface MedicineDetails {
  id: number;
  name: string;
  category: string;
  unit: string;
  purchase_price: string;
  unit_price: string;
  stock: number;
  production_year: string;
  validity_period: string;
}

export default function InputPharmacy() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [purchase, setPurchase] = useState("");
  const [price, setPrice] = useState("");
  const [production, setProduction] = useState("");
  const [validity, setValidity] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const medicineData: MedicineDetails = {
    id: 0,
    name: "",
    category: "",
    unit: "",
    purchase_price: "",
    unit_price: "",
    stock: 0,
    production_year: "",
    validity_period: "",
  };
  const [medicine, setMedicine] = useState<MedicineDetails>(medicineData);

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `http://api-simrs.serpihantech.com/api/medicines/${id}`
        );
        setMedicine(response.data);
        // console.log("Response:", response.data.id);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (inputId) {
      const medicineId = Number(inputId);
      if (!isNaN(medicineId)) {
        fetchPatientDetails(medicineId);
      } else {
        console.error("Invalid medicine ID:", inputId);
        router.push("/error");
      }
    }
  }, [inputId]);

  useEffect(() => {
    console.log("Updated Patient:", medicine.id);
  }, [medicine]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://api-simrs.serpihantech.com/api/medicines",
        {
          id: id,
          name: name,
          category: category,
          unit: unit,
          purchase_price: purchase,
          unit_price: price,
          stock: 5000,
          production_year: "13-04-2024",
          validity_period: "13-04-2025",
        },
        {
          params: {
            name: name,
            category: category,
            unit: unit,
            purchase_price: purchase,
            unit_price: price,
            stock: 5000,
            production_year: "13-04-2024",
            validity_period: "13-04-2025",
          },
        }
      );
      console.log("Post response:", response.data);
      router.push("/pharmacy/stock");
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
            onClick={() => router.push("/pharmacy/stock")}
          >
            Stok Obat
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Tambah Obat</p>
        </div>
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Kode Obat"
              type="number"
              onChange={(e) => setId(e.target.value)}
              placeholder={inputId ? medicine.id.toString() : "00"}
              name=""
              value={inputId ? medicine.id.toString() : id.toString()}
            />
            <Input
              label="Nama Obat"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={inputId ? medicine.name : "Nama Obat"}
              name=""
              value={inputId ? medicine.name : name}
            />
            <Input
              label="Kategori"
              type="select"
              onChange={(e) => setCategory(e.target.value)}
              placeholder={inputId ? medicine.category : "Pilih Kategori"}
              name=""
              value={inputId ? medicine.category : category}
              options={["Non Oral", "Oral"]}
            />
            <Input
              label="Satuan"
              type="select"
              onChange={(e) => setUnit(e.target.value)}
              placeholder={inputId ? medicine.unit : "Pilih Satuan"}
              name=""
              value={inputId ? medicine.unit : unit}
              options={["Botol", "Kaplet"]}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Harga Beli"
              type="number"
              onChange={(e) => setPurchase(e.target.value)}
              placeholder={inputId ? medicine.purchase_price : "0000"}
              name=""
              value={inputId ? medicine.purchase_price : purchase}
            />
            <Input
              label="Harga Satuan"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              placeholder={inputId ? medicine.unit_price : "0000"}
              name=""
              value={inputId ? medicine.unit_price : price}
            />
            <DatePicker title="Tanggal Produksi" name="" />
            <DatePicker title="Tanggal Kadaluarsa" name="" />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/pharmacy/stock")}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
