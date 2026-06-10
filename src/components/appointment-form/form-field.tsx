import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeholder: string;
  icon: LucideIcon;
}

export function FormField({ title, placeholder, icon: Icon, ...rest }: FormFieldProps) {
  return (
    <div className="w-full">
      <span className="text-label-medium text-content-primary">{title}</span>
      <div className="relative">
        <Icon className="absolute bottom-1 left-3 -translate-y-1/2" size={20} color="var(--color-content-brand)" />
        <input
          {...rest}
          className="border-border-primary placeholder:text-content-secondary text-content-primary h-12 w-full
            rounded-[8px] border px-4 pl-10 outline-0"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
