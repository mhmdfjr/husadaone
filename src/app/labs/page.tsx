import Button from "@/components/button";
import Popup from "@/components/popup";
import Search from "@/components/search";
import Table from "@/components/table";

// Labs to develop UI components

export default function Labs() {
  const tableHeaders = ["Name", "Age", "Occupation"];
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
            <Button
              label="Data Peserta"
              variant="submenu-disable"
              size="small"
            />
          </div>
        </div>
      </div>

      <div className="w-11/12 my-10 flex flex-col mx-auto ">
        <li className="text-start font-semibold mb-10">Comp Search</li>
        <div className="flex justify-center gap-5">
          <Search placeholder="Cari" />
        </div>
      </div>

      <div className="container mx-auto mt-10">
        <Table tableHead={tableHeaders}>
          <tr>
            <td className="px-4 py-4 text-center">John Doe</td>
            <td className="px-4 py-4 text-center">30</td>
            <td className="px-4 py-4 text-center">Engineer</td>
          </tr>
          <tr>
            <td className="px-4 py-4 text-center">Jane Smith</td>
            <td className="px-4 py-4 text-center">28</td>
            <td className="px-4 py-4 text-center">Designer</td>
          </tr>
          <tr>
            <td className="px-4 py-4 text-center">Bob Johnson</td>
            <td className="px-4 py-4 text-center">35</td>
            <td className="px-4 py-4 text-center">Manager</td>
          </tr>
        </Table>
      </div>

      <div className="w-11/12 my-10 flex flex-col mx-auto ">
        <li className="text-start font-semibold mb-10">Comp Pop Out</li>
        <div className="flex flex-col justify-center items-center gap-8">
          <Popup
            variant="warning"
            icon="warning"
            withoutButton={false}
            buttonLabel={["Hapus", "Simpan"]}
          />
          <Popup
            variant="danger"
            icon="logout"
            withoutButton={false}
            buttonLabel={["Batal", "Keluar"]}
          />
          <Popup
            variant="success"
            icon="tick"
            withoutButton={true}
            buttonLabel={["Hapus, Simpan"]}
          />
          <Popup
            variant="danger"
            icon="folder"
            withoutButton={true}
            buttonLabel={["Hapus, Simpan"]}
          />
        </div>
      </div>
    </div>
  );
}
