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
        //Button
        "bg-brand-base cursor-pointer rounded-lg": props.variant == "primary",
        "border-[2px] border-brand-base rounded-lg cursor-pointer  bg-transparent":
          props.variant == "secondary",
        // Disable Button
        "bg-brand-40 cursor-not-allowed rounded-lg":
          props.variant == "primary-disable",
        "border-[2px] border-brand-40 rounded-lg bg-transparent cursor-not-allowed":
          props.variant == "secondary-disable",
        "bg-gray-light rounded-lg cursor-not-allowed":
          props.variant == "disable",
        "w-[194px]": props.size == "big",
        //Button Line
        "border-b-[2px]  cursor-pointer  active:border-b-brand-base ":
          props.variant == "button-line",
      })}
    >
      <p
        className={clsx(baseStyle.baseText, {
          // Solid Text
          "text-basic-white": props.variant === "primary" || "primary-disable",
          "text-brand-base": props.variant === "secondary",
          "text-black active:text-brand-base": props.variant === "button-line",

          //Disabled Text
          "text-brand-40": props.variant == "secondary-disable",
          "text-gray-medium-light": props.variant == "disable",
        })}
      >
        {props.label}
      </p>
    </div>
  );
}
