"use client";
import { Hospital, LogoutCurve } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import axios from "axios";

interface Queue {
  number: number;
  path: string;
}

export default function GuestQueue() {
  const currentData = { number: 0, path: "" };
  const waitingData = [{ number: 0, path: "" }];
  const router = useRouter();
  const [current, setCurrent] = useState<Queue>(currentData);
  const [waiting, setWaiting] = useState<Queue[]>(waitingData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://api-simrs.serpihantech.com/api/queue"
        );
        setCurrent(response.current_queue);
        setWaiting(response.waiting_queue);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  return (
    <div className="w-full h-screen bg-basic-white flex flex-col justify-center items-center gap-6 px-10">
      <div className="w-full header text-brand-base flex justify-between items-center">
        <div className="flex justify-center items-center gap-x-2">
          <Hospital size="32" />
          <p className="text-h5-bold">Rumah Sakit Harapan Sehat</p>
        </div>
        <Button
          variant="secondary"
          size="small"
          leftIcon={<LogoutCurve size="24px" />}
          label="Keluar"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="body flex justify-center items-center gap-6">
        <div className="bg-brand-base rounded-2xl py-6 px-6 flex flex-col justify-center items-center gap-8 cursor-pointer">
          <div className="number bg-basic-white rounded-2xl flex flex-col justify-center items-center px-12 py-6">
            <p className="text-h5 text-brand-base">Nomor Antrean</p>
            <p className="text-[160px] font-bold text-brand-base leading-none">
              {waiting[0] ? waiting[0].number : 0}
            </p>
          </div>
          <div className="number bg-brand-base rounded-2xl flex flex-col justify-center items-center px-12 py-6">
            <p className="text-h5 text-basic-white">Loket</p>
            <p className="text-[160px] font-bold text-basic-white leading-none">
              A1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
