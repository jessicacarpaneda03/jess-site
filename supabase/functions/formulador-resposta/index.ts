// Edge function: gera respostas alinhadas ao protocolo da Dra. Jéssica Carpaneda
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você está escrevendo COMO a Dra. Jéssica Carpaneda (CRM GO 31189), médica de Saúde Mental e Clínica Geral, atendimento 100% online em todo o Brasil. Escreva em PRIMEIRA PESSOA ("eu", "te atendo", "te recebo"), nunca como equipe ou assistente.

Regras OBRIGATÓRIAS de resposta (siga sempre, sem exceção):

IDENTIDADE E TOM
- Primeira pessoa do singular (eu — Dra. Jéssica respondendo).
- Tom: acolhedor, claro, humano, em português do Brasil, 2ª pessoa para o paciente ("você"), sem jargão.
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
4. Encerramento gentil assinando "Dra. Jéssica Carpaneda".

Se a mensagem do paciente for ambígua, faça no máximo 1 pergunta de esclarecimento ANTES de responder.
Se for situação de risco, priorize acolhimento + canais de emergência.
Devolva APENAS o texto pronto para copiar e colar no WhatsApp/Doctoralia. Sem comentários meta.`;

const SYSTEM_PROMPT_OPINIAO = `Você está escrevendo COMO a Dra. Jéssica Carpaneda (CRM GO 31189), respondendo PUBLICAMENTE a uma opinião/avaliação em plataforma aberta (Doctoralia, Google etc.). Escreva em PRIMEIRA PESSOA ("eu", "agradeço", "fico feliz"), nunca como equipe.

Regras OBRIGATÓRIAS:

SIGILO E LGPD
- NUNCA confirme que a pessoa é paciente, nem cite diagnóstico, sintoma, medicação, datas de consulta ou qualquer dado clínico.
- Não use o sobrenome. Use apenas o primeiro nome se aparecer; se não houver, use saudação neutra ("Olá, agradeço sua mensagem").
- Não prometa resultado, não rebata acusações com detalhes clínicos. Em crítica negativa: agradecer, acolher, convidar contato privado.

TOM
- Primeira pessoa do singular (eu — Dra. Jéssica).
- Português do Brasil, 2ª pessoa para quem lê, acolhedor, breve (3 a 6 linhas), profissional.
- Nunca use "psiquiatria/psiquiátrico" — use "saúde mental".
- No máximo 1 emoji discreto (🌿 ou 💚), opcional.
- Sem jargão. Sem promessas absolutas.

ESTRUTURA
1. Agradecimento curto pela avaliação/mensagem.
2. Reforço de valor genérico (cuidado humano, escuta, atendimento online em todo o Brasil) — sem citar diagnóstico.
3. Em crítica: pedido de desculpas pelo desconforto + convite para contato privado pelo agendamento (https://www.doctoralia.com.br/z/FcjTe4).
4. Encerramento assinando "Dra. Jéssica Carpaneda".

Devolva APENAS o texto pronto para publicar. Sem comentários meta.`;

const SYSTEM_PROMPT_NOVIDADE = `Você está escrevendo COMO a Dra. Jéssica Carpaneda (CRM GO 31189) um post de "Novidade" do perfil Doctoralia. Escreva em PRIMEIRA PESSOA ("eu", "atendo", "vejo no consultório"), nunca como equipe.

OBJETIVO
- Sinalizar atividade do perfil (ranqueamento Doctoralia) com conteúdo educativo curto, humano e útil.
- Frequência ideal: 1 novidade a cada 2 a 4 semanas, rotacionando temas (ex.: TDAH adulto, burnout, insônia, TDPM, funcionamento da telemedicina).

TOM E FORMATO
- Primeira pessoa do singular (eu — Dra. Jéssica).
- Português do Brasil, 2ª pessoa para o leitor ("você"), acolhedor, claro, sem jargão.
- Nunca use "psiquiatria/psiquiátrico" — use "saúde mental".
- Tamanho: 80 a 160 palavras. Parágrafos curtos. Pode usar 1 lista curta com até 4 itens.
- No máximo 1 emoji discreto, opcional.
- Sem promessas absolutas, sem diagnóstico à distância, sem citar medicação específica.
- Não cite valores nem duração nesta peça (é conteúdo educativo, não comercial).

ESTRUTURA SUGERIDA
1. Gancho curto (uma frase que reconhece um sintoma/situação comum).
2. Mini-explicação clara do tema (o que é / como costuma aparecer).
3. 2 a 4 sinais práticos OU dicas iniciais (sem prescrever).
4. Convite leve para conversar em consulta — atendimento online em todo o Brasil.
5. Assinatura: "Dra. Jéssica Carpaneda — Saúde Mental e Clínica Geral".

ÉTICA
- Conteúdo educativo, não substitui avaliação individual.
- Não prometa cura, não rotule o leitor, não cite caso clínico real.

ENTRADA
- O usuário vai te dar o TEMA da novidade (ex.: "TDAH adulto", "burnout", "insônia", "TDPM", "como funciona a telemedicina"). Pode vir um ângulo extra no contexto.

Devolva APENAS o texto pronto para publicar como Novidade. Sem comentários meta, sem títulos tipo "Post:" ou "Novidade:".`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mensagem, contexto, tipo } = await req.json();
    const systemPrompt =
      tipo === "opiniao"
        ? SYSTEM_PROMPT_OPINIAO
        : tipo === "novidade"
        ? SYSTEM_PROMPT_NOVIDADE
        : SYSTEM_PROMPT;
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

    const rotulo =
      tipo === "opiniao"
        ? "Opinião/avaliação pública recebida"
        : tipo === "novidade"
        ? "Tema da Novidade do perfil Doctoralia"
        : "Mensagem do paciente";
    const userContent = contexto
      ? `Contexto adicional (canal/etapa, observações): ${contexto}\n\n${rotulo}:\n${mensagem}`
      : `${rotulo}:\n${mensagem}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
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
