"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import TableDoctors from "@/components/table/tableDoctors";
import { TickSquare } from "iconsax-react";
import Popup from "@/components/popup";

export default function ListDoctors() {
  const [select, setSelect] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [childData, setChildData] = useState<number>();
  const handleChildData = (data: number) => {
    setChildData(data);
  };

  const handleCLick = () => {};

  const handleSelect = () => {
    setSelect(!select);
  };

  const handleDelete = async () => {
    if (childData) {
      try {
        const response = await axios.delete(
          `https://api-simrs.serpihantech.com/api/doctors/${childData}`
        );
        setIsSuccess(true);
      } catch (error) {
        setIsSuccess(false);
        console.error("Failed to delete medicine:", error);
      } finally {
        setIsModalOpen(true);
      }
    } else {
      console.error("No medicine selected for deletion");
    }
  };

  return (
    <div className="mx-4 flex justify-center items-center gap-4 ">
      <div
        onClick={() => {
          isModalOpen ? setIsModalOpen(false) : "";
        }}
        className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll"
      >
        <div className="flex justify-end">
          <div className="flex gap-4">
            <Button
              label={select ? "Batal" : "Pilih"}
              variant="tertiary"
              rightIcon={<TickSquare size="24" />}
              size="small"
              onClick={handleSelect}
            />
            <Button
              label="Hapus"
              variant={select ? "secondary-danger" : "disable"}
              size="small"
              onClick={handleDelete}
            />
            <Button
              label="Edit"
              variant={select ? "secondary" : "disable"}
              size="small"
              onClick={() => {
                {
                  childData
                    ? router.push(`doctors/input?input=${childData}`)
                    : null;
                }
              }}
            />
            <Button
              label="Tambah"
              variant="secondary"
              size="small"
              onClick={() => router.push("doctors/input")}
            />
          </div>
        </div>
        <TableDoctors onSelect={select} onDataChange={handleChildData} />
      </div>
      {isModalOpen && (
        <Popup
          variant={isSuccess ? "success" : "danger"}
          icon={isSuccess ? "tick" : "warning"}
          withButton={false}
          description={
            isSuccess
              ? ["Berhasil dihapus", ""]
              : ["Gagal dihapus", "Coba ulangi beberapa saat lagi"]
          }
          buttonLabel={["", ""]}
        />
      )}
    </div>
  );
}
