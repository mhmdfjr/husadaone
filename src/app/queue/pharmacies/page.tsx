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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://api-simrs.serpihantech.com/api/payments"
        );
        const responses = response.data.filter(
          (res: Payment) => res.path_audio !== null
        );
        setPayments(responses);
        setCurrent(responses[0].id);
        // console.log(responses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [current]);

  const findPayment = payments.find((payment) => payment.id == current);

  const deletePayment = async (id: number) => {
    try {
      // const response = await axios.delete(
      //   `https://api-simrs.serpihantech.com/api/payments/${id}`
      // );
      // console.log(`deleted : ${id}`);
    } catch (error) {
      console.error("Failed to delete payment:", error);
    }
  };

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

  const handleReset = () => {};

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
            label="Loket"
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
          {/* // this line is error */}
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
