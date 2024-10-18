"use client";
import {
  Home2,
  UserEdit,
  People,
  ArrowDown2,
  ChemicalGlass,
  Note,
  DocumentLike,
  DocumentText,
  Buildings2,
  LogoutCurve,
  Task,
} from "iconsax-react";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { useRouter, useParams, usePathname } from "next/navigation";

interface Menu {
  title: string;
  dropdown: boolean;
  icon: JSX.Element;
  path: string;
  children: string[];
}

const mainMenu: Menu[] = [
  {
    title: "Dashboard",
    dropdown: false,
    icon: <Home2 size="24" />,
    path: "/dashboard",
    children: [],
  },
  {
    title: "Registrasi Pasien",
    dropdown: false,
    icon: <UserEdit size="24" />,
    path: "/registry",
    children: [],
  },
  {
    title: "Penanganan",
    dropdown: true,
    icon: <People size="24" />,
    path: "/services",
    children: ["Rawat Inap", "Rawat Jalan"],
  },
  {
    title: "Apotek",
    dropdown: false,
    icon: <ChemicalGlass size="24" />,
    path: "/pharmacy",
    children: [],
  },
  {
    title: "Antrean",
    dropdown: false,
    icon: <Task size="24" />,
    path: "/queue",
    children: [],
  },
];

const moreMenu: Menu[] = [
  {
    title: "Daftar Pasien",
    dropdown: false,
    icon: <Note size="24" />,
    path: "/patients",
    children: [],
  },
  {
    title: "Daftar Dokter",
    dropdown: false,
    icon: <DocumentLike size="24" />,
    path: "/doctors",
    children: [],
  },
  {
    title: "Daftar Perawat",
    dropdown: false,
    icon: <DocumentText size="24" />,
    path: "/nurses",
    children: [],
  },
  {
    title: "Daftar Poliklinik",
    dropdown: false,
    icon: <Buildings2 size="24" />,
    path: "/polyclinics",
    children: [],
  },
];

export default function Sidebar() {
  const [isPenangananOpen, setIsPenangananOpen] = useState(false);
  const [selectedPenanganan, setSelectedPenanganan] = useState<string | null>(
    null
  );
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const selectPenangananChild = (child: string) => {
    setSelectedPenanganan(child);
    setIsPenangananOpen(false);

    if (child === "Rawat Inap") {
      router.push("/services/inpatient");
    } else if (child === "Rawat Jalan") {
      router.push("/services/outpatient");
    }
  };

  const handleMenu = (menu: Menu) => {
    if (menu.dropdown && menu.title === "Penanganan") {
      setIsPenangananOpen(!isPenangananOpen);
    } else {
      router.push(menu.path);
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="w-60 bg-basic-white h-full fixed overflow-y-auto min-h-screen flex flex-col justify-start gap-12 px-4 py-4">
      <div className="logo w-full flex justify-center items-center cursor-pointer">
        <p className="text-h6-bold text-brand-base">SIMRS</p>
      </div>
      <div className="main-menu mb-8">
        <ul className="flex flex-col gap-4 text-body">
          <li className="flex justify-start items-center px-4">
            <p className="text-body-sm text-gray-medium">Menu Utama</p>
          </li>
          {mainMenu.map((menu, index) => (
            <li key={index} className="flex flex-col">
              <Button
                variant={pathname.includes(menu.path) ? "primary" : "tertiary"}
                leftIcon={menu.icon}
                rightIcon={
                  menu.dropdown ? (
                    menu.title === "Penanganan" && isPenangananOpen ? (
                      <ArrowDown2 className="rotate-180 transition-transform" />
                    ) : (
                      <ArrowDown2 />
                    )
                  ) : null
                }
                label={
                  menu.title === "Penanganan" && selectedPenanganan
                    ? selectedPenanganan
                    : menu.title
                }
                onClick={() => handleMenu(menu)}
              />

              {menu.dropdown &&
                isPenangananOpen &&
                menu.title === "Penanganan" && (
                  <div className="pl-9">
                    <ul className="flex flex-col gap-2 text-start">
                      {menu.children.map((child, index) => (
                        <li
                          key={index}
                          onClick={() => selectPenangananChild(child)}
                          className="px-2 py-2.5 rounded-lg cursor-pointer hover:text-brand-base active:bg-brand-base text-basic-black active:text-basic-white"
                        >
                          {child}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
      <div className="more-menu mb-8">
        <ul className="flex flex-col gap-4 text-body text-basic-black">
          <li className="flex justify-start items-center px-4">
            <p className="text-body-sm text-gray-medium">Menu Lainnya</p>
          </li>
          {moreMenu.map((menu, index) => (
            <Button
              key={index}
              variant={pathname.includes(menu.path) ? "primary" : "tertiary"}
              leftIcon={menu.icon}
              label={menu.title}
              onClick={() => handleMenu(menu)}
            />
          ))}
        </ul>
      </div>
      <div className="logout">
        <ul className="flex flex-col gap-4 text-body text-basic-black">
          <Button
            variant="tertiary-danger"
            leftIcon={<LogoutCurve size="24px" />}
            label="Keluar"
            onClick={handleLogout}
          />
        </ul>
      </div>
    </div>
  );
}
