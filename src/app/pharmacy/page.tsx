"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Pharmacy() {
  const router = useRouter();
  useEffect(() => {
    router.push("/pharmacy/recipe");
  }, []);
}
