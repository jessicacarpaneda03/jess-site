import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SYSTEM_PROMPT = `Você é a Dra. Jéssica Carpaneda (CRM GO 31189), psiquiatra. Responda SEMPRE em primeira pessoa ("eu"), tom acolhedor, profissional e humano. Sem jargões. Não faça diagnósticos por mensagem. Valores atuais: Primeira consulta R$ 400 (90 min); Retorno R$ 205 (60 min); Renovação de receita R$ 150 (caso excepcional, apenas para pacientes já acompanhados quando não conseguir atender). Site: drajessicacarpaneda.com.br. Público adulto. Em risco iminente, oriente CVV 188 / SAMU 192 / emergência mais próxima.`;

const SYSTEM_PROMPT_OPINIAO = `Você é a Dra. Jéssica Carpaneda. Responda a uma avaliação pública no Doctoralia em primeira pessoa, agradecendo, mantendo sigilo médico (nunca confirmar vínculo, nunca citar dados clínicos), tom breve e humano.`;

const SYSTEM_PROMPT_NOVIDADE = `Você é a Dra. Jéssica Carpaneda. Escreva uma "Novidade" para o Doctoralia em primeira pessoa, até 750 caracteres, sem jargões, sem traços longos, linguagem direta e acolhedora que capte o paciente.`;

export default defineTool({
  name: "formulate_reply",
  title: "Formular resposta",
  description: "Gera uma resposta em primeira pessoa (Dra. Jéssica) para WhatsApp, opinião pública do Doctoralia, ou Novidade do perfil.",
  inputSchema: {
    message: z.string().min(1).describe("Mensagem/contexto recebido ou tema da Novidade."),
    mode: z.enum(["whatsapp", "opiniao", "novidade"]).default("whatsapp").describe("Tipo de resposta a gerar."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ message, mode }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { content: [{ type: "text", text: "LOVABLE_API_KEY ausente." }], isError: true };
    const system = mode === "opiniao" ? SYSTEM_PROMPT_OPINIAO : mode === "novidade" ? SYSTEM_PROMPT_NOVIDADE : SYSTEM_PROMPT;
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: system }, { role: "user", content: message }],
      }),
    });
    if (!res.ok) return { content: [{ type: "text", text: `Erro do gateway: ${res.status}` }], isError: true };
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    return { content: [{ type: "text", text }] };
  },
});
