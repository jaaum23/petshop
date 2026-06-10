"use client";
import { PawPrint, Phone, SquareChartGantt, User } from "lucide-react";
import { FormField } from "@/components/appointment-form/form-field";
import Button from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function AppointmentForm() {
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(!isOpen);
  }
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (!dialogRef.current?.contains(e.target as Node)) {
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
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Button title="NOVO AGENDAMENTO" variant="brand" onClick={() => openDialog()} />
      {isOpen && (
        <div className="fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-md">
          <div
            ref={dialogRef}
            className="bg-background-tertiary z-40 h-fit w-[90vw] rounded-[12px] px-5 py-10 shadow-2xl sm:w-125 sm:p-10"
          >
            <h2 className="text-title text-content-primary">Agende um atendimento</h2>
            <p className="text-paragraph-medium text-content-secondary mt-1">
              Preencha os dados do cliente para realizar o agendamento:
            </p>
            <div className="mt-7 flex flex-col items-end gap-6">
              <FormField title="Nome do tutor" placeholder="Raquel Alves" icon={User} />
              <FormField title="Nome do pet" placeholder="Jade" icon={PawPrint} />
              <FormField title="Telefone" placeholder="(00) 0 0000-0000" icon={Phone} />
              <FormField title="Serviço" placeholder="Banho e tosa" icon={SquareChartGantt} />
              <div className="flex w-full gap-4">
                <Button title="CANCELAR" variant="cancelForm" type="button" onClick={() => setIsOpen(false)} />
                <Button title="AGENDAR" variant="submitForm" type="submit" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
