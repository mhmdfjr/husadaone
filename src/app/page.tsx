"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginImage from "../../public/assets/login.png";
import Input from "@/components/input";
import Button from "@/components/button";
import axios from "axios";

interface Error {
  status: boolean | null;
  message: string;
  errors: {
    email: string[];
    password: string[];
  };
}

const Main = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const errorData = {
    status: null,
    message: "",
    errors: {
      email: [],
      password: [],
    },
  };
  const [validation, setValidation] = useState<Error>(errorData);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/register`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {},
          params: {
            name: name,
            email: email,
            password: password,
          },
        }
      );
      console.log(response.data);
      toast.success("Berhasil registrasi akun");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error: any) {
      setValidation(error.response.data);
      // toast.error(validation.message);
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
        <div className="flex flex-col gap-y-6 w-full items-start px-24 text-start justify-center bg-brand-10 bg-opacity-15">
          <div className="flex flex-col gap-2">
            <p className="text-h6 text-start">
              Selamat datang di{" "}
              <span className="text-brand-base text-h6-bold">SIMRS</span>
            </p>
            <p className="text-body-regular text-gray-medium text-start">
              Isi data di bawah ini untuk membuat akun.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(username, email, password);
            }}
            className="w-full flex flex-col gap-y-6"
          >
            <div className="flex flex-col justify-center items-start gap-y-4">
              <Input
                type="text"
                label="Nama Pengguna"
                name="username"
                value={username}
                placeholder="Masukan nama pengguna Anda"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="text"
                label="Email"
                name="email"
                value={email}
                placeholder="Masukan email pengguna Anda"
                onChange={(e) => setEmail(e.target.value)}
              />
              {validation.status == false ? (
                <p className="text-body-sm-regular text-alert-danger">
                  {validation.errors.email[0]}
                </p>
              ) : (
                <p className="hideen"></p>
              )}
              <Input
                type="password"
                label="Kata Sandi"
                name="password"
                value={password}
                placeholder="Masukan kata sandi Anda"
                onChange={(e) => setPassword(e.target.value)}
              />
              {validation.status == false ? (
                <p className="text-body-sm-regular text-alert-danger">
                  {validation.errors.password[0]}
                </p>
              ) : (
                <p className="hideen"></p>
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-y-4">
              <Button
                variant={"primary"}
                label={"Register"}
                size={"full"}
                onClick={() => handleLogin(username, email, password)}
              />
              <Button
                variant={"secondary"}
                label={"Login"}
                size={"full"}
                onClick={() => router.push("/login")}
              />
              {/* <Button
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
              /> */}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Main;
