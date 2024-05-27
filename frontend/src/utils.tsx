//input masks

export const sanitizeAccountIdInput = (value: string) => {
  return value.replace(/\D/gi, "");
};
