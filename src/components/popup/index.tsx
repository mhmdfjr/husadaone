import { Warning2, LogoutCurve, TickCircle, FolderCross } from "iconsax-react";
import Button from "../button";
import clsx from "clsx";

interface Props {
  icon: string;
  variant: string;
  withButton: boolean;
  description: string[];
  buttonLabel: string[];
}

export default function Popup(props: Props) {
  const chooseIcon = () => {
    switch (props.icon) {
      case "warning":
        return <Warning2 size="48" className="text-h3 text-basic-white" />;
      case "logout":
        return <LogoutCurve size="48" className="text-h3 text-basic-white" />;
      case "tick":
        return <TickCircle size="48" className="text-h3 text-basic-white" />;
      case "folder":
        return <FolderCross size="48" className="text-h3 text-basic-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-52 z-50 p-10 max-w-[529px] flex flex-col justify-center items-center gap-6 rounded-3xl bg-basic-white drop-shadow-md">
      <div
        className={clsx(
          "popup-icon w-[104px] h-[104px] flex justify-center items-center rounded-full",
          {
            "bg-alert-warning": props.variant == "warning",
            "bg-alert-success": props.variant == "success",
            "bg-alert-danger": props.variant == "danger",
          }
        )}
      >
        {chooseIcon()}
      </div>

      <div className="popup-message flex flex-col justify-center items-center gap-4">
        <p className="text-h7 text-basic-black text-center">
          {props.description[0]}
        </p>
        <p className="text-body-regular text-gray-medium text-center">
          {props.description[1]}
        </p>
      </div>

      <div
        className={clsx("popup-button flex gap-4 justify-center items-center", {
          hidden: !props.withButton,
        })}
      >
        <Button
          label={props.buttonLabel[0]}
          variant="secondary"
          size="big"
          onClick={() => {}}
        />
        <Button
          label={props.buttonLabel[1]}
          variant="primary"
          size="big"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
