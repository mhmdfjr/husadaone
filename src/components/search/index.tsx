import { SearchNormal1 } from "iconsax-react"

export default function Search(props:any) {
    return (
        <div className="flex border-2 rounded-lg py-2 px-4 gap-4 w-full">
            <div className="">
                <SearchNormal1 size="24" className="text-h7 text-gray-medium" />
            </div>
            <input type="text" name="" id="" placeholder={props.placeholder} className="w-full border-none outline-none text-body-regular bg-basic-white text-gray-medium" />
        </div>
    )
}