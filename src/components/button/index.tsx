import clsx from "clsx";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label: any;
  onClick: any;
  size?: "full" | "big" | "small" | "very-small";
  variant?:
    | "primary"
    | "secondary"
    | "secondary-danger"
    | "tertiary"
    | "tertiary-danger"
    | "disable"
    | "submenu"
    | "submenu-active"
    | "submenu-disable";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({
  type = "button",
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
      leftIcon ? "justify-start pl-3" : "justify-center",
    ],
    baseText: ["text-body-bold"],
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(baseStyle.baseButton, baseStyle.baseText, {
        // Size
        "w-full": size === "full",
        "w-[194px]": size === "big",
        "w-[136px]": size === "small",
        "w-[55px]": size === "very-small",

        // Variants
        "bg-brand-base cursor-pointer rounded-lg hover:bg-brand-40":
          variant === "primary",
        "border-[2px] border-brand-base hover:border-brand-40 rounded-lg cursor-pointer bg-transparent":
          variant === "secondary",
        "border-[2px] border-alert-danger hover:border-alert-danger rounded-lg cursor-pointer bg-transparent":
          variant === "secondary-danger",
        "bg-transparent rounded-lg cursor-pointer hover:text-brand-base active:bg-brand-base active:text-basic-white font-semibold":
          variant === "tertiary",
        "bg-transparent rounded-lg cursor-pointer hover:text-alert-danger active:bg-alert-danger active:text-basic-white font-semibold":
          variant === "tertiary-danger",

        // Disabled button styles
        "bg-gray-light rounded-lg cursor-not-allowed": variant === "disable",

        // Button submenu styles
        "cursor-pointer border-b-[2px] border-b-transparent active:border-b-brand-base":
          variant === "submenu",
        "cursor-pointer border-b-[2px] border-b-brand-base":
          variant === "submenu-active",
        "cursor-not-allowed border-b-[2px] border-b-gray-medium-light":
          variant === "submenu-disable",

        // Text colors
        "text-basic-white": variant === "primary",
        "text-brand-base hover:text-brand-40": variant === "secondary",
        "text-alert-danger hover:text-alert-danger":
          variant === "secondary-danger",
        "text-black active:text-brand-base": variant === "submenu",
        "text-brand-base ": variant === "submenu-active",
        "text-gray-medium-light":
          variant === "disable" || variant === "submenu-disable",
      })}
    >
      {/* Icon before text */}
      {leftIcon && <span className="icon-left">{leftIcon}</span>}

      {label}

      {/* Icon after text */}
      {rightIcon && <span className="icon-right">{rightIcon}</span>}
    </button>
  );
}
