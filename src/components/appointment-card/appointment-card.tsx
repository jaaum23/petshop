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

  return appointmentsArray.map((appointment) => (
    <li key={appointment.id} className="text-content-primary flex h-12 items-center justify-between px-3">
      <span className="text-label-medium">
        {appointment.scheduledAt.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      <span className="text-label-small w-full text-center">
        {appointment.petName}{" "}
        <span className="text-content-secondary text-paragraph-small">/ {appointment.tutorName}</span>
      </span>
      <span className="text-paragraph-small text-content-secondary w-full text-center">{appointment.description}</span>
      <button
        className="text-accent-red border-accent-red text-paragraph-small hover:bg-accent-red hover:text-content-primary
          rounded-[5px] border px-2 py-1 transition-colors duration-200 ease-in-out"
      >
        Remover
      </button>
    </li>
  ));
}
