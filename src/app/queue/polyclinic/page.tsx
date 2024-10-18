"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "next/navigation";

export default function PolyclinicQueue() {
  const router = useRouter();
  const handleCLick = () => {};

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
            onClick={() => {}}
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
            placeholder="Pilih Poliklinik"
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
            value=""
          />
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Stop"
            variant="secondary"
            size="small"
            onClick={() => router.push("/queue/polyclinic")}
          />
          <Button
            label="Reset"
            variant="secondary"
            size="small"
            onClick={() => router.push("/queue/polyclinic")}
          />
          <Button
            label="Panggil"
            variant="primary"
            size="small"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
