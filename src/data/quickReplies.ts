export type QuickReplyTab = "fillers" | "casuais" | "atalhos" | "objecoes" | "triagem";

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
];
