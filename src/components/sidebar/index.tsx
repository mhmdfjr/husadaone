"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  UserEdit,
  Home2,
  People,
  ChemicalGlass,
  Note,
  DocumentLike,
  DocumentText,
  Buildings2,
  LogoutCurve,
} from "iconsax-react";
import Button from "../button";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home2 size="24" />,
  },
  {
    title: "Registrasi Pasien",
    path: "/registry",
    icon: <UserEdit size="24" />,
  },
  {
    title: "Penanganan",
    path: "/projects",
    icon: <People size="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Rawat Inap", path: "/dashboard" },
      { title: "Rawat Jalan", path: "/projects/web-design" },
    ],
  },
  {
    title: "Apotek",
    path: "/pharmacy",
    icon: <ChemicalGlass size="24" />,
  },
];
export const SIDENAV_MORE_ITEMS: SideNavItem[] = [
  {
    title: "Daftar Pasien",
    path: "/patients",
    icon: <Note size="24" />,
  },
  {
    title: "Daftar Dokter",
    path: "/doctors",
    icon: <DocumentLike size="24" />,
  },
  {
    title: "Daftar Perawat",
    path: "/nurses",
    icon: <DocumentText size="24" />,
  },
  {
    title: "Daftar Poliklinik",
    path: "/polyclinics",
    icon: <Buildings2 size="24" />,
  },
];

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

const SideNav = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
  };
  return (
    <div className="w-64 min-h-screen overflow-y-auto top-0 left-0  bg-white flex flex-col">
      <Link href="/" className="flex items-center justify-center px-6 h-20 ">
        <span className="font-bold text-center text-brand-60 text-3xl ml-3">
          SIMRS
        </span>
      </Link>
      <div className="space-y-5">
        <div>
          <p className="font-medium text-sm ml-9 text-gray-medium">
            Menu Utama
          </p>
          <div className="flex flex-col flex-grow ">
            {SIDENAV_ITEMS.map((item, idx) => (
              <MenuItem key={idx} item={item} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium text-sm ml-9 text-gray-medium">
            Menu Lainnya
          </p>
          <div className="flex flex-col flex-grow ">
            {SIDENAV_MORE_ITEMS.map((item, idx) => (
              <MenuItem key={idx} item={item} />
            ))}
          </div>
        </div>
        <div className="logout">
          <ul className="ml-6 text-body text-basic-black">
            <Button
              variant="danger"
              leftIcon={<LogoutCurve size="24px" />}
              label="Keluar"
              onClick={handleLogout}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      {item.submenu ? (
        <button
          onClick={toggleSubmenu}
          className={`flex items-center justify-between px-6 py-3 text-gray-700 hover:rounded-lg hover:text-white m-3 hover:bg-brand-base ${
            pathname.includes(item.path)
              ? "bg-brand-base text-white rounded-lg m-3 font-semibold"
              : ""
          }`}
        >
          <div className="flex items-center">
            {item.icon && <span className="mr-3">{item.icon}</span>}
            <span>{item.title}</span>
          </div>
          {/* <Icon
            icon={isOpen ? "lucide:chevron-up" : "lucide:chevron-down"}
            width="24"
            height="24"
          /> */}
        </button>
      ) : (
        <Link
          href={item.path}
          className={`flex items-center px-6 py-3 text-gray-700 hover:rounded-lg hover:text-white m-3 hover:bg-brand-base ${
            pathname.includes(item.path)
              ? "bg-brand-base text-white rounded-lg m-3 font-semibold"
              : ""
          }`}
        >
          {item.icon && <span className="mr-3">{item.icon}</span>}
          <span>{item.title}</span>
        </Link>
      )}

      {item.submenu && item.subMenuItems && isOpen && (
        <div className="ml-6 mt-1">
          {item.subMenuItems.map((subItem, idx) => (
            <Link
              key={idx}
              href={subItem.path}
              className={`block px-4 py-2 text-sm text-gray-600 hover:bg-zinc-100 ${
                subItem.path === pathname
                  ? "bg-brand-base text-white rounded-lg m-3 font-semibold"
                  : ""
              }`}
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
