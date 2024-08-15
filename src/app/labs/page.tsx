import Button from "@/components/button";
import Table from "@/components/table";

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
            <Button label="Hapus" variant="disable" size="big" />
            <Button label="Data Peserta" variant="submenu" size="big" />
            <Button label="Data Peserta" variant="submenu-disable" size="big" />
          </div>
          <div className="flex gap-5">
            <Button label="Masuk" variant="primary" size="small" />
            <Button label="Daftar" variant="secondary" size="small" />
            <Button label="Hapus" variant="disable" size="small" />
            <Button label="Data Peserta" variant="submenu" size="small" />
            <Button label="Data Peserta" variant="submenu-disable" size="small" />
          </div>
        </div>
      </div>


      <div className="w-11/12 my-10 flex flex-col mx-auto ">
        <li className="text-start font-semibold mb-10">Comp Table</li>
        <div className="flex justify-center gap-5">
           <Table />
        </div>
      </div>
    </div>
  );
}
