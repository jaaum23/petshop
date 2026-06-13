import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeholder: string;
  icon: LucideIcon;
  errorMessage?: string;
}

export function FormField({ title, placeholder, icon: Icon, errorMessage, ...rest }: FormFieldProps) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <span className="text-label-medium text-content-primary">{title}</span>
        <span className="text-paragraph-small text-accent-red ml-2">{errorMessage}</span>
      </div>
      <div className="relative mt-1">
        <Icon className="absolute bottom-1 left-4 -translate-y-1/2" size={20} color="var(--color-content-brand)" />
        <input
          {...rest}
          className="border-border-primary text-paragraph-large placeholder:text-content-secondary
            hover:border-border-secondary focus:border-border-brand text-content-primary h-12 w-full rounded-lg border
            px-4 pl-12 outline-0 transition-colors duration-200 ease-in-out"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
