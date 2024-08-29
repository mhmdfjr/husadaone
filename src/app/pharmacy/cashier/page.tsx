"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import TableCashier from "@/components/table/tableCashier";
import { useRouter } from "next/navigation";

export default function CashierPharmacy() {
  const router = useRouter();
  const handleCLick = () => {};

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <div className="flex">
          <Button
            label="Resep"
            variant="submenu"
            size="small"
            onClick={() => router.push("recipe")}
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
        <TableCashier />
      </div>
    </div>
  );
}
