import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { standardInputClasses } from "./styles";

type StandardInputProps = {
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  mask?: (s: string) => string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const sanitizeNumberInput = (value: string) => {
  return value.replace(/\D/gi, "");
};

export default function StandardInput({
  name = "",
  label = "",
  value = "",
  placeholder = "",
  className = "",
  mask = sanitizeNumberInput,
  onChange,
}: StandardInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [inputPlaceholder, setInputPlaceholder] = useState(placeholder);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (mask) value = mask(e.target.value);
    setInputValue(value);
    onChange(e);
  };

  const clearPlaceHolder = () => {
    setInputPlaceholder("");
  };

  const resetPlaceHolder = () => {
    setInputPlaceholder(placeholder || "");
  };

  return (
    <div className="mb-12">
      {label && (
        <div className="mb-1.5 flex items-end justify-between">
          <label htmlFor={name} className="block text-lg text-white bold">
            {label}
          </label>
        </div>
      )}
      <input
        id={name}
        type="text"
        name="account_id"
        onChange={handleInput}
        value={inputValue}
        onFocus={clearPlaceHolder}
        onBlur={resetPlaceHolder}
        placeholder={inputPlaceholder}
        className={twMerge(standardInputClasses, className)}
      />
    </div>
  );
}
