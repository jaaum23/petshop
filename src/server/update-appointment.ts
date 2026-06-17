"use server";

import { prisma } from "@/database/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import z from "zod";

const AppointmentSchema = z.object({
  tutorName: z.string().min(1, "Campo obrigatório."),
  petName: z.string().min(1, "Campo obrigatório."),
  phone: z.string().regex(/^\d{11}$/, "O telefone deve ter 11 dígitos."),
  description: z.string().min(1, "Campo obrigatório."),
  scheduledAt: z.date("Selecione uma data.").min(new Date()),
});

type AppointmentType = z.infer<typeof AppointmentSchema>;

export async function UpdateAppointment(id: string, editedData: AppointmentType) {
  try {
    const parsedEditedData = AppointmentSchema.safeParse(editedData);

    if (!parsedEditedData.success) {
      return {
        error: `Ocorreu um erro: ${parsedEditedData.error.message}`,
      };
    }

    const scheduledHours = Number(
      parsedEditedData.data.scheduledAt.toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        hour12: false,
      }),
    );
    if (scheduledHours < 9 || scheduledHours > 21) {
      return {
        error: "Insira um horário válido.",
      };
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedEditedData.data,
      },
    });
    revalidatePath("/");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        error: "Horário indisponível.",
      };
    }
    console.log(error);
  }
}
