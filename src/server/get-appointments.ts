"use server";

import { prisma } from "@/database/prisma";

const BR_OFFSET = "-03:00";

export async function GetAppointments(filteredDate: Date) {
  const dayDate = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(filteredDate);

  return await prisma.appointment.findMany({
    where: {
      scheduledAt: {
        gte: new Date(`${dayDate}T00:00:00.000${BR_OFFSET}`),
        lte: new Date(`${dayDate}T23:59:59.999${BR_OFFSET}`),
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}
