"use client";
import { DateField } from "@/components/appointment-form/date-field";
import { FormField } from "@/components/appointment-form/form-field";
import Button from "@/components/ui/button";
import { Clock, PawPrint, Phone, SquareChartGantt, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setHours, setMinutes, startOfToday } from "date-fns";
import Select from "@/components/ui/select";
import { CreateAppointment, UpdateAppointment } from "@/server";
import { toast } from "sonner";
import type { Appointment } from "@/generated/prisma/client";

const appointmentFormSchema = z
  .object({
    tutorName: z.string().min(1, "Campo obrigatório."),
    petName: z.string().min(1, "Campo obrigatório."),
    phone: z.string().regex(/^\d{11}$/, "O telefone deve ter 11 números."),
    description: z.string().min(1, "Campo obrigatório."),
    scheduledAt: z.date("Selecione uma data.").min(startOfToday(), "Selecione uma data válida."),
    time: z.string("Selecione um horário."),
  })
  .refine(
    (sentData) => {
      const [hour, minute] = sentData.time.split(":");
      const scheduledDateAndTime = setMinutes(setHours(sentData.scheduledAt, Number(hour)), Number(minute));
      return scheduledDateAndTime > new Date();
    },
    {
      path: ["time"],
      error: "O horário já passou.",
    },
  );

type AppointmentFormTypes = z.infer<typeof appointmentFormSchema>;

interface AppointmentFormProps {
  variant: "create" | "edit";
  appointment?: Appointment;
}

export function AppointmentForm({ variant, appointment }: AppointmentFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(!isOpen);
  }
  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AppointmentFormTypes>({
    resolver: zodResolver(appointmentFormSchema),
  });

  async function controlledSubmit(data: AppointmentFormTypes) {
    const [hour, minute] = data.time.split(":");
    const scheduledDateAndTime = setMinutes(setHours(data.scheduledAt, Number(hour)), Number(minute));

    const dataToBeScheduled: AppointmentFormTypes = {
      ...data,
      scheduledAt: scheduledDateAndTime,
    };

    const isEdit = !!appointment;

    const result = isEdit
      ? await UpdateAppointment(appointment.id, dataToBeScheduled)
      : await CreateAppointment(dataToBeScheduled);

    if (result?.error) {
      return toast.error(result.error);
    }

    toast.success(`Agendamento ${isEdit ? "editado" : "realizado"} com sucesso!`);
    reset();
    setIsOpen(false);
  }

  const resetForm = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

  useEffect(() => {
    if (!appointment) return;

    const hours = appointment.scheduledAt.getHours().toString().padStart(2, "0");
    const minutes = appointment.scheduledAt.getMinutes().toString().padStart(2, "0");

    reset({
      ...appointment,
      time: `${hours}:${minutes}`,
    });
  }, [reset, appointment]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (!dialogRef.current?.contains(e.target as Node)) {
        resetForm();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        resetForm();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, resetForm]);

  return (
    <>
      {variant === "edit" && <Button title="Editar" variant="default" onClick={() => openDialog()} />}
      {variant === "create" && <Button title="NOVO AGENDAMENTO" variant="brand" onClick={() => openDialog()} />}
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center bg-black/30
            backdrop-blur-md"
        >
          <div
            ref={dialogRef}
            className="bg-background-tertiary z-40 h-fit w-[90vw] rounded-xl px-5 py-10 shadow-2xl sm:w-125 sm:p-10"
          >
            <h2 className="text-title text-content-primary">
              {appointment ? "Editar atendimento" : "Agende um atendimento"}
            </h2>
            <p className="text-paragraph-medium text-content-secondary mt-1">
              {appointment
                ? "Preencha para modificar os dados do agendamento:"
                : "Preencha os dados do cliente para realizar o agendamento:"}
            </p>
            <form
              onSubmit={(e) => void handleSubmit(controlledSubmit)(e)}
              className="mt-7 flex flex-col items-end gap-6"
            >
              <FormField
                {...register("tutorName")}
                title="Nome do tutor"
                placeholder="Raquel Alves"
                icon={User}
                errorMessage={errors.tutorName?.message}
              />
              <FormField
                {...register("petName")}
                title="Nome do pet"
                placeholder="Jade"
                icon={PawPrint}
                errorMessage={errors.petName?.message}
              />
              <FormField
                {...register("phone")}
                inputMode="numeric"
                title="Telefone"
                maxLength={11}
                placeholder="21912345678"
                icon={Phone}
                errorMessage={errors.phone?.message}
              />
              <FormField
                {...register("description")}
                title="Serviço"
                placeholder="Banho e tosa"
                icon={SquareChartGantt}
                errorMessage={errors.description?.message}
              />
              <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:gap-4">
                <Controller
                  control={control}
                  name="scheduledAt"
                  render={({ field }) => (
                    <DateField
                      title="Data"
                      value={field.value}
                      onChange={field.onChange}
                      errorMessage={errors.scheduledAt?.message}
                    />
                  )}
                />
                <div className="relative h-fit w-full">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-label-medium text-content-primary">Horário</span>
                    <span className="text-paragraph-small text-accent-red ml-2">{errors.time?.message}</span>
                  </div>
                  <Controller
                    control={control}
                    name="time"
                    render={({ field }) => (
                      <Select value={field.value} onChange={field.onChange}>
                        <Select.Trigger
                          className="text-content-brand mt-1 flex h-12 w-full cursor-pointer items-center
                            justify-between rounded-lg border px-4"
                          placeholder={
                            new Date().getHours().toString().padStart(2, "0") +
                            ":" +
                            new Date().getMinutes().toString().padStart(2, "0")
                          }
                          icon={Clock}
                          value={field.value}
                        />

                        <Select.Content
                          className="bg-background-tertiary border-border-primary scrollbar-thumb-content-secondary
                            absolute bottom-13 h-100 w-full scrollbar-track-transparent overflow-y-scroll rounded-lg
                            border p-2 pr-3"
                        >
                          {scheduleHoursArray.map((item) => (
                            <Select.Item
                              key={item}
                              className="hover:bg-content-brand text-content-primary h-fit w-full cursor-default
                                rounded-sm px-2 py-1"
                              value={item}
                              label={item}
                            >
                              {item}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="mt-2 flex w-full gap-4">
                <Button title="CANCELAR" variant="cancelForm" type="button" onClick={() => resetForm()} />
                <Button title={appointment ? "EDITAR" : "AGENDAR"} variant="submitForm" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function generateScheduleHours() {
  const options = [];

  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 21 && minute === 30) break;
      const option = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      options.push(option);
    }
  }
  return options;
}
const scheduleHoursArray = generateScheduleHours();
