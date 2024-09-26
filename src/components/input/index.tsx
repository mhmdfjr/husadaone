
import clsx from "clsx";
import { Eye, EyeSlash } from "iconsax-react";
import React, { useState } from "react";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
        <div className="relative">
          <input
            type={type === "password" && isPasswordVisible ? "text" : type}
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
              "focus:outline-none",
              "pr-10" // Extra padding to make room for the eye icon
            )}
          />
          {type === "password" && (
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {isPasswordVisible ? (
                <EyeSlash size="20" className="text-gray-medium" />
              ) : (
                <Eye size="20" className="text-gray-medium" />
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
