"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Queue() {
  const router = useRouter();
  useEffect(() => {
    router.push("/queue/ticket");
  }, []);
}
