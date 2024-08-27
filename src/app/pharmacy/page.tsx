"use client";
import Button from "@/components/button";
import TableMedicines from "@/components/table/tableMedicine";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pharmacy() {
  const tableHeaders = ["Name", "Age", "Occupation"];
  const router = useRouter();

  const handleCLick = () => {};

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="p-4 flex flex-col bg-basic-white rounded-2xl border-2 overflow-scroll">
        <div className="flex justify-between">
          <div className="flex">
            <Button
              label="Input Resep"
              variant="submenu"
              size="small"
              onClick={() => router.push("pharmacy/input")}
            />
            <Button
              label="Stok Obat"
              variant="submenu"
              size="small"
              onClick={() => router.push("pharmacy/stock")}
            />
            <Button
              label="Kasir"
              variant="submenu"
              size="small"
              onClick={() => router.push("pharmacy/cashier")}
            />
          </div>

          <div className="flex gap-4">
            <Button
              label="Batal"
              variant="secondary"
              size="small"
              onClick={handleCLick}
            />
            <Button
              label="Hapus"
              variant="secondary"
              size="small"
              onClick={handleCLick}
            />
            <Button
              label="Edit"
              variant="disable"
              size="small"
              onClick={handleCLick}
            />
            <Button
              label="Tambah"
              variant="disable"
              size="small"
              onClick={handleCLick}
            />
          </div>
        </div>
        <TableMedicines />
      </div>
    </div>
  );
}
