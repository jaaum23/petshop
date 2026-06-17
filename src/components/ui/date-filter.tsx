"use client";

import { DayPicker } from "@daypicker/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { addDays, format, startOfToday, subDays } from "date-fns";
import "react-day-picker/style.css";
import "@/styles/calendar.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface DateFilterProps {
  selectedDate: Date;
}

export default function DateFilter({ selectedDate }: DateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (!calendarRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const router = useRouter();

  function setSelectedDate(clickedDate: Date) {
    router.push(`?date=${format(clickedDate, "yyyy-MM-dd")}`);
  }

  function navigateDate(action: "add" | "sub") {
    if (action === "add") {
      return setSelectedDate(addDays(selectedDate, 1));
    }
    if (action === "sub" && selectedDate > startOfToday()) {
      return setSelectedDate(subDays(selectedDate, 1));
    }
  }

  return (
    <>
      <div
        ref={calendarRef}
        className="border-border-primary/50 relative mt-4 flex w-fit items-center rounded-lg border"
      >
        <button
          onClick={() => navigateDate("sub")}
          className={`flex aspect-square h-10 ${selectedDate > startOfToday() ? "cursor-pointer" : "cursor-not-allowed"}
            items-center justify-center transition-colors duration-200 ease-in-out`}
        >
          <ChevronLeft size={16} color={selectedDate > startOfToday() ? "var(--color-content-primary)" : "#98959d66"} />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 cursor-pointer items-center justify-center gap-3 px-2 transition-colors duration-200
            ease-in-out"
        >
          <Calendar size={20} color="var(--color-content-brand)" />
          <span className="text-content-primary text-paragraph-large">{format(selectedDate, "dd/MM/yyyy")}</span>
        </button>

        <button
          onClick={() => navigateDate("add")}
          className="flex aspect-square h-10 cursor-pointer items-center justify-center transition-colors duration-200
            ease-in-out"
        >
          <ChevronRight size={16} color="var(--color-content-primary)" />
        </button>

        {isOpen && (
          <DayPicker
            className="bg-background-primary border-border-primary/50 absolute! top-12 z-5 rounded-lg border"
            mode="single"
            selected={selectedDate}
            onSelect={(clickedDate) => {
              setSelectedDate(clickedDate!);
              setIsOpen(false);
            }}
            navLayout="around"
            showOutsideDays
            locale={ptBR}
            ISOWeek
            disabled={(date) => date < startOfToday()}
          />
        )}
      </div>
    </>
  );
}
