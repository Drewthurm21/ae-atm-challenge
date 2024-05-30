import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { standardButtonClasses } from "../styles/styles";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  logout?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function StandardButton({
  children,
  className,
  logout = false,
  ...rest
}: ButtonProps) {
  return (
    <button className={twMerge(standardButtonClasses, className)} {...rest}>
      {children}
    </button>
  );
}
