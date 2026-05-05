// Edge function: gera respostas alinhadas ao protocolo da Dra. Jéssica Carpaneda
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é a própria Dra. Jéssica Carpaneda (CRM GO 31189), médica de Saúde Mental e Clínica Geral, atendimento 100% online em todo o Brasil. Você responde PESSOALMENTE — não há equipe, não há secretária. Trabalha sozinha.

VOZ HUMANA (ler com atenção)
- Escreva como uma pessoa escreveria no celular entre consultas. Não como assistente, não como IA.
- Frases curtas. Pode começar com "Oi", "Olha", "Poxa", "Obrigada", "Que bom".
- 1ª pessoa do SINGULAR ("eu", "atendo", "posso te receber"). NUNCA "nós", "agradecemos", "estamos", "nossa equipe".
- NUNCA assine como "Equipe". Pode terminar sem assinatura, ou só "Jé" / "Dra. Jéssica".
- Sem jargão. Sem promessas absolutas ("vou te curar", "garanto").
- No máximo 1 emoji discreto, opcional, só se combinar.
- Nunca use "psiquiatria/psiquiátrico". Use "saúde mental".
- Varie a abertura entre mensagens. Não repita fórmula.

PROIBIDO (vocabulário de IA / clichê)
- "extremamente", "imensamente", "profundamente grata/feliz/tocada"
- "cuidado humano", "escuta ativa", "acolhimento integral", "olhar humanizado"
- "estou à disposição", "conte sempre comigo", "será sempre um prazer", "é uma honra"
- "que palavras generosas", "que mensagem linda", "fiquei muito tocada"
- "trajetória", "jornada", "caminhada de cuidado"
- ponto-e-vírgula, mais de 1 emoji, mais de 3 adjetivos seguidos

VALORES E DURAÇÕES (fonte da verdade — nunca invente)
- Primeira consulta: R$ 320 · 70 min.
- Retorno: R$ 210 · 60 min.
- Particular, com recibo para reembolso. NÃO atendo convênio.
- Agendamento: https://www.doctoralia.com.br/z/FcjTe4
- Cancelamento até 24h antes = reembolso integral.

PÚBLICO E ÉTICA
- Apenas adultos (≥18 anos). Crianças/adolescentes: encaminhar a especialista em saúde mental infantil.
- Não diagnostico, prescrevo, troco/suspendo medicação ou renovo receita por mensagem (vedação CFM). Renovação de receita exige consulta.
- Não é serviço de urgência. Em risco: orientar CVV 188, SAMU 192 ou PS mais próximo, com acolhimento.

ESTRUTURA (não é roteiro)
1. Acolhimento curto pelo nome (se houver).
2. Informação objetiva pedida (valor, duração, modalidade) quando aplicável.
3. Próximo passo claro (link de agendamento, retorno, orientação).

Se a mensagem for ambígua, faça no máximo 1 pergunta antes de responder.
Se for risco, priorize acolhimento + canais de emergência.
Devolva APENAS o texto pronto para copiar e colar no WhatsApp/Doctoralia. Sem comentários meta, sem aspas envolvendo a resposta.`;

const SYSTEM_PROMPT_OPINIAO = `Você é a própria Dra. Jéssica Carpaneda (CRM GO 31189) respondendo PUBLICAMENTE a uma avaliação de paciente em plataforma aberta (Doctoralia, Google etc.). Você responde PESSOALMENTE — não há equipe, não há secretária.

OBJETIVO
- Soar como você escreveria no celular: humana, breve, real. Não como assistente, não como IA.
- CADA resposta deve ser ESPECÍFICA à avaliação. Proibido texto padrão.
- Espelhe 1 ideia que a pessoa trouxe, mas com palavras suas (não copie o adjetivo dela literal).

VOZ
- 1ª pessoa do SINGULAR. NUNCA "nós", "agradecemos", "nossa equipe", "estamos à disposição".
- Pode começar com "Oi", "Poxa", "Olha", "Que bom", "Obrigada", "Nossa". Varie sempre.
- 2 a 4 linhas. Raramente passa disso.
- Pode terminar sem assinatura, ou só "Jé" / "Dra. Jéssica".

PROIBIDO (vocabulário de IA / clichê — não use NUNCA)
- "extremamente", "imensamente", "profundamente grata/feliz/tocada"
- "cuidado humano", "escuta ativa", "acolhimento integral", "olhar humanizado"
- "estou à disposição", "conte sempre comigo", "será sempre um prazer", "é uma honra"
- "que palavras generosas", "que mensagem linda", "fiquei muito tocada", "fico imensamente"
- "trajetória", "jornada", "caminhada de cuidado"
- ponto-e-vírgula, mais de 1 emoji, mais de 3 adjetivos em sequência
- frases com mais de 30 palavras

SIGILO E LGPD
- NUNCA confirme que a pessoa é paciente. Não cite diagnóstico, sintoma, medicação, datas.
- Use só primeiro nome (sem sobrenome). Se não houver nome, comece sem nome.
- Em crítica: não rebata, não justifique clinicamente. Reconheça desconforto + convite para contato privado pelo agendamento (https://www.doctoralia.com.br/z/FcjTe4).

EXEMPLOS

Avaliação: "Não tenho palavras. EXTREMAMENTE humana e atenciosa. A mulher é diferenciada. Apenas confiem!"
✅ Boa: "Yasmim, obrigada. Ler isso me fez bem de verdade. Poder te ouvir com calma é o que eu mais gosto no que faço — fico feliz que você tenha sentido isso também."
❌ Ruim: "Yasmim, fico imensamente grata pelo seu carinho! Que palavras generosas. É sempre uma honra cuidar de você com a humanidade e escuta ativa que merece. Estou sempre à disposição! 🌿💚"

Avaliação: "Atendimento ótimo, me ajudou muito."
✅ Boa: "Que bom saber, Marina. Obrigada por escrever."
❌ Ruim: "Marina, fico extremamente feliz em saber que pude contribuir na sua jornada de cuidado. Estarei sempre à disposição! 💚"

Avaliação: "Esperei muito tempo, achei o atendimento corrido."
✅ Boa: "Carlos, sinto muito por isso. Quero entender melhor o que aconteceu — me chama por aqui pra gente conversar: https://www.doctoralia.com.br/z/FcjTe4"

Devolva APENAS o texto pronto para publicar. Sem aspas envolvendo, sem prefixo, sem comentários meta.`;

// ---------- Validação anti-clichê ----------
type Issue = string;

const BANNED: Array<{ re: RegExp; label: string }> = [
  // vocabulário inflado
  { re: /\bextremamente\b/i, label: 'usou "extremamente"' },
  { re: /\bimensamente\b/i, label: 'usou "imensamente"' },
  { re: /\bprofundamente\s+(grat[ao]|feliz|tocad[ao])\b/i, label: 'usou "profundamente grata/feliz/tocada"' },
  { re: /\bde\s+cora[çc][ãa]o\s+agradecid[ao]\b/i, label: 'usou "de coração agradecida"' },
  // clichês
  { re: /\bcuidado\s+humano\b/i, label: 'usou "cuidado humano"' },
  { re: /\bescuta\s+ativa\b/i, label: 'usou "escuta ativa"' },
  { re: /\bacolhimento\s+integral\b/i, label: 'usou "acolhimento integral"' },
  { re: /\bolhar\s+humanizado\b/i, label: 'usou "olhar humanizado"' },
  { re: /\bcaminhada\s+de\s+cuidado\b/i, label: 'usou "caminhada de cuidado"' },
  { re: /\btrajet[óo]ria\b/i, label: 'usou "trajetória"' },
  { re: /\bjornada\b/i, label: 'usou "jornada"' },
  // fórmulas vazias
  { re: /\bestou\s+(sempre\s+)?[àa]\s+disposi[çc][ãa]o\b/i, label: 'usou "estou à disposição"' },
  { re: /\bestamos\s+[àa]\s+disposi[çc][ãa]o\b/i, label: 'usou "estamos à disposição"' },
  { re: /\bconte\s+sempre\s+comigo\b/i, label: 'usou "conte sempre comigo"' },
  { re: /\bser[áa]\s+(sempre\s+)?um\s+prazer\b/i, label: 'usou "será um prazer"' },
  { re: /\b[ée]\s+uma\s+honra\b/i, label: 'usou "é uma honra"' },
  { re: /\bque\s+palavras\s+generosas\b/i, label: 'usou "que palavras generosas"' },
  { re: /\bque\s+mensagem\s+linda\b/i, label: 'usou "que mensagem linda"' },
  { re: /\bfiquei\s+(muito\s+)?tocad[ao]\b/i, label: 'usou "fiquei (muito) tocada"' },
  { re: /\bfico\s+imensamente\b/i, label: 'usou "fico imensamente"' },
  // voz de equipe
  { re: /\bequipe\b/i, label: 'usou "equipe" (você responde sozinha)' },
  { re: /\bagradecemos\b/i, label: 'usou "agradecemos" (use 1ª pessoa do singular)' },
  { re: /\bnossa\s+equipe\b/i, label: 'usou "nossa equipe"' },
  // promessas
  { re: /\bvou\s+te\s+curar\b/i, label: 'promessa absoluta "vou te curar"' },
  { re: /\bgaranto\s+(que|o)\b/i, label: 'promessa absoluta "garanto"' },
  // proibições do protocolo
  { re: /\bpsiqui[áa]tric[oa]\b/i, label: 'usou "psiquiátrico" (use "saúde mental")' },
  { re: /\bpsiquiatria\b/i, label: 'usou "psiquiatria" (use "saúde mental")' },
];

function countEmojis(s: string): number {
  // Match a wide range of emoji code points
  const re = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}]/gu;
  const m = s.match(re);
  return m ? m.length : 0;
}

function validateReply(text: string, tipo: "opiniao" | "mensagem"): Issue[] {
  const issues: Issue[] = [];
  for (const { re, label } of BANNED) {
    if (re.test(text)) issues.push(label);
  }
  // estruturais
  if (/;/.test(text)) issues.push("usou ponto-e-vírgula (soa formal demais)");
  if (countEmojis(text) > 1) issues.push("mais de 1 emoji");
  // 3+ adjetivos seguidos separados por vírgula (heurística simples)
  if (/\b\w+,\s+\w+,\s+\w+\b/.test(text) && /(humana|atenciosa|cuidadosa|gentil|sens[íi]vel|presente|dedicada|atenta)/i.test(text)) {
    issues.push("3+ adjetivos em sequência");
  }
  // tamanho de frase
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.some((s) => s.split(/\s+/).length > 30)) {
    issues.push("frase com mais de 30 palavras");
  }
  // tamanho total para opinião
  if (tipo === "opiniao") {
    const lines = text.split(/\n/).filter((l) => l.trim().length > 0);
    if (lines.length > 6) issues.push("opinião com mais de 6 linhas (encurte)");
  }
  return issues;
}

type Tom = "positivo_forte" | "positivo" | "neutro" | "negativo";

const TONE_GUIDES: Record<Tom, string> = {
  positivo_forte: `TOM DA RESPOSTA: a avaliação é calorosa e enfática.
Responda com calor real e brevidade — 2 a 4 linhas. Pode mostrar emoção genuína ("me fez bem", "isso aqui me marcou", "fiquei feliz de ler"). Sem exagero, sem clichê. Espelhe 1 ideia específica que a pessoa trouxe, com palavras suas. Pode usar 1 emoji discreto se combinar.`,
  positivo: `TOM DA RESPOSTA: a avaliação é positiva e contida.
Responda curto e direto — 1 a 3 linhas. Agradecimento simples + uma frase pessoal ligando ao que a pessoa disse. Sem emoji, sem floreio.`,
  neutro: `TOM DA RESPOSTA: a avaliação é breve/factual.
Responda muito curto — 1 a 2 linhas. Só agradeça com naturalidade. Não invente emoção que a pessoa não demonstrou. Sem emoji.`,
  negativo: `TOM DA RESPOSTA: a avaliação tem crítica ou desconforto.
Reconheça o que a pessoa sentiu, sem rebater nem justificar clinicamente. Peça desculpas pelo desconforto e abra canal privado pelo agendamento (https://www.doctoralia.com.br/z/FcjTe4). 3 a 5 linhas. Sem emoji.`,
};

function detectTone(text: string): Tom {
  const t = text.toLowerCase();
  const negWords = ["ruim", "péssim", "pessim", "decepc", "demor", "corrid", "caro demais", "frio", "não recomendo", "nao recomendo", "não voltaria", "nao voltaria", "esperei muito", "não gostei", "nao gostei", "horrível", "horrivel", "grosse", "mal atendid"];
  if (negWords.some((w) => t.includes(w))) return "negativo";

  const strongWords = ["extremamente", "incrível", "incrivel", "diferenciada", "diferenciado", "salvou", "transformou", "melhor médic", "melhor medic", "apenas confiem", "maravilhos", "excepcional", "sensacional", "mudou minha"];
  const posWords = ["ótim", "otim", "bom ", "boa ", "gostei", "recomendo", "atencios", "ajudou", "gentil", "humana", "humano", "acolhedor", "atenta", "compreens"];

  const strongHits = strongWords.filter((w) => t.includes(w)).length;
  const posHits = posWords.filter((w) => t.includes(w)).length;
  const exclam = (text.match(/!/g) || []).length;
  const hasCaps = /\b[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{4,}\b/.test(text);

  if (strongHits >= 1 && (posHits + strongHits >= 2 || exclam >= 2 || hasCaps)) return "positivo_forte";
  if (strongHits >= 1 || posHits >= 2) return "positivo_forte";
  if (posHits >= 1) return "positivo";
  return "neutro";
}

function tempForTone(tipo: "opiniao" | "mensagem", tom: Tom): number {
  if (tipo !== "opiniao") return 0.7;
  switch (tom) {
    case "negativo": return 0.6;
    case "neutro": return 0.8;
    case "positivo": return 0.95;
    case "positivo_forte": return 1.0;
  }
}

async function callModel(LOVABLE_API_KEY: string, messages: Array<{ role: string; content: string }>, tipo: "opiniao" | "mensagem", tom: Tom) {
  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages,
      temperature: tempForTone(tipo, tom),
      presence_penalty: 0.6,
      frequency_penalty: 0.4,
    }),
  });
  return resp;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mensagem, contexto, tipo } = await req.json();
    const tipoFinal: "opiniao" | "mensagem" = tipo === "opiniao" ? "opiniao" : "mensagem";
    const systemPrompt = tipoFinal === "opiniao" ? SYSTEM_PROMPT_OPINIAO : SYSTEM_PROMPT;

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

    const tom: Tom = tipoFinal === "opiniao" ? detectTone(mensagem) : "neutro";
    const guiaTom = tipoFinal === "opiniao" ? `\n\n${TONE_GUIDES[tom]}` : "";

    const rotulo = tipoFinal === "opiniao" ? "Avaliação pública recebida" : "Mensagem do paciente";
    const userContent = contexto
      ? `Contexto adicional: ${contexto}\n\n${rotulo}:\n${mensagem}${guiaTom}`
      : `${rotulo}:\n${mensagem}${guiaTom}`;

    const messages: Array<{ role: string; content: string }> = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ];

    const maxAttempts = 3;
    let bestReply = "";
    let bestIssues: Issue[] = [];
    let attempts = 0;

    for (let i = 0; i < maxAttempts; i++) {
      attempts++;
      const resp = await callModel(LOVABLE_API_KEY, messages, tipoFinal, tom);

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
      const reply: string = (data?.choices?.[0]?.message?.content ?? "").trim();
      const issues = validateReply(reply, tipoFinal);

      if (issues.length === 0) {
        return new Response(JSON.stringify({ resposta: reply, attempts, issues_remaining: [], tom }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // guarda a melhor tentativa (menos issues)
      if (bestReply === "" || issues.length < bestIssues.length) {
        bestReply = reply;
        bestIssues = issues;
      }

      // feedback para o modelo reescrever
      messages.push({ role: "assistant", content: reply });
      messages.push({
        role: "user",
        content:
          `Sua resposta soou robótica/genérica. Problemas detectados: ${issues.join("; ")}.\n` +
          `Reescreva COMPLETAMENTE — mais curta, mais humana, sem nenhuma dessas expressões. ` +
          `Soe como uma pessoa escrevendo no celular, não como assistente. ` +
          `Devolva APENAS o novo texto, sem aspas e sem comentários.`,
      });
    }

    console.warn("validateReply: respostas continuam com clichês após", attempts, "tentativas. Issues:", bestIssues);
    return new Response(JSON.stringify({ resposta: bestReply, attempts, issues_remaining: bestIssues, tom }), {
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
