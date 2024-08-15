import { Warning2, LogoutCurve, TickCircle, FolderCross } from "iconsax-react"
import Button from "../button"
import clsx from "clsx"

export default async function Popup(props:any) {
    // console.log(props)
    const chooseIcon = () => {
        if(props.icon=='warning') {
            return <Warning2 size="48" className="text-h3 text-basic-white" />   
        }
        if(props.icon=='logout') {
            return <LogoutCurve size="48" className="text-h3 text-basic-white" />   
        }
        if(props.icon=='tick') {
            return <TickCircle size="48" className="text-h3 text-basic-white" />   
        }
        if(props.icon=='folder') {
            return <FolderCross size="48" className="text-h3 text-basic-white" />   
        }
    }
    
    return (
        <div className="popup p-10 max-w-[529px] flex flex-col justify-center items-center gap-6 rounded-3xl bg-basic-white drop-shadow-md">
            <div className={clsx("popup-icon w-[104px] h-[104px] flex justify-center items-center rounded-full", {"bg-alert-warning": props.variant=="warning", "bg-alert-success": props.variant=="success", "bg-alert-danger": props.variant=="danger"})}>
                {chooseIcon()}
            </div>
            <div className="popup-message flex flex-col justify-center items-center gap-4">
                <p className="text-h7 text-basic-black text-center">{props.label}</p>
                <p className="text-body-regular text-gray-medium text-center">{props.description}</p>
            </div>
            <div className={clsx("popup-button flex gap-4 justify-center items-center", {"hidden": props.withoutButton})}>
                <Button label={props.buttonLabel[0]} variant="secondary" size="big" />
                <Button label={props.buttonLabel[1]} variant="primary" size="big" />
            </div>
        </div>
    )
}