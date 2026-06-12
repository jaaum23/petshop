"use client";
import { DateField } from "@/components/appointment-form/date-field";
import { FormField } from "@/components/appointment-form/form-field";
import Button from "@/components/ui/button";
import { PawPrint, Phone, SquareChartGantt, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfToday } from "date-fns";
import Select from "@/components/ui/select";

const appointmentFormSchema = z.object({
  tutorName: z.string().min(1, "Campo obrigatório."),
  petName: z.string().min(1, "Campo obrigatório."),
  phone: z.string().regex(/^\d{11}$/, "O telefone deve ter 11 dígitos."),
  description: z.string().min(1, "Campo obrigatório."),
  scheduledAt: z.date("Selecione uma data.").min(startOfToday(), "Selecione uma data válida."),
  time: z.string(),
});

type AppointmentFormTypes = z.infer<typeof appointmentFormSchema>;

export function AppointmentForm() {
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

  function controlledSubmit(data: AppointmentFormTypes) {
    console.log(data);
  }

  const resetForm = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

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
      <Button title="NOVO AGENDAMENTO" variant="brand" onClick={() => openDialog()} />
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center bg-black/30
            backdrop-blur-md"
        >
          <div
            ref={dialogRef}
            className="bg-background-tertiary z-40 h-fit w-[90vw] rounded-xl px-5 py-10 shadow-2xl sm:w-125 sm:p-10"
          >
            <h2 className="text-title text-content-primary">Agende um atendimento</h2>
            <p className="text-paragraph-medium text-content-secondary mt-1">
              Preencha os dados do cliente para realizar o agendamento:
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
              <div className="flex w-full items-center gap-4">
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
                <Controller
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <Select value={field.value} onChange={field.onChange}>
                      <Select.Trigger placeholder="Seleione..." />

                      <Select.Content>
                        <Select.Item value="item1" label="Item 1">
                          Item 1
                        </Select.Item>
                        <Select.Item value="item2" label="Item 2">
                          Item 2
                        </Select.Item>
                        <Select.Item value="item3" label="Item 3">
                          Item 3
                        </Select.Item>
                      </Select.Content>
                    </Select>
                  )}
                />
              </div>
              <div className="mt-2 flex w-full gap-4">
                <Button title="CANCELAR" variant="cancelForm" type="button" onClick={() => resetForm()} />
                <Button title="AGENDAR" variant="submitForm" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
