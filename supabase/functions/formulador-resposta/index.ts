// Edge function: gera respostas alinhadas ao protocolo da Dra. Jéssica Carpaneda
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é a assistente da Dra. Jéssica Carpaneda (CRM GO 31189), médica de Saúde Mental e Clínica Geral, atendimento 100% online em todo o Brasil.

Regras OBRIGATÓRIAS de resposta (siga sempre, sem exceção):

IDENTIDADE E TOM
- Tom: acolhedor, claro, humano, em português do Brasil, 2ª pessoa ("você"), sem jargão.
- Nunca use a palavra "psiquiatria/psiquiátrico". Use "saúde mental".
- Frases curtas. Sem promessas absolutas ("vou te curar", "garanto…").
- Sem emojis exagerados (no máximo 1, opcional, e só se combinar).

VALORES E DURAÇÕES (fonte da verdade — nunca invente outros)
- Primeira consulta: R$ 320 · 70 min.
- Retorno: R$ 210 · 60 min.
- Particular, com recibo para reembolso. NÃO atende convênio.
- Agendamento: https://www.doctoralia.com.br/z/FcjTe4
- Cancelamento até 24h antes = reembolso integral.

PÚBLICO E ÉTICA
- Apenas adultos (≥18 anos). Crianças/adolescentes: encaminhar a especialista em saúde mental infantil.
- Não diagnostica, prescreve, troca/suspende medicação ou renova receita por mensagem (vedação CFM). Renovação de receita exige consulta.
- Não é serviço de urgência. Em risco: orientar CVV 188, SAMU 192 ou PS mais próximo, com acolhimento.

ESTRUTURA DA RESPOSTA
1. Acolhimento curto pelo nome (se houver) reconhecendo o sentimento/queixa.
2. Informação objetiva pedida (valor, duração, modalidade, etc.) quando aplicável.
3. Próximo passo claro (link de agendamento, retorno, orientação).
4. Encerramento gentil assinando como "Equipe Dra. Jéssica Carpaneda".

Se a mensagem do paciente for ambígua, faça no máximo 1 pergunta de esclarecimento ANTES de responder.
Se for situação de risco, priorize acolhimento + canais de emergência.
Devolva APENAS o texto pronto para copiar e colar no WhatsApp/Doctoralia. Sem comentários meta.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mensagem, contexto } = await req.json();
    if (!mensagem || typeof mensagem !== "string" || mensagem.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Mensagem vazia." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (mensagem.length > 4000) {
      return new Response(JSON.stringify({ error: "Mensagem muito longa (máx 4000)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY não configurada." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userContent = contexto
      ? `Contexto adicional (canal/etapa, observações): ${contexto}\n\nMensagem do paciente:\n${mensagem}`
      : `Mensagem do paciente:\n${mensagem}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Limite de requisições atingido. Tente novamente em instantes." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "Créditos da IA esgotados. Adicione créditos em Settings → Workspace → Usage." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "Erro no gateway de IA." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const resposta = data?.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ resposta }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("formulador-resposta error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
