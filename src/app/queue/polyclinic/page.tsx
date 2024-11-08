"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/button";
import axios from "axios";
import Input from "@/components/input";

interface Registration {
  id: number;
  patient_id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
  poly_queue: string;
  path_audio: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnosis: string;
  recipe: string;
  already_paid: string;
}

export default function TicketQueue() {
  const [id, setId] = useState<number>(0);
  const [queue, setQueue] = useState<number>(0);
  const [path, setPath] = useState<string>("");

  const registrationData = [
    {
      id: 0,
      patient_id: 0,
      polyclinic_id: 0,
      doctor_id: 0,
      registration_date: "",
      poly_queue: "",
      path_audio: "",
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
      diagnosis: "",
      recipe: "",
      already_paid: "",
    },
  ];

  const [registrations, setRegistrations] =
    useState<Registration[]>(registrationData);
  const [current, setCurrent] = useState<number>(0);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "https://api-simrs.serpihantech.com/api/registrations"
      );
      const responses = response.data.filter(
        (res: Registration) => res.path_audio !== null
      );
      setRegistrations(responses);
      setCurrent(responses[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(registrations);
  }, [registrations]);

  const findPayment = registrations.find(
    (registration) => registration.id == current
  );

  const handleUpdatePatient = async (id: number) => {
    try {
      const response = await axios.put(
        `https://api-simrs.serpihantech.com/api/patients/${id}`,
        {
          name: registration.patient.name,
          place_of_birth: registration.patient.place_of_birth,
          date_of_birth: registration.patient.date_of_birth,
          gender: registration.patient.gender,
          address: registration.patient.address,
          blood_type: registration.patient.blood_type,
          insurance: registration.patient.insurance,
          pic_name: registration.patient.pic_name,
          pic_status: registration.patient.pic_status,
          pic_address: registration.patient.pic_address,
          allergy: registration.patient.allergy,
          disability: registration.patient.disability,
        },
        {
          params: {
            name: registration.patient.name,
            place_of_birth: registration.patient.place_of_birth,
            date_of_birth: registration.patient.date_of_birth,
            gender: registration.patient.gender,
            phone_number: registration.patient.phone_number,
            address: registration.patient.address,
            blood_type: registration.patient.blood_type,
            insurance: registration.patient.insurance,
          },
        }
      );
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleNext = () => {
    if (current < registrations.length) {
      setCurrent(current + 1);
    }
    setCurrent(current + 1);
    console.log(current);
    // deletePayment(current);
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
            variant="submenu-active"
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
            label="Poliklinik"
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
            // value=""
            value={findPayment ? findPayment.id.toString() : ""}
          />
          {/* // this line is error, NotSupportedError: The media resource indicated by the src attribute or assigned media provider object was not suitable. */}
          <audio
            ref={audioRef}
            // src=""
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
