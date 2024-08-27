import clsx from "clsx";

type ButtonProps = {
  label: string;
  onClick: any;
  size?: "full" | "big" | "small";
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "disable"
    | "submenu"
    | "submenu-disable";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({
  label,
  onClick,
  size = "full",
  variant = "primary",
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const baseStyle = {
    baseButton: [
      "h-11",
      "flex",
      "items-center",
      "gap-2",
      leftIcon ? "justify-start pl-3" : "justify-center",
    ],
    baseText: ["text-body-bold"],
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyle.baseButton, baseStyle.baseText, {
        // Size
        "w-full": size == "full",
        "w-[194px]": size == "big",
        "w-[118px]": size == "small",

        // Button
        "bg-brand-base cursor-pointer rounded-lg hover:bg-brand-40":
          variant == "primary",
        "border-[2px] border-brand-base hover:border-brand-40 rounded-lg cursor-pointer bg-transparent":
          variant == "secondary",
        "bg-transparent rounded-lg cursor-pointer  hover:text-brand-base active:bg-brand-base active:text-basic-white font-semibold":
          variant == "tertiary",
        "bg-transparent rounded-lg cursor-pointer  hover:text-alert-danger active:bg-alert-danger active:text-basic-white font-semibold":
          variant == "danger",

        // Disable Button
        "bg-gray-light rounded-lg cursor-not-allowed": variant == "disable",
        // Button Submenu
        "cursor-pointer border-b-[2px] border-b-transparent active:border-b-brand-base":
          variant == "submenu",
        "cursor-not-allowed border-b-[2px] border-b-gray-medium-light":
          variant == "submenu-disable",
        "text-basic-white": variant === "primary",
        "text-brand-base hover:text-brand-40": variant === "secondary",
        "text-black active:text-brand-base hover:text-brand-base":
          variant === "submenu",
        "text-gray-medium-light":
          variant === "disable" || variant === "submenu-disable",
      })}
    >
      {/* Icon before text */}

      <span className="icon-left">{leftIcon}</span>

      {label}

      {/* Icon after text */}

      <span className="icon-right">{rightIcon}</span>
    </button>
  );
}
