import { auth, defineMcp } from "@lovable.dev/mcp-js";
import formulateReply from "./tools/formulate-reply";
import listServices from "./tools/list-services";
import getContactInfo from "./tools/get-contact-info";
import listQuickReplies from "./tools/list-quick-replies";
import updateQuickReply from "./tools/update-quick-reply";
import suggestQuickReply from "./tools/suggest-quick-reply";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "dra-jessica-mcp",
  title: "Dra. Jéssica — Protocolo de Atendimento",
  version: "0.2.0",
  instructions:
    "Ferramentas do consultório da Dra. Jéssica Carpaneda (psiquiatra). Respostas SEMPRE em primeira pessoa. Use `formulate_reply` para gerar respostas livres (WhatsApp, opinião pública ou Novidade Doctoralia); `list_quick_replies` para consultar os templates da biblioteca; `update_quick_reply` para salvar uma personalização (override por usuário); `suggest_quick_reply` para escolher o melhor template dado o contexto de uma mensagem recebida; `list_services` para valores/duração; `get_contact_info` para dados profissionais.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    formulateReply,
    listServices,
    getContactInfo,
    listQuickReplies,
    updateQuickReply,
    suggestQuickReply,
  ],
});
