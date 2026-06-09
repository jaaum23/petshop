import { Period } from "@/components/periods";

export default function Home() {
  return (
    <main className="bg-background-primary font-inter text-content-primar min-h-screen w-full">
      <div className="mx-auto mt-16 w-200">
        <h1 className="text-title text-content-primary font-tight">Sua agenda</h1>
        <p className="text-paragraph-medium text-content-secondary">
          Aqui você pode ver todos os clientes e serviços agendados para hoje.
        </p>
        <section className="mt-8 flex flex-col gap-3">
          <Period periodOfDay="morning" />
          <Period periodOfDay="afternoon" />
          <Period periodOfDay="evening" />
        </section>
      </div>
    </main>
  );
}
