import { BiSearch } from "react-icons/bi"

export default function Search(props:any) {
    return (
        <div className="flex border-2 rounded-lg py-2.5 px-4 gap-4 w-[560px]">
            <div className="">
                <BiSearch className="w-6 h-6 text-gray-medium" />
            </div>
            <input type="text" name="" id="" placeholder={props.placeholder} className="w-full border-none outline-none text-body-regular text-gray-medium" />
        </div>
    )
}