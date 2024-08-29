"use client";
import Button from "@/components/button";
import TableMedicines from "@/components/table/tableMedicine";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StockPharmacy() {
  const [select, setSelect] = useState<boolean>(false);
  const router = useRouter();
  const [childData, setChildData] = useState<number>();
  const handleChildData = (data: number) => {
    setChildData(data);
  };

  const handleCLick = () => {};

  const handleSelect = () => {
    setSelect(!select);
  };

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <div className="flex justify-between">
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

          <div className="flex gap-4">
            <Button
              label={select ? "Batal" : "Pilih"}
              variant="secondary"
              size="small"
              onClick={handleSelect}
            />
            <Button
              label="Hapus"
              variant={select ? "secondary" : "disable"}
              size="small"
              onClick={handleCLick}
            />
            <Button
              label="Edit"
              variant={select ? "secondary" : "disable"}
              size="small"
              onClick={() => {
                {
                  childData
                    ? router.push(`stock/input?input=${childData}`)
                    : null;
                }
              }}
            />
            <Button
              label="Tambah"
              variant="secondary"
              size="small"
              onClick={() => router.push("stock/input")}
            />
          </div>
        </div>
        <TableMedicines onSelect={select} onDataChange={handleChildData} />
      </div>
    </div>
  );
}
