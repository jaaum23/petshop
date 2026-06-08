import { Appointment } from "@/generated/prisma/client";
import { Sun } from "lucide-react";

const dummyAppointments: Appointment[] = [
  {
    id: "1",
    tutorName: "Raquel Alves",
    petName: "Jade",
    phone: "21990774129",
    description: "Banho e Corte de Unha",
    scheduledAt: new Date("2026-08-20T20:00:00"),
    createdAt: new Date(),
  },
];

export function Period() {
  return (
    <div className="overflow-hidden rounded-[10px]">
      <div className="bg-background-tertiary flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <Sun color="var(--color-accent-blue)" size={24} />
          <span className="text-label-large text-content-primary">Manhã</span>
        </div>
        <span className="text-label-large text-content-secondary">09h - 12h</span>
      </div>
      <div className="bg-background-tertiary border-t border-[#2E2C30] p-5">
        <div className="text-content-primary flex items-center justify-between px-3">
          <span className="text-label-medium">
            {dummyAppointments[0].scheduledAt.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-label-small">
            {dummyAppointments[0].petName}{" "}
            <span className="text-content-secondary text-paragraph-small">/ {dummyAppointments[0].tutorName}</span>
          </span>
          <span className="text-paragraph-small text-content-secondary">{dummyAppointments[0].description}</span>
          <button
            className="text-accent-red border-accent-red text-paragraph-small hover:bg-accent-red
              hover:text-content-primary rounded-[5px] border px-2 py-1 transition-colors duration-200 ease-in-out"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
