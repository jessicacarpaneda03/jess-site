import { Helmet } from "react-helmet-async";
import { MessageCircle } from "lucide-react";
import { MessageLibrary } from "@/components/protocol/MessageLibrary";

export default function WhatsappApp() {
  return (
    <div className="min-h-screen bg-background pb-8">
      <Helmet>
        <title>Respostas WhatsApp — Dra. Jéssica</title>
        <meta
          name="description"
          content="App de respostas prontas para WhatsApp: personalize, formate e copie mensagens em segundos."
        />
        <meta name="theme-color" content="#128C7E" />
      </Helmet>

      <header className="sticky top-0 z-30 bg-[#128C7E] text-white shadow-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold leading-tight">
              Respostas WhatsApp
            </h1>
            <p className="truncate text-xs text-white/80">
              Dra. Jéssica Carpaneda · toque para copiar
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-3 pt-4 sm:px-4">
        <MessageLibrary />
      </main>
    </div>
  );
}
