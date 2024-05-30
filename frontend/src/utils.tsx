//input masks
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const returnDigitsOnly = (value: string): string => {
  return value.replace(/\D/gi, "");
};

export const usdInputMask = (input: string): string => {
  let cleanedInput = returnDigitsOnly(input);

  if (cleanedInput.length > 7) cleanedInput = cleanedInput.slice(-7);
  cleanedInput = cleanedInput.padStart(5, "0");

  const dollars = cleanedInput.slice(0, -2);
  const cents = cleanedInput.slice(-2);
  const formattedDollars = parseInt(dollars, 10).toLocaleString();

  return `$${formattedDollars}.${cents}`;
};

export const withdrawalMask = (input: string): string => {
  let [dollars, cents] = input.replace(/,/g, "").split(".").map(Number);

  if (cents >= 50) dollars += 1;
  dollars = Math.round(dollars / 5) * 5;

  return `${dollars.toLocaleString()}.00`;
};
