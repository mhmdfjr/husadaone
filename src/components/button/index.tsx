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
      "rounded-lg",
    ],
    baseText: ["text-body-bold"],
  };

  return (
    <div
      className={clsx(baseStyle.baseButton, {
        "bg-brand-base cursor-pointer": props.variant == "primary",
        "bg-brand-40 cursor-not-allowed": props.variant == "primary-disable",
        "border-[2px] border-brand-base cursor-pointer bg-transparent":
          props.variant == "secondary",
        "border-[2px] border-brand-40 bg-transparent cursor-not-allowed":
          props.variant == "secondary-disable",
        "bg-gray-light cursor-not-allowed": props.variant == "disable",
        "w-[194px]": props.size == "big",
      })}
    >
      <p
        className={clsx(baseStyle.baseText, {
          "text-basic-white": props.variant == "primary" || "primary-disable",
          "text-brand-base": props.variant == "secondary",
          "text-brand-40": props.variant == "secondary-disable",
          "text-gray-medium-light": props.variant == "disable",
        })}
      >
        {props.label}
      </p>
    </div>
  );
}
