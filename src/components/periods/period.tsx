import { CloudSun, Moon, Sun } from "lucide-react";
import { AppointmentCard } from "@/components/appointment-card";
import { morningAppointments, afternoonAppointments, eveningAppointments } from "@/utils";
import { GetAppointments } from "@/server";

export interface periodOfDayProps {
  periodOfDay?: "morning" | "afternoon" | "evening";
  filteredDate: Date;
}

export async function Period({ periodOfDay, filteredDate }: periodOfDayProps) {
  const appointmentsArray = await GetAppointments(filteredDate);

  return (
    <div className="overflow-hidden rounded-[10px]">
      <div className="bg-background-tertiary flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          {periodOfDay === "morning" && <Sun color="var(--color-accent-blue)" size={24} />}
          {periodOfDay === "afternoon" && <CloudSun color="var(--color-accent-orange)" size={24} />}
          {periodOfDay === "evening" && <Moon color="var(--color-accent-yellow)" size={24} />}
          <span className="text-label-large text-content-primary">
            {periodOfDay === "morning" && "Manhã"}
            {periodOfDay === "afternoon" && "Tarde"}
            {periodOfDay === "evening" && "Noite"}
          </span>
        </div>
        <span className="text-label-large text-content-secondary">
          {periodOfDay === "morning" && "09h - 12h"}
          {periodOfDay === "afternoon" && "13h - 18h"}
          {periodOfDay === "evening" && "19h - 21h"}
        </span>
      </div>
      <ul className="bg-background-tertiary border-t border-[#2E2C30] p-5">
        {periodOfDay === "morning" && <AppointmentCard appointmentsArray={morningAppointments(appointmentsArray)} />}
        {periodOfDay === "afternoon" && (
          <AppointmentCard appointmentsArray={afternoonAppointments(appointmentsArray)} />
        )}
        {periodOfDay === "evening" && <AppointmentCard appointmentsArray={eveningAppointments(appointmentsArray)} />}
      </ul>
    </div>
  );
}
