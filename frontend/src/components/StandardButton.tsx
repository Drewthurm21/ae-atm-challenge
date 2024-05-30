import React, { useEffect, useRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "../styles/btnStyle.module.css";

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
  const parentRef: any = useRef(null);
  const buttonRef: any = useRef(null);

  useEffect(() => {
    if (!buttonRef.current || !parentRef.current) return;
    buttonRef.current.addEventListener("mouseover", () => {
      parentRef.current.style.setProperty("--size", "250px");
      parentRef.current.style.setProperty(
        "--shineColor",
        "rgba(255, 255, 255, 0.3)"
      );
    });

    buttonRef.current.addEventListener("mouseleave", () => {
      parentRef.current.style.setProperty("--size", "0px");
      parentRef.current.style.setProperty(
        "--shineColor",
        "rgba(255, 255, 255, 0.0)"
      );
    });

    buttonRef.current.addEventListener("mousemove", (e: any) => {
      parentRef.current.style.setProperty("--x", e.offsetX + "px");
      parentRef.current.style.setProperty("--y", e.offsetY + "px");
    });
  }, []);

  return (
    <div ref={parentRef} className={styles.skeuParent}>
      <button
        ref={buttonRef}
        className={twMerge(
          "w-52 h-12 px-4 py-2 text-lg rounded",
          "overflow-hidden cursor-pointer text-white focus:outline-none",
          "bg-[radial-gradient(100%_100%_at_100%_0%,_#af8bee_0%,_#6903f6_100%)]",
          "transition-[box-shadow_0.15s_ease,_transform_0.15s_ease] shadow-md hover:shadow-lg",
          "hover:-translate-y-0.5 active:translate-y-[0.2] active:shadow-[inset_0px_3px_7px_#6903f6]",
          `${styles.skeu}`,
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}
