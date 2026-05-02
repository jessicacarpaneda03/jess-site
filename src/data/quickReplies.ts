export type QuickReplyTab =
  | "fillers"
  | "casuais"
  | "atalhos"
  | "objecoes"
  | "triagem"
  | "risco"
  | "modulos";

export type QuickReply = {
  id: string;
  tab: QuickReplyTab;
  label: string;
  text: string;
  tag?: string; // sub-categoria
};

const LINK = "https://www.doctoralia.com.br/z/FcjTe4";

export const quickReplyTabs: { id: QuickReplyTab; label: string; description: string }[] = [
  { id: "triagem", label: "Triagem", description: "Sequência para qualificar o paciente no WhatsApp antes do agendamento" },
  { id: "risco", label: "Risco", description: "Protocolos de crise, ideação e situações de urgência (sub-abas)" },
  { id: "fillers", label: "Coringas", description: "Mensagens curtas de transição enquanto verifico algo" },
  { id: "casuais", label: "Acolhimento", description: "Respostas humanizadas, tom 'chinelo', leves e próximas" },
  { id: "atalhos", label: "Atalhos", description: "Mini-respostas (1-2 linhas) para as 75+ dúvidas mais comuns" },
  { id: "objecoes", label: "Objeções", description: "Respostas que escorregam objeções clássicas com cuidado" },
  { id: "modulos", label: "Módulos CX", description: "Arquitetura completa de atendimento (A → F + Ficha + Fluxo)" },
];

// Sub-abas internas usadas pela aba Risco (filtra por tag.startsWith)
export const riskSubTabs = [
  { id: "sondagem", label: "Sondagem", match: ["1.", "Sondagem"] },
  { id: "ideacao", label: "Ideação", match: ["2.", "3.", "Ideação"] },
  { id: "crise", label: "Crise aguda", match: ["4.", "5.", "Plano", "Tentativa"] },
  { id: "terceiros", label: "Terceiros / menor", match: ["6.", "7.", "Terceiro", "Menor"] },
  { id: "pos", label: "Pós-crise / limite", match: ["8.", "9.", "10.", "Pós", "Recusa", "Disclaimer"] },
];

export const quickReplies: QuickReply[] = [
  // ---------------- FILLERS / CORINGAS (1ª pessoa) ----------------
  { id: "f-oi", tab: "fillers", label: "Saudação inicial", text: `Oi, {{nome}}! Tudo bem? 🌿 Recebi sua mensagem — me dá só um instante que já te respondo com calma.` },
  { id: "f-conferir", tab: "fillers", label: "Conferindo agenda", text: `Deixa eu dar uma olhadinha na minha agenda e já te confirmo, tá? Um minutinho. 💚` },
  { id: "f-confirmar", tab: "fillers", label: "Confirmando informação", text: `Pra te passar a informação certinha, deixa eu checar uma coisa rapidinho. Já volto.` },
  { id: "f-entendi", tab: "fillers", label: "Entendi a dúvida", text: `Entendi, {{nome}}. Faz todo sentido sua dúvida — me dá só um momento que te explico direitinho.` },
  { id: "f-obrigado", tab: "fillers", label: "Agradecimento", text: `Que bom, {{nome}}! Obrigada pela confiança. 💚 Qualquer coisa, é só me chamar por aqui.` },
  { id: "f-aguardo", tab: "fillers", label: "Aguardando retorno", text: `Fico no aguardo, {{nome}}. Sem pressa — quando puder, me avisa por aqui. 🌿` },
  { id: "f-sumiu", tab: "fillers", label: "Reengajamento gentil", text: `Oi, {{nome}}! Tudo bem por aí? Passando só pra saber se você ainda quer agendar comigo ou se posso te ajudar com mais alguma dúvida. 💚` },
  { id: "f-fim-dia", tab: "fillers", label: "Fora do horário", text: `Oi, {{nome}}! Vi sua mensagem agora, mas o atendimento administrativo já encerrou hoje. Amanhã cedo te respondo com calma, tá? 🌙` },

  // ---------------- CASUAIS / ACOLHIMENTO (1ª pessoa) ----------------
  {
    id: "c-primeira-vez",
    tab: "casuais",
    label: "Primeiro contato com saúde mental",
    text: `Oi, {{nome}}. Antes de qualquer coisa: que bom que você se permitiu mandar essa mensagem. 💚

Buscar cuidado em saúde mental pela primeira vez mexe com a gente — é normal sentir um friozinho. Eu conduzo a primeira conversa com calma, sem pressa, pra você se sentir à vontade pra contar o que está sentindo.

Se quiser, te explico como funciona o agendamento: ${LINK}`,
  },
  {
    id: "c-medo-rotulo",
    tab: "casuais",
    label: "Medo de ser 'rotulado'",
    text: `{{nome}}, entendo perfeitamente esse receio — muita gente sente o mesmo. 🌿

Diagnóstico em saúde mental não é um rótulo, é uma chave pra entender o que está acontecendo e poder cuidar. Trabalho com escuta cuidadosa, sem pressa de "carimbar" nada. Tudo é sigiloso, e nada é compartilhado fora da consulta.

Se quiser dar esse passo: ${LINK}`,
  },
  {
    id: "c-cansado",
    tab: "casuais",
    label: "Paciente exausto",
    text: `Oi, {{nome}}. Pelo que você descreve, dá pra sentir o cansaço aí. 💚

Você não precisa "estar pronta(o)" pra marcar — só precisa querer começar a se sentir melhor. A primeira consulta é online, no conforto da sua casa, e eu te escuto com calma.

Quando puder: ${LINK}`,
  },
  {
    id: "c-vergonha",
    tab: "casuais",
    label: "Vergonha de falar",
    text: `{{nome}}, fica tranquila(o). 🌿 Tudo o que você me contar fica entre nós — sigilo absoluto, sem julgamento. Já ouvi muita coisa, e meu objetivo é só te ajudar.

Não precisa se preparar nem ensaiar nada. É conversa.

Se quiser começar: ${LINK}`,
  },
  {
    id: "c-familia-empurrou",
    tab: "casuais",
    label: "Veio empurrado por alguém",
    text: `Oi, {{nome}}! Mesmo que tenha sido por sugestão de alguém, o fato de você estar aqui já conta. 💚

Eu respeito o seu tempo — você não precisa "topar" tudo de cara. A primeira consulta serve pra a gente se conhecer e você decidir se faz sentido seguir.

Se quiser experimentar: ${LINK}`,
  },
  {
    id: "c-recaida",
    tab: "casuais",
    label: "Voltando após pausa",
    text: `Que bom te ver de volta, {{nome}}. 🌿 Recaída ou pausa fazem parte do processo, não são fracasso. A gente retoma de onde parou, sem cobrança.

Pra reagendar: ${LINK}`,
  },
  {
    id: "c-amigo-indicacao",
    tab: "casuais",
    label: "Veio por indicação",
    text: `Oi, {{nome}}! Que bacana saber que veio por indicação. 💚 Conta um pouquinho do que está te trazendo aqui que eu te oriento sobre o melhor caminho — ou, se preferir já agendar, é por aqui: ${LINK}`,
  },

  // ---------------- ATALHOS (sintéticos, 1ª pessoa) ----------------
  { id: "a-valor", tab: "atalhos", tag: "Valor", label: "Valor da consulta", text: `Primeira consulta R$ 320 (70 min) e retorno R$ 210 (30 min), {{nome}}. Tudo online. Agendamento: ${LINK}` },
  { id: "a-convenio", tab: "atalhos", tag: "Convênio", label: "Convênio (curto)", text: `Não atendo convênio, {{nome}} — só particular. Emito recibo pra você pedir reembolso ao seu plano de saúde, quando aplicável. Agendamento: ${LINK}` },
  { id: "a-online", tab: "atalhos", tag: "Telemedicina", label: "Só online?", text: `Sim, {{nome}}, atendimento 100% online por videochamada — mesma validade legal de consulta presencial. Atendo todo o Brasil. ${LINK}` },
  { id: "a-receita", tab: "atalhos", tag: "Receita", label: "Receita controlada", text: `{{nome}}, condutas e encaminhamentos são definidos com base na avaliação clínica feita na consulta — tudo conversado com você. ${LINK}` },
  { id: "a-tdah", tab: "atalhos", tag: "TDAH", label: "TDAH adulto", text: `Sim, {{nome}}! TDAH no adulto é uma das minhas áreas de foco. Primeira consulta R$ 320, online. ${LINK}` },
  { id: "a-ansiedade", tab: "atalhos", tag: "Ansiedade", label: "Ansiedade", text: `Sim, {{nome}}, acompanho ansiedade e crises de pânico com plano individualizado. Online, em todo o Brasil. ${LINK}` },
  { id: "a-depressao", tab: "atalhos", tag: "Depressão", label: "Depressão", text: `Sim, {{nome}}, acompanho quadros depressivos — leves a graves — com escuta cuidadosa e plano individualizado. ${LINK}` },
  { id: "a-sono", tab: "atalhos", tag: "Sono", label: "Insônia", text: `Sim, {{nome}}, dificuldades de sono são avaliadas e o plano é individualizado. ${LINK}` },
  { id: "a-bipolar", tab: "atalhos", tag: "Bipolar", label: "Bipolar", text: `Sim, {{nome}}, transtorno bipolar é uma das minhas áreas. Acompanhamento contínuo e cuidadoso. ${LINK}` },
  { id: "a-toc", tab: "atalhos", tag: "TOC", label: "TOC", text: `Sim, {{nome}}, acompanho TOC com plano individualizado, incluindo indicação de psicoterapia (TCC) quando pertinente. ${LINK}` },
  { id: "a-burnout", tab: "atalhos", tag: "Burnout", label: "Burnout", text: `Sim, {{nome}}, avalio burnout com cuidado, incluindo orientação sobre afastamento quando necessário. ${LINK}` },
  { id: "a-crianca", tab: "atalhos", tag: "Idade", label: "Atende criança?", text: `Atendo a partir de 16 anos, {{nome}}. Pra crianças, indico colega da saúde mental da infância — se quiser, te passo sugestões.` },
  { id: "a-idoso", tab: "atalhos", tag: "Idade", label: "Atende idoso?", text: `Sim, {{nome}}, atendo adultos e idosos. O online costuma ser bem confortável — se precisar, um familiar pode acompanhar.` },
  { id: "a-gestante", tab: "atalhos", tag: "Gestação", label: "Grávida / amamentando", text: `Sim, {{nome}}, há opções seguras na gestação e amamentação. Avalio caso a caso, em parceria com o(a) obstetra. ${LINK}` },
  { id: "a-horarios", tab: "atalhos", tag: "Agenda", label: "Horários", text: `Os horários atualizados aparecem aqui, {{nome}}: ${LINK} — se não achar horário, me avisa que tento encaixar.` },
  { id: "a-data", tab: "atalhos", tag: "Agenda", label: "Disponibilidade próxima", text: `Tenho disponibilidade próxima de {{data}}, {{nome}}! Pra confirmar: ${LINK}` },
  { id: "a-link-video", tab: "atalhos", tag: "Telemedicina", label: "Link da videochamada", text: `O link chega no seu e-mail e WhatsApp 30 minutos antes da consulta, {{nome}}. Abre direto no navegador, sem precisar instalar nada.` },
  { id: "a-pagamento", tab: "atalhos", tag: "Pagamento", label: "Pagamento", text: `O pagamento é direto na Doctoralia, {{nome}} — PIX, débito ou crédito (com opção de parcelar). ${LINK}` },
  { id: "a-cancelar", tab: "atalhos", tag: "Agenda", label: "Cancelar / reagendar", text: `Sem problema, {{nome}} — cancelamentos com mais de 24h têm reembolso integral pela Doctoralia. Pra reagendar: ${LINK}` },
  { id: "a-atestado", tab: "atalhos", tag: "Documentos", label: "Atestado", text: `Sim, {{nome}}, emito atestados, relatórios e laudos quando clinicamente indicado, com assinatura digital válida.` },
  { id: "a-recibo", tab: "atalhos", tag: "Documentos", label: "Recibo IR", text: `Sim, {{nome}}, o recibo serve pra dedução no IR e também pra pedido de reembolso ao plano de saúde.` },
  { id: "a-renovar", tab: "atalhos", tag: "Receita", label: "Renovar receita", text: `Renovações e ajustes de conduta exigem uma consulta de retorno, {{nome}} — questão ética. Pacientes em acompanhamento agendam um retorno (R$ 210). ${LINK}` },
  { id: "a-fora-brasil", tab: "atalhos", tag: "Telemedicina", label: "Fora do Brasil", text: `Sim, {{nome}}, brasileiros morando fora podem se consultar normalmente — basta CPF ativo. ${LINK}` },
  { id: "a-urgencia", tab: "atalhos", tag: "Urgência", label: "Crise / urgência", text: `{{nome}}, se houver risco agora, por favor ligue no CVV 188 (24h) ou procure um pronto-socorro. Meu atendimento é ambulatorial e agendado. 💚` },

  // NOVOS — Receita A/B Sedex
  {
    id: "a-receita-ab-sedex",
    tab: "atalhos",
    tag: "Receita A/B",
    label: "Receita A/B (envio físico)",
    text: `{{nome}}, receitas controladas tipo A (amarela) e B (azul) precisam ser enviadas em via física. Como funciona aqui:

📦 Envio por Sedex — taxa fixa de R$ 100,00
💸 Pagamento exclusivamente por PIX (envio só após confirmação)
🔎 Código de rastreamento enviado por aqui assim que postado
🗓️ Postagem em até 2 dias úteis após o pagamento confirmado

Posso te enviar a chave PIX e o endereço de entrega?`,
  },
  {
    id: "a-receita-ab-prazo",
    tab: "atalhos",
    tag: "Receita A/B",
    label: "Prazo de entrega Sedex",
    text: `O prazo do Sedex varia conforme sua cidade, {{nome}} — em média 1 a 4 dias úteis após a postagem. Assim que posto, te mando o código de rastreamento por aqui. 🌿`,
  },
  {
    id: "a-receita-ab-pix",
    tab: "atalhos",
    tag: "Receita A/B",
    label: "Confirmação PIX da receita",
    text: `{{nome}}, recebi o comprovante do PIX (R$ 100,00 — Sedex da receita). ✅ Vou postar em até 2 dias úteis e te mando o código de rastreamento assim que sair. 💚`,
  },
  {
    id: "a-receita-ab-rastreio",
    tab: "atalhos",
    tag: "Receita A/B",
    label: "Código de rastreamento",
    text: `Postada hoje, {{nome}}! 📦 Código de rastreio Sedex: [código]. Pode acompanhar em https://rastreamento.correios.com.br. Qualquer coisa, me avisa por aqui. 🌿`,
  },
  {
    id: "a-receita-b-digital",
    tab: "atalhos",
    tag: "Receita digital",
    label: "Receita comum/B1 digital",
    text: `{{nome}}, receitas comuns e algumas controladas (B1, sem retenção em algumas farmácias) podem ir digital, com assinatura ICP-Brasil — chega no seu e-mail e vale em qualquer farmácia do Brasil. Se for receita A ou B amarela/azul retida, é envio físico via Sedex (taxa R$ 100, PIX). 💚`,
  },

  // ---------------- OBJEÇÕES (1ª pessoa) ----------------
  {
    id: "o-caro",
    tab: "objecoes",
    label: "\"Tá caro pra mim\"",
    text: `Entendo perfeitamente, {{nome}}. 🌿 Meu valor está alinhado com a média de profissionais de saúde mental com a mesma formação, e cobre uma consulta longa (70 min na primeira), documentos quando indicados e suporte pós-consulta.

Algumas opções que ajudam:
• Parcelamento no cartão pelo checkout da Doctoralia
• Recibo para reembolso parcial pelo seu plano de saúde, quando aplicável
• Espaçar mais os retornos depois da fase inicial

Se fizer sentido: ${LINK}`,
  },
  {
    id: "o-pensar",
    tab: "objecoes",
    label: "\"Vou pensar\"",
    text: `Claro, {{nome}}, pensa com calma. 💚 Só te deixo um lembrete carinhoso: a maioria das pessoas que adia uma consulta de saúde mental se arrepende de não ter marcado antes — não pela conduta em si, mas pelo alívio de finalmente conversar com alguém que entende.

Quando se sentir pronta(o), tô por aqui: ${LINK}`,
  },
  {
    id: "o-presencial",
    tab: "objecoes",
    label: "\"Prefiro presencial\"",
    text: `Faz total sentido, {{nome}} — muita gente pensa assim antes de experimentar. 🌿

A teleconsulta tem a mesma validade legal e, na prática, pacientes relatam se sentir até mais à vontade falando do conforto de casa. Se não rolar, você não fica preso(a) — é só uma consulta.

Se topar testar: ${LINK}`,
  },
  {
    id: "o-sem-tempo",
    tab: "objecoes",
    label: "\"Não tenho tempo\"",
    text: `Entendo, {{nome}}. 💚 Por isso atendo 100% online — sem deslocamento, sem sala de espera. São 70 minutos do seu próprio ambiente, e tenho horários alternativos (manhã cedo / fim de tarde) pra quem trabalha.

Dá uma olhada na agenda: ${LINK}`,
  },
  {
    id: "o-sozinho",
    tab: "objecoes",
    label: "\"Acho que dou conta sozinho\"",
    text: `Respeito muito isso, {{nome}}. 🌿 E quero te dizer: pedir ajuda não é o oposto de dar conta — é parte de dar conta. Mesmo pessoas muito funcionais se beneficiam de uma escuta especializada.

Se em algum momento mudar de ideia, é por aqui: ${LINK}`,
  },
  {
    id: "o-ja-tentou",
    tab: "objecoes",
    label: "\"Já tentei e não funcionou\"",
    text: `Sinto muito que tenha vivido isso, {{nome}}. 💚 Tratamento em saúde mental não é tamanho único — às vezes é questão de ajuste de abordagem, de plano, ou simplesmente de encontrar um(a) profissional que combine com você.

Costumo revisar o histórico com calma antes de propor mudanças. Se quiser dar mais uma chance: ${LINK}`,
  },
  {
    id: "o-medo-remedio",
    tab: "objecoes",
    label: "\"Tenho medo de remédio\"",
    text: `Esse medo é super comum e legítimo, {{nome}}. 🌿 Eu não proponho condutas "automáticas" — qualquer indicação é conversada com você, com transparência sobre o que esperar, e em muitos casos o cuidado envolve só mudanças de hábito e psicoterapia.

A decisão é sempre conjunta. Pra conversar: ${LINK}`,
  },
  {
    id: "o-vergonha-online",
    tab: "objecoes",
    label: "\"Não me sinto à vontade no vídeo\"",
    text: `Tudo bem, {{nome}}. 💚 Você pode ficar com a câmera ligada só na parte inicial, ou em ambiente que te deixe mais à vontade (carro estacionado, quarto, etc.). O importante é você se sentir segura(o) pra falar.

Se quiser experimentar: ${LINK}`,
  },
  {
    id: "o-marido-nao-deixa",
    tab: "objecoes",
    label: "\"Meu parceiro(a) não aceita\"",
    text: `{{nome}}, sinto muito que esteja vivendo isso. 🌿 Cuidar da sua saúde mental é um direito seu — a consulta é sigilosa, online, e não aparece em nada visível. Se quiser, agendamos em horário discreto.

Quando puder: ${LINK}`,
  },
  {
    id: "o-religiao",
    tab: "objecoes",
    label: "\"Minha fé resolve\"",
    text: `Respeito muito sua fé, {{nome}} — ela pode caminhar junto com o tratamento, não é "ou um ou outro". Eu não interfiro em crenças; meu trabalho é cuidar do que é químico/clínico no cérebro.

Se quiser conversar: ${LINK}`,
  },
  {
    id: "o-melhorou",
    tab: "objecoes",
    label: "\"Acho que melhorei sozinho\"",
    text: `Que ótimo ouvir isso, {{nome}}! 💚 Só uma observação: oscilações de melhora fazem parte de vários quadros — uma avaliação ajuda a entender se é melhora real ou ciclo. Sem compromisso de tratar.

Se quiser checar: ${LINK}`,
  },
  {
    id: "o-comparou",
    tab: "objecoes",
    label: "\"Achei mais barato em outro lugar\"",
    text: `Faz sentido pesquisar, {{nome}} 🌿. Só vale comparar o que está incluído: 70 minutos de primeira consulta, retorno acessível, suporte por WhatsApp entre consultas e documentos sem custo extra quando indicados (exceto envio físico de receita A/B). Se ainda assim preferir outra opção, tudo bem — fica o convite. ${LINK}`,
  },

  // ---------------- TRIAGEM (1ª pessoa) ----------------
  {
    id: "t-01-abertura",
    tab: "triagem",
    tag: "1. Abertura",
    label: "Abertura + permissão",
    text: `Oi, {{nome}}! Tudo bem? 💚 Sou a Dra. Jéssica Carpaneda, da área de saúde mental. Vi que você se interessou pelo atendimento — posso te fazer 3 perguntinhas rápidas pra entender o que está acontecendo e te orientar do melhor jeito? 🌿`,
  },
  {
    id: "t-02-queixa",
    tab: "triagem",
    tag: "2. Queixa",
    label: "Pergunta 1: queixa principal",
    text: `Perfeito! 🙏

1) De forma bem livre, o que te fez buscar cuidado em saúde mental agora? Pode ser uma frase só (ex.: "tô muito ansiosa", "não consigo dormir", "suspeita de TDAH", "tô esgotada no trabalho"...).`,
  },
  {
    id: "t-03-tempo",
    tab: "triagem",
    tag: "3. Tempo",
    label: "Pergunta 2: há quanto tempo",
    text: `Obrigada por compartilhar, {{nome}}. 💚

2) Há quanto tempo você sente isso? (dias, semanas, meses, anos?)`,
  },
  {
    id: "t-04-tratamento-previo",
    tab: "triagem",
    tag: "4. Histórico",
    label: "Pergunta 3: já tratou antes?",
    text: `Entendi. 🌿

3) Você já fez algum acompanhamento em saúde mental antes (psicólogo, psicoterapia, outro profissional)? Está em uso de algum tratamento ou medicação no momento? (Se não lembrar o nome certinho, sem problema.)`,
  },
  {
    id: "t-05-risco",
    tab: "triagem",
    tag: "5. Risco",
    label: "Triagem de risco (sondagem)",
    text: `{{nome}}, mais uma rapidinha pra eu te orientar com segurança: você tem tido pensamentos de se machucar ou de não querer mais estar aqui? Pode ser sincera(o) — esse espaço é seguro. 💚`,
  },
  {
    id: "t-05b-risco-positivo",
    tab: "triagem",
    tag: "5. Risco",
    label: "Resposta a risco positivo",
    text: `{{nome}}, fico muito grata por ter confiado em me contar. 💚 Quero te pedir, por favor: se houver risco agora, ligue no CVV 188 (24h, gratuito) ou vá ao pronto-socorro mais próximo / CAPS. Eu atendo ambulatorialmente e vou te encaixar o quanto antes — mas o cuidado de urgência precisa ser presencial. Estou aqui com você. 🌿`,
  },
  {
    id: "t-06-perfil",
    tab: "triagem",
    tag: "6. Perfil",
    label: "Idade + cidade",
    text: `Só pra fechar o cadastro, {{nome}}: qual sua idade e em que cidade/estado você mora? (Atendo a partir de 16 anos, online, em todo o Brasil 🇧🇷)`,
  },
  {
    id: "t-07-rotina",
    tab: "triagem",
    tag: "7. Rotina",
    label: "Melhor horário",
    text: `E qual período costuma ser melhor pra você ser atendida(o)? (manhã / tarde / noite / fim de semana — tenho opções)`,
  },
  {
    id: "t-08-encaixe-tdah",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — perfil TDAH",
    text: `Pelo que você me conta, {{nome}}, faz muito sentido a gente investigar TDAH — é uma das minhas áreas de foco. 💚

A primeira consulta é online (70 min, R$ 320) e já inicio a investigação com escalas validadas (ASRS-18). Sem precisar de exames antes.

Quer que eu te mostre os horários disponíveis? ${LINK}`,
  },
  {
    id: "t-08-encaixe-ansiedade",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — ansiedade/pânico",
    text: `{{nome}}, o que você descreve é muito compatível com um quadro ansioso — e tem tratamento, viu? 🌿 Trabalho com escuta cuidadosa + plano individualizado, conversado com você.

Primeira consulta online, 70 min, R$ 320. Posso te ajudar a marcar? ${LINK}`,
  },
  {
    id: "t-08-encaixe-burnout",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — burnout",
    text: `Pelo que você relata, {{nome}}, parece quadro de esgotamento (burnout). 💚 Eu avalio, oriento sobre afastamento se necessário e monto o plano de cuidado com você.

Primeira consulta online, 70 min, R$ 320. Quer ver os horários? ${LINK}`,
  },
  {
    id: "t-08-encaixe-depressao",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — depressão",
    text: `{{nome}}, o que você compartilhou tem cara de quadro depressivo — e é totalmente tratável. 🌿 Você não precisa estar "no fundo" pra começar; quanto antes, melhor.

Primeira consulta online, 70 min, R$ 320. Te ajudo a agendar? ${LINK}`,
  },
  {
    id: "t-08-encaixe-fora-escopo",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Fora do escopo (encaminhar)",
    text: `{{nome}}, pelo que você descreve, o ideal é um(a) profissional com outro foco (ex.: saúde mental infantil / neurologia / dependência química em internação). Não sou a melhor indicação pra esse caso específico, mas posso te sugerir caminhos. 💚`,
  },
  {
    id: "t-09-fechamento-link",
    tab: "triagem",
    tag: "9. Fechamento",
    label: "Fechamento com link",
    text: `Show, {{nome}}! Pra agendar é direto por aqui (você escolhe horário, paga e recebe o link da videochamada): ${LINK}

Qualquer dúvida no caminho, me chama. 💚`,
  },
  {
    id: "t-09-fechamento-data",
    tab: "triagem",
    tag: "9. Fechamento",
    label: "Sugestão de data",
    text: `Tenho um horário bom pra você em {{data}}, {{nome}}. Posso reservar? Se confirmar, te mando o link de pagamento da Doctoralia. 🌿`,
  },
  {
    id: "t-10-pos-agendamento",
    tab: "triagem",
    tag: "10. Pós",
    label: "Confirmação pós-agendamento",
    text: `Tudo certo, {{nome}}! ✅ Sua consulta comigo está marcada para {{data}}.

📍 100% online (link chega 30 min antes por e-mail e WhatsApp)
📝 Se tiver exames, relatórios ou laudos antigos, deixa em mãos
⏰ Entra 5 min antes pra testar áudio/vídeo

Qualquer coisa, me chama por aqui. 💚`,
  },
  {
    id: "t-11-lembrete-vespera",
    tab: "triagem",
    tag: "10. Pós",
    label: "Lembrete véspera",
    text: `Oi, {{nome}}! 🌿 Passando só pra lembrar da nossa consulta amanhã ({{data}}). O link chegará 30 min antes. Tudo certo por aí?`,
  },
  {
    id: "t-12-no-show",
    tab: "triagem",
    tag: "10. Pós",
    label: "Não compareceu",
    text: `Oi, {{nome}}! Vi que não consegui te encontrar na consulta de hoje. Tudo bem por aí? 💚 Se quiser, te ajudo a remarcar — me avisa o melhor dia.`,
  },
  {
    id: "t-13-sem-resposta",
    tab: "triagem",
    tag: "10. Pós",
    label: "Follow-up (sem resposta)",
    text: `Oi, {{nome}}! 🌿 Só passando pra saber se ainda faz sentido marcar comigo ou se você preferiu outro caminho. Sem cobrança — tô por aqui se precisar. 💚`,
  },

  // ============================================================
  // RISCO — Sub-abas: Sondagem / Ideação / Crise / Terceiros / Pós
  // ============================================================
  {
    id: "r-01-sondagem",
    tab: "risco",
    tag: "1. Sondagem",
    label: "Sondagem inicial de risco",
    text: `{{nome}}, antes de seguirmos, preciso te fazer uma pergunta sincera — pode responder com toda liberdade: você tem tido pensamentos de se machucar ou de não querer mais estar aqui? 💚

Esse espaço é seguro e sem julgamento.`,
  },
  {
    id: "r-01b-sondagem-aprofundar",
    tab: "risco",
    tag: "1. Sondagem",
    label: "Aprofundar (Columbia adaptado)",
    text: `Obrigada por confiar, {{nome}}. 🌿 Pra eu te ajudar do melhor jeito, posso te perguntar mais um pouco?

• Esses pensamentos têm sido frequentes? (raros / às vezes / quase todo dia)
• Você já pensou em COMO faria isso?
• Você tem acesso a algum meio (medicação, arma, etc.)?
• Já tentou em algum momento da vida? (recente ou antigo)

Pode responder no seu tempo. 💚`,
  },
  {
    id: "r-02-ideacao-passiva",
    tab: "risco",
    tag: "2. Ideação passiva",
    label: "Ideação passiva (\"queria sumir\")",
    text: `Obrigada por confiar em mim com isso, {{nome}}. 🌿 O que você descreve — esse cansaço de existir, vontade de "sumir" — é um sinal importante de que você precisa de cuidado AGORA, não daqui a semanas.

Vou te encaixar comigo o quanto antes. Enquanto isso, se piorar:
• CVV — 188 (24h, gratuito, ligação ou chat em cvv.org.br)
• Pronto-socorro mais próximo
• CAPS da sua região

Você não está sozinha(o). 💚`,
  },
  {
    id: "r-03-ideacao-ativa",
    tab: "risco",
    tag: "3. Ideação ativa",
    label: "Ideação ativa SEM plano",
    text: `{{nome}}, fico muito grata por ter me contado. 💚 Isso que você está sentindo é um pedido de socorro legítimo, e merece resposta agora — não depois.

Por favor, faça AGORA uma destas opções:
1️⃣ Ligue no CVV: 188 (gratuito, 24h, sigiloso)
2️⃣ Chat: cvv.org.br
3️⃣ CAPS da sua cidade

Vou priorizar seu encaixe na minha agenda. Posso te ligar? Me manda um "pode" que eu te chamo. 🌿`,
  },
  {
    id: "r-04-plano-meio",
    tab: "risco",
    tag: "4. Plano/meio",
    label: "Plano OU meio acessível — vermelho",
    text: `{{nome}}, preciso ser muito direta com você porque me importo. 💚

Pelo que você descreve (plano / meio em mãos), o cuidado certo agora NÃO é uma teleconsulta marcada — é avaliação presencial imediata.

Por favor, AGORA:
🚑 SAMU 192 — ou
🏥 Pronto-socorro psiquiátrico mais próximo — ou
☎️ CVV 188 enquanto se desloca

Se possível, peça pra alguém de confiança ficar com você até chegar ao serviço. Se quiser, fico aqui no chat enquanto você se organiza. Você importa. 🌿`,
  },
  {
    id: "r-05-tentativa-recente",
    tab: "risco",
    tag: "5. Tentativa",
    label: "Tentativa recente / autolesão atual",
    text: `{{nome}}, isso é uma emergência médica. Por favor, AGORA:

🚑 Ligue 192 (SAMU) ou peça que alguém te leve ao pronto-socorro mais próximo.

Se estiver sozinha(o), ligue para alguém de confiança AGORA — qualquer pessoa — e peça pra ficar contigo até chegar ajuda.

CVV 188 também atende em situações de risco iminente. Estou aqui. 💚`,
  },
  {
    id: "r-06-terceiro-relata",
    tab: "risco",
    tag: "6. Terceiro",
    label: "Familiar relata risco do paciente",
    text: `Que bom que você buscou ajuda, {{nome}}. 💚 Pelo que descreve, é uma situação de risco e o cuidado mais seguro AGORA é avaliação presencial:

• SAMU 192
• Pronto-socorro psiquiátrico (CAPS III ou hospital geral com psiquiatria)
• CVV 188 (24h) — pode ligar você também, para se orientar

Não deixe a pessoa sozinha, e se houver acesso a meios (medicamentos, armas, etc.), retire do alcance. Após estabilizar, podemos agendar acompanhamento ambulatorial comigo. 🌿`,
  },
  {
    id: "r-07-menor-risco",
    tab: "risco",
    tag: "7. Menor",
    label: "Menor de idade em risco",
    text: `{{nome}}, obrigada por me contar. 💚 Por se tratar de menor de idade em situação de risco, o cuidado urgente passa por:

🚑 SAMU 192 ou pronto-socorro pediátrico/psiquiátrico
👨‍👩‍👧 Comunicar imediatamente o(a) responsável legal
☎️ CVV 188 (atende qualquer idade)
🛡️ Conselho Tutelar 100, se houver violência envolvida

Após estabilização, encaminho para profissional de saúde mental da infância e adolescência. 🌿`,
  },
  {
    id: "r-08-pos-alta",
    tab: "risco",
    tag: "8. Pós-alta",
    label: "Recebeu alta hospitalar — encaixe",
    text: `Que bom que você está num momento mais seguro, {{nome}}. 💚 Pós-alta é uma fase delicada e merece acompanhamento próximo.

Vou priorizar seu encaixe nos próximos dias. Por favor, traga na consulta:
📋 Relatório de alta
💊 Lista de medicações em uso
👥 Quem é sua rede de apoio agora

Enquanto isso, qualquer piora: CVV 188 ou volte ao serviço de origem. 🌿`,
  },
  {
    id: "r-09-recusa-ajuda",
    tab: "risco",
    tag: "9. Recusa",
    label: "Recusa qualquer ajuda",
    text: `{{nome}}, respeito sua autonomia. 💚 Só te peço uma coisa: salva esse número — CVV 188 — em qualquer momento, mesmo só pra desabafar. É 24h, gratuito, anônimo.

Quando (e se) quiser conversar comigo, tô aqui. Sem pressa, sem cobrança. 🌿`,
  },
  {
    id: "r-10-disclaimer",
    tab: "risco",
    tag: "10. Disclaimer",
    label: "Disclaimer fixo de telemedicina",
    text: `⚠️ IMPORTANTE: minha teleconsulta é ambulatorial e agendada. Não atendo URGÊNCIAS pelo WhatsApp.

Em situação de crise: CVV 188 (24h) | SAMU 192 | pronto-socorro mais próximo.`,
  },
  {
    id: "r-11-plano-seguranca",
    tab: "risco",
    tag: "10. Disclaimer",
    label: "Plano de segurança breve (Stanley-Brown)",
    text: `{{nome}}, vamos montar juntas(os) um plano de segurança rapidinho — pra você ter na mão se a crise vier:

1) Sinais de alerta meus (o que sinto antes da crise piorar):
2) Coisas que me distraem ou acalmam (atividades, lugares, sons):
3) Pessoas/lugares sociais que me ajudam a sair da espiral:
4) Pessoas que posso pedir ajuda direta (nome + telefone):
5) Profissionais e serviços (eu, CVV 188, PS mais próximo):
6) Tornar o ambiente seguro (afastar meios, deixar com alguém):

Manda preenchido por aqui que eu reviso com você. 💚`,
  },

  // ============================================================
  // ATALHOS — 68 RESPOSTAS NUMERADAS (1ª pessoa)
  // ============================================================

  // ── Saudações e Primeiro Contato (01–03)
  { id: "n01", tab: "atalhos", tag: "01. Saudação", label: "01. Boas-vindas", text: `Oi, {{nome}}! 💚 Sou a Dra. Jéssica Carpaneda — saúde mental. Que bom te ver por aqui! Como posso te ajudar hoje?` },
  { id: "n02", tab: "atalhos", tag: "02. Saudação", label: "02. Fora do horário", text: `Oi, {{nome}}! 🌙 Recebi sua mensagem fora do meu horário comercial (seg-sex, 9h-18h). Amanhã cedo te respondo com calma. Em urgência: CVV 188.` },
  { id: "n03", tab: "atalhos", tag: "03. Saudação", label: "03. Reapresentação", text: `Oi, {{nome}}! 💚 Que bom te ver de volta. Em que posso te ajudar hoje — quer agendar, tirar uma dúvida, ou outra coisa?` },

  // ── Valores (04–08)
  { id: "n04", tab: "atalhos", tag: "04. Valor", label: "04. Valor 1ª consulta", text: `Primeira consulta: R$ 320 (70 min, online), {{nome}}. Inclui avaliação completa e plano de cuidado individualizado. Agendamento: ${LINK}` },
  { id: "n05", tab: "atalhos", tag: "05. Valor", label: "05. Valor retorno", text: `Retorno: R$ 210 (30 min, online), {{nome}}. Indicado para acompanhamento, ajustes e renovação de conduta. ${LINK}` },
  { id: "n06", tab: "atalhos", tag: "06. Valor", label: "06. Por que esse valor", text: `O valor reflete formação especializada, consulta longa, suporte pós-consulta por WhatsApp e documentos sem custo extra quando indicados (exceto envio físico de receita A/B), {{nome}}. 🌿` },
  { id: "n07", tab: "atalhos", tag: "07. Valor", label: "07. Parcelamento", text: `Sim, {{nome}}! O checkout da Doctoralia permite parcelar no cartão de crédito (sujeito às condições da operadora). ${LINK}` },
  { id: "n08", tab: "atalhos", tag: "08. Valor", label: "08. Desconto / social", text: `{{nome}}, hoje não trabalho com descontos individuais — pra manter equidade entre pacientes. Se o valor pesar, posso te indicar serviços públicos (CAPS, UBS) ou clínicas-escola. 💚` },

  // ── Agendamento (09–12)
  { id: "n09", tab: "atalhos", tag: "09. Agenda", label: "09. Como agendar", text: `Super simples, {{nome}}: você escolhe horário, paga (PIX/cartão) e recebe o link da videochamada por e-mail e WhatsApp. Tudo por aqui: ${LINK}` },
  { id: "n10", tab: "atalhos", tag: "10. Agenda", label: "10. Próximas datas", text: `Tenho disponibilidade próxima de {{data}}, {{nome}}! Os horários atualizados ficam aqui: ${LINK}` },
  { id: "n11", tab: "atalhos", tag: "11. Agenda", label: "11. Sem horário disponível", text: `{{nome}}, no momento minha agenda da semana está cheia. Posso te avisar assim que abrir uma vaga? Me confirma o melhor período (manhã/tarde/noite). 💚` },
  { id: "n12", tab: "atalhos", tag: "12. Agenda", label: "12. Encaixe / urgência leve", text: `{{nome}}, vou ver o que consigo de encaixe nos próximos dias. Já me adianta: você consegue qualquer horário, ou tem restrição? 🌿` },

  // ── Formato do Atendimento (13–18)
  { id: "n13", tab: "atalhos", tag: "13. Formato", label: "13. Como funciona online", text: `100% por videochamada, {{nome}}. Você recebe o link 30 min antes — abre direto no navegador (celular ou computador), sem instalar nada. ${LINK}` },
  { id: "n14", tab: "atalhos", tag: "14. Formato", label: "14. Validade legal", text: `Sim, {{nome}}, a teleconsulta tem a mesma validade legal da consulta presencial (Resolução CFM 2.314/2022). 🌿` },
  { id: "n15", tab: "atalhos", tag: "15. Formato", label: "15. Plataforma usada", text: `Uso plataforma própria de telemedicina, {{nome}} — segura, criptografada e sem precisar baixar app. Link chega no seu e-mail e WhatsApp.` },
  { id: "n16", tab: "atalhos", tag: "16. Formato", label: "16. Internet ruim", text: `Sem problema, {{nome}} — a plataforma se adapta a internet mais lenta. Se cair, a gente reconecta. Se necessário, eu ligo por telefone pra continuar. 💚` },
  { id: "n17", tab: "atalhos", tag: "17. Formato", label: "17. Onde ficar durante a consulta", text: `Escolha um lugar tranquilo, com privacidade e fone de ouvido se possível, {{nome}}. Carro estacionado também serve! O importante é você se sentir à vontade. 🌿` },
  { id: "n18", tab: "atalhos", tag: "18. Formato", label: "18. Atende presencial?", text: `{{nome}}, hoje atendo exclusivamente online — facilita acesso em todo o Brasil e flexibiliza horários. ${LINK}` },

  // ── Pagamento (19–23)
  { id: "n19", tab: "atalhos", tag: "19. Pagamento", label: "19. Formas de pagamento", text: `PIX, débito ou crédito (com parcelamento), {{nome}} — direto pelo checkout seguro da Doctoralia. ${LINK}` },
  { id: "n20", tab: "atalhos", tag: "20. Pagamento", label: "20. Confirmar pagamento", text: `Assim que o pagamento é confirmado, você recebe a confirmação automática por e-mail, {{nome}}. Se não chegou, me avisa que verifico. 🌿` },
  { id: "n21", tab: "atalhos", tag: "21. Pagamento", label: "21. Reembolso (regra)", text: `Cancelamentos com mais de 24h de antecedência têm reembolso integral pela Doctoralia, {{nome}}. Abaixo disso, avalio caso a caso. 💚` },
  { id: "n22", tab: "atalhos", tag: "22. Pagamento", label: "22. Recibo para reembolso", text: `Sim, {{nome}}, emito recibo logo após a consulta — serve para reembolso pelo plano (quando aplicável) e dedução no IR.` },
  { id: "n23", tab: "atalhos", tag: "23. Pagamento", label: "23. Pagamento direto?", text: `{{nome}}, o pagamento da consulta é via Doctoralia (mais segurança pra você e pra mim). Só recebo PIX direto na taxa de envio físico de receita A/B (R$ 100). 🌿` },

  // ── Sobre a Consulta (24–30)
  { id: "n24", tab: "atalhos", tag: "24. Consulta", label: "24. Quanto tempo dura", text: `Primeira consulta: 70 minutos. Retornos: 30 minutos, {{nome}}. Tempo confortável pra conversar sem pressa. 🌿` },
  { id: "n25", tab: "atalhos", tag: "25. Consulta", label: "25. O que precisa preparar", text: `Nada formal, {{nome}}! Se tiver exames, relatórios anteriores ou lista de medicações em uso, deixa em mãos. O resto é só conversa. 💚` },
  { id: "n26", tab: "atalhos", tag: "26. Consulta", label: "26. Posso ter acompanhante", text: `Sim, {{nome}}, se você se sentir mais segura(o) com alguém presente — sem problema. Só me avise no início pra alinhar a privacidade do que será compartilhado.` },
  { id: "n27", tab: "atalhos", tag: "27. Consulta", label: "27. Sigilo médico", text: `Sigilo absoluto, {{nome}}. 🌿 Tudo que conversamos fica entre nós, protegido por lei (CFM e LGPD).` },
  { id: "n28", tab: "atalhos", tag: "28. Consulta", label: "28. Posso gravar?", text: `Por questões éticas e de privacidade, gravações não são permitidas, {{nome}}. Mas posso te enviar resumo escrito da conduta após a consulta. 🌿` },
  { id: "n29", tab: "atalhos", tag: "29. Consulta", label: "29. E se eu travar / chorar", text: `Tudo bem, {{nome}}. 💚 Eu respeito seu tempo — silêncio, choro, pausa, tudo faz parte. Você não precisa "performar" nada.` },
  { id: "n30", tab: "atalhos", tag: "30. Consulta", label: "30. Vai me dar diagnóstico já?", text: `Diagnóstico precisa de tempo e cuidado, {{nome}} — em geral começo com uma hipótese inicial na 1ª consulta, refinada nos retornos. Sem rótulos apressados. 🌿` },

  // ── Público Atendido (31–36)
  { id: "n31", tab: "atalhos", tag: "31. Público", label: "31. Idade mínima", text: `Atendo a partir de 16 anos, {{nome}}.` },
  { id: "n32", tab: "atalhos", tag: "32. Público", label: "32. Crianças", text: `{{nome}}, para crianças, indico profissional de saúde mental da infância. Se quiser, posso sugerir nomes de confiança. 💚` },
  { id: "n33", tab: "atalhos", tag: "33. Público", label: "33. Idosos", text: `Sim, {{nome}}, atendo adultos e idosos. Online costuma ser confortável — familiar pode acompanhar se quiser.` },
  { id: "n34", tab: "atalhos", tag: "34. Público", label: "34. Gestantes/lactantes", text: `Sim, {{nome}}, há cuidado adaptado para gestação e amamentação, em parceria com seu obstetra quando necessário. 🌿` },
  { id: "n35", tab: "atalhos", tag: "35. Público", label: "35. Brasileiros no exterior", text: `Sim, {{nome}}! Brasileiros morando fora podem se consultar — basta CPF ativo e internet boa. ${LINK}` },
  { id: "n36", tab: "atalhos", tag: "36. Público", label: "36. LGBTQIA+ friendly", text: `Sim, {{nome}}. 🏳️‍🌈 Espaço seguro, sem julgamento, com escuta afirmativa. Pronome de sua preferência respeitado.` },

  // ── Documentos (37–45) — atualizado com Sedex
  { id: "n37", tab: "atalhos", tag: "37. Doc", label: "37. Atestado", text: `Sim, {{nome}}, atestados são emitidos quando clinicamente indicados, com assinatura digital válida. 🌿` },
  { id: "n38", tab: "atalhos", tag: "38. Doc", label: "38. Relatório", text: `Sim, relatórios médicos são emitidos quando necessários, {{nome}} — geralmente entrego em até 7 dias úteis após a consulta.` },
  { id: "n39", tab: "atalhos", tag: "39. Doc", label: "39. Laudo", text: `Laudos para escola, trabalho, perícia ou benefício são emitidos com base na avaliação clínica, {{nome}}. Em casos complexos, pode ser necessária mais de uma consulta. 💚` },
  { id: "n40", tab: "atalhos", tag: "40. Doc", label: "40. Receita digital", text: `Receitas digitais (quando indicadas) têm assinatura ICP-Brasil, validade nacional e podem ser usadas em qualquer farmácia, {{nome}}. Para receitas A (amarela) e B (azul) com retenção, é envio físico via Sedex (R$ 100, PIX).` },
  { id: "n41", tab: "atalhos", tag: "41. Doc", label: "41. Recibo IR", text: `Sim, {{nome}}, o recibo serve para dedução no Imposto de Renda e reembolso parcial pelo plano de saúde, quando aplicável.` },
  { id: "n42", tab: "atalhos", tag: "42. Doc", label: "42. Laudo INSS", text: `Laudo para INSS é emitido quando há indicação clínica de afastamento, {{nome}}. Pode requerer mais de uma consulta para histórico consistente. 🌿` },
  { id: "n43", tab: "atalhos", tag: "43. Doc", label: "43. Declaração de comparecimento", text: `Claro, {{nome}}! Declaração de comparecimento é gratuita e enviada por e-mail logo após a consulta.` },
  { id: "n44", tab: "atalhos", tag: "44. Doc", label: "44. 2ª via de receita", text: `Para 2ª via de receita digital não vencida, {{nome}}, basta solicitar por aqui. Para renovação após vencimento, é necessária consulta de retorno (R$ 210). 🌿` },
  { id: "n45", tab: "atalhos", tag: "45. Doc", label: "45. Documentos para advogado/escola", text: `Documentos para terceiros (advogado, escola, RH) são emitidos com sua autorização expressa por escrito, {{nome}} — sigilo é prioridade. 💚` },

  // ── Cancelamento, Remarcação e Retornos (46–51)
  { id: "n46", tab: "atalhos", tag: "46. Cancel", label: "46. Como cancelar", text: `Sem problema, {{nome}}. Cancele direto no link da Doctoralia ou me avise por aqui. Mais de 24h de antecedência = reembolso integral. ${LINK}` },
  { id: "n47", tab: "atalhos", tag: "47. Cancel", label: "47. Remarcar", text: `Claro, {{nome}}! Me confirma o melhor dia/período e vejo o que tenho disponível. 🌿` },
  { id: "n48", tab: "atalhos", tag: "48. Cancel", label: "48. Faltei sem avisar", text: `Tudo bem acontecer, {{nome}}. 💚 Faltas sem aviso prévio (no-show) não geram reembolso, mas posso te ajudar a reagendar uma nova consulta. Quer marcar?` },
  { id: "n49", tab: "atalhos", tag: "49. Retorno", label: "49. Quando marcar retorno", text: `Em geral, primeiro retorno em 30 dias, {{nome}} — depois espaçamos conforme estabilidade. Alinho com você na consulta. 🌿` },
  { id: "n50", tab: "atalhos", tag: "50. Retorno", label: "50. Retorno tardio (sumi)", text: `Que bom te ver de volta, {{nome}}! 💚 Se a última consulta foi há mais de 6 meses, conto como nova primeira consulta (R$ 320). Até lá, é retorno (R$ 210).` },
  { id: "n51", tab: "atalhos", tag: "51. Cancel", label: "51. Cancelei e quero remarcar", text: `Claro, {{nome}}! Posso reativar seu agendamento — só me confirma o melhor horário e te envio o novo link. 🌿` },

  // ── Urgência e Crises (52–54)
  { id: "n52", tab: "atalhos", tag: "52. Urgência", label: "52. Crise agora", text: `{{nome}}, meu atendimento por aqui é ambulatorial. Em crise AGORA: CVV 188 (24h) | SAMU 192 | pronto-socorro mais próximo. 💚 Estou aqui pra te orientar.` },
  { id: "n53", tab: "atalhos", tag: "53. Urgência", label: "53. Pensamentos suicidas", text: `{{nome}}, obrigada por confiar em mim. 💚 Por favor, ligue AGORA no CVV 188 (24h, gratuito, sigiloso). Vou priorizar seu encaixe na minha agenda.` },
  { id: "n54", tab: "atalhos", tag: "54. Urgência", label: "54. Familiar em crise", text: `{{nome}}, peça ajuda AGORA: SAMU 192, pronto-socorro psiquiátrico ou CAPS. Não deixe a pessoa sozinha. CVV 188 também orienta familiares. 🌿` },

  // ── Após o Agendamento (55–58)
  { id: "n55", tab: "atalhos", tag: "55. Pós-agend", label: "55. Confirmação de agendamento", text: `Tudo certo, {{nome}}! ✅ Consulta marcada para {{data}}. Link chega no e-mail e WhatsApp 30 min antes. Qualquer dúvida, me chama. 💚` },
  { id: "n56", tab: "atalhos", tag: "56. Pós-agend", label: "56. Lembrete véspera", text: `Oi, {{nome}}! 🌿 Passando pra lembrar da nossa consulta amanhã ({{data}}). Tudo certo por aí?` },
  { id: "n57", tab: "atalhos", tag: "57. Pós-agend", label: "57. Lembrete 1h antes", text: `{{nome}}, sua consulta é em 1 hora! ⏰ Link da videochamada já está no seu e-mail. Recomendo entrar 5 min antes pra testar áudio/vídeo. 💚` },
  { id: "n58", tab: "atalhos", tag: "58. Pós-agend", label: "58. Link não chegou", text: `Vou te enviar agora mesmo, {{nome}}! 🌿 Verifica também a caixa de spam/promoções, tá? Qualquer coisa, me avisa.` },

  // ── Pós-Consulta (59–61)
  { id: "n59", tab: "atalhos", tag: "59. Pós-consulta", label: "59. Como foi a consulta?", text: `Oi, {{nome}}! 💚 Como você se sentiu na nossa consulta? Seu retorno é importante pra eu cuidar bem de você.` },
  { id: "n60", tab: "atalhos", tag: "60. Pós-consulta", label: "60. Avaliação Doctoralia", text: `{{nome}}, se a consulta fez sentido pra você, sua avaliação na Doctoralia ajuda muito outras pessoas a chegarem até mim. 🌿💚 ${LINK}` },
  { id: "n61", tab: "atalhos", tag: "61. Pós-consulta", label: "61. Dúvida pós-consulta", text: `Claro, {{nome}}! 🌿 Pode mandar a dúvida por aqui — te respondo em horário comercial. Lembrando: dúvidas que mudem conduta requerem retorno.` },

  // ── Diversos (62–68)
  { id: "n62", tab: "atalhos", tag: "62. Diversos", label: "62. Indicação de psicoterapia", text: `Sim, {{nome}}! Trabalho junto com psicólogos(as) de confiança. Posso te indicar nomes alinhados ao seu caso após a primeira consulta. 💚` },
  { id: "n63", tab: "atalhos", tag: "63. Diversos", label: "63. Indicação para outro especialista", text: `Sem problema, {{nome}}! Após avaliação, te oriento sobre o(a) especialista certo(a) pro seu caso. 🌿` },
  { id: "n64", tab: "atalhos", tag: "64. Diversos", label: "64. Conteúdo das redes sociais", text: `Que bom que acompanha, {{nome}}! 💚 Minhas publicações são informativas e não substituem consulta. Pra cuidado individual: ${LINK}` },
  { id: "n65", tab: "atalhos", tag: "65. Diversos", label: "65. Parceria/imprensa", text: `Olá, {{nome}}! Para parcerias, imprensa ou eventos, por favor envie sua proposta para o e-mail comercial — eu retorno assim que possível. 🌿` },
  { id: "n66", tab: "atalhos", tag: "66. Diversos", label: "66. Reclamação", text: `Sinto muito que você passou por isso, {{nome}}. 💚 Sua percepção é importante — me conta o que aconteceu pra eu entender e buscar a melhor solução com você.` },
  { id: "n67", tab: "atalhos", tag: "67. Diversos", label: "67. Elogio / agradecimento", text: `Que alegria ler isso, {{nome}}! 💚 Muito obrigada por confiar — fica comigo no coração.` },
  { id: "n68", tab: "atalhos", tag: "68. Diversos", label: "68. Despedida cordial", text: `Qualquer coisa, é só me chamar por aqui, {{nome}}! 🌿 Cuide-se com carinho. 💚` },

  // ============================================================
  // MÓDULOS CX — Arquitetura para telemedicina (1ª pessoa, expandido)
  // ============================================================

  // ── Módulo A — Saudação, Triagem e Emergência
  {
    id: "m-A-1", tab: "modulos", tag: "A. Saudação",
    label: "A.1 — Mensagem de boas-vindas (auto)",
    text: `Olá! 💚 Sou a Dra. Jéssica Carpaneda — saúde mental.

Pra te atender melhor, escolha:
1️⃣ Quero agendar uma consulta
2️⃣ Já sou paciente (dúvida / receita / atestado)
3️⃣ Outras informações (valores, formato, documentos)
4️⃣ Estou em crise / preciso de ajuda urgente

Responda com o número 🌿`,
  },
  {
    id: "m-A-2", tab: "modulos", tag: "A. Triagem",
    label: "A.2 — Triagem clínica curta (3 perguntas)",
    text: `Perfeito, {{nome}}! Pra te orientar bem, me conta rapidinho:

1) O que está te trazendo aqui hoje? (uma frase basta)
2) Há quanto tempo isso acontece?
3) Já fez algum acompanhamento em saúde mental antes? Está em uso de alguma medicação?

Pode responder no seu tempo. 💚`,
  },
  {
    id: "m-A-3", tab: "modulos", tag: "A. Emergência",
    label: "A.3 — Protocolo de emergência (rota 4)",
    text: `{{nome}}, fico grata por ter buscado ajuda. 💚 Meu atendimento por aqui é ambulatorial, então em situação de crise AGORA o caminho mais seguro é:

🚑 SAMU 192
☎️ CVV 188 (24h, gratuito, sigiloso) — ligação ou chat em cvv.org.br
🏥 Pronto-socorro psiquiátrico mais próximo
🏛️ CAPS da sua região

Após estabilizar, te encaixo na minha agenda em prioridade. Estou aqui. 🌿`,
  },
  {
    id: "m-A-4", tab: "modulos", tag: "A. Triagem",
    label: "A.4 — Encaminhamento por gravidade",
    text: `{{nome}}, com base no que você me contou, classifico assim:

🟢 Leve/moderado → agendamento ambulatorial comigo nos próximos dias
🟡 Moderado/intenso com sofrimento alto → vou priorizar encaixe esta semana
🔴 Risco agudo (ideação ativa, plano, tentativa) → avaliação presencial AGORA (SAMU 192 / PS) + encaixe pós-estabilização

Vou seguir conforme o caso. 💚`,
  },

  // ── Módulo B — Passo a Passo da Consulta Online
  {
    id: "m-B-1", tab: "modulos", tag: "B. Passo a passo",
    label: "B.1 — Como funciona a teleconsulta",
    text: `Como vai funcionar nossa consulta, {{nome}}: 🌿

📅 1. Agendamento → você escolhe o horário em ${LINK}
💳 2. Pagamento → PIX, débito ou crédito (parcelável) pelo checkout da Doctoralia
✉️ 3. Confirmação → chega por e-mail e WhatsApp
🔗 4. Link da videochamada → enviado 30 min antes
👩‍⚕️ 5. Consulta → 70 min (1ª) ou 30 min (retorno) comigo
📋 6. Plano de cuidado → conduta + documentos enviados após a consulta

Simples assim. 💚`,
  },
  {
    id: "m-B-2", tab: "modulos", tag: "B. Pré-consulta",
    label: "B.2 — Checklist pré-consulta",
    text: `{{nome}}, pra nossa consulta fluir bem:

✅ Lugar tranquilo, com privacidade
✅ Internet estável (Wi-Fi de preferência)
✅ Fone de ouvido (mais conforto e sigilo)
✅ Documentos em mãos: exames, relatórios, lista de medicações
✅ Caderno e caneta pra anotações
✅ Entre 5 min antes pra testar áudio/vídeo

Se cair conexão, a gente reconecta — sem stress. 🌿`,
  },
  {
    id: "m-B-3", tab: "modulos", tag: "B. Plataforma",
    label: "B.3 — Plataforma e tecnologia",
    text: `{{nome}}, a teleconsulta acontece em plataforma criptografada de telemedicina, conforme exigência do CFM. 🔒

📱 Funciona em celular ou computador
🌐 Abre direto no navegador (sem instalar app)
🎥 Câmera, microfone e internet — só isso
🔐 Sigilo absoluto + LGPD

Link chega por e-mail e WhatsApp 30 min antes. 🌿`,
  },

  // ── Módulo C — Pagamento, Agendamento e Reembolso (atualizado)
  {
    id: "m-C-1", tab: "modulos", tag: "C. Pagamento",
    label: "C.1 — Política de pagamento",
    text: `Política de pagamento, {{nome}}:

💳 Consulta: PIX, débito ou crédito (parcelável) — checkout da Doctoralia
🏦 Confirmação automática por e-mail
📄 Recibo emitido após a consulta (vale pra IR e reembolso de plano)
📦 Receita controlada A/B em via física: taxa fixa de R$ 100 (Sedex), pagamento exclusivamente por PIX direto comigo, postagem em até 2 dias úteis após confirmação, código de rastreamento enviado por aqui
❌ Não recebo PIX direto da consulta — sempre pelo link oficial da Doctoralia

Qualquer dúvida, me chama. 🌿`,
  },
  {
    id: "m-C-2", tab: "modulos", tag: "C. Reembolso",
    label: "C.2 — Política de cancelamento e reembolso",
    text: `Política de cancelamento e reembolso, {{nome}} (regra oficial Doctoralia):

🟢 Cancelamento com MAIS de 24h de antecedência → reembolso INTEGRAL (100%) automático pela Doctoralia, no mesmo meio de pagamento
🔴 Cancelamento com MENOS de 24h ou falta sem aviso (no-show) → sem reembolso (cobre a reserva do horário)

🔁 Em casos de força maior (luto, internação, intercorrência grave, comprovados) avalio individualmente o reagendamento sem custo.

📦 Taxa de envio físico de receita controlada A/B (R$ 100, PIX) é não reembolsável após a postagem — antes da postagem, devolvo integralmente.

💚 ${LINK}`,
  },
  {
    id: "m-C-3", tab: "modulos", tag: "C. Reembolso plano",
    label: "C.3 — Reembolso pelo plano de saúde",
    text: `{{nome}}, o atendimento é particular, mas você pode pedir reembolso parcial ao seu plano de saúde:

1️⃣ Após a consulta, você recebe o recibo
2️⃣ Ligue no SAC do plano e pergunte sobre reembolso para consulta em saúde mental (CBHPM 50000462)
3️⃣ Envie o recibo pelo app/site do plano
4️⃣ O reembolso cai na sua conta em alguns dias úteis

Cada plano tem regras próprias — vale ligar antes da consulta pra confirmar valores. 🌿`,
  },
  {
    id: "m-C-4", tab: "modulos", tag: "C. Receita Sedex",
    label: "C.4 — Envio de receita controlada A/B (Sedex)",
    text: `{{nome}}, fluxo do envio físico da receita controlada (tipos A e B com retenção):

1️⃣ Confirmo que a indicação consta da última consulta
2️⃣ Te envio chave PIX da taxa: R$ 100,00 (Sedex)
3️⃣ Você confirma seu endereço completo (CEP, rua, número, complemento, referência)
4️⃣ Pagamento exclusivamente por PIX → me manda o comprovante
5️⃣ Posto em até 2 dias úteis após confirmação
6️⃣ Te envio o código de rastreamento Sedex aqui pelo WhatsApp

⚠️ Sem pagamento confirmado, não há postagem.
⚠️ Após a postagem, a taxa não é reembolsável (extravio dos Correios é tratado pela Doctoralia/Correios).

Qualquer dúvida, me avisa. 💚`,
  },

  // ── Módulo D — Lembretes e Checklist
  {
    id: "m-D-1", tab: "modulos", tag: "D. Lembrete",
    label: "D.1 — Lembrete D-1 (véspera)",
    text: `Oi, {{nome}}! 🌿 Passando pra lembrar da nossa consulta amanhã ({{data}}).

📍 100% online — link chega 30 min antes
✅ Checklist: lugar tranquilo, internet boa, exames em mãos
💬 Qualquer dúvida, me chama por aqui

Até amanhã! 💚`,
  },
  {
    id: "m-D-2", tab: "modulos", tag: "D. Lembrete",
    label: "D.2 — Lembrete D-0 (1h antes)",
    text: `{{nome}}, sua consulta é em 1 hora! ⏰

🔗 Link já está no seu e-mail e WhatsApp
🎧 Recomendo entrar 5 min antes pra testar áudio/vídeo
🌿 Respira fundo — vai dar tudo certo

Tô aqui se precisar. 💚`,
  },
  {
    id: "m-D-3", tab: "modulos", tag: "D. Checklist",
    label: "D.3 — Checklist final 5 min antes",
    text: `{{nome}}, últimos 5 minutos! 🌿

✅ Câmera funcionando
✅ Microfone testado
✅ Fone conectado
✅ Lugar privado
✅ Documentos por perto
✅ Água do lado 💧

Te vejo já já. 💚`,
  },

  // ── Módulo E — Gestão de Limites Éticos
  {
    id: "m-E-1", tab: "modulos", tag: "E. Limites",
    label: "E.1 — Não faço diagnóstico por WhatsApp",
    text: `{{nome}}, entendo a urgência da sua dúvida. 💚 Por questões éticas (CFM), não posso passar diagnóstico, prescrição nem ajustes de conduta por WhatsApp — defino só em consulta, com avaliação individual.

Por aqui, posso te orientar sobre agendamento, valores, documentos e dúvidas administrativas. Pra cuidado clínico: ${LINK}`,
  },
  {
    id: "m-E-2", tab: "modulos", tag: "E. Limites",
    label: "E.2 — Não sou plantão / urgência",
    text: `{{nome}}, importante: meu atendimento é ambulatorial e agendado. 🌿 Não faço plantão 24h por WhatsApp.

Em urgência:
🚑 SAMU 192
☎️ CVV 188 (24h)
🏥 Pronto-socorro mais próximo

Aqui no chat respondo em horário comercial (seg-sex, 9h-18h). 💚`,
  },
  {
    id: "m-E-3", tab: "modulos", tag: "E. Limites",
    label: "E.3 — Sigilo e LGPD",
    text: `{{nome}}, sua privacidade é prioridade. 🔒

🛡️ Tudo que você compartilha aqui e em consulta é protegido por sigilo médico (CFM) e LGPD
📵 Não compartilho seus dados com terceiros sem autorização expressa
🗂️ Prontuário guardado em sistema seguro, com acesso restrito
⚠️ Exceções legais: risco iminente à vida (próprio ou de terceiros) e ordem judicial

Pode ficar tranquila(o). 💚`,
  },
  {
    id: "m-E-4", tab: "modulos", tag: "E. Limites",
    label: "E.4 — Não respondo amigos/familiares do paciente",
    text: `Olá! 🌿 Por sigilo médico, não posso confirmar nem comentar nada sobre meus pacientes.

Se houver preocupação com alguém, oriente a pessoa a procurar ajuda direta — agendamento em ${LINK} ou, se for urgência, CVV 188 / SAMU 192. 💚`,
  },

  // ── Módulo F — Ausência e Plantão Digital
  {
    id: "m-F-1", tab: "modulos", tag: "F. Ausência",
    label: "F.1 — Resposta automática fora do horário",
    text: `Oi! 🌙 Recebi sua mensagem fora do meu horário (seg-sex, 9h-18h). Amanhã cedo te respondo com calma.

⚠️ Em urgência: CVV 188 (24h, gratuito) | SAMU 192 | pronto-socorro mais próximo. 💚`,
  },
  {
    id: "m-F-2", tab: "modulos", tag: "F. Ausência",
    label: "F.2 — Férias / ausência prolongada",
    text: `Olá, {{nome}}! 🌿 Estou em período de descanso e retorno previsto após {{data}}. Durante esse tempo, novos agendamentos seguem normalmente — só serão atendidos a partir da minha volta.

Pacientes em acompanhamento que precisem de cuidado urgente serão orientados sobre profissionais de cobertura. Em emergência: CVV 188 / SAMU 192. 💚`,
  },
  {
    id: "m-F-3", tab: "modulos", tag: "F. Ausência",
    label: "F.3 — Plantão digital (horários e escopo)",
    text: `{{nome}}, meu plantão digital funciona seg-sex, 9h-18h, por aqui no WhatsApp. 🌿

✅ O que respondo: agendamento, valores, formato, documentos administrativos, orientações
❌ O que NÃO respondo: diagnóstico, prescrição, ajuste de medicação, urgência clínica

Cuidado clínico = só em consulta. Urgência = CVV 188 / SAMU 192. 💚`,
  },

  // ── Extra — Ficha de Acolhimento Pós-Agendamento
  {
    id: "m-X-1", tab: "modulos", tag: "X. Ficha",
    label: "X.1 — Ficha de acolhimento pós-agendamento",
    text: `{{nome}}, sua consulta está confirmada para {{data}}! ✅ Pra eu te conhecer melhor antes do nosso encontro, responde no seu tempo:

1) Nome completo e idade:
2) Cidade/estado onde mora:
3) Em uma frase, o que te trouxe aqui:
4) Há quanto tempo sente isso:
5) Já fez acompanhamento em saúde mental antes? Está em uso de alguma medicação?
6) Tem alguma condição clínica relevante (cardiopatia, gestação, etc.)?
7) Algo que considera importante eu saber antes:

Sem pressa — pode mandar em partes. Tudo é sigiloso. 💚`,
  },
  {
    id: "m-X-2", tab: "modulos", tag: "X. Ficha",
    label: "X.2 — Confirmação após receber ficha",
    text: `Recebi tudo, {{nome}}! 💚 Vou revisar antes da nossa consulta. Qualquer coisa que faltar, conversamos direto no nosso encontro. 🌿

Até {{data}}!`,
  },
  {
    id: "m-X-3", tab: "modulos", tag: "X. Ficha",
    label: "X.3 — Sugestão de escalas auto-aplicadas",
    text: `{{nome}}, antes da consulta, posso te enviar 1 ou 2 escalas curtas pra você responder no seu tempo (5-10 min cada)? Ajuda muito a aprofundar a avaliação:

• PHQ-9 (sintomas depressivos)
• GAD-7 (ansiedade)
• ASRS-18 (TDAH adulto)
• MDQ (rastreio de bipolaridade)
• AUDIT (uso de álcool)

Me diz qual(is) faz sentido pro seu caso. 🌿`,
  },

  // ── Fluxo Ideal de Atendimento (mapa)
  {
    id: "m-Z-1", tab: "modulos", tag: "Z. Fluxo",
    label: "Z. Fluxo ideal de atendimento (mapa)",
    text: `🗺️ FLUXO IDEAL — ATENDIMENTO WHATSAPP

1. CONTATO → Saudação automática (Módulo A.1)
   ↓
2. CLASSIFICAÇÃO (responde 1/2/3/4)
   ├── 1. Agendar → Triagem A.2 → A.4 (gravidade) → encaixe → B.1 → C.1 → confirmação → X.1 (ficha) → X.3 (escalas)
   ├── 2. Já é paciente → atender dúvida (atalhos 37-51) ou aplicar limite E.1 / receita Sedex (C.4)
   ├── 3. Informações → atalhos 04-23 conforme tema
   └── 4. CRISE → A.3 (emergência) + protocolo Risco r-01..r-11
   ↓
3. PRÉ-CONSULTA → D.1 (lembrete D-1) → D.2 (D-0 1h antes) → D.3 (5min)
   ↓
4. CONSULTA (online comigo)
   ↓
5. PÓS-CONSULTA → atalhos 59-61 → recibo/documentos / receita Sedex se A/B
   ↓
6. RETENÇÃO → follow-up gentil (atalho 60 — avaliação Doctoralia)

⚠️ Em qualquer ponto: se aparecer sinal de risco, pular para Módulo Risco (sondagem r-01 → conduta conforme nível). 💚`,
  },

  // ============================================================
  // EXTRAS — Respostas adicionais por tema (1ª pessoa, tom "porto seguro")
  // ============================================================

  // ── Acolhimento extras (perfil real: "porto seguro", "fardo pesado")
  {
    id: "c-fardo-pesado",
    tab: "casuais",
    label: "\"Tô com o mundo nas costas\"",
    text: `{{nome}}, te leio. 💚 Quando o fardo está pesado demais pra carregar sozinha(o), buscar ajuda não é fraqueza — é sabedoria. Aqui é um lugar de pausa: a gente divide esse peso e procura juntas(os) o caminho de volta pro seu bem-estar.

Sem cobrança, sem julgamento. Quando quiser começar: ${LINK} 🌿`,
  },
  {
    id: "c-mente-cansada",
    tab: "casuais",
    label: "\"Minha mente não para\"",
    text: `Entendo, {{nome}}. 🌿 Esse turbilhão na cabeça — pensamentos acelerados, sensação de que você não consegue desligar — é exaustivo e tem nome, tem causa e tem tratamento.

Posso te ajudar a entender o que está acontecendo. Primeira consulta online, 70 min: ${LINK} 💚`,
  },
  {
    id: "c-sem-leveza",
    tab: "casuais",
    label: "\"Perdi a leveza\"",
    text: `{{nome}}, sentir que perdeu a leveza, que tudo virou peso, é um dos sinais mais comuns que escuto aqui. 💚 E é totalmente possível reencontrar a alegria de habitar a sua própria vida — com tempo, escuta e o cuidado certo.

Quando quiser dar esse passo: ${LINK} 🌿`,
  },
  {
    id: "c-tentando-ser-forte",
    tab: "casuais",
    label: "\"Tô tentando ser forte\"",
    text: `{{nome}}, a mente adoece justamente de tanto tentar ser forte. 🌿 Aqui você não precisa carregar essa armadura — pode chegar do jeito que está.

Meu papel não é te trazer mais cobrança, é amparar. Quando quiser: ${LINK} 💚`,
  },

  // ── Atalhos extras (69-110)
  { id: "n69", tab: "atalhos", tag: "69. Sobre mim", label: "69. Quem é a doutora", text: `Sou a Dra. Jéssica Carpaneda, {{nome}} — médica (CRM GO 31189), pós-graduanda em Psiquiatria e Saúde Mental (Afya). Atuo principalmente com ansiedade, TDAH no adulto, depressão, insônia e burnout. Atendimento 100% online, em todo o Brasil. 🌿` },
  { id: "n70", tab: "atalhos", tag: "70. Sobre mim", label: "70. Formação / RQE", text: `{{nome}}, sou médica (CRM GO 31189) com pós-graduação em Psiquiatria e Saúde Mental pela Afya — em processo de obtenção do RQE. Atuo dentro do escopo legal da minha formação, com escuta clínica cuidadosa. 💚` },
  { id: "n71", tab: "atalhos", tag: "71. Sobre mim", label: "71. Especialista em quê?", text: `Atuo principalmente com ansiedade, TDAH no adulto, depressão, insônia e burnout, {{nome}}. Também acompanho transtornos do humor, do sono e quadros relacionados ao esgotamento. 🌿` },
  { id: "n72", tab: "atalhos", tag: "72. Sobre mim", label: "72. Abordagem", text: `{{nome}}, minha abordagem combina ciência (medicação quando necessário) e humanidade (escuta cuidadosa, sem pressa de carimbar diagnóstico). Trabalho em parceria com psicólogos(as) e respeito o seu tempo. 💚` },
  { id: "n73", tab: "atalhos", tag: "73. Sobre mim", label: "73. 5 endereços?", text: `{{nome}}, os endereços que aparecem na Doctoralia são apenas cadastrais. Atendo exclusivamente online, por videochamada, em todo o Brasil. 🌿` },

  { id: "n74", tab: "atalhos", tag: "74. TDAH", label: "74. TDAH — como investigo", text: `{{nome}}, na investigação de TDAH adulto eu uso escuta clínica detalhada + escalas validadas (ASRS-18, DIVA quando necessário) + análise de impacto funcional ao longo da vida. Não preciso de exames antes da 1ª consulta. 💚` },
  { id: "n75", tab: "atalhos", tag: "75. TDAH", label: "75. TDAH — quantas consultas", text: `Em geral, o diagnóstico de TDAH no adulto se confirma entre a 1ª consulta e o 1º retorno (30 dias), {{nome}}. Depois entramos na fase de tratamento e ajuste fino. 🌿` },
  { id: "n76", tab: "atalhos", tag: "76. TDAH", label: "76. TDAH — preciso de neuropsicológico?", text: `Nem sempre, {{nome}}. O diagnóstico de TDAH é clínico — o neuropsicológico pode ajudar em casos duvidosos ou para diferenciar de outros quadros. Decidimos juntas(os) se faz sentido. 💚` },

  { id: "n77", tab: "atalhos", tag: "77. Ansiedade", label: "77. Ansiedade — sem remédio?", text: `Sim, {{nome}}, muitos quadros ansiosos respondem bem a mudanças de hábito + psicoterapia, sem medicação. Avalio caso a caso e decidimos juntas(os) o melhor caminho. 🌿` },
  { id: "n78", tab: "atalhos", tag: "78. Ansiedade", label: "78. Crise de pânico — o que faço agora?", text: `{{nome}}, na crise: respiração 4-7-8 (inspira 4s, segura 7s, solta 8s), os pés bem firmes no chão, gole de água gelada. A crise passa em 10-20 min mesmo parecendo eterna. 💚 Pra cuidar do quadro: ${LINK}` },

  { id: "n79", tab: "atalhos", tag: "79. Insônia", label: "79. Insônia — primeiros passos", text: `{{nome}}, antes de qualquer remédio, a gente revisa higiene do sono (horários, telas, cafeína, ambiente) e técnicas comportamentais (controle de estímulo, restrição de sono). Em muitos casos, isso já resolve. 🌿` },
  { id: "n80", tab: "atalhos", tag: "80. Insônia", label: "80. Insônia — uso melatonina?", text: `{{nome}}, melatonina pode ajudar em alguns casos (atraso de fase, jet lag), mas não é "remédio pra dormir" universal. Vamos avaliar o seu padrão de sono primeiro. 💚` },

  { id: "n81", tab: "atalhos", tag: "81. Burnout", label: "81. Burnout — preciso afastar?", text: `Depende do quadro, {{nome}}. Avalio sintomas, função e contexto — quando há indicação clínica, emito laudo de afastamento. Não dá pra prescrever afastamento por WhatsApp; precisa de consulta. 🌿` },
  { id: "n82", tab: "atalhos", tag: "82. Burnout", label: "82. Burnout — só descanso resolve?", text: `Descanso ajuda, {{nome}}, mas burnout costuma envolver mudanças mais profundas: padrão de cobrança, limites, suporte. A gente trabalha tudo isso no acompanhamento. 💚` },

  { id: "n83", tab: "atalhos", tag: "83. Depressão", label: "83. Depressão — quanto tempo melhora?", text: `{{nome}}, a maioria dos pacientes começa a sentir melhora em 2-6 semanas de tratamento bem ajustado. O processo completo de recuperação leva alguns meses, com retornos regulares. 🌿` },
  { id: "n84", tab: "atalhos", tag: "84. Depressão", label: "84. Depressão — vou ficar dependente?", text: `Antidepressivos não causam dependência química, {{nome}}. Eles têm tempo de uso recomendado (geralmente 6-12 meses após melhora) e a retirada é gradual, planejada juntas(os). 💚` },

  { id: "n85", tab: "atalhos", tag: "85. Medicação", label: "85. Vai me drogar?", text: `Não, {{nome}}. 🌿 Medicação psiquiátrica bem indicada não te \"droga\" — corrige o que está desregulado pra você voltar a ser você. Qualquer indicação é conversada com você, com prós e contras na mesa.` },
  { id: "n86", tab: "atalhos", tag: "86. Medicação", label: "86. Quanto tempo de tratamento?", text: `Depende do quadro, {{nome}}. Em geral: 6-12 meses para episódios únicos de depressão/ansiedade; uso contínuo em quadros recorrentes ou crônicos (TDAH, bipolar). Sempre reavaliado em consulta. 💚` },
  { id: "n87", tab: "atalhos", tag: "87. Medicação", label: "87. E os efeitos colaterais?", text: `{{nome}}, todo medicamento tem possibilidade de efeitos. Eu sempre explico o que esperar, o que é passageiro e o que precisa de aviso imediato. A gente ajusta dose e troca se necessário. 🌿` },
  { id: "n88", tab: "atalhos", tag: "88. Medicação", label: "88. Posso parar quando quiser?", text: `{{nome}}, pode sim — mas com plano. Parada abrupta de alguns remédios traz desconforto ou recaída. A gente combina a retirada juntas(os), no momento certo. 💚` },

  { id: "n89", tab: "atalhos", tag: "89. Receita", label: "89. Receita digital — como recebo?", text: `Receitas digitais (com assinatura ICP-Brasil) chegam por e-mail logo após a consulta, {{nome}}. Você apresenta no celular ou imprime — vale em qualquer farmácia do Brasil. 🌿` },
  { id: "n90", tab: "atalhos", tag: "90. Receita", label: "90. Receita controlada A/B (Sedex)", text: `{{nome}}, receita controlada tipo A (amarela) e B (azul) com retenção precisa ser enviada física. Taxa fixa de R$ 100 (Sedex), pagamento por PIX, postagem em até 2 dias úteis e código de rastreamento te enviado por aqui. 💚` },
  { id: "n91", tab: "atalhos", tag: "91. Receita", label: "91. Validade da receita", text: `{{nome}}: receita comum vale 6 meses; receita B (azul) vale 30 dias; receita A (amarela, retinoides/opioides) vale 30 dias e é retida na farmácia. 🌿` },

  { id: "n92", tab: "atalhos", tag: "92. 1ª consulta", label: "92. O que esperar da 1ª consulta", text: `{{nome}}, na 1ª consulta (70 min) eu te ouço com calma, faço perguntas sobre seu histórico, sintomas e contexto, e construímos juntas(os) uma hipótese inicial e o primeiro plano de cuidado. Sem pressa, sem rótulo apressado. 💚` },
  { id: "n93", tab: "atalhos", tag: "93. 1ª consulta", label: "93. Preciso levar exames?", text: `Se tiver, traz! {{nome}}, exames recentes (sangue, tireoide, B12, vit D), relatórios anteriores e lista de medicações em uso ajudam muito. Se não tiver, sem problema — peço o que precisar. 🌿` },
  { id: "n94", tab: "atalhos", tag: "94. 1ª consulta", label: "94. Vou precisar de exames depois?", text: `{{nome}}, em alguns casos sim — sangue, tireoide, B12, vit D pra descartar causas clínicas. Eu prescrevo na consulta se for o caso, e a gente revisa no retorno. 💚` },

  { id: "n95", tab: "atalhos", tag: "95. Retorno", label: "95. Quanto tempo dura o retorno", text: `30 minutos, {{nome}}. Tempo focado em revisar evolução, ajustar plano e renovar receita quando necessário. 🌿` },
  { id: "n96", tab: "atalhos", tag: "96. Retorno", label: "96. Posso fazer só 1 consulta?", text: `Pode, {{nome}} — mas vale lembrar: tratamento em saúde mental funciona com continuidade. A 1ª consulta inicia, e o(s) retorno(s) ajustam o que precisar. 💚` },

  { id: "n97", tab: "atalhos", tag: "97. WhatsApp", label: "97. Posso te chamar entre consultas?", text: `Pode, {{nome}}, dentro do meu horário (seg-sex, 9h-18h) e para dúvidas administrativas ou orientações pontuais. Diagnóstico, ajuste de medicação e renovação de receita = só em consulta. 🌿` },
  { id: "n98", tab: "atalhos", tag: "98. WhatsApp", label: "98. Quanto tempo demora resposta", text: `Costumo responder em algumas horas dentro do horário comercial, {{nome}}. Fora desse horário, retorno no próximo dia útil. 💚` },

  { id: "n99", tab: "atalhos", tag: "99. Cancelamento", label: "99. Como cancelar (regra Doctoralia)", text: `{{nome}}, pelo painel da Doctoralia: cancelamento com mais de 24h de antecedência tem reembolso INTEGRAL automático. Menos de 24h ou no-show: sem reembolso. ${LINK}` },
  { id: "n100", tab: "atalhos", tag: "100. Cancelamento", label: "100. Reembolso quando cai", text: `O reembolso da Doctoralia cai automaticamente no mesmo meio de pagamento (PIX/cartão), em até 7 dias úteis, {{nome}}. 🌿` },

  { id: "n101", tab: "atalhos", tag: "101. Plano de saúde", label: "101. CBHPM consulta", text: `{{nome}}, o código CBHPM da consulta em saúde mental é 50000462 — é esse que o seu plano usa pra calcular reembolso. Vale ligar no SAC do plano antes pra confirmar o valor. 💚` },
  { id: "n102", tab: "atalhos", tag: "102. Plano de saúde", label: "102. Plano cobre teleconsulta?", text: `A maioria dos planos cobre teleconsulta, {{nome}} — mas o valor de reembolso varia muito. Liga no SAC do seu plano e pergunta pelo código 50000462 (consulta em saúde mental). 🌿` },

  { id: "n103", tab: "atalhos", tag: "103. Privacidade", label: "103. Vai aparecer no meu nome em algum lugar?", text: `Não, {{nome}}. 🔒 A consulta é sigilosa e não aparece em sistemas públicos, do trabalho ou em buscas. O recibo e a receita ficam só com você. 💚` },
  { id: "n104", tab: "atalhos", tag: "104. Privacidade", label: "104. Empresa vai saber?", text: `Não, {{nome}}. Sua consulta não é informada a empregador, escola ou plano sem sua autorização expressa. Atestado e laudo são entregues a você, e você decide se apresenta. 🌿` },

  { id: "n105", tab: "atalhos", tag: "105. Família", label: "105. Posso marcar pra outra pessoa?", text: `Pode iniciar o contato, {{nome}}, mas o agendamento precisa ser confirmado pelo(a) próprio(a) paciente (acima de 16 anos), por questão ética e de vínculo. 💚` },

  { id: "n106", tab: "atalhos", tag: "106. Anti-fraude", label: "106. \"Atendem por R$ 50?\"", text: `{{nome}}, meu valor é R$ 320 (1ª) e R$ 210 (retorno). Se viu valor diferente em algum lugar fora da Doctoralia, provavelmente é golpe — só agendo pelo link oficial: ${LINK}` },
  { id: "n107", tab: "atalhos", tag: "107. Anti-fraude", label: "107. Outra pessoa pediu PIX em meu nome", text: `{{nome}}, atenção: nunca peço PIX pra agendar consulta — o pagamento é sempre pelo checkout da Doctoralia. Só recebo PIX direto na taxa de envio físico de receita A/B (R$ 100), e sempre confirmo a chave por aqui. 🛡️` },

  { id: "n108", tab: "atalhos", tag: "108. Diversos", label: "108. Acompanhamento por quanto tempo?", text: `Varia, {{nome}}: alguns quadros estabilizam em 6-12 meses; outros (TDAH, bipolar, recorrentes) pedem acompanhamento contínuo, com retornos espaçados. A gente revisa juntas(os) sempre. 🌿` },
  { id: "n109", tab: "atalhos", tag: "109. Diversos", label: "109. Mudei de cidade — continua?", text: `Continua, {{nome}}! 💚 Como atendo só online, mudança de cidade não interrompe — basta manter o CPF ativo. Se for pra fora do Brasil, também atendo brasileiros no exterior.` },
  { id: "n110", tab: "atalhos", tag: "110. Diversos", label: "110. Reagendamento por intercorrência minha", text: `{{nome}}, se eu precisar reagendar por algum motivo de força maior, te aviso o quanto antes e te ofereço novos horários sem custo. Compromisso é via de mão dupla. 🌿💚` },

  // ── Objeções extras
  {
    id: "o-rqe",
    tab: "objecoes",
    label: "\"Você é psiquiatra mesmo?\"",
    text: `Pergunta justa, {{nome}}. 🌿 Sou médica (CRM GO 31189) e atualmente pós-graduanda em Psiquiatria e Saúde Mental pela Afya — em processo de obtenção do RQE. Atuo dentro do escopo legal da minha formação médica, com escuta clínica cuidadosa e foco em saúde mental. Transparência total. 💚`,
  },
  {
    id: "o-confianca-online",
    tab: "objecoes",
    label: "\"Não confio em médico online\"",
    text: `Entendo, {{nome}}. 🌿 A teleconsulta é regulamentada pelo CFM (Resolução 2.314/2022) e tem mesma validade legal da presencial. Pacientes relatam se sentir mais à vontade falando de casa — e a continuidade do cuidado fica mais fácil. Se não fluir, você não fica preso(a). ${LINK} 💚`,
  },
  {
    id: "o-tempo-resposta",
    tab: "objecoes",
    label: "\"Vc demora pra responder\"",
    text: `Tem razão, {{nome}} — me desculpa. 💚 Respondo dentro do meu horário (seg-sex, 9h-18h) e às vezes acumula. Se for urgente clínica: CVV 188 / SAMU 192. Pra agendar / dúvidas, fico à disposição já já. 🌿`,
  },
];

