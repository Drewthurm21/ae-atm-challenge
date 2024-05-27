import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonClasses = twMerge(
  "rounded-md px-4 py-2 text-lg text-zinc-50",
  "bg-gradient-to-br from-blue-400 to-blue-700",
  "ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950",
  "transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
);

export default function StandardButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={twMerge(buttonClasses, className)} {...rest}>
      {children}
    </button>
  );
}
