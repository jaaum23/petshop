import type { Appointment } from "@/generated/prisma/client";

const getHour = (appointment: Appointment) =>
  Number(appointment.scheduledAt.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit" }));

export const morningAppointments = (appointmentsArray: Appointment[]) =>
  appointmentsArray.filter((appointment) => getHour(appointment) >= 9 && getHour(appointment) < 13);

export const afternoonAppointments = (appointmentsArray: Appointment[]) =>
  appointmentsArray.filter((appointment) => getHour(appointment) >= 13 && getHour(appointment) < 19);

export const eveningAppointments = (appointmentsArray: Appointment[]) =>
  appointmentsArray.filter((appointment) => getHour(appointment) >= 19 && getHour(appointment) < 22);
