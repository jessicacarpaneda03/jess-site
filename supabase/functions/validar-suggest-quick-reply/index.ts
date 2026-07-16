import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM = `Você ajuda a Dra. Jéssica Carpaneda (médica em saúde mental, CRM GO 31189, pós-graduanda em Psiquiatria e Saúde Mental — Afya) a escolher o melhor template de resposta rápida para responder uma mensagem recebida no WhatsApp (conversa privada, normalmente JÁ em andamento). Fale sempre em primeira pessoa ("eu"), como se fosse a própria Dra. Jéssica escrevendo. Nunca se refira a si mesma em 3ª pessoa ("a Dra. Jéssica…"). Não use o rótulo "psiquiatra" para se apresentar — use "médica em saúde mental".

VOZ (obrigatório): responda PRIMEIRO à pergunta objetiva; só reconheça o sentimento/situação quando fizer sentido (nada de acolhimento mecânico). Comunique regras, valores e limites com firmeza e clareza, sem soar bronca e sem se justificar demais. Nunca diga "vou verificar" quando a regra já é definida. Português do Brasil natural — pode usar "realmente", "tá?" quando combinar. Evite linguagem institucional, floreios e estruturas fixas. Máximo 1 emoji discreto e só quando natural. Em conversa privada já em andamento, NÃO repita assinatura, cargo, CRM ou apresentação; assinatura completa só em primeiro contato, mensagem formal ou encerramento.

REGRAS DE NEGÓCIO fixas: Primeira consulta R$ 400 / 90 min · Retorno R$ 250 / 60 min · Renovação de receita R$ 150 (excepcional, só para pacientes já acompanhados quando não consigo atender). Consulta em intervalo curto (poucos dias após a anterior) é NOVA consulta com NOVA cobrança, sem isenção nem desconto. Particular, com recibo para reembolso; sem convênio. Site: drajessicacarpaneda.com.br. Em risco: CVV 188 / SAMU 192 / PS.

Responda ESTRITAMENTE em JSON válido (sem markdown, sem cercas) no formato:
{"best_id":"<id>","reasoning":"<curto>","suggested_text":"<texto final pronto para colar, em 1ª pessoa, seguindo a VOZ e as REGRAS acima>"}`;

// Biblioteca compacta representativa — cobre os cenários testados.
const LIBRARY = [
  { id: "a-valor", label: "Valor da consulta", text: "Primeira consulta R$ 400 (90 min) e retorno R$ 250 (60 min). Tudo online. Agendamento: drajessicacarpaneda.com.br" },
  { id: "a-primeira", label: "Como funciona a primeira", text: "Primeira consulta é 90 min, R$ 400, online. Anamnese completa e plano de cuidado. drajessicacarpaneda.com.br" },
  { id: "a-retorno", label: "Retorno", text: "Retorno: R$ 250 (60 min, online). Para acompanhamento, ajustes e renovação de conduta." },
  { id: "a-renovar", label: "Renovar receita", text: "Renovações e ajustes de conduta normalmente exigem consulta de retorno (R$ 250). Em caráter excepcional, para pacientes já acompanhados quando não consigo atender, faço renovação de receita por R$ 150." },
  { id: "a-intervalo-curto", label: "Nova consulta em intervalo curto", text: "Sim. Entendo que é bem perto da consulta anterior, mas, como seria um novo atendimento, é uma nova consulta e a cobrança é feita normalmente, tá?" },
  { id: "a-desconto", label: "Pedido de desconto", text: "Meus valores são fixos: primeira consulta R$ 400 e retorno R$ 250. Não trabalho com desconto — dá pra parcelar direto na Doctoralia se ajudar." },
  { id: "a-reagendar", label: "Reagendar / cancelar", text: "Sem problema, você reagenda direto no site (drajessicacarpaneda.com.br). Cancelamento até 24h antes tem reembolso integral." },
  { id: "o-convenio", label: "Objeção convênio", text: "Atendo apenas particular, sem convênio. Emito recibo pra reembolso quando o plano cobre." },
  { id: "o-sulamerica", label: "SulAmérica", text: "Não sou credenciada à SulAmérica. Atendo particular e emito recibo pra reembolso." },
  { id: "r-risco", label: "Risco iminente", text: "Se estiver em risco agora, procure o pronto-socorro mais próximo, SAMU 192 ou CVV 188 (24h). Estou aqui e te ajudo a organizar o cuidado assim que estiver segura." },
  { id: "t-adulto", label: "Triagem adulto", text: "Atendo adultos, online. Se você tem 18+ e busca acompanhamento em saúde mental, agende: drajessicacarpaneda.com.br" },
  { id: "a-agenda", label: "Agenda", text: "Minha agenda fica no link: drajessicacarpaneda.com.br. Você escolhe o melhor horário e recebe tudo por e-mail." },
  { id: "a-especialidade", label: "Você é psiquiatra?", text: "Sou médica em saúde mental (CRM GO 31189), pós-graduanda em Psiquiatria e Saúde Mental pela Afya." },
];

type Case = {
  name: string;
  message: string;
  mustInclude?: (string | RegExp)[];
  mustIncludeAny?: (string | RegExp)[][]; // cada grupo: pelo menos um match
  mustNotInclude?: (string | RegExp)[];
};

const CASES: Case[] = [
  {
    name: "Pergunta valor",
    message: "Oi, quanto é a consulta?",
    mustInclude: ["R$ 400", /R\$ ?250/],
    mustNotInclude: ["R$ 320", "R$ 210", "R$ 230", "R$ 205"],
  },
  {
    name: "Primeira consulta",
    message: "Nunca fiz psiquiatra. Como é a primeira consulta?",
    mustInclude: ["R$ 400", /90 ?min/i],
  },
  {
    name: "Retorno",
    message: "Já fui sua paciente. Preciso marcar retorno.",
    mustInclude: [/R\$ ?250/, /60 ?min/i],
    mustNotInclude: [/R\$ ?400/, /vou verificar|vou conferir/i],
  },
  {
    name: "Renovação de receita",
    message: "Doutora, só preciso renovar minha receita, pode ser sem consulta?",
    mustInclude: [/R\$ ?150/, /excepcion/i],
  },
  {
    name: "Intervalo curto / nova cobrança",
    message: "Doutora, tive consulta com você semana passada e agora tô muito mal, quero marcar de novo essa semana. Vai vir cobrado de novo?",
    mustInclude: [/nova consulta/i, /nova cobran|cobrada normalmente|cobrança .* normal/i],
    mustIncludeAny: [[/perto|próxim|pouco tempo|recente|intervalo curto|semana passada|anterior/i]],
    mustNotInclude: [
      /vou verificar/i,
      /vou conferir/i,
      /vou checar/i,
      /isen(t|ç)/i,
      /desconto/i,
      /gratuit|sem custo|por conta da casa|cortesia/i,
      /\bdra\.? jéssica carpaneda\b/i, // assinatura desnecessária em conversa privada
    ],
  },
  {
    name: "Pedido de desconto",
    message: "Consegue fazer um desconto? Tá bem apertado esse mês.",
    mustIncludeAny: [
      [/R\$ ?400/, /R\$ ?250/, /valores? (são )?fixos|não (trabalho|faço) (com )?desconto|não dou desconto/i],
    ],
    mustNotInclude: [
      /posso fazer .* desconto/i,
      /te dou (um )?desconto/i,
      /desconto de \d+/i,
      /valor promocional|preço promocional/i,
    ],
  },
  {
    name: "Reagendamento",
    message: "Doutora, preciso remarcar minha consulta de amanhã. Consigo?",
    mustIncludeAny: [[/reagend|remarcar|remarco|remarcamos/i]],
    mustNotInclude: [/taxa de remarca|multa|perde o valor/i],
  },
  {
    name: "Convênio",
    message: "Vocês atendem por Unimed?",
    mustInclude: [/particular/i, /recibo/i],
    mustNotInclude: [/aceito unimed/i, /credenciad/i],
  },
  {
    name: "SulAmérica",
    message: "Atende SulAmérica?",
    mustInclude: [/particular/i],
    mustNotInclude: [/aceito sulam/i, /sou credenciad/i],
  },
  {
    name: "Risco",
    message: "Não estou aguentando mais, pensei em me machucar hoje.",
    mustInclude: [/CVV|188|SAMU|192|pronto[- ]?socorro/i],
  },
  {
    name: "Especialidade",
    message: "Você é psiquiatra mesmo?",
    mustInclude: [/saúde mental/i],
    mustNotInclude: [/^sou psiquiatra/i],
  },
];

// Marcadores de 1ª pessoa aceitáveis
const FIRST_PERSON = /\b(eu|meu|minha|minhas|meus|atendo|faço|posso|estou|tenho|sou)\b/i;
const THIRD_PERSON_SELF = /\ba dra\.? jéssica\b/i;

async function runOne(apiKey: string, c: Case) {
  const userPrompt = `MENSAGEM RECEBIDA:\n${c.message}\n\nBIBLIOTECA (JSON):\n${JSON.stringify(LIBRARY)}\n\nEscolha o melhor id e produza o suggested_text final.`;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
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
    const body = await res.text();
    return { name: c.name, pass: false, failures: [`Gateway ${res.status}: ${body.slice(0, 200)}`], text: "" };
  }
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? "{}";
  let parsed: any = {};
  try { parsed = JSON.parse(raw); } catch { /* noop */ }
  const text: string = parsed?.suggested_text ?? "";
  const failures: string[] = [];

  if (!text.trim()) failures.push("suggested_text vazio");

  // 1ª pessoa
  if (!FIRST_PERSON.test(text)) failures.push("sem marcadores de 1ª pessoa");
  if (THIRD_PERSON_SELF.test(text)) failures.push('usa 3ª pessoa "a Dra. Jéssica"');

  // Especialidade nunca deve ser apresentada como "sou psiquiatra"
  if (/\bsou psiquiatra\b/i.test(text)) failures.push('apresentou-se como "sou psiquiatra"');

  // Valores nunca podem aparecer errados
  const wrongPrices = [/R\$ ?320\b/, /R\$ ?210\b/, /R\$ ?230\b/, /R\$ ?205\b/, /R\$ ?200\b/];
  for (const rx of wrongPrices) if (rx.test(text)) failures.push(`preço incorreto: ${rx}`);

  // Includes
  for (const needle of c.mustInclude ?? []) {
    const ok = typeof needle === "string" ? text.includes(needle) : needle.test(text);
    if (!ok) failures.push(`faltou: ${needle}`);
  }
  for (const group of c.mustIncludeAny ?? []) {
    const anyOk = group.some((needle) =>
      typeof needle === "string" ? text.includes(needle) : needle.test(text),
    );
    if (!anyOk) failures.push(`faltou pelo menos um de: ${group.map(String).join(" | ")}`);
  }
  for (const needle of c.mustNotInclude ?? []) {
    const bad = typeof needle === "string" ? text.includes(needle) : needle.test(text);
    if (bad) failures.push(`não deveria conter: ${needle}`);
  }

  return { name: c.name, message: c.message, best_id: parsed?.best_id ?? null, pass: failures.length === 0, failures, text };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY ausente" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  try {
    const results = [];
    for (const c of CASES) {
      results.push(await runOne(key, c));
      await new Promise((r) => setTimeout(r, 400));
    }
    const passed = results.filter((r) => r.pass).length;
    return new Response(
      JSON.stringify({ total: results.length, passed, failed: results.length - passed, results }, null, 2),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
