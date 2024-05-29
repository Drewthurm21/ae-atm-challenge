import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { standardInputClasses } from "./styles";

type StandardInputProps = {
  name?: string;
  placeholder?: string;
  hidePlaceholder?: boolean;
  label?: string;
  className?: string;
  maxLength?: number;
  mask?: (s: string) => string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StandardInput({
  name = "",
  placeholder = "",
  hidePlaceholder,
  className = "",
  label,
  maxLength,
  mask,
  onChange,
}: StandardInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState(placeholder);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const maskedValue = mask ? mask(value) : value;
    setInputValue(maskedValue);
    onChange(e);
  };

  const clearPlaceHolder = () => setInputPlaceholder("");
  const resetPlaceHolder = () => setInputPlaceholder(placeholder || "");

  return (
    <div className="mb-12">
      {label && (
        <div className="mb-1.5 flex items-end justify-between">
          <label
            htmlFor={name}
            className="block text-black text-xl font-semibold mb-2"
          >
            {label}
          </label>
        </div>
      )}
      <input
        id={name + "-input"}
        type="text"
        name={name}
        onChange={handleInput}
        value={inputValue}
        onFocus={hidePlaceholder ? clearPlaceHolder : () => void 0}
        onBlur={hidePlaceholder ? resetPlaceHolder : () => void 0}
        maxLength={maxLength ? maxLength : 9}
        placeholder={inputPlaceholder}
        className={twMerge(standardInputClasses, className)}
      />
    </div>
  );
}
