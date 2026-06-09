import type { Appointment } from "@/generated/prisma/client";

interface AppointmentCardsProps {
  appointmentsArray: Appointment[];
}

export function AppointmentCard({ appointmentsArray }: AppointmentCardsProps) {
  if (appointmentsArray.length === 0) {
    return (
      <div className="text-paragraph-small text-content-secondary flex h-12 items-center justify-center">
        Não há agendamentos nesse período
      </div>
    );
  }

  return appointmentsArray.map((appointment, index) => (
    <li
      key={appointment.id}
      className={`text-content-primary flex h-fit flex-col items-center justify-between gap-0.5 px-1 py-4 sm:h-12
        sm:flex-row sm:gap-4 sm:py-0 ${index === appointmentsArray.length - 1 ? "" : "border-b border-[#2E2C30]"}`}
    >
      <span className="text-label-medium flex w-full items-center gap-3 sm:w-fit">
        {appointment.scheduledAt.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        <span className="text-label-small w-fit text-center sm:hidden sm:w-full">
          {appointment.petName}{" "}
          <span className="text-content-secondary text-paragraph-small">/ {appointment.tutorName}</span>
        </span>
      </span>
      <span className="text-label-small hidden w-full text-center sm:inline">
        {appointment.petName}{" "}
        <span className="text-content-secondary text-paragraph-small">/ {appointment.tutorName}</span>
      </span>
      <span className="text-paragraph-small text-content-secondary w-full text-left sm:text-center">
        {appointment.description}
      </span>
      <div className="flex w-full gap-3 sm:w-fit">
        <button
          className="text-content-primary border-content-secondary/20 text-paragraph-small hover:bg-content-secondary
            active:bg-content-secondary active:text-content-primary mt-3 h-10 w-full cursor-pointer rounded-[5px] border
            px-2 py-1 transition-colors duration-200 ease-in-out sm:mt-0 sm:h-fit sm:w-fit"
        >
          Editar
        </button>
        <button
          className="text-accent-red border-accent-red/20 text-paragraph-small hover:bg-accent-red
            hover:text-content-primary active:bg-accent-red active:text-content-primary mt-3 h-10 w-full cursor-pointer
            rounded-[5px] border px-2 py-1 transition-colors duration-200 ease-in-out sm:mt-0 sm:h-fit sm:w-fit"
        >
          Remover
        </button>
      </div>
    </li>
  ));
}
