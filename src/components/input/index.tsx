import clsx from "clsx";
import React from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  type: "text" | "password" | "number" | "textarea" | "select";
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  name: string;
  options?: string[];
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  name,
  options = [],
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-body text-basic-black mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(
            "border",
            "p-2",
            "rounded-md",
            "w-full",
            "focus:outline-none"
          )}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={clsx(
            "border",
            "p-2",
            "rounded-md",
            "w-full",
            "focus:outline-none"
          )}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(
            "border",
            "p-2",
            "rounded-md",
            "w-full",
            "focus:outline-none"
          )}
        />
      )}
    </div>
  );
};

export default Input;
