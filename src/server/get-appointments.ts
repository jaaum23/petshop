"use server";

import { prisma } from "@/database/prisma";
import { endOfDay, startOfDay } from "date-fns";

export async function GetAppointments(filteredDate: Date) {
  return await prisma.appointment.findMany({
    where: {
      scheduledAt: {
        gte: startOfDay(filteredDate),
        lte: endOfDay(filteredDate),
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}
