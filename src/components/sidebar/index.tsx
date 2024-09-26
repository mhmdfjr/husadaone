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
  ArrowUp2,
} from "iconsax-react";
import { useState } from "react";
import Button from "@/components/button";
import { useRouter, useParams, usePathname } from "next/navigation";

interface Menu {
  title: string;
  dropdown: boolean;
  icon: JSX.Element;
  path: string;
}

const mainMenu: Menu[] = [
  {
    title: "Dashboard",
    dropdown: false,
    icon: <Home2 size="24" />,
    path: "/dashboard",
  },
  {
    title: "Registrasi Pasien",
    dropdown: false,
    icon: <UserEdit size="24" />,
    path: "/registry",
  },
  {
    title: "Penanganan",
    dropdown: true,
    icon: <People size="24" />,
    path: "/services",
  },
  {
    title: "Apotek",
    dropdown: false,
    icon: <ChemicalGlass size="24" />,
    path: "/pharmacy",
  },
];

const moreMenu: Menu[] = [
  {
    title: "Daftar Pasien",
    dropdown: false,
    icon: <Note size="24" />,
    path: "/patients",
  },
  {
    title: "Daftar Dokter",
    dropdown: false,
    icon: <DocumentLike size="24" />,
    path: "/doctors",
  },
  {
    title: "Daftar Perawat",
    dropdown: false,
    icon: <DocumentText size="24" />,
    path: "/nurses",
  },
  {
    title: "Daftar Poliklinik",
    dropdown: false,
    icon: <Buildings2 size="24" />,
    path: "/polyclinics",
  },
];

const childMenu: string[] = ["Rawat Inap", "Rawat Jalan"];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [childState, setChildState] = useState("Penanganan");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenu = (path: string) => {
    router.push(path);
  };

  const selectChildMenu = (child: string) => {
    setChildState(child);
    setIsOpen(false);
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
                  menu.title === "Penanganan" ? (
                    <ArrowDown2
                      className={
                        isOpen
                          ? "transition-transform duration-200 rotate-180"
                          : ""
                      }
                    />
                  ) : (
                    ""
                  )
                }
                label={menu.dropdown ? childState : menu.title}
                onClick={
                  menu.dropdown ? toggleDropdown : () => handleMenu(menu.path)
                }
              />

              {menu.dropdown && isOpen && (
                <div className="pl-9">
                  <ul className="flex flex-col gap-2 text-start">
                    {childMenu.map((child, index) => (
                      <li
                        key={index}
                        onClick={() => selectChildMenu(child)}
                        className="px-2 py-2.5 rounded-lg cursor-pointer hover:text-brand-base  active:bg-brand-base text-basic-black active:text-basic-white"
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
              label={menu.dropdown ? childState : menu.title}
              onClick={
                menu.dropdown ? toggleDropdown : () => handleMenu(menu.path)
              }
            />
          ))}
        </ul>
      </div>
      <div className="logout">
        <ul className="flex flex-col gap-4 text-body text-basic-black">
          <Button
            variant="danger"
            leftIcon={<LogoutCurve size="24px" />}
            label="Keluar"
            onClick={handleLogout}
          />
        </ul>
      </div>
    </div>
  );
}
