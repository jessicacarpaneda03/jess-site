import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { quickReplies } from "../../../data/quickReplies";

export default defineTool({
  name: "update_quick_reply",
  title: "Atualizar resposta rápida",
  description:
    "Salva uma personalização (override) para um template de resposta rápida existente da Dra. Jéssica. Não altera o template base — grava uma versão do usuário que a Biblioteca e o list_quick_replies passam a exibir. Só o próprio usuário vê e edita seus overrides.",
  inputSchema: {
    reply_id: z.string().min(1).describe("ID do template original (ex.: 'auto-boas-vindas')."),
    text: z.string().min(1).describe("Novo texto do template."),
    label: z.string().optional().describe("Rótulo alternativo."),
    tag: z.string().optional().describe("Sub-categoria."),
    active: z.boolean().optional().describe("Marcar como ativa (auto-resposta)."),
    expires_at: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Data de expiração YYYY-MM-DD."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  handler: async ({ reply_id, text, label, tag, active, expires_at }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    if (!quickReplies.some((r) => r.id === reply_id)) {
      return {
        content: [{ type: "text", text: `Template desconhecido: ${reply_id}` }],
        isError: true,
      };
    }
    // Validação de valores oficiais — bloqueia salvar preços divergentes do cadastro.
    const OFFICIAL_PRICES = new Set([400, 250, 150]);
    const priceMatches = [
      ...text.matchAll(/R\$\s*(\d{2,4})(?:[.,]\d{2})?/gi),
      ...text.matchAll(/(\d{2,4})\s*reais\b/gi),
    ];
    const invalid = priceMatches
      .map((m) => parseInt(m[1], 10))
      .filter((n) => !OFFICIAL_PRICES.has(n));
    if (invalid.length > 0) {
      return {
        content: [
          {
            type: "text",
            text: `Valor(es) não oficial(is) detectado(s): R$ ${[...new Set(invalid)].join(", R$ ")}. Valores permitidos: R$ 400 (primeira, 90 min), R$ 250 (retorno, 60 min), R$ 150 (renovação excepcional). Ajuste o texto antes de salvar.`,
          },
        ],
        isError: true,
      };
    }
    const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supa
      .from("quick_reply_overrides")
      .upsert(
        {
          user_id: ctx.getUserId(),
          reply_id,
          text,
          label: label ?? null,
          tag: tag ?? null,
          active: active ?? null,
          expires_at: expires_at ?? null,
        },
        { onConflict: "user_id,reply_id" },
      )
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Override salvo para ${reply_id}.` }],
      structuredContent: { override: data },
    };
  },
});
