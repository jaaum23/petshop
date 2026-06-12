import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
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

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, value, onChange, label, setLabel }}>
      <div>{children}</div>
    </SelectContext.Provider>
  );
}

function Trigger({ placeholder }: { placeholder: string }) {
  const { isOpen, setIsOpen, label } = useContext(SelectContext);

  return (
    <button onClick={() => setIsOpen(!isOpen)} type="button">
      {label ?? placeholder}
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

function Item({ value, label, children }: { value: string; label: string; children: ReactNode }) {
  const { setIsOpen, onChange, setLabel } = useContext(SelectContext);

  return (
    <li
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
