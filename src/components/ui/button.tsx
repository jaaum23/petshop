"use client";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant: "default" | "destructive" | "brand" | "submitForm" | "cancelForm";
}

export default function Button({ title, variant, ...rest }: ButtonProps) {
  function setVariant() {
    if (variant === "default")
      return "text-content-primary border-content-secondary/20 text-paragraph-small hover:bg-content-tertiary active:bg-content-secondary active:text-content-primary h-10 w-full cursor-pointer rounded-[5px] border px-2 py-1 transition-colors duration-200 ease-in-out sm:h-fit sm:w-fit";
    if (variant === "destructive")
      return "text-accent-red border-accent-red/20 text-paragraph-small hover:bg-accent-red hover:text-content-primary active:bg-accent-red active:text-content-primary h-10 w-full cursor-pointer rounded-[5px] border px-2 py-1 transition-colors duration-200 ease-in-out sm:h-fit sm:w-fit";
    if (variant === "brand")
      return "bg-background-brand active:text-content-primary hover:bg-background-highlights active:bg-background-highlights text-content-button text-label-large h-12 w-fit cursor-pointer rounded-[8px] px-6 py-3 uppercase transition-colors duration-200 ease-in-out";
    if (variant === "submitForm")
      return "bg-background-brand hover:bg-background-highlights active:text-content-primary active:bg-background-highlights text-content-button text-label-large h-12 w-full cursor-pointer rounded-lg px-6 py-3 uppercase transition-colors duration-200 ease-in-out";
    if (variant === "cancelForm")
      return "border border-accent-red/20 text-accent-red hover:bg-accent-red active:bg-accent-red hover:text-content-primary active:text-content-primary text-label-large h-12 w-full cursor-pointer rounded-lg px-6 py-3 uppercase transition-colors duration-200 ease-in-out";
  }

  return (
    <button {...rest} className={setVariant()}>
      {title}
    </button>
  );
}
