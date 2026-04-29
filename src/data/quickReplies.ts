export type QuickReplyTab = "fillers" | "casuais" | "atalhos" | "objecoes";

export type QuickReply = {
  id: string;
  tab: QuickReplyTab;
  label: string;
  text: string;
  tag?: string; // sub-categoria (ex: "TDAH", "Valor", "Receita")
};

const LINK = "https://www.doctoralia.com.br/z/FcjTe4";

export const quickReplyTabs: { id: QuickReplyTab; label: string; description: string }[] = [
  { id: "fillers", label: "Coringas", description: "Mensagens curtas de transição enquanto você verifica algo" },
  { id: "casuais", label: "Acolhimento", description: "Respostas humanizadas, tom 'chinelo', leves e próximas" },
  { id: "atalhos", label: "Atalhos", description: "Mini-respostas de 1-2 linhas para dúvidas comuns" },
  { id: "objecoes", label: "Objeções", description: "Respostas que escorregam objeções clássicas com cuidado" },
];

export const quickReplies: QuickReply[] = [
  // ---------------- FILLERS / CORINGAS ----------------
  { id: "f-oi", tab: "fillers", label: "Saudação inicial", text: `Oi, {{nome}}! Tudo bem? 🌿 Recebi sua mensagem, só um instante que já te respondo com calma.` },
  { id: "f-conferir", tab: "fillers", label: "Vou conferir agenda", text: `Deixa eu dar uma olhadinha na agenda da Dra. Jéssica e já te confirmo, tá? Um minutinho. 💚` },
  { id: "f-confirmar", tab: "fillers", label: "Confirmando informação", text: `Só pra eu te passar a informação correta, deixa eu confirmar com a doutora rapidinho. Já volto.` },
  { id: "f-entendi", tab: "fillers", label: "Entendi a dúvida", text: `Entendi, {{nome}}. Faz todo sentido sua dúvida — me dá só um momento que te explico direitinho.` },
  { id: "f-obrigado", tab: "fillers", label: "Agradecimento", text: `Que ótimo, {{nome}}! Obrigada pela confiança. 💚 Qualquer coisa, é só me chamar por aqui.` },
  { id: "f-aguardo", tab: "fillers", label: "Aguardando retorno", text: `Fico no aguardo, {{nome}}. Sem pressa — quando puder, me avisa por aqui. 🌿` },
  { id: "f-sumiu", tab: "fillers", label: "Reengajamento gentil", text: `Oi, {{nome}}! Tudo bem por aí? Passando só pra saber se você ainda tem interesse em agendar com a Dra. Jéssica ou se posso te ajudar com mais alguma dúvida. 💚` },
  { id: "f-fim-dia", tab: "fillers", label: "Fora do horário", text: `Oi, {{nome}}! Vi sua mensagem agora, mas o atendimento administrativo já encerrou hoje. Amanhã cedo te respondo com calma, tá? 🌙` },

  // ---------------- CASUAIS / ACOLHIMENTO ----------------
  {
    id: "c-primeira-vez",
    tab: "casuais",
    label: "Primeiro contato com psiquiatra",
    text: `Oi, {{nome}}. Antes de qualquer coisa: que bom que você se permitiu mandar essa mensagem. 💚

Procurar um psiquiatra pela primeira vez mexe com a gente — é normal sentir um friozinho. A Dra. Jéssica conduz a primeira conversa de um jeito tranquilo, sem pressa, pra você se sentir à vontade pra contar o que tá sentindo.

Se quiser, te explico como funciona o agendamento: ${LINK}`,
  },
  {
    id: "c-medo-rotulo",
    tab: "casuais",
    label: "Medo de ser 'rotulado'",
    text: `{{nome}}, entendo perfeitamente esse receio — muita gente sente o mesmo. 🌿

Diagnóstico em psiquiatria não é um rótulo, é uma chave pra entender o que tá acontecendo e poder cuidar. A Dra. Jéssica trabalha com escuta cuidadosa, sem pressa de "carimbar" nada. Tudo é sigiloso, e nada é compartilhado fora da consulta.

Se quiser dar esse passo: ${LINK}`,
  },
  {
    id: "c-cansado",
    tab: "casuais",
    label: "Paciente exausto",
    text: `Oi, {{nome}}. Pelo que você descreveu, dá pra sentir o cansaço aí. 💚

Você não precisa "estar pronto" pra marcar — só precisa querer começar a se sentir melhor. A primeira consulta é online, no conforto da sua casa, e a doutora vai te ouvir com calma.

Quando puder: ${LINK}`,
  },
  {
    id: "c-vergonha",
    tab: "casuais",
    label: "Vergonha de falar",
    text: `{{nome}}, fica tranquila(o). 🌿 Tudo o que você contar fica entre você e a doutora — sigilo absoluto, sem juízo de valor. A Dra. Jéssica já ouviu de tudo e o objetivo é só te ajudar.

Não precisa se preparar nem ensaiar nada. É conversa.

Se quiser começar: ${LINK}`,
  },
  {
    id: "c-familia-empurrou",
    tab: "casuais",
    label: "Veio empurrado por alguém",
    text: `Oi, {{nome}}! Mesmo que tenha sido por sugestão de alguém, o fato de você estar aqui já conta. 💚

A doutora respeita o seu tempo — você não precisa "topar" tudo de cara. A primeira consulta serve pra vocês se conhecerem e você decidir se faz sentido seguir.

Se quiser experimentar: ${LINK}`,
  },
  {
    id: "c-recaida",
    tab: "casuais",
    label: "Voltando após pausa",
    text: `Que bom te ver de volta, {{nome}}. 🌿 Recaída ou pausa fazem parte do processo, não são fracasso. A Dra. Jéssica retoma de onde você parou, sem cobrança.

Pra reagendar: ${LINK}`,
  },
  {
    id: "c-amigo-indicacao",
    tab: "casuais",
    label: "Veio por indicação",
    text: `Oi, {{nome}}! Que bacana saber que veio por indicação. 💚 Conta um pouquinho do que tá te trazendo aqui que eu te oriento sobre o melhor caminho — ou, se preferir já agendar, é por aqui: ${LINK}`,
  },

  // ---------------- ATALHOS / QUICK REPLIES ----------------
  { id: "a-valor", tab: "atalhos", tag: "Valor", label: "Valor da consulta", text: `Primeira consulta R$ 320 (50 min) e retorno R$ 210 (30 min), {{nome}}. Tudo online. Agendamento: ${LINK}` },
  { id: "a-convenio", tab: "atalhos", tag: "Convênio", label: "Convênio (curto)", text: `Não atendemos convênio, {{nome}} — só particular. Emitimos recibo com CRM e CID pra você pedir reembolso ao seu plano. Agendamento: ${LINK}` },
  { id: "a-online", tab: "atalhos", tag: "Telemedicina", label: "Só online?", text: `Sim, {{nome}}, atendimento 100% online por videochamada — mesma validade legal de consulta presencial. Receita digital vale em todo o Brasil. ${LINK}` },
  { id: "a-receita", tab: "atalhos", tag: "Receita", label: "Receita controlada", text: `Sim, {{nome}}, a doutora prescreve quando indicado clinicamente — inclusive controladas, com assinatura digital válida. Avaliação acontece na consulta. ${LINK}` },
  { id: "a-tdah", tab: "atalhos", tag: "TDAH", label: "TDAH adulto", text: `Sim, {{nome}}! Diagnóstico de TDAH em adulto é um dos focos da Dra. Jéssica. Primeira consulta R$ 320, online. ${LINK}` },
  { id: "a-ansiedade", tab: "atalhos", tag: "Ansiedade", label: "Ansiedade", text: `Sim, {{nome}}, ansiedade e crises de pânico são acompanhadas com tratamento individualizado. Online, em todo o Brasil. ${LINK}` },
  { id: "a-depressao", tab: "atalhos", tag: "Depressão", label: "Depressão", text: `Sim, {{nome}}, a Dra. Jéssica acompanha quadros de depressão — leves a graves — com escuta cuidadosa e plano individualizado. ${LINK}` },
  { id: "a-sono", tab: "atalhos", tag: "Sono", label: "Insônia", text: `Sim, {{nome}}, distúrbios de sono são avaliados com tratamento medicamentoso e não medicamentoso. ${LINK}` },
  { id: "a-bipolar", tab: "atalhos", tag: "Bipolar", label: "Bipolar", text: `Sim, {{nome}}, transtorno bipolar é uma das áreas de atuação. Acompanhamento contínuo e cuidadoso. ${LINK}` },
  { id: "a-toc", tab: "atalhos", tag: "TOC", label: "TOC", text: `Sim, {{nome}}, TOC é tratado com medicação adequada e indicação de psicoterapia (TCC). ${LINK}` },
  { id: "a-burnout", tab: "atalhos", tag: "Burnout", label: "Burnout", text: `Sim, {{nome}}, burnout é avaliado com cuidado, incluindo orientação sobre afastamento quando necessário. ${LINK}` },
  { id: "a-crianca", tab: "atalhos", tag: "Idade", label: "Atende criança?", text: `A Dra. Jéssica atende a partir de 16 anos, {{nome}}. Pra crianças, indicamos um(a) psiquiatra da infância — se quiser, te passo sugestões.` },
  { id: "a-idoso", tab: "atalhos", tag: "Idade", label: "Atende idoso?", text: `Sim, {{nome}}, atende adultos e idosos. Atendimento online costuma ser bem confortável — se precisar, um familiar pode acompanhar.` },
  { id: "a-gestante", tab: "atalhos", tag: "Gestação", label: "Grávida / amamentando", text: `Sim, {{nome}}, há opções seguras na gestação e amamentação. A doutora avalia caso a caso, em parceria com o obstetra. ${LINK}` },
  { id: "a-horarios", tab: "atalhos", tag: "Agenda", label: "Horários", text: `Os horários atualizados aparecem aqui, {{nome}}: ${LINK} — se não achar horário, me avisa que tento encaixar.` },
  { id: "a-data", tab: "atalhos", tag: "Agenda", label: "Disponibilidade próxima", text: `Temos disponibilidade próxima de {{data}}, {{nome}}! Pra confirmar: ${LINK}` },
  { id: "a-link-video", tab: "atalhos", tag: "Telemedicina", label: "Link da videochamada", text: `O link chega no seu e-mail e WhatsApp 30 minutos antes da consulta, {{nome}}. Abre direto no navegador, sem precisar instalar nada.` },
  { id: "a-pagamento", tab: "atalhos", tag: "Pagamento", label: "Pagamento", text: `O pagamento é direto na Doctoralia, {{nome}} — PIX, débito ou crédito (com opção de parcelar). ${LINK}` },
  { id: "a-cancelar", tab: "atalhos", tag: "Agenda", label: "Cancelar / reagendar", text: `Sem problema, {{nome}} — cancelamentos com mais de 24h têm reembolso integral pela Doctoralia. Pra reagendar: ${LINK}` },
  { id: "a-atestado", tab: "atalhos", tag: "Documentos", label: "Atestado", text: `Sim, {{nome}}, a doutora emite atestados, relatórios e laudos quando clinicamente indicado, com assinatura digital válida.` },
  { id: "a-recibo", tab: "atalhos", tag: "Documentos", label: "Recibo IR", text: `Sim, {{nome}}, o recibo serve pra dedução no IR e também pra pedido de reembolso ao plano de saúde.` },
  { id: "a-renovar", tab: "atalhos", tag: "Receita", label: "Renovar receita", text: `Renovação de receita exige consulta, {{nome}} — exigência ética do CFM. Pacientes em acompanhamento agendam um retorno (R$ 210). ${LINK}` },
  { id: "a-fora-brasil", tab: "atalhos", tag: "Telemedicina", label: "Fora do Brasil", text: `Sim, {{nome}}, brasileiros morando fora podem se consultar normalmente — basta CPF ativo. ${LINK}` },
  { id: "a-urgencia", tab: "atalhos", tag: "Urgência", label: "Crise / urgência", text: `{{nome}}, se há risco agora, por favor ligue CVV 188 (24h) ou procure um pronto-socorro. O atendimento da doutora é ambulatorial e agendado. 💚` },

  // ---------------- OBJEÇÕES ----------------
  {
    id: "o-caro",
    tab: "objecoes",
    label: "\"Tá caro pra mim\"",
    text: `Entendo perfeitamente, {{nome}}. 🌿 O valor da Dra. Jéssica está alinhado com a média de psiquiatras com a mesma formação, e cobre uma consulta longa (50 min na primeira), receita digital, relatórios e suporte pós-consulta.

Algumas opções que ajudam:
• Parcelamento no cartão pelo checkout da Doctoralia
• Recibo com CID pra reembolso parcial pelo seu plano
• Espaçar mais os retornos depois da fase inicial

Se fizer sentido: ${LINK}`,
  },
  {
    id: "o-pensar",
    tab: "objecoes",
    label: "\"Vou pensar\"",
    text: `Claro, {{nome}}, pensa com calma. 💚 Só te deixo um lembrete carinhoso: a maioria das pessoas que adia uma consulta de psiquiatria se arrepende de não ter marcado antes — não pelo "remédio", mas pelo alívio de finalmente conversar com alguém que entende.

Quando se sentir pronta(o), tô por aqui: ${LINK}`,
  },
  {
    id: "o-presencial",
    tab: "objecoes",
    label: "\"Prefiro presencial\"",
    text: `Faz total sentido, {{nome}} — muita gente pensa assim antes de experimentar. 🌿

A teleconsulta tem a mesma validade legal e, na prática, pacientes relatam se sentir até mais à vontade falando do conforto de casa. Se não rolar, você não fica preso — é só uma consulta.

Se topar testar: ${LINK}`,
  },
  {
    id: "o-sem-tempo",
    tab: "objecoes",
    label: "\"Não tenho tempo\"",
    text: `Entendo, {{nome}}. 💚 Por isso o atendimento é 100% online — sem deslocamento, sem sala de espera. São 50 minutos do seu próprio ambiente, e temos horários alternativos (manhã cedo / fim de tarde) pra quem trabalha.

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
    text: `Sinto muito que tenha vivido isso, {{nome}}. 💚 Tratamento psiquiátrico não é tamanho único — às vezes é questão de ajuste de medicação, de abordagem, ou simplesmente de encontrar um(a) profissional que combine com você.

A Dra. Jéssica costuma revisar o histórico com calma antes de propor mudanças. Se quiser dar mais uma chance: ${LINK}`,
  },
  {
    id: "o-medo-remedio",
    tab: "objecoes",
    label: "\"Tenho medo de remédio\"",
    text: `Esse medo é super comum e legítimo, {{nome}}. 🌿 A doutora não medica por medicar — só prescreve quando há indicação clara, conversa contigo sobre efeitos esperados, e existem casos em que o tratamento é só com mudanças de hábito e psicoterapia.

A decisão é sempre conjunta. Pra conversar: ${LINK}`,
  },
  {
    id: "o-vergonha-online",
    tab: "objecoes",
    label: "\"Não me sinto à vontade no vídeo\"",
    text: `Tudo bem, {{nome}}. 💚 Você pode ficar com a câmera ligada só na parte inicial, ou em ambiente que te deixe mais à vontade (carro estacionado, quarto, etc.). O importante é você se sentir segura(o) pra falar.

Se quiser experimentar: ${LINK}`,
  },
];
