// input masks

export const returnDigitsOnly = (value: string) => {
  return value.replace(/\D/gi, "");
};

export function usdInputMask(input: string): string {
  let cleanedInput = returnDigitsOnly(input);

  if (cleanedInput.length > 5) cleanedInput = cleanedInput.slice(-5);
  cleanedInput = cleanedInput.padStart(3, "0");

  const dollars = cleanedInput.slice(0, -2);
  const cents = cleanedInput.slice(-2);
  const formattedDollars = parseInt(dollars, 10).toLocaleString();

  return `$${formattedDollars}.${cents}`;
}

export function withdrawalMask(input: string): string {
  let cleanedInput = returnDigitsOnly(input);

  if (cleanedInput.length > 3) cleanedInput = cleanedInput.slice(-3);
  let dollars = parseInt(cleanedInput, 10);
  if (dollars > 400) dollars = 400;

  return `$${dollars.toLocaleString()}.00`;
}

export function roundToNearestFiveDollars(value: string): string {
  let cleanedInput = returnDigitsOnly(value);
  let dollars = parseInt(cleanedInput, 10);

  dollars = Math.round(dollars / 5) * 5;

  return `$${dollars.toLocaleString()}.00`;
}

export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
