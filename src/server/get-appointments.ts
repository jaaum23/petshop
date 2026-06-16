"use server";

import { prisma } from "@/database/prisma";

export async function GetAppointments() {
  return await prisma.appointment.findMany();
}
