import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const INFO = {
  nome: "Dra. Jéssica Carpaneda",
  especialidade: "Psiquiatria (adultos)",
  crm: "CRM GO 31189",
  site: "https://drajessicacarpaneda.com.br",
  publico: "Adultos",
  emergencia: { cvv: "188", samu: "192" },
};

export default defineTool({
  name: "get_contact_info",
  title: "Informações profissionais",
  description: "Retorna dados públicos da Dra. Jéssica (nome, CRM, site, público atendido, canais de emergência).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(INFO, null, 2) }],
    structuredContent: INFO,
  }),
});
