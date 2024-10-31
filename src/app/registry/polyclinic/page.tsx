"use client";
import Button from "@/components/button";
import TablePolyclinics from "@/components/table/tablePolyclinics";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TickSquare, ArrowRight2 } from "iconsax-react";

export default function ListPolyclinics() {
  const [select, setSelect] = useState<boolean>(false);
  const router = useRouter();
  const [childData, setChildData] = useState<number>(0);
  const handleChildData = (data: number) => {
    setChildData(data);
  };

  const handleSelect = () => {
    setSelect(!select);
  };

  const handleCLick = () => {
    localStorage.setItem("polyclinicId", childData.toString());
    router.push("/registry");
  };

  return (
    <div className="mx-4 flex justify-center items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <div className="flex justify-between">
          <div className="flex justify-start items-center text-body-sm cursor-pointer">
            <p
              className="text-gray-medium-light p-2"
              onClick={() => router.push("/registry")}
            >
              Registrasi Pasien
            </p>
            <ArrowRight2 size="16" className="text-gray-medium-light" />
            <p className="text-brand-40 p-2">Input Poliklinik</p>
          </div>
          <div className="flex gap-4">
            <Button
              label={select ? "Batal" : "Pilih"}
              variant="tertiary"
              rightIcon={<TickSquare size="24" />}
              size="small"
              onClick={handleSelect}
            />
            <Button
              label="Simpan"
              variant="primary"
              size="small"
              onClick={() => handleCLick()}
            />
          </div>
        </div>
        <TablePolyclinics onSelect={select} onDataChange={handleChildData} />
      </div>
    </div>
  );
}
