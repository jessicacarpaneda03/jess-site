import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { quickReplies } from "../../../data/quickReplies";

const SYSTEM = `Você ajuda a Dra. Jéssica Carpaneda (médica em saúde mental, CRM GO 31189, pós-graduanda em Psiquiatria e Saúde Mental — Afya) a escolher o melhor template de resposta rápida para responder uma mensagem recebida. Fale sempre em primeira pessoa ("eu"), como se fosse a própria Dra. Jéssica escrevendo. Nunca se refira a si mesma em 3ª pessoa ("a Dra. Jéssica…"). Não use o rótulo "psiquiatra" para se apresentar — use "médica em saúde mental". Responda ESTRITAMENTE em JSON válido (sem markdown, sem cercas) no formato:
{"best_id":"<id>","reasoning":"<curto>","suggested_text":"<texto final pronto para colar, em 1ª pessoa, tom acolhedor, sem jargões, com valores atuais: Primeira consulta R$ 400 / 90 min, Retorno R$ 250 / 60 min, Renovação de receita R$ 150 (excepcional). Site: drajessicacarpaneda.com.br>"}`;

export default defineTool({
  name: "suggest_quick_reply",
  title: "Sugerir resposta rápida",
  description:
    "Dado o contexto/mensagem recebida, escolhe o melhor template da biblioteca da Dra. Jéssica e retorna uma versão adaptada em primeira pessoa, pronta para enviar no WhatsApp.",
  inputSchema: {
    context: z.string().min(1).describe("Mensagem do paciente ou contexto da conversa."),
    tab: z
      .enum(["auto", "fillers", "casuais", "atalhos", "objecoes", "triagem", "risco", "modulos"])
      .optional()
      .describe("Restringir a busca a uma aba."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ context, tab }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { content: [{ type: "text", text: "LOVABLE_API_KEY ausente." }], isError: true };

    // Aplicar overrides do usuário à biblioteca antes de mandar ao modelo.
    const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: overrides } = await supa
      .from("quick_reply_overrides")
      .select("reply_id,label,text,tag")
      .eq("user_id", ctx.getUserId());
    const map = new Map((overrides ?? []).map((o) => [o.reply_id, o]));

    const library = quickReplies
      .filter((r) => (tab ? r.tab === tab : true))
      .map((r) => {
        const o = map.get(r.id);
        return {
          id: r.id,
          tab: r.tab,
          label: o?.label ?? r.label,
          tag: o?.tag ?? r.tag ?? null,
          text: (o?.text ?? r.text).slice(0, 900),
        };
      });

    const userPrompt = `MENSAGEM RECEBIDA:\n${context}\n\nBIBLIOTECA (JSON):\n${JSON.stringify(library)}\n\nEscolha o melhor id e produza o suggested_text final.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Erro do gateway: ${res.status}` }], isError: true };
    }
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: { best_id?: string; reasoning?: string; suggested_text?: string } = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { content: [{ type: "text", text: raw }] };
    }
    const chosen = library.find((r) => r.id === parsed.best_id) ?? null;
    return {
      content: [
        {
          type: "text",
          text:
            (parsed.suggested_text ?? "") +
            (chosen ? `\n\n— baseado em: ${chosen.label} (${chosen.id})` : ""),
        },
      ],
      structuredContent: {
        best_id: parsed.best_id ?? null,
        reasoning: parsed.reasoning ?? null,
        suggested_text: parsed.suggested_text ?? "",
        matched_template: chosen,
      },
    };
  },
});
