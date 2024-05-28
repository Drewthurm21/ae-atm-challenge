//input masks

export const sanitizeAccountIdInput = (value: string) => {
  return value.replace(/\D/gi, "");
};

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
