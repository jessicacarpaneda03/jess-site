import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { quickReplies } from "../../../data/quickReplies";

export default defineTool({
  name: "list_quick_replies",
  title: "Listar respostas rápidas",
  description:
    "Lista os templates de resposta rápida (WhatsApp/Doctoralia) da Dra. Jéssica, aplicando personalizações do usuário quando existirem. Filtra por aba (auto, triagem, risco, fillers, casuais, atalhos, objecoes, modulos) e/ou termo de busca.",
  inputSchema: {
    tab: z
      .enum(["auto", "fillers", "casuais", "atalhos", "objecoes", "triagem", "risco", "modulos"])
      .optional()
      .describe("Filtra por aba."),
    search: z.string().optional().describe("Termo de busca (aplicado a rótulo, tag e texto)."),
    limit: z.number().int().min(1).max(200).default(50).describe("Máximo de itens retornados."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ tab, search, limit }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: overrides, error } = await supa
      .from("quick_reply_overrides")
      .select("reply_id,label,text,tag,active,expires_at")
      .eq("user_id", ctx.getUserId());
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const map = new Map((overrides ?? []).map((o) => [o.reply_id, o]));
    const q = search?.toLowerCase().trim();
    const items = quickReplies
      .filter((r) => (tab ? r.tab === tab : true))
      .map((r) => {
        const o = map.get(r.id);
        return {
          id: r.id,
          tab: r.tab,
          label: o?.label ?? r.label,
          tag: o?.tag ?? r.tag ?? null,
          active: o?.active ?? r.active ?? false,
          expiresAt: o?.expires_at ?? r.expiresAt ?? null,
          text: o?.text ?? r.text,
          customized: Boolean(o),
        };
      })
      .filter((r) =>
        !q ? true : `${r.label} ${r.tag ?? ""} ${r.text}`.toLowerCase().includes(q),
      )
      .slice(0, limit);

    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});
