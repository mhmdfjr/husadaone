"use client";
import React, { useState } from "react";
import LoginImage from "../../public/assets/login.png";
import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";
const Main = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-row w-[1200px] h-[590px]">
        <Image
          src={LoginImage}
          width={600}
          height={590}
          className=" rounded-l-lg"
          alt="login"
        />
        <div className="flex flex-col w-[600px] items-start pl-24 text-start justify-center bg-brand-10 bg-opacity-15">
          <div className="mb-8">
            <p className="text-h6 text-start">
              Selamat datang di{" "}
              <span className="text-brand-base text-h6-bold">SIMRS</span>
            </p>
            <p className="text-body-regular text-start">
              Isi data di bawah ini dengan benar.
            </p>
          </div>
          <form action="" className=" w-full pr-24">
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
            <div className="flex justify-center gap-x-5 mt-8">
              <Button
                variant={"primary"}
                label={"Masuk"}
                size={"full"}
                onClick={() => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Main;
