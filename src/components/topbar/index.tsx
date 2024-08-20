import Search from "../search";
import { Notification, ProfileCircle } from "iconsax-react";

export default async function TopBar() {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="leading flex flex-col justify-center gap-2">
                <p className="text-body-bold text-basic-black">Selamat datang!</p>
                <p className="text-body-sm-regular text-gray-medium">Rumah Sakit Harapan Sehat</p>
            </div>

            <div className="search w-[560px]">
                <Search placeholder='Cari' />
            </div>

            <div className="flex justify-center items-center gap-4">
                <div>
                    <Notification size="24" className="text-h7 text-basic-black" />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <ProfileCircle size="40" className="text-h4 text-basic-black" />
                    <p className="text-body-bold text-basic-black">Admin</p>
                </div>
            </div>
        </div>
    )
}