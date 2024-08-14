import Button from "@/components/button";

// Labs to develop UI components

export default function Labs() {
  return (
    <div className="">
      <div className="w-11/12 my-10 flex flex-col mx-auto ">
        <li className="text-start font-semibold mb-10">Comp Button</li>
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-5">
            <Button label="Masuk" variant="primary" size="big" />
            <Button label="Daftar" variant="secondary" size="big" />
            <Button label="Simpan" variant="primary-disable" size="big" />
            <Button label="Batal" variant="secondary-disable" size="big" />
            <Button label="Hapus" variant="disable" size="big" />
            <Button label="Data Peserta" variant="button-line" size="big" />
          </div>
          <div className="flex gap-5">
            <Button label="Masuk" variant="primary" size="small" />
            <Button label="Daftar" variant="secondary" size="small" />
            <Button label="Simpan" variant="primary-disable" size="small" />
            <Button label="Batal" variant="secondary-disable" size="small" />
            <Button label="Hapus" variant="disable" size="small" />
            <Button label="Data Peserta" variant="button-line" size="small" />
          </div>
        </div>
      </div>
      <div className="w-11/12 my-10 flex flex-col mx-auto ">
        <li className="text-start font-semibold mb-10">Comp Button</li>
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-5">
            <Button label="Masuk" variant="primary" size="big" />
            <Button label="Daftar" variant="secondary" size="big" />
            <Button label="Simpan" variant="primary-disable" size="big" />
            <Button label="Batal" variant="secondary-disable" size="big" />
            <Button label="Hapus" variant="disable" size="big" />
          </div>
          <div className="flex gap-5">
            <Button label="Masuk" variant="primary" size="small" />
            <Button label="Daftar" variant="secondary" size="small" />
            <Button label="Simpan" variant="primary-disable" size="small" />
            <Button label="Batal" variant="secondary-disable" size="small" />
            <Button label="Hapus" variant="disable" size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
