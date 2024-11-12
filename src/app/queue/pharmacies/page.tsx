"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/button";
import axios from "axios";

import Input from "@/components/input";

interface Payment {
  id: number;
  registration_id: number;
  payment_queue: number;
  path_audio: string;
}

export default function TicketQueue() {
  const [id, setId] = useState<number>(0);
  const [queue, setQueue] = useState<number>(0);
  const [path, setPath] = useState<string>("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const paymentsData = [
    {
      id: 0,
      registration_id: 0,
      payment_queue: 0,
      path_audio: "",
    },
  ];

  const [payments, setPayments] = useState<Payment[]>(paymentsData);
  const [current, setCurrent] = useState<number>(0);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(`${apiUrl}/payments`);
      const responses = response.data.filter(
        (res: Payment) => res.path_audio !== null
      );
      setPayments(responses);
      setCurrent(responses[0].id);
      console.log(responses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const findPayment = payments.find((payment) => payment.id == current);

  const deletePayment = async (id: number) => {};

  const handleNext = async () => {
    if (current < payments.length) {
      setCurrent(current + 1);
    }
    // console.log(current);
    deletePayment(current);
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

  const handleReset = () => {
    fetchData();
  };

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex">
          <Button
            label="Loket"
            variant="submenu"
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
            variant="submenu-active"
            size="small"
            onClick={() => router.push("pharmacies")}
          />
        </div>
        <div className="flex justify-start items-center gap-x-20 w-full">
          <Input
            label="Apotek"
            type="select"
            onChange={(e) => {}}
            placeholder="Pilih Apotek"
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
            value={findPayment ? findPayment.id.toString() : ""}
          />
          <audio
            ref={audioRef}
            src={findPayment ? findPayment.path_audio : ""}
          />
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
