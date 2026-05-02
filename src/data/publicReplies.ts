export type PublicReplyCategory =
  | "Convênio"
  | "Valores"
  | "Pagamento"
  | "Receita"
  | "Medicação"
  | "TDAH"
  | "Ansiedade"
  | "Depressão"
  | "Sono"
  | "Bipolar"
  | "TOC"
  | "Burnout"
  | "Dependência"
  | "Luto"
  | "Telemedicina"
  | "Agendamento"
  | "Reagendamento"
  | "Primeira consulta"
  | "Retorno"
  | "Documentos"
  | "Públicos especiais"
  | "Sigilo"
  | "Encaminhamento"
  | "Urgência";

export type PublicReply = {
  id: string;
  category: PublicReplyCategory;
  question: string;
  answer: string;
};

const LINK = "https://www.doctoralia.com.br/z/FcjTe4";

export const publicReplies: PublicReply[] = [
  // ---------- CONVÊNIO / VALORES / PAGAMENTO ----------
  {
    id: "convenio",
    category: "Convênio",
    question: "A doutora atende por convênio / plano de saúde?",
    answer: `Olá, {{nome}}! Agradecemos seu contato. 🌿

A Dra. Jéssica Carpaneda atende exclusivamente como particular, sem vínculo com convênios no momento. Após a consulta, é emitido recibo com CRM e CID, que pode ser usado para reembolso junto ao seu plano (a maioria oferece reembolso parcial — vale consultar diretamente com o seu).

• Primeira consulta: R$ 320 (70 min)
• Retorno: R$ 210 (60 min)
• 100% online, em todo o Brasil

Se quiser agendar: ${LINK}

Estamos à disposição. 💚`,
  },
  {
    id: "reembolso",
    category: "Convênio",
    question: "Como funciona o reembolso pelo plano?",
    answer: `Olá, {{nome}}! 🌿

Após a consulta, enviamos recibo digital contendo CRM, CPF da médica, CID e descrição do atendimento — exatamente o que a maioria dos planos exige para reembolso. O percentual reembolsado depende do seu contrato (em geral varia de 30% a 100%).

Sugestão: antes da consulta, ligue no SAC do seu plano e pergunte o valor do reembolso para consulta em saúde mental (CBHPM 50000462 ou consulta em consultório).

Para agendar: ${LINK}`,
  },
  {
    id: "valor",
    category: "Valores",
    question: "Qual o valor da consulta?",
    answer: `Olá, {{nome}}! Obrigada pelo interesse. 🌿

Os valores praticados pela Dra. Jéssica Carpaneda em {{especialidade}} são:

• Primeira consulta — R$ 320 (70 min)
• Retorno — R$ 210 (60 min)
• Diagnóstico e acompanhamento de TDAH em adultos — R$ 320

Atendimento exclusivamente por telemedicina (videochamada), com mesma validade legal de uma consulta presencial. Receitas e relatórios são enviados digitalmente.

Cancelamentos com mais de 24h têm reembolso integral pela Doctoralia.

Para agendar: ${LINK}`,
  },
  {
    id: "pagamento-formas",
    category: "Pagamento",
    question: "Quais formas de pagamento são aceitas?",
    answer: `Olá, {{nome}}! 🌿

O pagamento é feito direto pela Doctoralia, no momento do agendamento, com:

• PIX
• Cartão de crédito (com opção de parcelamento dependendo da operadora)
• Cartão de débito

A plataforma é segura e a confirmação é automática. Em caso de cancelamento com mais de 24h de antecedência, o reembolso é integral.

Para agendar: ${LINK}`,
  },
  {
    id: "parcelamento",
    category: "Pagamento",
    question: "Posso parcelar a consulta?",
    answer: `Olá, {{nome}}! 🌿

Sim — no checkout da Doctoralia, ao escolher cartão de crédito, é possível parcelar conforme as opções da sua operadora. O valor cheio é repassado normalmente; o parcelamento depende do seu banco/cartão.

Se ainda assim o investimento estiver apertado neste momento, sinta-se à vontade para nos contar — em alguns casos conseguimos sugerir um plano de acompanhamento mais espaçado.

Para agendar: ${LINK}`,
  },

  // ---------- RECEITA / MEDICAÇÃO / DOCUMENTOS ----------
  {
    id: "receita",
    category: "Receita",
    question: "A doutora prescreve receita controlada na primeira consulta?",
    answer: `Olá, {{nome}}! Excelente pergunta. 🌿

A prescrição de medicação — controlada ou não — depende sempre de avaliação clínica cuidadosa. A Dra. Jéssica conduz uma anamnese detalhada na primeira consulta e, quando indicado, a receita é emitida ainda na sessão, com assinatura digital válida em todo o Brasil (incluindo receituários tipo B, conforme regulamentação do CFM).

O foco é construir um plano terapêutico seguro e individualizado — não se trata apenas de medicar, mas de cuidar.

Se quiser conversar com a doutora: ${LINK}`,
  },
  {
    id: "renovacao-receita",
    category: "Receita",
    question: "Só preciso renovar a receita, posso?",
    answer: `Olá, {{nome}}! 🌿

A renovação de receita exige consulta médica — é uma exigência ética e legal do CFM, não apenas do consultório. Pacientes em acompanhamento com a Dra. Jéssica podem agendar um retorno (R$ 210, 60 min) onde a medicação é reavaliada e a receita reemitida na hora.

Para pacientes novos, é necessária a primeira consulta (R$ 320), que permite à doutora conhecer seu histórico antes de assumir a prescrição com segurança.

Para agendar: ${LINK}`,
  },
  {
    id: "atestado",
    category: "Documentos",
    question: "A doutora emite atestado médico?",
    answer: `Olá, {{nome}}! Sim. 🌿

Quando clinicamente indicado, a Dra. Jéssica emite atestados, relatórios e laudos médicos com assinatura digital válida em todo o Brasil. Esses documentos são enviados por e-mail ou WhatsApp logo após a consulta.

A indicação é sempre clínica — sem avaliação prévia não é possível emitir documentos.

Para agendar: ${LINK}`,
  },
  {
    id: "laudo-inss",
    category: "Documentos",
    question: "Faz laudo para INSS / perícia / afastamento prolongado?",
    answer: `Olá, {{nome}}! 🌿

Sim, quando clinicamente justificado, a Dra. Jéssica emite laudos detalhados para INSS, perícia médica, RH e processos de afastamento, com CID, descrição do quadro e recomendações.

Esses laudos costumam exigir acompanhamento mínimo (geralmente mais de uma consulta) para descrever evolução clínica de forma fiel — o que aumenta sua aceitação na perícia.

Para iniciar: ${LINK}`,
  },
  {
    id: "recibo-ir",
    category: "Documentos",
    question: "O recibo serve para declaração de Imposto de Renda?",
    answer: `Olá, {{nome}}! 🌿

Sim. O recibo emitido após cada consulta contém todos os dados exigidos pela Receita Federal (nome, CPF do paciente, CRM e CPF da médica, valor e data) e pode ser usado integralmente na declaração de IR, na ficha de Despesas Médicas — sem limite de dedução.

Se precisar de segunda via, é só nos avisar por aqui.

Para agendar: ${LINK}`,
  },
  {
    id: "duvida-medicacao",
    category: "Medicação",
    question: "Tenho dúvida sobre uma medicação que estou tomando — posso perguntar por aqui?",
    answer: `Olá, {{nome}}! Agradecemos a confiança. 🌿

Por questões éticas e de segurança, a Dra. Jéssica não orienta sobre dose, ajuste ou troca de medicação fora de consulta — cada pessoa responde de forma diferente, e uma orientação genérica pode causar prejuízo.

Se a dúvida é urgente e você já é paciente, agende um retorno breve (R$ 210). Se ainda não é paciente, a primeira consulta (R$ 320) permite avaliar com segurança.

Em caso de efeito adverso grave, procure um pronto-socorro.

Para agendar: ${LINK}`,
  },
  {
    id: "efeitos-colaterais",
    category: "Medicação",
    question: "Estou com efeito colateral, o que faço?",
    answer: `Olá, {{nome}}! Sentimos muito que esteja passando por isso. 🌿

Se o efeito for leve (boca seca, sonolência inicial, leve enjoo), costuma melhorar nos primeiros dias — mas não suspenda a medicação por conta própria. Se for intenso (reação alérgica, falta de ar, palpitação, ideação suicida), procure um pronto-socorro imediatamente.

Para ajustar com segurança, agende um retorno com a Dra. Jéssica o quanto antes: ${LINK}`,
  },
  {
    id: "gravidez-medicacao",
    category: "Medicação",
    question: "Estou grávida / amamentando — posso usar medicação psiquiátrica?",
    answer: `Olá, {{nome}}! Que momento delicado e importante. 🌿

Existem opções seguras de medicação psiquiátrica na gestação e amamentação — a escolha é sempre individualizada, ponderando risco do tratamento x risco do quadro não tratado (que também afeta mãe e bebê). A Dra. Jéssica tem experiência em saúde mental perinatal e conduz essa decisão com calma e em conjunto com o obstetra.

Para conversar com segurança: ${LINK}`,
  },

  // ---------- QUADROS CLÍNICOS ----------
  {
    id: "tdah",
    category: "TDAH",
    question: "Faço diagnóstico de TDAH em adulto?",
    answer: `Olá, {{nome}}! Sim — esse é um dos focos principais da Dra. Jéssica Carpaneda. 🌿

A avaliação de TDAH no adulto é feita ao longo de uma ou mais consultas, com escuta cuidadosa do histórico de vida, escolar, profissional e familiar, além de instrumentos clínicos validados.

Após o diagnóstico, é construído um plano terapêutico individualizado, que pode envolver medicação, orientações de organização e encaminhamento para psicoterapia quando necessário.

• Primeira consulta: R$ 320 (70 min) • 100% online

Para agendar: ${LINK}`,
  },
  {
    id: "tdah-crianca",
    category: "TDAH",
    question: "Atende criança / adolescente com TDAH?",
    answer: `Olá, {{nome}}! 🌿

A Dra. Jéssica atende a partir de 16 anos. Para crianças e adolescentes mais novos, o ideal é um(a) profissional de saúde mental da infância e adolescência — se quiser, podemos sugerir profissionais de confiança.

Para adolescentes a partir de 16 anos, a primeira consulta é feita preferencialmente com presença de um responsável na parte inicial.

Para agendar: ${LINK}`,
  },
  {
    id: "ansiedade",
    category: "Ansiedade",
    question: "Trato ansiedade / crises / pânico?",
    answer: `Olá, {{nome}}! Sim — esse é um dos principais focos do consultório. 🌿

A Dra. Jéssica Carpaneda atende casos de ansiedade, crises de pânico, ansiedade generalizada e quadros associados (insônia, esgotamento, irritabilidade). O tratamento é construído de forma individualizada e pode envolver medicação, orientações práticas e encaminhamento para psicoterapia.

Atendimento por telemedicina, em todo o Brasil.

Para agendar: ${LINK}`,
  },
  {
    id: "depressao",
    category: "Depressão",
    question: "Atende depressão?",
    answer: `Olá, {{nome}}! 🌿

Sim. A Dra. Jéssica acompanha quadros depressivos leves, moderados e graves, incluindo depressão recorrente, distimia e episódios associados a outros transtornos. A abordagem combina avaliação clínica cuidadosa, medicação quando necessária e encaminhamento para psicoterapia.

O primeiro passo, muitas vezes, é simplesmente marcar — sem cobrança de você.

Para agendar: ${LINK}`,
  },
  {
    id: "sono",
    category: "Sono",
    question: "Estou com insônia, a doutora trata?",
    answer: `Olá, {{nome}}! 🌿

Sim. A Dra. Jéssica avalia distúrbios de sono (insônia inicial, despertares, sono não reparador) tanto isolados quanto associados a ansiedade, depressão ou TDAH. O tratamento envolve higiene do sono, abordagens não medicamentosas e, quando indicado, medicação.

Para agendar: ${LINK}`,
  },
  {
    id: "bipolar",
    category: "Bipolar",
    question: "Atende transtorno bipolar?",
    answer: `Olá, {{nome}}! 🌿

Sim. O acompanhamento de transtorno bipolar (tipos I, II e variantes) é uma das áreas de atuação da Dra. Jéssica. O cuidado é contínuo, focado em estabilização do humor, prevenção de novos episódios e qualidade de vida — sempre em parceria com a psicoterapia.

Para agendar: ${LINK}`,
  },
  {
    id: "toc",
    category: "TOC",
    question: "Atende TOC (transtorno obsessivo-compulsivo)?",
    answer: `Olá, {{nome}}! 🌿

Sim. O TOC tem tratamento eficaz quando combina medicação adequada e psicoterapia (especialmente TCC com exposição e prevenção de resposta). A Dra. Jéssica conduz a parte psiquiátrica e indica psicoterapeutas com experiência específica.

Para agendar: ${LINK}`,
  },
  {
    id: "burnout",
    category: "Burnout",
    question: "Acho que estou em burnout, posso me consultar?",
    answer: `Olá, {{nome}}! 🌿

Burnout é cada vez mais comum e merece avaliação cuidadosa — muitas vezes vem associado a depressão, ansiedade ou exaustão crônica. A Dra. Jéssica conduz a investigação, orienta sobre afastamento quando necessário (com laudo) e constrói com você um plano de recuperação.

Para agendar: ${LINK}`,
  },
  {
    id: "dependencia",
    category: "Dependência",
    question: "Atende dependência de álcool / outras substâncias?",
    answer: `Olá, {{nome}}! 🌿

A Dra. Jéssica atende quadros leves a moderados de uso problemático de álcool, cannabis e outras substâncias, em ambiente ambulatorial e com sigilo absoluto. Para casos graves que demandem internação ou desintoxicação hospitalar, fazemos o encaminhamento adequado.

Para conversar sem julgamento: ${LINK}`,
  },
  {
    id: "luto",
    category: "Luto",
    question: "Estou passando por um luto, ajuda nesses casos?",
    answer: `Olá, {{nome}}! Sentimos muito pela sua perda. 💚

O luto é um processo natural, mas em alguns casos se torna prolongado ou se mistura com depressão e ansiedade — quando isso acontece, o acompanhamento médico e psicoterápico ajuda muito. A Dra. Jéssica oferece escuta cuidadosa e, quando indicado, suporte medicamentoso pontual.

Para agendar: ${LINK}`,
  },
  {
    id: "autismo-adulto",
    category: "Públicos especiais",
    question: "Faz avaliação de autismo / TEA em adulto?",
    answer: `Olá, {{nome}}! 🌿

A Dra. Jéssica realiza investigação inicial de TEA em adultos, com escuta clínica e instrumentos de rastreio. Em casos que demandam laudo formal completo, encaminhamos para avaliação neuropsicológica complementar com profissionais parceiros.

Para iniciar: ${LINK}`,
  },

  // ---------- TELEMEDICINA / SIGILO ----------
  {
    id: "telemedicina",
    category: "Telemedicina",
    question: "A consulta online vale o mesmo que presencial?",
    answer: `Olá, {{nome}}! Sim, totalmente. 🌿

A teleconsulta possui a mesma validade ética e legal da consulta presencial, regulamentada pela Resolução CFM 2.314/2022. A Dra. Jéssica pode emitir receitas (inclusive controladas), atestados e relatórios médicos digitalmente, com assinatura eletrônica reconhecida em todo o Brasil.

A videochamada é feita por link seguro enviado antes da consulta, garantindo sigilo e conforto — sem necessidade de deslocamento.

Para agendar: ${LINK}`,
  },
  {
    id: "fora-brasil",
    category: "Telemedicina",
    question: "Moro fora do Brasil, posso me consultar?",
    answer: `Olá, {{nome}}! 🌿

Sim, brasileiros que moram fora podem se consultar normalmente — basta ter CPF ativo. A consulta é por videochamada e os documentos (receita, relatório) têm validade no Brasil. Para uso da receita no exterior, verifique a legislação local, pois nem todos os países aceitam receituário brasileiro.

Para agendar: ${LINK}`,
  },
  {
    id: "como-funciona-video",
    category: "Telemedicina",
    question: "Como funciona a videochamada? Preciso de algum aplicativo?",
    answer: `Olá, {{nome}}! 🌿

É bem simples: 30 minutos antes da consulta você recebe um link por e-mail e WhatsApp. Basta clicar no horário marcado e a videochamada abre direto no navegador (celular ou computador) — sem precisar instalar nada.

Recomendamos um ambiente reservado, com boa internet e fones de ouvido para mais privacidade.

Para agendar: ${LINK}`,
  },
  {
    id: "sigilo",
    category: "Sigilo",
    question: "A consulta é sigilosa? Aparece para alguém?",
    answer: `Olá, {{nome}}! 🌿

Sim, sigilo absoluto — é princípio ético do CFM e da Lei. Nada do que é conversado é compartilhado com familiares, empregadores ou planos de saúde sem sua autorização expressa. Os registros são armazenados em prontuário eletrônico criptografado.

Pode falar com tranquilidade.

Para agendar: ${LINK}`,
  },
  {
    id: "prontuario",
    category: "Sigilo",
    question: "Posso ter acesso ao meu prontuário?",
    answer: `Olá, {{nome}}! 🌿

Sim, o prontuário é seu por direito. Pacientes podem solicitar cópia (resumo clínico ou prontuário completo) a qualquer momento, sem custo adicional. Basta nos pedir por aqui ou em consulta.

Para agendar: ${LINK}`,
  },

  // ---------- AGENDAMENTO / REAGENDAMENTO / RETORNO ----------
  {
    id: "agendamento",
    category: "Agendamento",
    question: "Como faço para agendar?",
    answer: `Olá, {{nome}}! O agendamento é simples e 100% online. 🌿

Inclusive já temos disponibilidade próxima de {{data}}. O passo a passo:

1. Acesse: ${LINK}
2. Escolha o tipo de consulta ({{especialidade}} — primeira consulta ou retorno)
3. Selecione o melhor dia e horário
4. Faça o pagamento pela própria plataforma (com reembolso integral em cancelamentos > 24h)

O link da videochamada chega no seu e-mail e WhatsApp 30 minutos antes do horário marcado.

Qualquer dúvida, é só responder por aqui. Estamos à disposição. 💚`,
  },
  {
    id: "horarios",
    category: "Agendamento",
    question: "Quais horários a doutora atende?",
    answer: `Olá, {{nome}}! 🌿

A agenda da Dra. Jéssica abre horários em dias úteis e também em alguns horários alternativos (manhã cedo / fim de tarde) para quem trabalha. Como a disponibilidade muda semanalmente, o mais atualizado é sempre a Doctoralia:

${LINK}

Se não encontrar um horário que sirva, responde por aqui que tentamos encaixar.`,
  },
  {
    id: "reagendar",
    category: "Reagendamento",
    question: "Preciso remarcar minha consulta, como faço?",
    answer: `Olá, {{nome}}! Sem problema. 🌿

Você pode remarcar diretamente pela Doctoralia, no link de confirmação que recebeu. Se já estiver dentro de 24h da consulta, responda por aqui que tentamos ajustar conforme a agenda.

Reagendamentos com mais de 24h não geram custo. Em cancelamentos definitivos no mesmo prazo, o reembolso é integral.

Link: ${LINK}`,
  },
  {
    id: "atrasado",
    category: "Reagendamento",
    question: "Vou me atrasar para a consulta, e agora?",
    answer: `Olá, {{nome}}! 🌿

Sem problemas — entre na sala assim que conseguir. A Dra. Jéssica aguarda até 15 minutos do horário marcado. Após esse tempo, para não prejudicar os próximos pacientes, a consulta precisa ser remarcada (sujeita à política de no-show da Doctoralia).

Avise por aqui se possível, para alinharmos. 💚`,
  },
  {
    id: "primeira-consulta",
    category: "Primeira consulta",
    question: "Como funciona a primeira consulta?",
    answer: `Olá, {{nome}}! Que bom que está pensando em buscar ajuda — esse já é um passo importante. 🌿

A primeira consulta com a Dra. Jéssica em {{especialidade}} dura 70 minutos e é feita por videochamada. Nela, a doutora dedica tempo para te ouvir com calma, entender seu histórico, suas queixas atuais e construir, junto com você, um plano de cuidado.

Para aproveitar melhor:
• Esteja em um ambiente reservado e silencioso
• Tenha em mãos lista de medicamentos em uso e exames recentes (se houver)
• Não precisa preparar nada além disso — o resto é conversa

Valor: R$ 320 • Para agendar: ${LINK}`,
  },
  {
    id: "retorno-prazo",
    category: "Retorno",
    question: "Quanto tempo depois preciso voltar?",
    answer: `Olá, {{nome}}! 🌿

O intervalo entre consultas é definido caso a caso. Em geral:

• Início de tratamento ou ajuste de medicação: 2 a 4 semanas
• Estabilização: a cada 2 a 3 meses
• Manutenção: a cada 3 a 6 meses

A própria Dra. Jéssica orienta o melhor intervalo ao final de cada consulta.

Para agendar retorno: ${LINK}`,
  },
  {
    id: "ja-paciente",
    category: "Retorno",
    question: "Já fui paciente há um tempo, conta como retorno?",
    answer: `Olá, {{nome}}! Que bom ter você de volta. 🌿

Pacientes com último atendimento há até 12 meses podem agendar como retorno (R$ 210). Acima desse prazo, a recomendação é nova primeira consulta (R$ 320), para a doutora reavaliar seu quadro com calma e atualizar o plano de cuidado.

Para agendar: ${LINK}`,
  },

  // ---------- ENCAMINHAMENTOS / URGÊNCIA ----------
  {
    id: "psicologo",
    category: "Encaminhamento",
    question: "Vocês indicam psicólogo / psicoterapeuta?",
    answer: `Olá, {{nome}}! 🌿

Sim. A Dra. Jéssica trabalha em parceria com psicólogos(as) de diferentes abordagens (TCC, psicanálise, ACT, EMDR) e indica conforme o seu perfil e queixa. A indicação acontece em consulta, depois de entender melhor o que você procura.

Para agendar: ${LINK}`,
  },
  {
    id: "internacao",
    category: "Encaminhamento",
    question: "A doutora indica internação?",
    answer: `Olá, {{nome}}! 🌿

A Dra. Jéssica é especialista em atendimento ambulatorial (consultório / online) e não realiza internações. Quando o quadro indica necessidade de internação, fazemos o encaminhamento responsável para serviços e colegas com essa estrutura.

Para uma avaliação inicial: ${LINK}`,
  },
  {
    id: "urgencia",
    category: "Urgência",
    question: "Estou em crise / com pensamentos de me machucar, o que faço?",
    answer: `Olá, {{nome}}. Antes de tudo: que bom que você buscou ajuda. 💚

Se há risco imediato à sua vida ou de alguém próximo, por favor procure agora:

• CVV — 188 (24h, gratuito) ou chat em cvv.org.br
• SAMU — 192
• Pronto-socorro mais próximo

O atendimento da Dra. Jéssica é ambulatorial e agendado, então não substitui um serviço de emergência. Assim que estiver segura(o), podemos agendar acompanhamento contínuo: ${LINK}`,
  },
  {
    id: "segunda-opiniao",
    category: "Encaminhamento",
    question: "Já tenho acompanhamento, posso pedir uma segunda opinião?",
    answer: `Olá, {{nome}}! 🌿

Sim, segunda opinião é um direito seu e bem-vinda. A Dra. Jéssica revisa diagnóstico, medicação e plano terapêutico com olhar cuidadoso, sem desautorizar o colega — o objetivo é somar.

Se possível, traga laudos, receitas atuais e exames recentes para a consulta.

Para agendar: ${LINK}`,
  },
];
