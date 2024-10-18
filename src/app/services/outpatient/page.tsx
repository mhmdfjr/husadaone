"use client";
import Input from "@/components/input";
import { ArrowRight2 } from "iconsax-react";
import TableOutpatient from "@/components/table/tableOutpatient";
import { useRouter } from "next/navigation";

export default function OutPatient() {
  const router = useRouter();
  const handleCLick = () => {};

  return (
    <>
      <div className="mx-4 flex justify-start items-center gap-4">
        <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible ">
          <div className="flex justify-start items-center text-body-sm cursor-pointer">
            <p
              className="text-gray-medium-light p-2"
              onClick={() => router.push("/services/outpatient")}
            >
              Penanganan
            </p>
            <ArrowRight2 size="16" className="text-gray-medium-light" />
            <p className="text-brand-40 p-2">Rawat Jalan</p>
          </div>

          <TableOutpatient />
        </div>
      </div>
    </>
  );
}
