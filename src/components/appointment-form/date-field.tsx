"use client";
import { format } from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "@daypicker/react";
import "react-day-picker/style.css";
import "@/styles/calendar.css";
import { ptBR } from "date-fns/locale";

const BR_OFFSET = "-03:00";

interface DateFieldProps {
  title?: string;
  value?: Date;
  onChange: (date?: Date) => void;
  errorMessage?: string;
}

export function DateField({ title, value, onChange, errorMessage }: DateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dateOfToday = format(new Date(), "yyyy-MM-dd");

  function openCalendar() {
    setIsOpen(!isOpen);
  }

  const calendarRef = useRef<HTMLDivElement>(null);
  const openCalendarBtn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (!calendarRef.current?.contains(e.target as Node) && !openCalendarBtn.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full">
      <div className="flex w-full items-center justify-between">
        <span className="text-label-medium text-content-primary">{title}</span>
        <span className="text-paragraph-small text-accent-red ml-2">{errorMessage}</span>
      </div>
      <div
        ref={openCalendarBtn}
        onClick={() => openCalendar()}
        className={`mt-1 flex h-12 cursor-pointer items-center justify-between rounded-lg border px-4 transition-colors
          duration-200 ease-in-out
          ${isOpen ? "border-border-brand" : "border-border-primary hover:border-border-secondary"}`}
      >
        <div className="flex items-center">
          <Calendar size={20} color="var(--color-content-brand)" className="mr-3" />
          <span className={`text-paragraph-large ${value ? "text-content-primary" : "text-content-secondary"}`}>
            {value ? value?.toLocaleDateString("pt-BR") : format(new Date(), "dd/MM/yyyy")}
          </span>
        </div>
        <ChevronDown
          size={20}
          color="var(--color-content-secondary)"
          className={`rotate-180 transition-all duration-200 ease-in-out ${isOpen ? "rotate-360" : ""}`}
        />
      </div>

      {isOpen && (
        <div ref={calendarRef}>
          <DayPicker
            className="bg-background-tertiary border-border-primary absolute! bottom-0 z-5 mb-13 rounded-lg border"
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            navLayout="around"
            showOutsideDays
            locale={ptBR}
            ISOWeek
            disabled={(date) => date < new Date(`${dateOfToday}T00:00:00.000${BR_OFFSET}`)}
          />
        </div>
      )}
    </div>
  );
}
