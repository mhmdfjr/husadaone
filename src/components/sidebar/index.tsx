"use client"
import { Home2, UserEdit, People, ArrowDown2, ChemicalGlass, Note, DocumentLike, DocumentText, Buildings2, LogoutCurve } from "iconsax-react"
import { useState, useEffect } from "react";
import Link from "next/link";

interface Menu {
    title: string,
    dropdown: boolean,
    icon: JSX.Element,
    route: string
}

interface ChildMenu {
    title: string,
    route: string
}

const mainMenu: Menu[] = [
    { title: "Dashboard", dropdown: false, icon: <Home2 size="24" />, route: "/" },
    { title: "Registrasi Pasien", dropdown: false, icon: <UserEdit size="24"  />, route: "/register" },
    { title: "Penanganan", dropdown: true, icon: <People size="24" />, route: "" },
    { title: "Apotek", dropdown: false, icon: <ChemicalGlass size="24" />, route: "/pharmacy" },
];

const moreMenu: Menu[] = [
    { title: "Daftar Pasien", dropdown: false, icon: <Note size="24" />, route: "/patients" },
    { title: "Daftar Dokter", dropdown: false, icon: <DocumentLike size="24"/>, route: "/doctors"  },
    { title: "Daftar Perawat", dropdown: false, icon: <DocumentText size="24"  />, route: "/nurses" },
    { title: "Daftar Poliklinik", dropdown: false, icon: <Buildings2 size="24" />, route: "/polyclinics"  },
];

const services: ChildMenu[] = [
    { title: "Rawat Inap", route: "/inpatient"},
    { title: "Rawat Jalan", route: "/outpatient" }
];
  
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [childState, setChildState] = useState("Penanganan")

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const selected = (child: string) => {
        setIsOpen(!isOpen);
        setChildState(child);
    };

    function isDropdown (dropdown: boolean, title: string):JSX.Element {
        if(dropdown==true) {
            return (
                <div className="w-full flex justify-between items-center" onClick={toggle} >
                    <p>{childState}</p>
                    <ArrowDown2 size="24" className={isOpen ? "transition-transform duration-200 rotate-180" : ""}/>
                </div>
            )
        } else {
            return <p>{title}</p>
        }
    };

    function showChild (services: ChildMenu[]):JSX.Element {
        return (
            <div className="w-full">
                <ul className="flex flex-col justify-center gap-2 text-start">
                    {services.map((child, index) => (
                        <Link href={child.route} key={index} onClick={() => selected(child.title)} className="px-4 py-2.5 rounded-lg cursor-pointer active:bg-brand-base  text-basic-black active:text-basic-white">{child.title}</Link>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className="w-60 h-full min-h-screen flex flex-col justify-start gap-12 px-4 py-4 bg-basic-white">
            <div className="logo w-full flex justify-center items-center cursor-pointer">
                <p className="text-h6-bold text-brand-base">SIMRS</p>
            </div>
            <div className="main-menu mb-8">
                <ul className="flex flex-col gap-4 text-body">
                    <li className="flex justify-start items-center px-4"><p className="text-body-sm text-gray-medium">Menu Utama</p></li>
                    {mainMenu.map((menu, index) => (
                        <>
                            <Link href={menu.route} key={index} className="text-body flex justify-start items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer active:bg-brand-base  text-basic-black active:text-basic-white">
                                {menu.icon}{isDropdown(menu.dropdown, menu.title)}
                            </Link>
                            <div key={index}>{isOpen && menu.title=="Penanganan" ? showChild(services) : null}</div>
                        </>
                    ))}
                </ul>
            </div>
            <div className="more-menu mb-8">
                <ul className="flex flex-col gap-4 text-body text-basic-black">
                    <li className="flex justify-start items-center px-4"><p className="text-body-sm text-gray-medium">Menu Lainnya</p></li>
                    {moreMenu.map((menu, index) => (
                        <li key={index} className="flex justify-start items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer active:bg-brand-base  text-basic-black active:text-basic-white">{menu.icon}<p>{menu.title}</p></li>
                    ))}
                </ul>
            </div>
            <div className="logout">
                <ul className="flex flex-col gap-4 text-body text-basic-black">
                    <li className="flex justify-start items-center gap-2 px-4 py-2.5 cursor-pointer rounded-lg active:bg-brand-base  text-basic-black active:text-basic-white"><LogoutCurve size="24px" /><p>Keluar</p></li>
                </ul>
            </div>
        </div>
    )
}