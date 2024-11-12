"use client";
import { Hospital, Printer } from "iconsax-react";
import { useRouter } from "next/navigation";
import TicketImage from "../../../public/assets/ticket.jpg";
import { LogoutCurve } from "iconsax-react";
import Image from "next/image";
import Button from "@/components/button";
import axios from "axios";
import Popup from "@/components/popup";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Queue {
  number: number;
  path: string;
}

export default function AddQueue() {
  const [isSuccess, setIsSuccess] = useState<boolean | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const currentData = { number: 0, path: "" };
  const waitingData = [{ number: 0, path: "" }];
  const [current, setCurrent] = useState<Queue>(currentData);
  const [waiting, setWaiting] = useState<Queue[]>(waitingData);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handlePrint = () => {
    // if (waiting) {
    //   const doc = new jsPDF();
    //   doc.text("Rumah Sakit Harapan Sehat", 10, 10);
    //   doc.text("Nomor Antrian", 10, 20);
    //   const tableData = [
    //     // ["Loket", "A1"],
    //     ["A1", waiting[waiting.length - 1].number + 1],
    //   ];
    //   autoTable(doc, {
    //     startY: 30,
    //     head: [["Loket", "Nomor"]],
    //     body: tableData,
    //   });
    //   doc.save("Tiket Antrian Harapan Sehat.pdf");
    // }
  };

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(`${apiUrl}/queue`);
      setCurrent(response.current_queue);
      setWaiting(response.waiting_queue);
    } catch (error) {
      console.error(error);
    } finally {
      handlePrint();
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(`${apiUrl}/queue/add`, {}, {});
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to post medicine details:", error);
      setIsSuccess(false);
    } finally {
      fetchData();
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className="container h-screen bg-brand-base bg-opacity-15 flex flex-col justify-center items-center gap-6 px-10"
      onClick={() => {
        isModalOpen ? setIsModalOpen(false) : setIsModalOpen(false);
      }}
    >
      <div className="flex rounded-2xl bg-basic-white px">
        <Image
          src={TicketImage}
          width={400}
          className="rounded-l-lg"
          alt="login"
        />
        <div className="flex flex-col justify-between items-start px-10 py-16">
          <div className="flex flex-col gap-10 ">
            <div className="flex flex-col gap-4 text-basic-black">
              <div className="flex justify-start items-center gap-2">
                <Hospital size="32" />
                <p className="text-body">Rumah Sakit Harapan Sehat</p>
              </div>
              <p className="text-h6">
                Selamat datang di{" "}
                <span className="text-brand-base text-h6-bold">SIMRS</span>
              </p>
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-4">
              <p className="text-body text-gray-medium">
                Klik untuk membuat tiket antrian baru
              </p>
              <Button
                label="Cetak Tiket"
                variant="primary"
                rightIcon={<Printer size="24" />}
                size="full"
                onClick={() => handleClick()}
              />
            </div>
          </div>

          <div>
            <Button
              variant="secondary"
              leftIcon={<LogoutCurve size="24px" />}
              size="small"
              label="Keluar"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Popup
          variant={isSuccess ? "success" : "danger"}
          icon={isSuccess ? "tick" : "warning"}
          withButton={false}
          description={
            isSuccess
              ? [
                  "Antrian berhasil dibuat",
                  "Silahkan ambil tiket anda dan tunggu pada loket antrian",
                ]
              : [
                  "Antrian gagal dibuat",
                  "Silahkan coba lagi atau segera hubungi petugas",
                ]
          }
          buttonLabel={["", ""]}
        />
      )}
    </div>
  );
}
