export const doctor = {
  name: "Dra. Jéssica Carpaneda",
  specialty: "Psiquiatra • Medicina Clínica Geral",
  crm: "CRM GO 31189",
  city: "Atendimento 100% online — todo o Brasil",
  bookingUrl: "https://www.doctoralia.com.br/z/FcjTe4",
  focus: ["Ansiedade", "TDAH no adulto", "Insônia", "Depressão", "Burnout / esgotamento emocional"],
};

export const services = [
  { name: "Primeira consulta — Psiquiatria", price: "R$ 320", duration: "50 min" },
  { name: "Retorno — Psiquiatria", price: "R$ 210", duration: "30 min" },
  { name: "Teleconsulta", price: "R$ 320", duration: "50 min" },
  { name: "Diagnóstico e tratamento de TDAH (adultos)", price: "R$ 320", duration: "50 min" },
  { name: "Tratamento de depressão", price: "R$ 320", duration: "50 min" },
];

export type Stage = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  checklist: string[];
};

export const stages: Stage[] = [
  {
    id: "contato",
    number: "01",
    title: "Primeiro contato",
    subtitle: "Acolher antes de informar. Toda mensagem começa com calor humano.",
    checklist: [
      "Responder em até 1 hora útil (08h–20h, seg–sáb)",
      "Cumprimentar pelo nome e agradecer o contato",
      "Confirmar queixa principal de forma empática",
      "Explicar que o atendimento é exclusivamente online",
      "Enviar valores, duração e link de agendamento",
    ],
  },
  {
    id: "agendamento",
    number: "02",
    title: "Agendamento e pagamento",
    subtitle: "Reserva confirmada apenas após pagamento online via Doctoralia.",
    checklist: [
      "Direcionar para o link da Doctoralia",
      "Reforçar política de cancelamento (até 24h antes = reembolso integral)",
      "Confirmar e-mail e WhatsApp do paciente",
      "Enviar mensagem de confirmação com data/hora",
      "Agendar lembrete automático 24h e 1h antes",
    ],
  },
  {
    id: "pre-consulta",
    number: "03",
    title: "Pré-consulta",
    subtitle: "Preparar paciente e ambiente para uma sessão fluida e segura.",
    checklist: [
      "Enviar link da videochamada 30 min antes",
      "Solicitar documento com foto para validação",
      "Orientar sobre ambiente reservado, fones e boa iluminação",
      "Pedir lista de medicamentos em uso e exames recentes",
      "Confirmar conexão estável (teste de áudio/vídeo)",
    ],
  },
  {
    id: "consulta",
    number: "04",
    title: "Durante a consulta",
    subtitle: "Escuta cuidadosa, ciência e clareza — sem pressa.",
    checklist: [
      "Validação de identidade na abertura",
      "Anamnese completa + escuta ativa",
      "Plano terapêutico explicado em linguagem clara",
      "Receitas e relatórios emitidos digitalmente",
      "Agendar retorno antes de encerrar",
    ],
  },
  {
    id: "pos-consulta",
    number: "05",
    title: "Pós-consulta",
    subtitle: "O cuidado continua depois que a videochamada termina.",
    checklist: [
      "Enviar receita e orientações em até 2h",
      "Disponibilizar canal para dúvidas pontuais (não emergenciais)",
      "Solicitar avaliação na Doctoralia em 48h",
      "Lembrete de retorno conforme plano terapêutico",
      "Registrar evolução no prontuário",
    ],
  },
];

export type Script = {
  id: string;
  title: string;
  channel: "WhatsApp" | "E-mail" | "Telefone";
  body: string;
};

export const scripts: Script[] = [
  {
    id: "boas-vindas",
    title: "Boas-vindas ao primeiro contato",
    channel: "WhatsApp",
    body: `Olá, {{nome}}! Aqui é da equipe da Dra. Jéssica Carpaneda 🌿

Que bom que você chegou até aqui. Antes de qualquer coisa, quero te dizer: pedir ajuda já é um passo importante.

A Dra. Jéssica é especialista em {{especialidade}} e atende exclusivamente por telemedicina, com foco em ansiedade, TDAH no adulto, insônia, depressão e burnout.

• Primeira consulta: R$ 320 (50 min)
• Retorno: R$ 210 (30 min)
• Agendamento e pagamento: https://www.doctoralia.com.br/z/FcjTe4

Posso te ajudar a escolher o melhor horário? (Resposta via {{canal}})`,
  },
  {
    id: "confirmacao",
    title: "Confirmação de agendamento",
    channel: "WhatsApp",
    body: `Tudo certo, {{nome}}! ✅

Sua consulta com a Dra. Jéssica Carpaneda está confirmada para {{data}} às {{hora}}.

📍 Modalidade: videochamada (telemedicina)
🔗 O link será enviado 30 min antes do horário, neste mesmo número.

Para uma boa consulta:
• Escolha um lugar reservado e silencioso
• Tenha fones de ouvido por perto
• Separe lista de medicamentos e exames recentes

Cancelamentos com mais de 24h de antecedência têm reembolso integral.

Qualquer dúvida, é só chamar. 💚`,
  },
  {
    id: "lembrete",
    title: "Lembrete 24h antes",
    channel: "WhatsApp",
    body: `Oi, {{nome}}! Passando para lembrar da sua consulta com a Dra. Jéssica amanhã, {{data}}, às {{hora}}.

Vou te enviar o link da videochamada 30 minutos antes. Até lá! 🌿`,
  },
  {
    id: "pos-consulta",
    title: "Mensagem pós-consulta",
    channel: "WhatsApp",
    body: `Oi, {{nome}}! Foi um prazer te receber hoje.

Em breve você receberá por aqui a sua receita e as orientações combinadas com a Dra. Jéssica.

Se puder compartilhar como foi sua experiência, ficamos muito gratos: ${`https://www.doctoralia.com.br/z/FcjTe4`}

Estamos por aqui sempre que precisar. 💚`,
  },
  {
    id: "remarcacao",
    title: "Remarcação solicitada pelo paciente",
    channel: "WhatsApp",
    body: `Sem problemas, {{nome}}. Imprevistos acontecem 🌿

Posso te oferecer estes horários alternativos:
• {{opcao_1}}
• {{opcao_2}}
• {{opcao_3}}

Qual fica melhor para você?`,
  },
  {
    id: "urgencia",
    title: "Situação de urgência / risco",
    channel: "WhatsApp",
    body: `{{nome}}, agradeço por compartilhar isso comigo. Sua segurança vem em primeiro lugar.

Se você está em risco ou pensando em se machucar agora, por favor procure atendimento imediato:

🚨 SAMU: 192
🚨 CVV (Centro de Valorização da Vida): 188 — 24h, ligação gratuita
🚨 Pronto-socorro mais próximo

Vou também sinalizar para a Dra. Jéssica priorizar seu atendimento assim que possível. Você não está sozinho(a).`,
  },
];

export const faqs = [
  {
    q: "A teleconsulta tem a mesma validade de uma consulta presencial?",
    a: "Sim. A telemedicina possui a mesma validade ética e legal, permitindo emissão de receitas e relatórios médicos quando necessário.",
  },
  {
    q: "Como funciona o cancelamento e reembolso?",
    a: "Cancelamentos feitos com mais de 24 horas de antecedência têm reembolso integral, diretamente pela Doctoralia.",
  },
  {
    q: "A Dra. Jéssica atende presencialmente?",
    a: "Não. No momento, todos os atendimentos são exclusivamente por telemedicina (videochamada), em todo o Brasil.",
  },
  {
    q: "É possível emitir receita controlada online?",
    a: "Sim, dentro dos critérios estabelecidos pelo CFM. Receitas digitais são enviadas com assinatura eletrônica válida.",
  },
  {
    q: "Atende crianças e adolescentes?",
    a: "O foco é atendimento de adultos. Casos pediátricos devem ser direcionados a especialistas em psiquiatria infantil.",
  },
];

export const principles = [
  { title: "Acolhimento", desc: "Toda interação começa pela escuta. Nunca pressuposição." },
  { title: "Clareza", desc: "Linguagem simples, sem jargões. O paciente precisa entender." },
  { title: "Sigilo", desc: "Dados sensíveis tratados com LGPD e ética médica como base." },
  { title: "Pontualidade", desc: "Respeito pelo tempo do paciente é cuidado também." },
];
