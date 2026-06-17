import { AppointmentForm } from "@/components/appointment-form";
import { Period } from "@/components/periods";
import DataFilter from "@/components/ui/date-filter";
import { parseISO, startOfDay } from "date-fns";
import Image from "next/image";

interface HomeProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { date } = await searchParams;
  const filteredDate = date ? parseISO(date) : startOfDay(new Date());

  return (
    <>
      <header className="bg-background-primary border-0">
        <div className="flex w-fit items-center gap-3 rounded-br-lg bg-[#2E2C30] px-5 py-3">
          <Image src={"/favicon.svg"} alt="Logo do mundo pet" width={20} height={20} />
          <span className="text-label-medium text-content-brand">MUNDO PET</span>
        </div>
      </header>

      <main className="bg-background-primary font-inter text-content-primar min-h-[calc(screen - 48px)] w-full">
        <div className="mx-auto my-8 mb-32 w-[95vw] sm:my-12 sm:w-[90vw] sm:max-w-200 lg:w-200">
          <h1 className="text-title text-content-primary font-tight">Sua agenda</h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
          <DataFilter selectedDate={filteredDate} />
          <section className="mt-8 flex flex-col gap-3">
            <Period filteredDate={filteredDate} periodOfDay="morning" />
            <Period filteredDate={filteredDate} periodOfDay="afternoon" />
            <Period filteredDate={filteredDate} periodOfDay="evening" />
          </section>
          <div
            className="bg-background-tertiary fixed right-0 bottom-0 flex h-fit w-screen justify-center py-6 sm:right-8
              sm:bottom-8 sm:w-fit sm:bg-transparent sm:p-0"
          >
            <AppointmentForm variant="create" />
          </div>
        </div>
      </main>
    </>
  );
}
