import clsx from "clsx";

export default function Button(props: any) {
  const baseStyle = {
    baseButton: [
      "w-[200px]",
      "h-11",
      "flex",
      // "justify-center",
      "items-center",
      "gap-2",
      props.leftIcon ? "justify-start pl-3" : "justify-center",
    ],
    baseText: ["text-body-bold"],
  };

  return (
    <button
      onClick={props.onClick}
      className={clsx(baseStyle.baseButton, baseStyle.baseText, {
        "w-[118px]": props.size == "small",
        "w-[194px]": props.size == "big",
        // Button
        "bg-brand-base cursor-pointer rounded-lg hover:bg-brand-40":
          props.variant == "primary",
        "border-[2px] border-brand-base hover:border-brand-40 rounded-lg cursor-pointer bg-transparent":
          props.variant == "secondary",
        "bg-transparent rounded-lg cursor-pointer hover:bg-gray-medium-light font-semibold":
          props.variant == "tertiary",

        // Disable Button
        "bg-gray-light rounded-lg cursor-not-allowed":
          props.variant == "disable",
        // Button Submenu
        "cursor-pointer border-b-[2px] border-b-transparent active:border-b-brand-base":
          props.variant == "submenu",
        "cursor-not-allowed border-b-[2px] border-b-gray-medium-light":
          props.variant == "submenu-disable",
        "text-basic-white": props.variant === "primary",
        "text-brand-base hover:text-brand-40": props.variant === "secondary",
        "text-black active:text-brand-base hover:text-brand-base": props.variant === "submenu",
        "text-gray-medium-light":
          props.variant === "disable" || props.variant === "submenu-disable",
      })}
    >
      {/* Icon before text */}
     
        <span className="icon-left">{props.leftIcon}</span>
 

      {props.label}

      {/* Icon after text */}
   
        <span className="icon-right">{props.rightIcon}</span>
    </button>
  );
}
