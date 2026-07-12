import { auth, defineMcp } from "@lovable.dev/mcp-js";
import formulateReply from "./tools/formulate-reply";
import listServices from "./tools/list-services";
import getContactInfo from "./tools/get-contact-info";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "dra-jessica-mcp",
  title: "Dra. Jéssica — Protocolo de Atendimento",
  version: "0.1.0",
  instructions:
    "Ferramentas do consultório da Dra. Jéssica Carpaneda (psiquiatra). Use `formulate_reply` para gerar respostas em primeira pessoa (WhatsApp, opinião pública ou Novidade Doctoralia), `list_services` para valores/duração e `get_contact_info` para dados profissionais.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [formulateReply, listServices, getContactInfo],
});
