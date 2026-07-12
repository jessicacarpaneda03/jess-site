import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SERVICES = [
  { nome: "Primeira consulta", duracao_min: 90, valor_brl: 400, obs: "Avaliação inicial ampla." },
  { nome: "Retorno", duracao_min: 60, valor_brl: 250, obs: "Seguimento de pacientes já em acompanhamento." },
  { nome: "Renovação de receita", duracao_min: 15, valor_brl: 150, obs: "Caso excepcional, apenas para pacientes já acompanhados quando não conseguir atender presencialmente. Receitas normalmente exigem consulta." },
];

export default defineTool({
  name: "list_services",
  title: "Listar serviços e valores",
  description: "Retorna os serviços atuais da Dra. Jéssica com duração, valor em BRL e observações.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});
