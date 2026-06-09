import type { Appointment } from "@/generated/prisma/client";

export const dummyAppointments: Appointment[] = [
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
