export type PublicReply = {
  id: string;
  category: "Convênio" | "Valores" | "Receita" | "TDAH" | "Telemedicina" | "Agendamento" | "Primeira consulta";
  question: string;
  answer: string;
};

export const publicReplies: PublicReply[] = [
  {
    id: "convenio",
    category: "Convênio",
    question: "A doutora atende por convênio / plano de saúde?",
    answer: `Olá, {{nome}}! Agradecemos seu contato. 🌿

A Dra. Jéssica Carpaneda atende exclusivamente como particular, sem vínculo com convênios no momento. Após a consulta, é emitido recibo com CRM e CID, que pode ser usado para reembolso junto ao seu plano (a maioria dos planos oferece reembolso parcial — vale consultar diretamente com o seu).

• Primeira consulta: R$ 320 (50 min)
• Retorno: R$ 210 (30 min)
• 100% online, em todo o Brasil

Se quiser agendar: https://www.doctoralia.com.br/z/FcjTe4

Estamos à disposição. 💚`,
  },
  {
    id: "valor",
    category: "Valores",
    question: "Qual o valor da consulta?",
    answer: `Olá, {{nome}}! Obrigada pelo interesse. 🌿

Os valores praticados pela Dra. Jéssica Carpaneda em {{especialidade}} são:

• Primeira consulta — R$ 320 (50 min)
• Retorno — R$ 210 (30 min)
• Diagnóstico e acompanhamento de TDAH em adultos — R$ 320

Atendimento exclusivamente por telemedicina (videochamada), com a mesma validade legal de uma consulta presencial. Receitas e relatórios são enviados digitalmente.

Cancelamentos com mais de 24h de antecedência têm reembolso integral pela Doctoralia.

Para agendar: https://www.doctoralia.com.br/z/FcjTe4`,
  },
  {
    id: "receita",
    category: "Receita",
    question: "A doutora prescreve receita controlada na primeira consulta?",
    answer: `Olá, {{nome}}! Excelente pergunta. 🌿

A prescrição de medicação — controlada ou não — depende sempre de uma avaliação clínica cuidadosa. A Dra. Jéssica conduz uma anamnese detalhada na primeira consulta e, quando indicado, a receita é emitida ainda na sessão, com assinatura digital válida em todo o Brasil (incluindo receituários tipo B, conforme regulamentação do CFM).

O foco é construir um plano terapêutico seguro e individualizado — não se trata apenas de medicar, mas de cuidar.

Se quiser conversar com a doutora: https://www.doctoralia.com.br/z/FcjTe4`,
  },
  {
    id: "tdah",
    category: "TDAH",
    question: "Faço diagnóstico de TDAH em adulto?",
    answer: `Olá, {{nome}}! Sim — esse é um dos focos principais da Dra. Jéssica Carpaneda. 🌿

A avaliação de TDAH no adulto é feita ao longo de uma ou mais consultas, com escuta cuidadosa do histórico de vida, escolar, profissional e familiar, além de instrumentos clínicos validados.

Após o diagnóstico, é construído um plano terapêutico individualizado, que pode envolver medicação, orientações de organização e encaminhamento para psicoterapia quando necessário.

• Primeira consulta: R$ 320 (50 min)
• 100% online

Para agendar: https://www.doctoralia.com.br/z/FcjTe4`,
  },
  {
    id: "telemedicina",
    category: "Telemedicina",
    question: "A consulta online vale o mesmo que presencial?",
    answer: `Olá, {{nome}}! Sim, totalmente. 🌿

A teleconsulta possui a mesma validade ética e legal da consulta presencial, regulamentada pela Resolução CFM 2.314/2022. A Dra. Jéssica pode emitir receitas (inclusive controladas), atestados e relatórios médicos digitalmente, com assinatura eletrônica reconhecida em todo o Brasil.

A videochamada é feita por link seguro enviado antes da consulta, garantindo sigilo e conforto — sem necessidade de deslocamento.

Para agendar: https://www.doctoralia.com.br/z/FcjTe4`,
  },
  {
    id: "agendamento",
    category: "Agendamento",
    question: "Como faço para agendar?",
    answer: `Olá, {{nome}}! O agendamento é simples e 100% online. 🌿

Inclusive já temos disponibilidade próxima de {{data}}. O passo a passo:

1. Acesse: https://www.doctoralia.com.br/z/FcjTe4
2. Escolha o tipo de consulta ({{especialidade}} — primeira consulta ou retorno)
3. Selecione o melhor dia e horário
4. Faça o pagamento pela própria plataforma (com reembolso integral em cancelamentos > 24h)

O link da videochamada chega no seu e-mail e WhatsApp 30 minutos antes do horário marcado.

Qualquer dúvida, é só responder por aqui. Estamos à disposição. 💚`,
  },
  {
    id: "primeira-consulta",
    category: "Primeira consulta",
    question: "Como funciona a primeira consulta?",
    answer: `Olá, {{nome}}! Que bom que está pensando em buscar ajuda — esse já é um passo importante. 🌿

A primeira consulta com a Dra. Jéssica em {{especialidade}} dura 50 minutos e é feita por videochamada. Nela, a doutora dedica tempo para te ouvir com calma, entender seu histórico, suas queixas atuais e construir, junto com você, um plano de cuidado.

Para aproveitar melhor:
• Esteja em um ambiente reservado e silencioso
• Tenha em mãos lista de medicamentos em uso e exames recentes (se houver)
• Não precisa preparar nada além disso — o resto é conversa

Valor: R$ 320 • Para agendar: https://www.doctoralia.com.br/z/FcjTe4`,
  },
  {
    id: "atestado",
    category: "Receita",
    question: "A doutora emite atestado médico?",
    answer: `Olá, {{nome}}! Sim. 🌿

Quando clinicamente indicado, a Dra. Jéssica emite atestados, relatórios e laudos médicos com assinatura digital válida em todo o Brasil. Esses documentos são enviados por e-mail ou WhatsApp logo após a consulta.

A indicação é sempre clínica — sem avaliação prévia não é possível emitir documentos.

Para agendar uma consulta: https://www.doctoralia.com.br/z/FcjTe4`,
  },
  {
    id: "ansiedade",
    category: "Primeira consulta",
    question: "Trato ansiedade / crises / pânico?",
    answer: `Olá, {{nome}}! Sim — esse é um dos principais focos do consultório. 🌿

A Dra. Jéssica Carpaneda atende casos de ansiedade, crises de pânico, ansiedade generalizada e quadros associados (insônia, esgotamento, irritabilidade). O tratamento é construído de forma individualizada e pode envolver medicação, orientações práticas e encaminhamento para psicoterapia.

Atendimento por telemedicina, em todo o Brasil.

Para agendar: https://www.doctoralia.com.br/z/FcjTe4`,
  },
];
