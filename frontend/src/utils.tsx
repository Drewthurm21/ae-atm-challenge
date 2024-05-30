//input masks
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const returnBullets = (value: string): string => {
  return value.replace(/./gi, "•");
};

export const returnDigitsOnly = (value: string): string => {
  return value.replace(/\D/gi, "");
};

export const usdInputMask = (input: string): string => {
  let digits = returnDigitsOnly(input);

  if (digits.length > 7) digits = digits.slice(-7);
  digits = digits.padStart(5, "0");

  const dollars = digits.slice(0, -2);
  const cents = digits.slice(-2);
  const formattedDollars = parseInt(dollars, 10).toLocaleString();

  return `$${formattedDollars}.${cents}`;
};

export const withdrawalMask = (input: string): string => {
  let [dollars, cents] = input.replace(/,/g, "").split(".").map(Number);

  if (cents >= 50) dollars += 1;
  dollars = Math.round(dollars / 5) * 5;

  return `${dollars.toLocaleString()}.00`;
};
