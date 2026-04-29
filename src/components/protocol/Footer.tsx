import { doctor } from "@/data/protocol";

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <div>
        © {new Date().getFullYear()} {doctor.name} — {doctor.crm}
      </div>
      <div>Documento de uso interno • Telemedicina (CFM Res. 2.314/2022)</div>
    </div>
  </footer>
);
