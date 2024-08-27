"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter } from "next/navigation";

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

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <div className="flex">
          <Button
            label="Input Resep"
            variant="submenu"
            size="small"
            onClick={() => router.push("input")}
          />
          <Button
            label="Stok Obat"
            variant="submenu"
            size="small"
            onClick={() => router.push("stock")}
          />
          <Button
            label="Kasir"
            variant="submenu"
            size="small"
            onClick={() => router.push("cashier")}
          />
        </div>
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Kode Obat"
              type="number"
              onChange={(e) => setId(e.target.value)}
              placeholder=""
              name=""
              value={id}
            />
            <Input
              label="Nama Obat"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              name=""
              value={name}
            />
            <Input
              label="Kategori"
              type="select"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Pilih Kategori"
              name=""
              value={category}
              options={["1. Non Oral", "2. Oral"]}
            />
            <Input
              label="Satuan"
              type="select"
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Pilih Satuan"
              name=""
              value={unit}
              options={["1. Botol", "2. Kaplet"]}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Harga Beli"
              type="number"
              onChange={(e) => setPurchase(e.target.value)}
              placeholder=""
              name=""
              value={purchase}
            />
            <Input
              label="Harga Satuan"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              placeholder=""
              name=""
              value={price}
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
            onClick={handleCLick}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={handleCLick}
          />
        </div>
      </div>
    </div>
  );
}
