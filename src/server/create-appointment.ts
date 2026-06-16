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

export async function CreateAppointment(data: AppointmentType) {
  try {
    const parsedData = AppointmentSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        error: `Ocorreu um erro: ${parsedData.error.message}`,
      };
    }

    const scheduledHours = parsedData.data?.scheduledAt.getHours();
    if (scheduledHours && scheduledHours < 9 && scheduledHours > 21) {
      return {
        error: "Insira um horário válido.",
      };
    }

    await prisma.appointment.create({
      data: {
        ...parsedData.data,
      },
    });
    revalidatePath("/");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        error: "Horário já reservado.",
      };
    }
    console.log(error);
  }
}
