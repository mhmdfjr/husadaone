import clsx from "clsx";

// Pass props of 'label', 'variant', and 'size' to use Button Component

export default function Button(props: any) {
  const baseStyle = {
    baseButton: [
      "w-[118px]",
      "h-11",
      "flex",
      "justify-center",
      "items-center",
      ,
    ],
    baseText: ["text-body-bold"],
  };

  return (
    <div
      className={clsx(baseStyle.baseButton, {
        "w-[194px]": props.size == "big",
        // Button
        "bg-brand-base cursor-pointer rounded-lg hover:bg-brand-40": props.variant == "primary",
        "border-[2px] border-brand-base hover:border-brand-40 rounded-lg cursor-pointer bg-transparent": props.variant == "secondary",
        // Disable Button
        "bg-gray-light rounded-lg cursor-not-allowed": props.variant == "disable",
        // Button Submenu
        "cursor-pointer border-b-[2px] border-b-transparent active:border-b-brand-base ": props.variant == "submenu",
        "cursor-not-allowed border-b-[2px] border-b-gray-medium-light": props.variant == "submenu-disable"
      })}
    >
      <p
        className={clsx(baseStyle.baseText, {
          // Solid Text
          "text-basic-white": props.variant == "primary",
          "text-brand-base hover:text-brand-40": props.variant == "secondary",
          "text-black active:text-brand-base": props.variant == "submenu",

          //Disabled Text
          "text-gray-medium-light": props.variant == "disable" || props.variant == "submenu-disable",
        })}
      >
        {props.label}
      </p>
    </div>
  );
}
