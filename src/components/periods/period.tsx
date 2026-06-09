import type { periodOfDayProps } from "@/types/periodTypes";
import { CloudSun, Moon, Sun } from "lucide-react";
import { AppointmentCard } from "@/components/appointment-card/appointment-card";
import type { Appointment } from "@/generated/prisma/client";

const dummyAppointments: Appointment[] = [
  {
    id: "1",
    tutorName: "Raquel Alves",
    petName: "Jade",
    phone: "21990774129",
    description: "Banho e Corte de Unha",
    scheduledAt: new Date("2026-08-20T12:00:00Z"), // 09:00
    createdAt: new Date(),
  },
  {
    id: "2",
    tutorName: "Raquel Alves",
    petName: "Sophie",
    phone: "21990774129",
    description: "Banho e Tosa Completa",
    scheduledAt: new Date("2026-08-20T13:00:00Z"), // 10:00
    createdAt: new Date(),
  },
  {
    id: "3",
    tutorName: "João Pedro",
    petName: "Trovão",
    phone: "21964603413",
    description: "Banho",
    scheduledAt: new Date("2026-08-20T16:00:00Z"), // 13:00
    createdAt: new Date(),
  },
  {
    id: "4",
    tutorName: "João Pedro",
    petName: "Fubá",
    phone: "21964603413",
    description: "Banho",
    scheduledAt: new Date("2026-08-20T17:00:00Z"), // 14:00
    createdAt: new Date(),
  },
  {
    id: "5",
    tutorName: "Alexandre José",
    petName: "Tigresa",
    phone: "21964942371",
    description: "Banho",
    scheduledAt: new Date("2026-08-20T18:00:00Z"), // 15:00
    createdAt: new Date(),
  },
];

const getHour = (appointment: Appointment) =>
  Number(appointment.scheduledAt.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit" }));

const morningAppointments = dummyAppointments.filter(
  (appointment) => getHour(appointment) >= 9 && getHour(appointment) < 13,
);
const afternoonAppointments = dummyAppointments.filter(
  (appointment) => getHour(appointment) >= 13 && getHour(appointment) < 19,
);
const eveningAppointments = dummyAppointments.filter(
  (appointment) => getHour(appointment) >= 19 && getHour(appointment) < 22,
);

export function Period({ periodOfDay }: periodOfDayProps) {
  return (
    <div className="overflow-hidden rounded-[10px]">
      <div className="bg-background-tertiary flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          {periodOfDay === "morning" && <Sun color="var(--color-accent-blue)" size={24} />}
          {periodOfDay === "afternoon" && <CloudSun color="var(--color-accent-orange)" size={24} />}
          {periodOfDay === "evening" && <Moon color="var(--color-accent-yellow)" size={24} />}
          <span className="text-label-large text-content-primary">
            {periodOfDay === "morning" && "Manhã"}
            {periodOfDay === "afternoon" && "Tarde"}
            {periodOfDay === "evening" && "Noite"}
          </span>
        </div>
        <span className="text-label-large text-content-secondary">
          {periodOfDay === "morning" && "09h - 12h"}
          {periodOfDay === "afternoon" && "13h - 18h"}
          {periodOfDay === "evening" && "19h - 21h"}
        </span>
      </div>
      <ul className="bg-background-tertiary border-t border-[#2E2C30] p-5">
        {periodOfDay === "morning" && <AppointmentCard appointmentsArray={morningAppointments} />}
        {periodOfDay === "afternoon" && <AppointmentCard appointmentsArray={afternoonAppointments} />}
        {periodOfDay === "evening" && <AppointmentCard appointmentsArray={eveningAppointments} />}
      </ul>
    </div>
  );
}
