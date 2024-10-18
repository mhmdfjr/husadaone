"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginImage from "../../public/assets/login.png";
import Input from "@/components/input";
import Button from "@/components/button";

const Main = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      toast.success("Berhasil login");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } else {
      toast.error("Username atau kata sandi salah");
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="flex flex-row w-[1200px] h-[590px]">
        <Image
          src={LoginImage}
          width={600}
          height={590}
          className="rounded-l-lg"
          alt="login"
        />
        <div className="flex flex-col gap-y-10 w-full items-start px-24 text-start justify-center bg-brand-10 bg-opacity-15">
          <div className="flex flex-col gap-2">
            <p className="text-h6 text-start">
              Selamat datang di{" "}
              <span className="text-brand-base text-h6-bold">SIMRS</span>
            </p>
            <p className="text-body-regular text-gray-medium text-start">
              Isi data di bawah ini dengan benar.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="w-full flex flex-col gap-y-10"
          >
            <div className="flex flex-col justify-center items-center gap-y-4">
              <Input
                type="text"
                label="Nama Pengguna"
                name="username"
                value={username}
                placeholder="Masukan nama pengguna Anda"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                label="Kata Sandi"
                name="password"
                value={password}
                placeholder="Masukan kata sandi Anda"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-y-4">
              <Button
                variant={"primary"}
                label={"Masuk"}
                size={"full"}
                onClick={() => handleLogin()}
              />
              <Button
                variant={"secondary"}
                label={"Masuk Sistem Antrian"}
                size={"full"}
                onClick={() => router.push("/guest")}
              />
              <Button
                variant={"secondary"}
                label={"Buat Tiket Antrian"}
                size={"full"}
                onClick={() => router.push("/add")}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Main;
