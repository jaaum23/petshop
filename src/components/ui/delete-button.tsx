"use client";

import { CircleAlert } from "lucide-react";
import Button from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import type { Appointment } from "@/generated/prisma/client";
import { DeleteAppointment } from "@/server";
import { toast } from "sonner";

interface DeleteButtonProps {
  appointment?: Appointment;
}

export default function DeleteButton({ appointment }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function DeleteAction(id: string) {
    if (!appointment) return;

    await DeleteAppointment(id);
    toast.success("Agendamento removido com sucesso!");
    setIsOpen(false);
  }

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function openRemoveDialog() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Button title="Remover" variant="destructive" onClick={() => openRemoveDialog()} />

      {isOpen && (
        <div
          className="fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center bg-black/30
            backdrop-blur-md"
        >
          <div
            ref={dialogRef}
            className="bg-background-tertiary z-40 flex h-fit w-[90vw] flex-col items-center gap-2 rounded-xl px-5 py-10
              text-center shadow-2xl sm:w-125 sm:p-10"
          >
            <CircleAlert size={64} color="var(--color-accent-red" className="bg-accent-red/20 rounded-full p-2" />
            <h2 className="text-title">Remover agendamento?</h2>
            <p className="text-paragraph-medium">
              Tem certeza que deseja remover o agendamento? Esta ação não pode ser desfeita.
            </p>
            <div className="mt-5 flex w-full gap-3">
              <button
                className="border-border-primary text-content-primary hover:bg-content-secondary h-12 w-full
                  cursor-pointer rounded-lg border transition-colors duration-200 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
              <button
                onClick={() => void DeleteAction(appointment!.id)}
                className="border-accent-red bg-accent-red text-content-primary h-12 w-full cursor-pointer rounded-lg
                  border transition-colors duration-200 ease-in-out hover:bg-[#E46868]"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
