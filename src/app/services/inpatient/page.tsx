"use client";
import { ArrowRight2 } from "iconsax-react";
import Button from "@/components/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function InPatient() {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

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
            <p className="text-brand-40 p-2">Rawat Inap</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <p className="text-h6-bold text-brand-base">SIMRS</p>
            <p className="tetx-body text-gray-medium">
              Fitur ini sedang dalam tahap pengembangan
            </p>
            <Button
              label="Penanganan"
              variant="primary"
              size="small"
              onClick={() => router.push(`/services/outpatient`)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
