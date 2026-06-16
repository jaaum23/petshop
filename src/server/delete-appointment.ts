"use server";

import { prisma } from "@/database/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteAppointment(id: string) {
  try {
    if (!id) {
      return {
        error: "Não foi possível identificar o agendamento.",
      };
    }

    await prisma.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
