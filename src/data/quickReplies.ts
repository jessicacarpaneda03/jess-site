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
  tag?: string; // sub-categoria (ex: "TDAH", "Valor", "Receita")
};

const LINK = "https://www.doctoralia.com.br/z/FcjTe4";

export const quickReplyTabs: { id: QuickReplyTab; label: string; description: string }[] = [
  { id: "triagem", label: "Triagem", description: "Sequência para qualificar o paciente no WhatsApp antes do agendamento" },
  { id: "risco", label: "Risco", description: "Protocolos de crise, ideação suicida e situações de urgência" },
  { id: "fillers", label: "Coringas", description: "Mensagens curtas de transição enquanto você verifica algo" },
  { id: "casuais", label: "Acolhimento", description: "Respostas humanizadas, tom 'chinelo', leves e próximas" },
  { id: "atalhos", label: "Atalhos", description: "Mini-respostas (1-2 linhas) para as 68 dúvidas mais comuns" },
  { id: "objecoes", label: "Objeções", description: "Respostas que escorregam objeções clássicas com cuidado" },
  { id: "modulos", label: "Módulos CX", description: "Arquitetura completa de atendimento (A → F + Ficha + Fluxo)" },
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
    label: "Primeiro contato com saúde mental",
    text: `Oi, {{nome}}. Antes de qualquer coisa: que bom que você se permitiu mandar essa mensagem. 💚

Buscar um cuidado em saúde mental pela primeira vez mexe com a gente — é normal sentir um friozinho. A Dra. Jéssica conduz a primeira conversa de um jeito tranquilo, sem pressa, pra você se sentir à vontade pra contar o que tá sentindo.

Se quiser, te explico como funciona o agendamento: ${LINK}`,
  },
  {
    id: "c-medo-rotulo",
    tab: "casuais",
    label: "Medo de ser 'rotulado'",
    text: `{{nome}}, entendo perfeitamente esse receio — muita gente sente o mesmo. 🌿

Diagnóstico em saúde mental não é um rótulo, é uma chave pra entender o que tá acontecendo e poder cuidar. A Dra. Jéssica trabalha com escuta cuidadosa, sem pressa de "carimbar" nada. Tudo é sigiloso, e nada é compartilhado fora da consulta.

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
  { id: "a-convenio", tab: "atalhos", tag: "Convênio", label: "Convênio (curto)", text: `Não atendemos convênio, {{nome}} — só particular. Emitimos recibo para você pedir reembolso ao seu plano de saúde, quando aplicável. Agendamento: ${LINK}` },
  { id: "a-online", tab: "atalhos", tag: "Telemedicina", label: "Só online?", text: `Sim, {{nome}}, atendimento 100% online por videochamada — mesma validade legal de consulta presencial. Atendimento válido em todo o Brasil. ${LINK}` },
  { id: "a-receita", tab: "atalhos", tag: "Receita", label: "Receita controlada", text: `{{nome}}, condutas e encaminhamentos são definidos com base na avaliação clínica feita na consulta — tudo conversado com você. ${LINK}` },
  { id: "a-tdah", tab: "atalhos", tag: "TDAH", label: "TDAH adulto", text: `Sim, {{nome}}! Diagnóstico de TDAH em adulto é um dos focos da Dra. Jéssica. Primeira consulta R$ 320, online. ${LINK}` },
  { id: "a-ansiedade", tab: "atalhos", tag: "Ansiedade", label: "Ansiedade", text: `Sim, {{nome}}, ansiedade e crises de pânico são acompanhadas com tratamento individualizado. Online, em todo o Brasil. ${LINK}` },
  { id: "a-depressao", tab: "atalhos", tag: "Depressão", label: "Depressão", text: `Sim, {{nome}}, a Dra. Jéssica acompanha quadros de depressão — leves a graves — com escuta cuidadosa e plano individualizado. ${LINK}` },
  { id: "a-sono", tab: "atalhos", tag: "Sono", label: "Insônia", text: `Sim, {{nome}}, dificuldades de sono são avaliadas e o plano de cuidado é individualizado. ${LINK}` },
  { id: "a-bipolar", tab: "atalhos", tag: "Bipolar", label: "Bipolar", text: `Sim, {{nome}}, transtorno bipolar é uma das áreas de atuação. Acompanhamento contínuo e cuidadoso. ${LINK}` },
  { id: "a-toc", tab: "atalhos", tag: "TOC", label: "TOC", text: `Sim, {{nome}}, TOC é acompanhado com plano de cuidado individualizado, incluindo indicação de psicoterapia (TCC) quando pertinente. ${LINK}` },
  { id: "a-burnout", tab: "atalhos", tag: "Burnout", label: "Burnout", text: `Sim, {{nome}}, burnout é avaliado com cuidado, incluindo orientação sobre afastamento quando necessário. ${LINK}` },
  { id: "a-crianca", tab: "atalhos", tag: "Idade", label: "Atende criança?", text: `A Dra. Jéssica atende a partir de 16 anos, {{nome}}. Pra crianças, indicamos um(a) profissional de saúde mental da infância — se quiser, te passo sugestões.` },
  { id: "a-idoso", tab: "atalhos", tag: "Idade", label: "Atende idoso?", text: `Sim, {{nome}}, atende adultos e idosos. Atendimento online costuma ser bem confortável — se precisar, um familiar pode acompanhar.` },
  { id: "a-gestante", tab: "atalhos", tag: "Gestação", label: "Grávida / amamentando", text: `Sim, {{nome}}, há opções seguras na gestação e amamentação. A doutora avalia caso a caso, em parceria com o obstetra. ${LINK}` },
  { id: "a-horarios", tab: "atalhos", tag: "Agenda", label: "Horários", text: `Os horários atualizados aparecem aqui, {{nome}}: ${LINK} — se não achar horário, me avisa que tento encaixar.` },
  { id: "a-data", tab: "atalhos", tag: "Agenda", label: "Disponibilidade próxima", text: `Temos disponibilidade próxima de {{data}}, {{nome}}! Pra confirmar: ${LINK}` },
  { id: "a-link-video", tab: "atalhos", tag: "Telemedicina", label: "Link da videochamada", text: `O link chega no seu e-mail e WhatsApp 30 minutos antes da consulta, {{nome}}. Abre direto no navegador, sem precisar instalar nada.` },
  { id: "a-pagamento", tab: "atalhos", tag: "Pagamento", label: "Pagamento", text: `O pagamento é direto na Doctoralia, {{nome}} — PIX, débito ou crédito (com opção de parcelar). ${LINK}` },
  { id: "a-cancelar", tab: "atalhos", tag: "Agenda", label: "Cancelar / reagendar", text: `Sem problema, {{nome}} — cancelamentos com mais de 24h têm reembolso integral pela Doctoralia. Pra reagendar: ${LINK}` },
  { id: "a-atestado", tab: "atalhos", tag: "Documentos", label: "Atestado", text: `Sim, {{nome}}, a doutora emite atestados, relatórios e laudos quando clinicamente indicado, com assinatura digital válida.` },
  { id: "a-recibo", tab: "atalhos", tag: "Documentos", label: "Recibo IR", text: `Sim, {{nome}}, o recibo serve pra dedução no IR e também pra pedido de reembolso ao plano de saúde.` },
  { id: "a-renovar", tab: "atalhos", tag: "Receita", label: "Renovar receita", text: `Renovações e ajustes de conduta exigem uma consulta de retorno, {{nome}} — questão ética. Pacientes em acompanhamento agendam um retorno (R$ 210). ${LINK}` },
  { id: "a-fora-brasil", tab: "atalhos", tag: "Telemedicina", label: "Fora do Brasil", text: `Sim, {{nome}}, brasileiros morando fora podem se consultar normalmente — basta CPF ativo. ${LINK}` },
  { id: "a-urgencia", tab: "atalhos", tag: "Urgência", label: "Crise / urgência", text: `{{nome}}, se há risco agora, por favor ligue CVV 188 (24h) ou procure um pronto-socorro. O atendimento da doutora é ambulatorial e agendado. 💚` },

  // ---------------- OBJEÇÕES ----------------
  {
    id: "o-caro",
    tab: "objecoes",
    label: "\"Tá caro pra mim\"",
    text: `Entendo perfeitamente, {{nome}}. 🌿 O valor da Dra. Jéssica está alinhado com a média de profissionais de saúde mental com a mesma formação, e cobre uma consulta longa (50 min na primeira), documentos quando indicados e suporte pós-consulta.

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
    text: `Sinto muito que tenha vivido isso, {{nome}}. 💚 Tratamento em saúde mental não é tamanho único — às vezes é questão de ajuste de abordagem, de plano, ou simplesmente de encontrar um(a) profissional que combine com você.

A Dra. Jéssica costuma revisar o histórico com calma antes de propor mudanças. Se quiser dar mais uma chance: ${LINK}`,
  },
  {
    id: "o-medo-remedio",
    tab: "objecoes",
    label: "\"Tenho medo de remédio\"",
    text: `Esse medo é super comum e legítimo, {{nome}}. 🌿 A doutora não propõe condutas "automáticas" — qualquer indicação é conversada com você, com transparência sobre o que esperar, e em muitos casos o cuidado envolve só mudanças de hábito e psicoterapia.

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
    text: `{{nome}}, sinto muito que esteja vivendo isso. 🌿 Cuidar da sua saúde mental é um direito seu — a consulta é sigilosa, online, e não aparece em nada visível. Se quiser, podemos agendar em horário discreto.

Quando puder: ${LINK}`,
  },
  {
    id: "o-religiao",
    tab: "objecoes",
    label: "\"Minha fé resolve\"",
    text: `Respeito muito sua fé, {{nome}} — ela pode caminhar junto com o tratamento, não é "ou um ou outro". A doutora não interfere em crenças; o trabalho é cuidar do que é químico/clínico no cérebro.

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
    text: `Faz sentido pesquisar, {{nome}} 🌿. Só vale comparar o que está incluído: 50 minutos de primeira consulta, retorno acessível, suporte por WhatsApp entre consultas e documentos sem custo extra quando indicados. Se ainda assim preferir outra opção, tudo bem — fica o convite. ${LINK}`,
  },

  // ---------------- TRIAGEM (sequência WhatsApp) ----------------
  {
    id: "t-01-abertura",
    tab: "triagem",
    tag: "1. Abertura",
    label: "Abertura + permissão",
    text: `Oi, {{nome}}! Tudo bem? 💚 Aqui é da equipe da Dra. Jéssica Lopes, da área de saúde mental. Vi que você se interessou pelo atendimento — posso te fazer 3 perguntinhas rápidas pra entender o que está acontecendo e te orientar do melhor jeito? 🌿`,
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

3) Você já fez algum acompanhamento em saúde mental antes (psicólogo, psicoterapia, outro profissional)? Está em uso de algum tratamento ou medicação no momento? (Se sim, sem problema se não lembrar o nome certinho.)`,
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
    text: `{{nome}}, fico muito grata por ter confiado em me contar. 💚 Quero te pedir, por favor: se houver risco agora, ligue no CVV 188 (24h, gratuito) ou vá ao pronto-socorro mais próximo / CAPS. A Dra. Jéssica atende ambulatorialmente e vamos te encaixar o quanto antes — mas o cuidado de urgência precisa ser presencial. Estou aqui com você. 🌿`,
  },
  {
    id: "t-06-perfil",
    tab: "triagem",
    tag: "6. Perfil",
    label: "Idade + cidade",
    text: `Só pra fechar o cadastro, {{nome}}: qual sua idade e em que cidade/estado você mora? (Atendemos a partir de 16 anos, online, em todo o Brasil 🇧🇷)`,
  },
  {
    id: "t-07-rotina",
    tab: "triagem",
    tag: "7. Rotina",
    label: "Melhor horário",
    text: `E qual período costuma ser melhor pra você ser atendida(o)? (manhã / tarde / noite / fim de semana — temos opções)`,
  },
  {
    id: "t-08-encaixe-tdah",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — perfil TDAH",
    text: `Pelo que você me conta, {{nome}}, faz muito sentido investigar TDAH com a Dra. Jéssica — é uma das áreas de foco dela. 💚

A primeira consulta é online (50 min, R$ 320) e ela já inicia a investigação com escalas validadas. Sem precisar de exames antes.

Quer que eu te mostre os horários disponíveis? ${LINK}`,
  },
  {
    id: "t-08-encaixe-ansiedade",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — ansiedade/pânico",
    text: `{{nome}}, o que você descreve é muito compatível com um quadro ansioso — e tem tratamento, viu? 🌿 A doutora trabalha com escuta cuidadosa + plano individualizado (plano individualizado, conversado com você).

Primeira consulta online, 50 min, R$ 320. Posso te ajudar a marcar? ${LINK}`,
  },
  {
    id: "t-08-encaixe-burnout",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — burnout",
    text: `Pelo que você relata, {{nome}}, parece quadro de esgotamento (burnout). 💚 A Dra. Jéssica avalia, orienta sobre afastamento se necessário e monta o plano de cuidado.

Primeira consulta online, 50 min, R$ 320. Quer ver os horários? ${LINK}`,
  },
  {
    id: "t-08-encaixe-depressao",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Encaixe — depressão",
    text: `{{nome}}, o que você compartilhou tem cara de quadro depressivo — e é totalmente tratável. 🌿 Você não precisa estar "no fundo" pra começar; quanto antes, melhor.

Primeira consulta online, 50 min, R$ 320. Te ajudo a agendar? ${LINK}`,
  },
  {
    id: "t-08-encaixe-fora-escopo",
    tab: "triagem",
    tag: "8. Encaixe",
    label: "Fora do escopo (encaminhar)",
    text: `{{nome}}, pelo que você descreve, o ideal é um(a) profissional com outro foco (ex.: saúde mental infantil / neurologia / dependência química em internação). A Dra. Jéssica não é a melhor indicação pra esse caso específico, mas posso te sugerir caminhos. 💚`,
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
    text: `Tudo certo, {{nome}}! ✅ Sua consulta com a Dra. Jéssica está marcada para {{data}}.

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
    text: `Oi, {{nome}}! 🌿 Passando só pra lembrar da sua consulta amanhã ({{data}}) com a Dra. Jéssica. O link chegará 30 min antes. Tudo certo por aí?`,
  },
  {
    id: "t-12-no-show",
    tab: "triagem",
    tag: "10. Pós",
    label: "Não compareceu",
    text: `Oi, {{nome}}! Vi que não conseguimos te encontrar na consulta de hoje. Tudo bem por aí? 💚 Se quiser, posso te ajudar a remarcar — me avisa o melhor dia.`,
  },
  {
    id: "t-13-sem-resposta",
    tab: "triagem",
    tag: "10. Pós",
    label: "Follow-up (sem resposta)",
    text: `Oi, {{nome}}! 🌿 Só passando pra saber se ainda faz sentido marcar com a Dra. Jéssica ou se você preferiu outro caminho. Sem cobrança — tô por aqui se precisar. 💚`,
  },

  // ============================================================
  // RISCO — Protocolos de crise e ideação
  // ============================================================
  {
    id: "r-01-sondagem",
    tab: "risco",
    tag: "1. Sondagem",
    label: "Sondagem inicial de risco",
    text: `{{nome}}, antes de seguirmos, preciso te fazer uma pergunta sincera — e pode responder com toda liberdade: você tem tido pensamentos de se machucar ou de não querer mais estar aqui? 💚

Esse espaço é seguro e sem julgamento.`,
  },
  {
    id: "r-02-ideacao-passiva",
    tab: "risco",
    tag: "2. Ideação passiva",
    label: "Ideação passiva (\"queria sumir\")",
    text: `Obrigada por confiar em mim com isso, {{nome}}. 🌿 O que você descreve — esse cansaço de existir, vontade de "sumir" — é um sinal importante de que você precisa de cuidado AGORA, não daqui a semanas.

Vou te encaixar com a Dra. Jéssica o quanto antes. Enquanto isso, se piorar:
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

Vou priorizar seu encaixe na agenda da Dra. Jéssica. Posso te ligar? Me manda um "pode" que eu te chamo. 🌿`,
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

Não deixe a pessoa sozinha, e se houver acesso a meios (medicamentos, armas, etc.), retire do alcance. Após estabilizar, podemos agendar acompanhamento ambulatorial com a Dra. Jéssica. 🌿`,
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

Após estabilização, encaminhamos para profissional de saúde mental da infância e adolescência. 🌿`,
  },
  {
    id: "r-08-pos-alta",
    tab: "risco",
    tag: "8. Pós-alta",
    label: "Recebeu alta hospitalar — encaixe",
    text: `Que bom que você está num momento mais seguro, {{nome}}. 💚 Pós-alta é uma fase delicada e merece acompanhamento próximo.

Vou priorizar seu encaixe na agenda da Dra. Jéssica nos próximos dias. Por favor, traga na consulta:
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

Quando (e se) quiser conversar com a Dra. Jéssica, tô aqui. Sem pressa, sem cobrança. 🌿`,
  },
  {
    id: "r-10-disclaimer",
    tab: "risco",
    tag: "10. Disclaimer",
    label: "Disclaimer fixo de telemedicina",
    text: `⚠️ IMPORTANTE: a teleconsulta com a Dra. Jéssica é ambulatorial e agendada. Não atendemos URGÊNCIAS pelo WhatsApp.

Em situação de crise: CVV 188 (24h) | SAMU 192 | pronto-socorro mais próximo.`,
  },

  // ============================================================
  // ATALHOS — 68 RESPOSTAS NUMERADAS (saudação → diversos)
  // ============================================================

  // ── Saudações e Primeiro Contato (01–03)
  { id: "n01", tab: "atalhos", tag: "01. Saudação", label: "01. Boas-vindas", text: `Oi, {{nome}}! 💚 Aqui é da equipe da Dra. Jéssica Lopes — saúde mental. Que bom te ver por aqui! Como posso te ajudar hoje?` },
  { id: "n02", tab: "atalhos", tag: "02. Saudação", label: "02. Fora do horário", text: `Oi, {{nome}}! 🌙 Recebi sua mensagem fora do nosso horário comercial (seg-sex, 9h-18h). Amanhã cedo te respondo com calma. Em urgência: CVV 188.` },
  { id: "n03", tab: "atalhos", tag: "03. Saudação", label: "03. Reapresentação", text: `Oi, {{nome}}! 💚 Que bom te ver de volta. Em que posso te ajudar hoje — quer agendar, tirar uma dúvida, ou outra coisa?` },

  // ── Valores (04–08)
  { id: "n04", tab: "atalhos", tag: "04. Valor", label: "04. Valor 1ª consulta", text: `Primeira consulta: R$ 320 (50 min, online), {{nome}}. Inclui avaliação completa e plano de cuidado individualizado. Agendamento: ${LINK}` },
  { id: "n05", tab: "atalhos", tag: "05. Valor", label: "05. Valor retorno", text: `Retorno: R$ 210 (30 min, online), {{nome}}. Indicado para acompanhamento, ajustes e renovação de conduta. ${LINK}` },
  { id: "n06", tab: "atalhos", tag: "06. Valor", label: "06. Por que esse valor", text: `O valor reflete formação especializada, consulta longa, suporte pós-consulta por WhatsApp e documentos sem custo extra quando indicados, {{nome}}. 🌿` },
  { id: "n07", tab: "atalhos", tag: "07. Valor", label: "07. Parcelamento", text: `Sim, {{nome}}! O checkout da Doctoralia permite parcelar no cartão de crédito (sujeito às condições da operadora). ${LINK}` },
  { id: "n08", tab: "atalhos", tag: "08. Valor", label: "08. Desconto / social", text: `{{nome}}, hoje não trabalhamos com descontos individuais — pra manter equidade entre pacientes. Se o valor pesar, posso te indicar serviços públicos (CAPS, UBS) ou clínicas-escola. 💚` },

  // ── Agendamento (09–12)
  { id: "n09", tab: "atalhos", tag: "09. Agenda", label: "09. Como agendar", text: `Super simples, {{nome}}: você escolhe horário, paga (PIX/cartão) e recebe o link da videochamada por e-mail e WhatsApp. Tudo por aqui: ${LINK}` },
  { id: "n10", tab: "atalhos", tag: "10. Agenda", label: "10. Próximas datas", text: `Tenho disponibilidade próxima de {{data}}, {{nome}}! Os horários atualizados ficam aqui: ${LINK}` },
  { id: "n11", tab: "atalhos", tag: "11. Agenda", label: "11. Sem horário disponível", text: `{{nome}}, no momento a agenda da semana está cheia. Posso te avisar assim que abrir uma vaga? Me confirma o melhor período (manhã/tarde/noite). 💚` },
  { id: "n12", tab: "atalhos", tag: "12. Agenda", label: "12. Encaixe / urgência leve", text: `{{nome}}, vou ver o que consigo de encaixe nos próximos dias. Já me adianta: você consegue qualquer horário, ou tem restrição? 🌿` },

  // ── Formato do Atendimento (13–18)
  { id: "n13", tab: "atalhos", tag: "13. Formato", label: "13. Como funciona online", text: `100% por videochamada, {{nome}}. Você recebe o link 30 min antes — abre direto no navegador (celular ou computador), sem instalar nada. ${LINK}` },
  { id: "n14", tab: "atalhos", tag: "14. Formato", label: "14. Validade legal", text: `Sim, {{nome}}, a teleconsulta tem a mesma validade legal da consulta presencial (Resolução CFM 2.314/2022). 🌿` },
  { id: "n15", tab: "atalhos", tag: "15. Formato", label: "15. Plataforma usada", text: `Usamos plataforma própria de telemedicina, {{nome}} — segura, criptografada e sem precisar baixar app. Link chega no seu e-mail e WhatsApp.` },
  { id: "n16", tab: "atalhos", tag: "16. Formato", label: "16. Internet ruim", text: `Sem problema, {{nome}} — a plataforma se adapta a internet mais lenta. Se cair, a gente reconecta. Se necessário, a doutora liga por telefone pra continuar. 💚` },
  { id: "n17", tab: "atalhos", tag: "17. Formato", label: "17. Onde ficar durante a consulta", text: `Escolha um lugar tranquilo, com privacidade e fone de ouvido se possível, {{nome}}. Carro estacionado também serve! O importante é você se sentir à vontade. 🌿` },
  { id: "n18", tab: "atalhos", tag: "18. Formato", label: "18. Atende presencial?", text: `{{nome}}, hoje a Dra. Jéssica atende exclusivamente online — facilita acesso em todo o Brasil e flexibiliza horários. ${LINK}` },

  // ── Pagamento (19–23)
  { id: "n19", tab: "atalhos", tag: "19. Pagamento", label: "19. Formas de pagamento", text: `PIX, débito ou crédito (com parcelamento), {{nome}} — direto pelo checkout seguro da Doctoralia. ${LINK}` },
  { id: "n20", tab: "atalhos", tag: "20. Pagamento", label: "20. Confirmar pagamento", text: `Assim que o pagamento é confirmado, você recebe a confirmação automática por e-mail, {{nome}}. Se não chegou, me avisa que verifico. 🌿` },
  { id: "n21", tab: "atalhos", tag: "21. Pagamento", label: "21. Reembolso", text: `Cancelamentos com mais de 24h de antecedência têm reembolso integral pela Doctoralia, {{nome}}. Abaixo disso, avaliamos caso a caso. 💚` },
  { id: "n22", tab: "atalhos", tag: "22. Pagamento", label: "22. Recibo para reembolso", text: `Sim, {{nome}}, emitimos recibo logo após a consulta — serve para reembolso pelo plano (quando aplicável) e dedução no IR.` },
  { id: "n23", tab: "atalhos", tag: "23. Pagamento", label: "23. Pagamento direto?", text: `{{nome}}, todo o pagamento é via Doctoralia (mais segurança pra você e pra clínica). Não recebemos por PIX direto da equipe. 🌿` },

  // ── Sobre a Consulta (24–30)
  { id: "n24", tab: "atalhos", tag: "24. Consulta", label: "24. Quanto tempo dura", text: `Primeira consulta: 50 minutos. Retornos: 30 minutos, {{nome}}. Tempo confortável pra conversar sem pressa. 🌿` },
  { id: "n25", tab: "atalhos", tag: "25. Consulta", label: "25. O que precisa preparar", text: `Nada formal, {{nome}}! Se tiver exames, relatórios anteriores ou lista de medicações em uso, deixa em mãos. O resto é só conversa. 💚` },
  { id: "n26", tab: "atalhos", tag: "26. Consulta", label: "26. Posso ter acompanhante", text: `Sim, {{nome}}, se você se sentir mais segura(o) com alguém presente — sem problema. Só avise no início pra doutora alinhar a privacidade do que será compartilhado.` },
  { id: "n27", tab: "atalhos", tag: "27. Consulta", label: "27. Sigilo médico", text: `Sigilo absoluto, {{nome}}. 🌿 Tudo que conversamos fica entre você e a doutora, protegido por lei (CFM e LGPD).` },
  { id: "n28", tab: "atalhos", tag: "28. Consulta", label: "28. Posso gravar?", text: `Por questões éticas e de privacidade, gravações não são permitidas, {{nome}}. Mas a doutora pode te enviar resumo escrito da conduta após a consulta. 🌿` },
  { id: "n29", tab: "atalhos", tag: "29. Consulta", label: "29. E se eu travar / chorar", text: `Tudo bem, {{nome}}. 💚 A doutora respeita seu tempo — silêncio, choro, pausa, tudo faz parte. Você não precisa "performar" nada.` },
  { id: "n30", tab: "atalhos", tag: "30. Consulta", label: "30. Vai me dar diagnóstico já?", text: `Diagnóstico precisa de tempo e cuidado, {{nome}} — em geral é uma hipótese inicial na 1ª consulta, refinada nos retornos. Sem rótulos apressados. 🌿` },

  // ── Público Atendido (31–36)
  { id: "n31", tab: "atalhos", tag: "31. Público", label: "31. Idade mínima", text: `A Dra. Jéssica atende a partir de 16 anos, {{nome}}.` },
  { id: "n32", tab: "atalhos", tag: "32. Público", label: "32. Crianças", text: `{{nome}}, para crianças, indicamos profissional de saúde mental da infância. Se quiser, posso sugerir nomes de confiança. 💚` },
  { id: "n33", tab: "atalhos", tag: "33. Público", label: "33. Idosos", text: `Sim, {{nome}}, atendemos adultos e idosos. Online costuma ser confortável — familiar pode acompanhar se quiser.` },
  { id: "n34", tab: "atalhos", tag: "34. Público", label: "34. Gestantes/lactantes", text: `Sim, {{nome}}, há cuidado adaptado para gestação e amamentação, em parceria com seu obstetra quando necessário. 🌿` },
  { id: "n35", tab: "atalhos", tag: "35. Público", label: "35. Brasileiros no exterior", text: `Sim, {{nome}}! Brasileiros morando fora podem se consultar — basta CPF ativo e internet boa. ${LINK}` },
  { id: "n36", tab: "atalhos", tag: "36. Público", label: "36. LGBTQIA+ friendly", text: `Sim, {{nome}}. 🏳️‍🌈 Espaço seguro, sem julgamento, com escuta afirmativa. Pronome de sua preferência respeitado.` },

  // ── Documentos (37–45)
  { id: "n37", tab: "atalhos", tag: "37. Doc", label: "37. Atestado", text: `Sim, {{nome}}, atestados são emitidos quando clinicamente indicados, com assinatura digital válida. 🌿` },
  { id: "n38", tab: "atalhos", tag: "38. Doc", label: "38. Relatório", text: `Sim, relatórios médicos são emitidos quando necessários, {{nome}} — geralmente entregues em até 7 dias úteis após a consulta.` },
  { id: "n39", tab: "atalhos", tag: "39. Doc", label: "39. Laudo", text: `Laudos para escola, trabalho, perícia ou benefício são emitidos com base na avaliação clínica, {{nome}}. Em casos complexos, pode ser necessária mais de uma consulta. 💚` },
  { id: "n40", tab: "atalhos", tag: "40. Doc", label: "40. Receita digital", text: `Receitas digitais (quando indicadas) têm assinatura ICP-Brasil, validade nacional e podem ser usadas em qualquer farmácia, {{nome}}.` },
  { id: "n41", tab: "atalhos", tag: "41. Doc", label: "41. Recibo IR", text: `Sim, {{nome}}, o recibo serve para dedução no Imposto de Renda e reembolso parcial pelo plano de saúde, quando aplicável.` },
  { id: "n42", tab: "atalhos", tag: "42. Doc", label: "42. Laudo INSS", text: `Laudo para INSS é emitido quando há indicação clínica de afastamento, {{nome}}. Pode requerer mais de uma consulta para histórico consistente. 🌿` },
  { id: "n43", tab: "atalhos", tag: "43. Doc", label: "43. Declaração de comparecimento", text: `Claro, {{nome}}! Declaração de comparecimento é gratuita e enviada por e-mail logo após a consulta.` },
  { id: "n44", tab: "atalhos", tag: "44. Doc", label: "44. 2ª via de receita", text: `Para 2ª via de receita não vencida, {{nome}}, basta solicitar por aqui. Para renovação após vencimento, é necessária consulta de retorno (R$ 210). 🌿` },
  { id: "n45", tab: "atalhos", tag: "45. Doc", label: "45. Documentos para advogado/escola", text: `Documentos para terceiros (advogado, escola, RH) são emitidos com sua autorização expressa por escrito, {{nome}} — sigilo é prioridade. 💚` },

  // ── Cancelamento, Remarcação e Retornos (46–51)
  { id: "n46", tab: "atalhos", tag: "46. Cancel", label: "46. Como cancelar", text: `Sem problema, {{nome}}. Cancele direto no link da Doctoralia ou me avise por aqui. Mais de 24h de antecedência = reembolso integral. ${LINK}` },
  { id: "n47", tab: "atalhos", tag: "47. Cancel", label: "47. Remarcar", text: `Claro, {{nome}}! Me confirma o melhor dia/período e vejo o que tenho disponível. 🌿` },
  { id: "n48", tab: "atalhos", tag: "48. Cancel", label: "48. Faltei sem avisar", text: `Tudo bem acontecer, {{nome}}. 💚 Faltas sem aviso prévio não geram reembolso, mas posso te ajudar a reagendar uma nova consulta. Quer marcar?` },
  { id: "n49", tab: "atalhos", tag: "49. Retorno", label: "49. Quando marcar retorno", text: `Em geral, primeiro retorno em 30 dias, {{nome}} — depois espaçamos conforme estabilidade. A doutora alinha contigo na consulta. 🌿` },
  { id: "n50", tab: "atalhos", tag: "50. Retorno", label: "50. Retorno tardio (sumi)", text: `Que bom te ver de volta, {{nome}}! 💚 Se a última consulta foi há mais de 6 meses, contamos como nova primeira consulta (R$ 320). Até lá, é retorno (R$ 210).` },
  { id: "n51", tab: "atalhos", tag: "51. Cancel", label: "51. Cancelei e quero remarcar", text: `Claro, {{nome}}! Posso reativar seu agendamento — só me confirma o melhor horário e te envio o novo link. 🌿` },

  // ── Urgência e Crises (52–54)
  { id: "n52", tab: "atalhos", tag: "52. Urgência", label: "52. Crise agora", text: `{{nome}}, atendimento por aqui é ambulatorial. Em crise AGORA: CVV 188 (24h) | SAMU 192 | pronto-socorro mais próximo. 💚 Estou aqui pra te orientar.` },
  { id: "n53", tab: "atalhos", tag: "53. Urgência", label: "53. Pensamentos suicidas", text: `{{nome}}, obrigada por confiar em mim. 💚 Por favor, ligue AGORA no CVV 188 (24h, gratuito, sigiloso). Vou priorizar seu encaixe na agenda da Dra. Jéssica.` },
  { id: "n54", tab: "atalhos", tag: "54. Urgência", label: "54. Familiar em crise", text: `{{nome}}, peça ajuda AGORA: SAMU 192, pronto-socorro psiquiátrico ou CAPS. Não deixe a pessoa sozinha. CVV 188 também orienta familiares. 🌿` },

  // ── Após o Agendamento (55–58)
  { id: "n55", tab: "atalhos", tag: "55. Pós-agend", label: "55. Confirmação de agendamento", text: `Tudo certo, {{nome}}! ✅ Consulta marcada para {{data}}. Link chega no e-mail e WhatsApp 30 min antes. Qualquer dúvida, me chama. 💚` },
  { id: "n56", tab: "atalhos", tag: "56. Pós-agend", label: "56. Lembrete véspera", text: `Oi, {{nome}}! 🌿 Passando pra lembrar da sua consulta amanhã ({{data}}) com a Dra. Jéssica. Tudo certo por aí?` },
  { id: "n57", tab: "atalhos", tag: "57. Pós-agend", label: "57. Lembrete 1h antes", text: `{{nome}}, sua consulta é em 1 hora! ⏰ Link da videochamada já está no seu e-mail. Recomendo entrar 5 min antes pra testar áudio/vídeo. 💚` },
  { id: "n58", tab: "atalhos", tag: "58. Pós-agend", label: "58. Link não chegou", text: `Vou te enviar agora mesmo, {{nome}}! 🌿 Verifica também a caixa de spam/promoções, tá? Qualquer coisa, me avisa.` },

  // ── Pós-Consulta (59–61)
  { id: "n59", tab: "atalhos", tag: "59. Pós-consulta", label: "59. Como foi a consulta?", text: `Oi, {{nome}}! 💚 Como você se sentiu na consulta com a Dra. Jéssica? Seu retorno é importante pra gente cuidar bem de você.` },
  { id: "n60", tab: "atalhos", tag: "60. Pós-consulta", label: "60. Avaliação Doctoralia", text: `{{nome}}, se a consulta fez sentido pra você, sua avaliação na Doctoralia ajuda muito outras pessoas a chegarem até a Dra. Jéssica. 🌿💚 ${LINK}` },
  { id: "n61", tab: "atalhos", tag: "61. Pós-consulta", label: "61. Dúvida pós-consulta", text: `Claro, {{nome}}! 🌿 Pode mandar a dúvida por aqui — passo para a doutora e te respondo. Lembrando: dúvidas que mudem conduta requerem retorno.` },

  // ── Diversos (62–68)
  { id: "n62", tab: "atalhos", tag: "62. Diversos", label: "62. Indicação de psicoterapia", text: `Sim, {{nome}}! Trabalhamos junto com psicólogos(as) de confiança. Posso te indicar nomes alinhados ao seu caso após a primeira consulta. 💚` },
  { id: "n63", tab: "atalhos", tag: "63. Diversos", label: "63. Indicação para outro especialista", text: `Sem problema, {{nome}}! Após avaliação, a doutora te orienta sobre o(a) especialista certo(a) pro seu caso. 🌿` },
  { id: "n64", tab: "atalhos", tag: "64. Diversos", label: "64. Conteúdo das redes sociais", text: `Que bom que acompanha, {{nome}}! 💚 As publicações são informativas e não substituem consulta. Pra cuidado individual: ${LINK}` },
  { id: "n65", tab: "atalhos", tag: "65. Diversos", label: "65. Parceria/imprensa", text: `Olá, {{nome}}! Para parcerias, imprensa ou eventos, por favor envie sua proposta para o e-mail comercial — encaminho à doutora. 🌿` },
  { id: "n66", tab: "atalhos", tag: "66. Diversos", label: "66. Reclamação", text: `Sinto muito que você passou por isso, {{nome}}. 💚 Sua percepção é importante — me conta o que aconteceu pra eu encaminhar à doutora e buscarmos a melhor solução.` },
  { id: "n67", tab: "atalhos", tag: "67. Diversos", label: "67. Elogio / agradecimento", text: `Que alegria ler isso, {{nome}}! 💚 Vou compartilhar com a Dra. Jéssica — vai aquecer o coração dela. Obrigada por confiar.` },
  { id: "n68", tab: "atalhos", tag: "68. Diversos", label: "68. Despedida cordial", text: `Qualquer coisa, é só me chamar por aqui, {{nome}}! 🌿 Cuide-se com carinho. 💚` },

  // ============================================================
  // MÓDULOS CX — Arquitetura para telemedicina
  // ============================================================

  // ── Módulo A — Saudação, Triagem e Emergência
  {
    id: "m-A-1", tab: "modulos", tag: "A. Saudação",
    label: "A.1 — Mensagem de boas-vindas (auto)",
    text: `Olá! 💚 Aqui é da equipe da Dra. Jéssica Lopes — saúde mental.

Para te atender melhor, escolha:
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
    text: `{{nome}}, fico grata por ter buscado ajuda. 💚 O atendimento por aqui é ambulatorial, então em situação de crise AGORA o caminho mais seguro é:

🚑 SAMU 192
☎️ CVV 188 (24h, gratuito, sigiloso) — ligação ou chat em cvv.org.br
🏥 Pronto-socorro psiquiátrico mais próximo
🏛️ CAPS da sua região

Após estabilizar, te encaixo com a Dra. Jéssica em prioridade. Estou aqui. 🌿`,
  },

  // ── Módulo B — Passo a Passo da Consulta Online
  {
    id: "m-B-1", tab: "modulos", tag: "B. Passo a passo",
    label: "B.1 — Como funciona a teleconsulta",
    text: `Como vai funcionar sua consulta, {{nome}}: 🌿

📅 1. Agendamento → você escolhe o horário em ${LINK}
💳 2. Pagamento → PIX, débito ou crédito (parcelável) pelo checkout da Doctoralia
✉️ 3. Confirmação → chega por e-mail e WhatsApp
🔗 4. Link da videochamada → enviado 30 min antes
👩‍⚕️ 5. Consulta → 50 min (1ª) ou 30 min (retorno) com a Dra. Jéssica
📋 6. Plano de cuidado → conduta + documentos enviados após a consulta

Simples assim. 💚`,
  },
  {
    id: "m-B-2", tab: "modulos", tag: "B. Pré-consulta",
    label: "B.2 — Checklist pré-consulta",
    text: `{{nome}}, pra sua consulta fluir bem:

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

  // ── Módulo C — Pagamento, Agendamento e Reembolso
  {
    id: "m-C-1", tab: "modulos", tag: "C. Pagamento",
    label: "C.1 — Política de pagamento",
    text: `Política de pagamento, {{nome}}:

💳 Formas: PIX, débito, crédito (parcelável)
🏦 Plataforma: checkout seguro da Doctoralia
✅ Confirmação automática por e-mail
📄 Recibo emitido após a consulta (serve pra IR e reembolso de plano, quando aplicável)
❌ Não recebemos PIX direto da equipe — sempre pelo link oficial

Qualquer dúvida, me chama. 🌿`,
  },
  {
    id: "m-C-2", tab: "modulos", tag: "C. Reembolso",
    label: "C.2 — Política de reembolso e cancelamento",
    text: `Política de cancelamento, {{nome}}:

🟢 Mais de 24h de antecedência → reembolso integral
🟡 Menos de 24h → avaliamos caso a caso (motivo de força maior é considerado)
🔴 Falta sem aviso (no-show) → sem reembolso

Para remarcar: me avisa por aqui ou direto pela Doctoralia. 💚 ${LINK}`,
  },
  {
    id: "m-C-3", tab: "modulos", tag: "C. Reembolso plano",
    label: "C.3 — Reembolso pelo plano de saúde",
    text: `{{nome}}, atendimento é particular, mas você pode pedir reembolso parcial ao seu plano de saúde:

1️⃣ Após a consulta, você recebe o recibo
2️⃣ Ligue no SAC do plano e pergunte sobre reembolso para consulta em saúde mental (CBHPM 50000462)
3️⃣ Envie o recibo pelo app/site do plano
4️⃣ O reembolso cai na sua conta em alguns dias úteis

Cada plano tem regras próprias — vale ligar antes da consulta pra confirmar valores. 🌿`,
  },

  // ── Módulo D — Lembretes e Checklist
  {
    id: "m-D-1", tab: "modulos", tag: "D. Lembrete",
    label: "D.1 — Lembrete D-1 (véspera)",
    text: `Oi, {{nome}}! 🌿 Passando pra lembrar da sua consulta amanhã ({{data}}) com a Dra. Jéssica.

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

Bons cuidados. 💚`,
  },

  // ── Módulo E — Gestão de Limites Éticos
  {
    id: "m-E-1", tab: "modulos", tag: "E. Limites",
    label: "E.1 — Não fazemos diagnóstico por WhatsApp",
    text: `{{nome}}, entendo a urgência da sua dúvida. 💚 Por questões éticas (CFM), não posso passar diagnóstico, prescrição nem ajustes de conduta por WhatsApp — são definidos só em consulta, com avaliação individual.

Por aqui, posso te orientar sobre agendamento, valores, documentos e dúvidas administrativas. Pra cuidado clínico: ${LINK}`,
  },
  {
    id: "m-E-2", tab: "modulos", tag: "E. Limites",
    label: "E.2 — Não somos plantão / urgência",
    text: `{{nome}}, importante: o atendimento da Dra. Jéssica é ambulatorial e agendado. 🌿 Não temos plantão 24h por WhatsApp.

Em urgência:
🚑 SAMU 192
☎️ CVV 188 (24h)
🏥 Pronto-socorro mais próximo

Aqui no chat respondemos em horário comercial (seg-sex, 9h-18h). 💚`,
  },
  {
    id: "m-E-3", tab: "modulos", tag: "E. Limites",
    label: "E.3 — Sigilo e LGPD",
    text: `{{nome}}, sua privacidade é prioridade. 🔒

🛡️ Tudo que você compartilha aqui e em consulta é protegido por sigilo médico (CFM) e LGPD
📵 Não compartilhamos seus dados com terceiros sem autorização expressa
🗂️ Prontuário guardado em sistema seguro, com acesso restrito à equipe
⚠️ Exceções legais: risco iminente à vida (próprio ou de terceiros) e ordem judicial

Pode ficar tranquila(o). 💚`,
  },
  {
    id: "m-E-4", tab: "modulos", tag: "E. Limites",
    label: "E.4 — Não respondemos amigos/familiares do paciente",
    text: `Olá! 🌿 Por sigilo médico, não posso confirmar nem comentar nada sobre pacientes da Dra. Jéssica.

Se houver preocupação com alguém, oriente a pessoa a procurar ajuda direta — agendamento em ${LINK} ou, se for urgência, CVV 188 / SAMU 192. 💚`,
  },

  // ── Módulo F — Ausência e Plantão Digital
  {
    id: "m-F-1", tab: "modulos", tag: "F. Ausência",
    label: "F.1 — Resposta automática fora do horário",
    text: `Oi! 🌙 Recebi sua mensagem fora do nosso horário (seg-sex, 9h-18h). Amanhã cedo te respondo com calma.

⚠️ Em urgência: CVV 188 (24h, gratuito) | SAMU 192 | pronto-socorro mais próximo. 💚`,
  },
  {
    id: "m-F-2", tab: "modulos", tag: "F. Ausência",
    label: "F.2 — Férias / ausência prolongada da médica",
    text: `Olá, {{nome}}! 🌿 A Dra. Jéssica está em período de descanso entre {{data}} e o retorno previsto. Durante esse tempo, novos agendamentos seguem normalmente — só serão atendidos a partir da volta.

Pacientes em acompanhamento que precisem de cuidado urgente serão orientados sobre profissionais de cobertura. Em emergência: CVV 188 / SAMU 192. 💚`,
  },
  {
    id: "m-F-3", tab: "modulos", tag: "F. Ausência",
    label: "F.3 — Plantão digital (horários e escopo)",
    text: `{{nome}}, nosso plantão digital funciona seg-sex, 9h-18h, por aqui no WhatsApp. 🌿

✅ O que respondemos: agendamento, valores, formato, documentos administrativos, orientações
❌ O que NÃO respondemos: diagnóstico, prescrição, ajuste de medicação, urgência clínica

Cuidado clínico = só em consulta. Urgência = CVV 188 / SAMU 192. 💚`,
  },

  // ── Extra — Ficha de Acolhimento Pós-Agendamento
  {
    id: "m-X-1", tab: "modulos", tag: "X. Ficha",
    label: "X.1 — Ficha de acolhimento pós-agendamento",
    text: `{{nome}}, sua consulta está confirmada para {{data}}! ✅ Pra Dra. Jéssica te conhecer melhor antes do nosso encontro, responde no seu tempo:

1) Nome completo e idade:
2) Cidade/estado onde mora:
3) Em uma frase, o que te trouxe aqui:
4) Há quanto tempo sente isso:
5) Já fez acompanhamento em saúde mental antes? Está em uso de alguma medicação?
6) Tem alguma condição clínica relevante (cardiopatia, gestação, etc.)?
7) Algo que considera importante a doutora saber antes:

Sem pressa — pode mandar em partes. Tudo é sigiloso. 💚`,
  },
  {
    id: "m-X-2", tab: "modulos", tag: "X. Ficha",
    label: "X.2 — Confirmação após receber ficha",
    text: `Recebi tudo, {{nome}}! 💚 Vou encaminhar pra Dra. Jéssica revisar antes da consulta. Qualquer coisa que faltar, ela conversa contigo direto no nosso encontro. 🌿

Até {{data}}!`,
  },

  // ── Fluxo Ideal de Atendimento (mapa)
  {
    id: "m-Z-1", tab: "modulos", tag: "Z. Fluxo",
    label: "Z. Fluxo ideal de atendimento (mapa)",
    text: `🗺️ FLUXO IDEAL — ATENDIMENTO WHATSAPP

1. CONTATO → Saudação automática (Módulo A.1)
   ↓
2. CLASSIFICAÇÃO (responde 1/2/3/4)
   ├── 1. Agendar → Triagem A.2 → encaixe → B.1 (passo a passo) → C.1 (pagamento) → confirmação → X.1 (ficha)
   ├── 2. Já é paciente → atender dúvida (atalhos 37-51) ou aplicar limite E.1
   ├── 3. Informações → atalhos 04-23 conforme tema
   └── 4. CRISE → A.3 (emergência) + protocolo Risco r-01..r-09
   ↓
3. PRÉ-CONSULTA → D.1 (lembrete D-1) → D.2 (D-0 1h antes) → D.3 (5min)
   ↓
4. CONSULTA (presencial/online com a doutora)
   ↓
5. PÓS-CONSULTA → atalhos 59-61 → recibo/documentos
   ↓
6. RETENÇÃO → follow-up gentil (atalho 60 — avaliação Doctoralia)

⚠️ Em qualquer ponto: se aparecer sinal de risco, pular para Módulo Risco (sondagem r-01 → conduta conforme nível). 💚`,
  },
];
