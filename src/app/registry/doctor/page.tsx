"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TableRegisterDoctor from "@/components/table/tableRegisterDoctor";
import { TickSquare, ArrowRight2 } from "iconsax-react";
import Cookies from "js-cookie";

interface SelectDoctor {
  id: number;
  name: string;
}

export default function ListDoctors() {
  const token = Cookies.get("token");
  const [select, setSelect] = useState<boolean>(false);
  const router = useRouter();
  const [childData, setChildData] = useState<SelectDoctor>({ id: 0, name: "" });
  const handleChildData = (data: SelectDoctor) => {
    setChildData(data);
  };

  const handleCLick = () => {
    Cookies.set("doctorId", childData.id.toString());
    Cookies.set("doctorName", childData.name);
    router.push("/registry");
  };

  const handleSelect = () => {
    setSelect(!select);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

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
            <p className="text-brand-40 p-2">Input Dokter</p>
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
        <TableRegisterDoctor onSelect={select} onDataChange={handleChildData} />
      </div>
    </div>
  );
}
