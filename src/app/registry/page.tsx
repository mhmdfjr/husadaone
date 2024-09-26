"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import TableRegist from "@/components/table/tableRegist";
import { Add } from "iconsax-react";
import React, { useState } from "react";

const Registry = () => {
  const [noreg, setNoreg] = useState("");
  const [tanggalReg, setTanggalReg] = useState("");
  const [nama, setNama] = useState("");
  const [noRM, setNoRM] = useState("");
  const [poli, setPoli] = useState("");
  const [doctor, setDoctor] = useState("");

  return (
    <div className="mx-4 flex flex-col justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="No. Registrasi"
              name="noreg"
              type="text"
              value={noreg}
              onChange={(e) => setNoreg(e.target.value)}
            />
            <Input
              label="Tanggal Registrasi"
              name="tanggalReg"
              type="text"
              value={tanggalReg}
              onChange={(e) => setTanggalReg(e.target.value)}
            />
            <Input
              label="Nama"
              name="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="No. Rekam Medis"
                name="noRM"
                type="text"
                value={noRM}
                onChange={(e) => setNoRM(e.target.value)}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {}}
                size="very-small"
                variant="secondary"
              />
            </div>
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="Poliklinik yang Dituju"
                name="poli"
                type="text"
                value={poli}
                onChange={(e) => setPoli(e.target.value)}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {}}
                size="very-small"
                variant="secondary"
              />
            </div>
            <div className="flex gap-x-5 w-full items-end">
              <Input
                label="Dokter yang Dituju"
                name="doctor"
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              />
              <Button
                label={<Add size="32" color="#2F7BFE" />}
                onClick={() => {}}
                size="very-small"
                variant="secondary"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="big"
            onClick={() => {}}
          />
          <Button
            label="Cetak Kartu"
            variant="secondary"
            size="big"
            onClick={() => {}}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="big"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-scroll">
        <TableRegist />
      </div>
    </div>
  );
};

export default Registry;
