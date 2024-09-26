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
    <div>
      <div className="bg-white py-5 px-10 rounded-2xl ">
        <div className="flex justify-center gap-x-20">
          <div className="w-full space-y-5">
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
          <div className="w-full space-y-5">
            <div className="flex items-end gap-x-5">
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
            <div className="flex items-end gap-x-5">
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
            <div className="flex items-end gap-x-5">
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
        <div className="ml-96 mt-5 flex items-center gap-x-5">
          <Button label="Batal" variant={"secondary"} onClick={() => {}} />
          <Button
            label="Cetak Kartu"
            variant={"secondary"}
            onClick={() => {}}
          />
          <Button label="Simpan" variant={"primary"} onClick={() => {}} />
        </div>
      </div>
      <div>
        <TableRegist />
      </div>
    </div>
  );
};

export default Registry;
