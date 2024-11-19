"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/button";
import axios from "axios";
import Cookies from "js-cookie";

import Input from "@/components/input";

interface Queue {
  number: number;
  path: string;
}

export default function TicketQueue() {
  const token = Cookies.get("token");
  const currentData = { number: 0, path: "" };
  const waitingData = [{ number: 0, path: "" }];
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Queue>(currentData);
  const [waiting, setWaiting] = useState<Queue[]>(waitingData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${apiUrl}/queue`);
        setCurrent(response.current_queue);
        setWaiting(response.waiting_queue);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [waiting]);

  const handleNext = async () => {
    try {
      const response = await axios.post(`${apiUrl}/queue/next`, {}, {});
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleCall = async () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    } else {
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`${apiUrl}/queue/reset`, {}, {});
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex">
          <Button
            label="Loket"
            variant="submenu-active"
            size="small"
            onClick={() => router.push("ticket")}
          />
          <Button
            label="Poliklinik"
            variant="submenu"
            size="small"
            onClick={() => router.push("polyclinic")}
          />
          <Button
            label="Apotek"
            variant="submenu"
            size="small"
            onClick={() => router.push("pharmacies")}
          />
        </div>
        <div className="flex justify-start items-center gap-x-20 w-full">
          <Input
            label="Loket"
            type="select"
            onChange={(e) => {}}
            placeholder="Pilih Loket"
            name=""
            value=""
            options={["A1", "A2"]}
          />
          <Input
            label="Nomor Antrean"
            type="text"
            onChange={() => {}}
            placeholder=""
            name=""
            value={waiting[0] ? waiting[0].number.toString() : "0"}
          />
          {/* // this line is error */}
          <audio ref={audioRef} src={waiting[0] ? waiting[0].path : ""} />
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Reset"
            variant="secondary-danger"
            size="small"
            onClick={handleReset}
          />
          <Button
            label="Stop"
            variant="secondary"
            size="small"
            onClick={handleStop}
          />
          <Button
            label="Lanjut"
            variant="secondary"
            size="small"
            onClick={handleNext}
          />
          <Button
            label="Panggil"
            variant="primary"
            size="small"
            onClick={handleCall}
          />
        </div>
      </div>
    </div>
  );
}
