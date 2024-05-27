import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { standardButtonClasses } from "./styles";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function StandardButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={twMerge(standardButtonClasses, className)} {...rest}>
      {children}
    </button>
  );
}
