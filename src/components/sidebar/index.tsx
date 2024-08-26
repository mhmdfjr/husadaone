'use client'
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

interface Menu {
  title: string;
  dropdown: boolean;
  icon: JSX.Element;
}

const mainMenu: Menu[] = [
  { title: "Dashboard", dropdown: false, icon: <Home2 size="24" /> },
  { title: "Registrasi Pasien", dropdown: false, icon: <UserEdit size="24" /> },
  { title: "Penanganan", dropdown: true, icon: <People size="24" /> },
  { title: "Apotek", dropdown: false, icon: <ChemicalGlass size="24" /> },
];

const moreMenu: Menu[] = [
  { title: "Daftar Pasien", dropdown: false, icon: <Note size="24" /> },
  { title: "Daftar Dokter", dropdown: false, icon: <DocumentLike size="24" /> },
  {
    title: "Daftar Perawat",
    dropdown: false,
    icon: <DocumentText size="24" />,
  },
  {
    title: "Daftar Poliklinik",
    dropdown: false,
    icon: <Buildings2 size="24" />,
  },
];

const childMenu: string[] = ["Rawat Inap", "Rawat Jalan"];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [childState, setChildState] = useState("Penanganan");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectChildMenu = (child: string) => {
    setChildState(child);
    setIsOpen(false);
  };

  const handleLogout = () => {};

  return (
    <div className="w-60 bg-basic-white h-full fixed min-h-screen z-50 flex flex-col justify-start gap-12 px-4 py-4">
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
                variant="tertiary"
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
                onClick={menu.dropdown ? toggleDropdown : undefined}
              />

              {menu.dropdown && isOpen && (
                <div className="pl-8">
                  <ul className="flex flex-col gap-2 text-start">
                    {childMenu.map((child, index) => (
                      <li
                        key={index}
                        onClick={() => selectChildMenu(child)}
                        className="px-4 py-2.5 rounded-lg cursor-pointer hover:bg-brand-base hover:text-basic-white active:bg-brand-base text-basic-black active:text-basic-white"
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
              variant="tertiary"
              leftIcon={menu.icon}
              label={menu.dropdown ? childState : menu.title}
              onClick={menu.dropdown ? toggleDropdown : undefined}
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
