"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Medic() {
  const router = useRouter();
  useEffect(() => {
    router.push("/registry/medic/input");
  }, []);
}
