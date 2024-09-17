import { Warning2, LogoutCurve, TickCircle, FolderCross } from "iconsax-react";
import Button from "../button";
import clsx from "clsx";

export default function Popup(props: any) {
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

  const getMessage = () => {
    switch (props.icon) {
      case "warning":
        return [
          "Anda yakin menghapus data ini?",
          "Apakah Anda yakin untuk menghapus data ini? Data yang sudah terhapus tidak bisa dikembalikan",
        ];
      case "logout":
        return ["Keluar Akun", "Apakah Anda yakin untuk keluar akun?"];
      case "tick":
        return [
          "Data Berhasil Disimpan",
          "Selamat! Data Anda sudah tersimpan pada sistem",
        ];
      case "folder":
        return ["Data Gagal", "Maaf, data Anda gagal disimpan pada sistem "];
      default:
        return "";
    }
  };

  return (
    <div className="popup p-10 max-w-[529px] flex flex-col justify-center items-center gap-6 rounded-3xl bg-basic-white drop-shadow-md">
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
          {getMessage()[0]}
        </p>
        <p className="text-body-regular text-gray-medium text-center">
          {getMessage()[1]}
        </p>
      </div>

      <div
        className={clsx("popup-button flex gap-4 justify-center items-center", {
          hidden: props.withoutButton,
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
    // </div>
  );
}
