import Search from "../search";
import { Notification, ProfileCircle } from "iconsax-react";

export default function TopBar(props: any) {
  return (
    <div className="sticky top-0 z-50 flex bg-basic-white justify-between items-center w-full p-4">
      <div className="leading flex flex-col justify-center gap-2">
        <p className="text-body-bold text-basic-black">Selamat datang!</p>
        <p className="text-body-sm-regular text-gray-medium">
          Rumah Sakit Harapan Kamu
        </p>
      </div>

      <div className="search w-[560px]">
        <Search placeholder="Cari" />
      </div>

      <div className="flex justify-center items-center gap-4">
        <div>
          <Notification
            size="28"
            variant="Bold"
            className="text-h7 cursor-pointer  text-basic-black"
            onClick={props.onClick}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <ProfileCircle size="35" className="text-h4  text-basic-black" />
          <p className="text-body-bold text-basic-black">Admin</p>
        </div>
      </div>
    </div>
  );
}
