import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface SelectContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  value: string | null;
  onChange: (value: string) => void;
  label: string | null;
  setLabel: (value: string) => void;
}

/* eslint-disable @typescript-eslint/no-empty-function */
const SelectContext = createContext<SelectContextProps>({
  isOpen: false,
  setIsOpen: () => {},
  value: null,
  onChange: () => {},
  label: null,
  setLabel: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

interface SelectProps {
  children: ReactNode;
  value: string | null;
  onChange: (value: string) => void;
}

export default function Select({ children, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    function handleClickOutside(e: MouseEvent) {
      if (!selectRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, value, onChange, label, setLabel }}>
      <div ref={selectRef}>{children}</div>
    </SelectContext.Provider>
  );
}

function Trigger({
  placeholder,
  className,
  icon: Icon,
}: {
  placeholder: string;
  className?: string;
  icon: LucideIcon;
}) {
  const { isOpen, setIsOpen, label } = useContext(SelectContext);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      type="button"
      className={twMerge(
        `transition-colors duration-200 ease-in-out
        ${isOpen ? "border-border-brand" : "border-border-primary hover:border-border-secondary"}`,
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} color="var(--color-content-brand)" />
        {label ? (
          <span className="text-paragraph-large text-content-primary">{label}</span>
        ) : (
          <span className="text-paragraph-large text-content-secondary">{placeholder}</span>
        )}
      </div>
      <ChevronDown
        size={20}
        color="var(--color-content-secondary)"
        className={`transition-all duration-200 ease-in-out ${isOpen ? "rotate-0" : "-rotate-180"}`}
      />
    </button>
  );
}

function Content({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen } = useContext(SelectContext);

  return (
    <div className={twMerge(`${isOpen ? "" : "hidden"}`, className)}>
      <ul>{children}</ul>
    </div>
  );
}

function Item({
  value,
  label,
  children,
  className,
}: {
  value: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const { setIsOpen, onChange, setLabel } = useContext(SelectContext);

  return (
    <li
      className={className}
      onClick={() => {
        onChange(value);
        setLabel(label);
        setIsOpen(false);
      }}
    >
      {children}
    </li>
  );
}

Select.Trigger = Trigger;
Select.Content = Content;
Select.Item = Item;
