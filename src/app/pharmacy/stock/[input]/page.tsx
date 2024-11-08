"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";
import { setPriority } from "os";

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
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [purchase, setPurchase] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [production, setProduction] = useState<string | null>(null);
  const [validity, setValidity] = useState<string | null>(null);
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

  const handleProductionDate = (date: string) => {
    setProduction(date);
  };

  const handleExpiredDate = (date: string) => {
    setValidity(date);
  };

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/medicines/${id}`
        );
        setMedicine(response.data);
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

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "https://api-simrs.serpihantech.com/api/medicines",
        {
          name: name,
          category: category,
          unit: unit,
          purchase_price: purchase,
          unit_price: price,
          stock: stock,
          production_year: production,
          validity_period: validity,
        },
        {
          params: {
            name: name,
            category: category,
            unit: unit,
            purchase_price: purchase,
            unit_price: price,
            stock: stock,
            production_year: production,
            validity_period: validity,
          },
        }
      );
      router.push("/pharmacy/stock");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(
        `https://api-simrs.serpihantech.com/api/medicines/${id}`,
        {
          name: name || medicine.name,
          category: category || medicine.category,
          unit: unit || medicine.unit,
          purchase_price: purchase || medicine.purchase_price,
          unit_price: price || medicine.unit_price,
          stock: stock || medicine.stock,
          production_year: production || medicine.production_year,
          validity_period: validity || medicine.validity_period,
        },
        {
          params: {
            name: name || medicine.name,
            category: category || medicine.category,
            unit: unit || medicine.unit,
            purchase_price: purchase || medicine.purchase_price,
            unit_price: price || medicine.unit_price,
            stock: stock || medicine.stock,
            production_year: production || medicine.production_year,
            validity_period: validity || medicine.validity_period,
          },
        }
      );
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
              label="Nama Obat"
              type="text"
              onChange={(e) => setName((medicine.name = e.target.value))}
              placeholder={inputId ? medicine.name : ""}
              name=""
              value={inputId ? medicine.name : name}
            />
            <Input
              label="Stok"
              type="number"
              onChange={(e) =>
                setStock((medicine.stock = Number(e.target.value)))
              }
              placeholder={inputId ? medicine.stock.toString() : ""}
              name=""
              value={inputId ? medicine.stock.toString() : stock.toString()}
            />
            <Input
              label="Kategori"
              type="select"
              onChange={(e) =>
                setCategory((medicine.category = e.target.value))
              }
              placeholder={inputId ? medicine.category : "Pilih"}
              name=""
              value={inputId ? medicine.category : category}
              options={["Non Oral", "Oral"]}
            />
            <Input
              label="Satuan"
              type="select"
              onChange={(e) => setUnit((medicine.name = e.target.value))}
              placeholder={inputId ? medicine.unit : "Pilih"}
              name=""
              value={inputId ? medicine.unit : unit}
              options={["Botol", "Kaplet"]}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Harga Beli"
              type="number"
              onChange={(e) =>
                setPurchase((medicine.purchase_price = e.target.value))
              }
              placeholder={inputId ? medicine.purchase_price : ""}
              name=""
              value={inputId ? medicine.purchase_price : purchase}
            />
            <Input
              label="Harga Satuan"
              type="number"
              onChange={(e) => setPrice((medicine.unit_price = e.target.value))}
              placeholder={inputId ? medicine.unit_price : ""}
              name=""
              value={inputId ? medicine.unit_price : price}
            />
            <DatePicker
              title="Tanggal Produksi"
              name=""
              value={inputId ? medicine.production_year : null}
              onDateChange={handleProductionDate}
            />
            <DatePicker
              title="Tanggal Kadaluarsa"
              name=""
              value={inputId ? medicine.validity_period : null}
              onDateChange={handleExpiredDate}
            />
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
            onClick={() =>
              inputId ? handleEdit(Number(inputId)) : handleSave()
            }
          />
        </div>
      </div>
    </div>
  );
}
