"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import TableNurses from "@/components/table/tableNurses";
import { TickSquare } from "iconsax-react";
import Popup from "@/components/popup";
import Cookies from "js-cookie";

export default function ListNurses() {
  const token = Cookies.get("token");
  const [select, setSelect] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
        const response = await axios.delete(`${apiUrl}/nurses/${childData}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        });
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

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="mx-4 flex justify-center items-center gap-4 ">
      <div
        onClick={() => {
          isModalOpen ? setIsModalOpen(false) : "";
        }}
        className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll scrollbar-hide"
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
                    ? router.push(`nurses/input?input=${childData}`)
                    : null;
                }
              }}
            />
            <Button
              label="Tambah"
              variant="secondary"
              size="small"
              onClick={() => router.push("nurses/input")}
            />
          </div>
        </div>
        <TableNurses onSelect={select} onDataChange={handleChildData} />
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
