// Biblioteca de mensagens WhatsApp — sementes iniciais
// Valores atualizados: Primeira consulta 90 min R$ 400 · Retorno 60 min R$ 250
// Site: drajessicacarpaneda.com.br

export type LibraryMessage = {
  id: string;
  category: string;
  title: string;
  text: string;
};

export const SITE = "drajessicacarpaneda.com.br";

export const librarySeed: LibraryMessage[] = [
  {
    id: "seed-boas-vindas",
    category: "Boas-vindas",
    title: "Boas-vindas (automática)",
    text: `Olá! Que bom ter seu contato por aqui 🌿

Sou a *Dra. Jéssica Carpaneda* — Médica em Saúde Mental. Recebi sua mensagem e vou te responder pessoalmente assim que possível.

Enquanto isso, minha agenda online segue aberta — você pode agendar diretamente pelo meu site:
👉 ${SITE}

*Atendimento online:*
• Primeira consulta — 90 min · R$ 400
• Retorno — 60 min · R$ 250

Qualquer dúvida, me escreva aqui que respondo pessoalmente 💙`,
  },
  {
    id: "seed-ausencia",
    category: "Ausência",
    title: "Ausência curta (congresso/viagem)",
    text: `Oi! Aqui é a Dra. Jéssica 🌿

Estou fora do consultório por alguns dias, mas *leio todas as mensagens e respondo pessoalmente* assim que voltar.

Minha *agenda online segue aberta* — se preferir, você já pode reservar seu horário direto pelo site:
👉 ${SITE}

Te vejo em breve 💙`,
  },
  {
    id: "seed-valores",
    category: "Valores",
    title: "Consulta sobre valores",
    text: `Oi! Obrigada pelo contato 💙

Meus valores atuais para atendimento online:
• *Primeira consulta* — 90 min · R$ 400
• *Retorno* — 60 min · R$ 250
• *Renovação de receita* (excepcional, pacientes já em acompanhamento) — R$ 150

Você pode agendar diretamente pelo meu site:
👉 ${SITE}

Qualquer dúvida, me chame por aqui.`,
  },
  {
    id: "seed-convenio",
    category: "Objeções",
    title: "Não atendo convênio",
    text: `Oi! Obrigada pelo interesse 🌿

Atendo em modelo *particular*, sem convênio — isso me permite oferecer consultas mais longas (90 min a primeira, 60 min os retornos) e um acompanhamento realmente próximo.

Emito *recibo com CID* para você solicitar reembolso ao seu plano.

• Primeira consulta — R$ 400
• Retorno — R$ 250

Agendamento: ${SITE}`,
  },
  {
    id: "seed-online",
    category: "Logística",
    title: "Como funciona online",
    text: `A consulta é *100% online*, por vídeo (link seguro que envio 30 min antes).

Você só precisa de:
• Celular ou computador com câmera
• Ambiente reservado
• Uma boa conexão

Se já usa medicação, tenha as caixas por perto. Se tiver exames ou laudos, pode enviar antes por aqui.

Agendamento pelo site: ${SITE} 💙`,
  },
  {
    id: "seed-confirmacao",
    category: "Confirmação",
    title: "Confirmação de agendamento",
    text: `Oi {{nome}}! Sua consulta está confirmada ✅

📅 *Data:* {{data}}
🕒 *Horário:* {{hora}}
💻 *Formato:* Online (vídeo)

Vou te enviar o link da chamada *30 minutos antes* do horário.

Se precisar remarcar, me avise com antecedência por aqui.
Até lá 💙`,
  },
  {
    id: "seed-lembrete",
    category: "Lembrete",
    title: "Lembrete véspera",
    text: `Oi {{nome}}! Passando só pra lembrar da nossa consulta amanhã 🌿

🕒 {{hora}}
💻 Online (envio o link 30 min antes)

Separe um espaço tranquilo e, se usar medicação, deixe as caixas por perto.

Até amanhã 💙`,
  },

  {
    id: "seed-pos-consulta",
    category: "Pós-consulta",
    title: "Pós-consulta",
    text: `Foi muito bom te atender hoje 🌿

Qualquer dúvida sobre o que conversamos, prescrição ou efeitos da medicação, me escreva por aqui — respondo pessoalmente.

Quando quiser marcar o retorno, é direto pelo site: ${SITE}

Cuide-se com carinho 💙`,
  },
  {
    id: "seed-receita",
    category: "Receitas",
    title: "Renovação de receita",
    text: `Oi! Sobre renovação de receita:

Como *já te acompanho*, posso renovar em caráter *excepcional* quando não conseguir te encaixar em retorno a tempo.

• Valor: R$ 150 (avaliação online rápida)
• Só para pacientes já em acompanhamento
• Receitas controladas normalmente exigem consulta (CFM)

Me confirme por aqui qual medicação e dosagem e a data em que precisa 💙`,
  },
  {
    id: "seed-primeira-vez",
    category: "Primeira vez",
    title: "Nunca fez psiquiatra",
    text: `Fico feliz que tenha me procurado 💙

É totalmente normal sentir insegurança na primeira vez. Na *primeira consulta* a gente conversa com calma (são 90 minutos), eu te escuto, entendo sua história e só então decidimos juntos o melhor caminho — nem sempre envolve medicação.

Você pode agendar direto pelo site: ${SITE}

Qualquer dúvida antes, me escreva por aqui.`,
  },
];
