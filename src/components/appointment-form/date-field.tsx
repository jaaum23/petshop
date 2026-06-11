"use client";
import { format } from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "@daypicker/react";
import "react-day-picker/style.css";
import "@/styles/calendar.css";
import { ptBR } from "date-fns/locale";

export function DateField() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Date>();

  function openCalendar() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative w-full">
      <span className="text-label-medium text-content-primary">Data</span>
      <div
        onClick={() => openCalendar()}
        className="border-border-primary hover:border-border-secondary mt-1 flex h-12 cursor-pointer items-center
          justify-between rounded-lg border px-4 transition-colors duration-200 ease-in-out"
      >
        <div className="flex items-center">
          <Calendar size={20} color="var(--color-content-brand)" className="mr-3" />
          <span className="text-content-secondary">{format(new Date(), "dd/MM/yyyy")}</span>
        </div>
        <ChevronDown
          size={20}
          color="var(--color-content-secondary)"
          className={`rotate-180 transition-all duration-200 ease-in-out ${isOpen ? "rotate-360" : ""}`}
        />
      </div>

      {isOpen && (
        <DayPicker
          className="bg-background-tertiary border-border-primary absolute! bottom-0 z-5 mb-13 rounded-lg border"
          mode="single"
          selected={selected}
          onSelect={setSelected}
          animate
          navLayout="around"
          showOutsideDays
          timeZone="America/Sao_Paulo"
          locale={ptBR}
          ISOWeek
        />
      )}
    </div>
  );
}
