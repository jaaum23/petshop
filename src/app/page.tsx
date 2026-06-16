import { AppointmentForm } from "@/components/appointment-form";
import { Period } from "@/components/periods";

export default function Home() {
  return (
    <main className="bg-background-primary font-inter text-content-primar min-h-screen w-full">
      <div className="mx-auto my-16 mb-32 w-[95vw] sm:my-16 sm:w-[90vw] sm:max-w-200 lg:w-200">
        <h1 className="text-title text-content-primary font-tight">Sua agenda</h1>
        <p className="text-paragraph-medium text-content-secondary">
          Aqui você pode ver todos os clientes e serviços agendados para hoje.
        </p>
        <section className="mt-8 flex flex-col gap-3">
          <Period periodOfDay="morning" />
          <Period periodOfDay="afternoon" />
          <Period periodOfDay="evening" />
        </section>
        <div
          className="bg-background-tertiary fixed right-0 bottom-0 flex h-fit w-screen justify-center py-6 sm:right-8
            sm:bottom-8 sm:w-fit sm:bg-transparent sm:p-0"
        >
          <AppointmentForm variant="create" />
        </div>
      </div>
    </main>
  );
}
