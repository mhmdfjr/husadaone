import { Home2, UserEdit, People, ChemicalGlass, Note, DocumentLike, DocumentText, Buildings2, LogoutCurve } from "iconsax-react"

interface Menu {
    title: string,
    dropdown: boolean;
    icon: JSX.Element;
}

const mainMenu: Menu[] = [
    { title: "Dashboard", dropdown: false, icon: <Home2 size="24" /> },
    { title: "Registrasi Pasien", dropdown: false, icon: <UserEdit size="24"  /> },
    { title: "Penanganan", dropdown: true, icon: <People size="24" /> },
    { title: "Apotek", dropdown: false, icon: <ChemicalGlass size="24" /> },
];

const moreMenu: Menu[] = [
    { title: "Dashboard", dropdown: false, icon: <Note size="24" /> },
    { title: "Registrasi Pasien", dropdown: false, icon: <DocumentLike size="24"  /> },
    { title: "Penanganan", dropdown: false, icon: <DocumentText size="24"  /> },
    { title: "Apotek", dropdown: false, icon: <Buildings2 size="24" /> },
];
  
export default function Sidebar() {
    function isDropdown (dropdown: boolean, title: string):JSX.Element {
        if(dropdown==true) {
            return (
                <select name={title} id={title} className="w-full bg-transparent cursor-pointer" >
                    <option value="" disabled selected hidden>Penanganan</option>
                    <option value="Rawat Jalan">Rawat Jalan</option>
                    <option value="Rawat Inap">Rawat Inap</option>
                </select>
            )
        } else {
            return <p>{title}</p>
        }
    };

    return (
        <div className="h-screen flex flex-col justify-start gap-12 px-4 pt-4 border-2">
            <div className="logo w-full flex justify-center items-center cursor-pointer">
                <p className="text-h6-bold text-brand-base">SIMRS</p>
            </div>
            <div className="main-menu">
                <ul className="flex flex-col gap-4 text-body">
                    <li className="flex justify-start items-center px-4"><p className="text-body-sm text-gray-medium">Menu Utama</p></li>
                    {mainMenu.map((menu, index) => (
                        <li key={index} className="flex justify-start items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer active:bg-brand-base  text-basic-black active:text-basic-white">{menu.icon}{isDropdown(menu.dropdown, menu.title)}</li>
                    ))}
                </ul>
            </div>
            <div className="more-menu">
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