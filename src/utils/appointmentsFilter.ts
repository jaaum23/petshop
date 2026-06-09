import type { Appointment } from "@/generated/prisma/client";
import { dummyAppointments } from "@/utils/mock-data";

const getHour = (appointment: Appointment) =>
  Number(appointment.scheduledAt.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit" }));

export const morningAppointments = dummyAppointments.filter(
  (appointment) => getHour(appointment) >= 9 && getHour(appointment) < 13,
);
export const afternoonAppointments = dummyAppointments.filter(
  (appointment) => getHour(appointment) >= 13 && getHour(appointment) < 19,
);
export const eveningAppointments = dummyAppointments.filter(
  (appointment) => getHour(appointment) >= 19 && getHour(appointment) < 22,
);
