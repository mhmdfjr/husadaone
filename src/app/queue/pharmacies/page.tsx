"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/button";
import axios from "axios";
import Cookies from "js-cookie";
import Input from "@/components/input";

interface Payment {
  id: number;
  registration_id: number;
  payment_queue: number;
  path_audio: string;
  created_at: string;
  updated_at: string;
}

export default function TicketQueue() {
  const token = Cookies.get("token");
  const queue = Cookies.get("queuePharmacy");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [current, setCurrent] = useState<number>(Number(queue) || 0);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(`${apiUrl}/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "Application/json",
        },
      });

      const result = response.data || [];
      const filteredPayments = result.filter(
        (res: Payment) => res.path_audio !== null
      );
      setPayments(filteredPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const filterPaymentsByCurrentDay = (items: Payment[]): Payment[] => {
    const today = new Date();
    return items
      .filter((item) => {
        const createdAtDate = new Date(item.updated_at);
        return createdAtDate.toDateString() === today.toDateString();
      })
      .sort(
        (a, b) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
  };

  const todayPayments = filterPaymentsByCurrentDay(payments);

  const handleNext = async () => {
    if (current < todayPayments.length - 1) {
      const nextQueue = current + 1;
      Cookies.set("queuePharmacy", nextQueue.toString(), { expires: 0.5 });
      setCurrent(nextQueue);
    } else {
      // console.log("No more registrations in the queue.");
    }
  };

  const handleCall = async () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing audio:", err));
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleReset = () => {
    Cookies.remove("queuePharmacy");
    setCurrent(0);
    fetchData();
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, [token]);

  // useEffect(() => {
  //   console.log("Current queue:", current);
  //   if (todayPayments[current]) {
  //     console.log("Current payment:", todayPayments);
  //   }
  // }, [current, todayPayments]);

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
            value={todayPayments[current]?.payment_queue.toString() || ""}
          />
          <audio
            ref={audioRef}
            src={todayPayments[current]?.path_audio || ""}
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
