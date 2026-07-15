export type TopicTier = "ancora" | "conversao" | "cauda";

export interface DoctoraliaTopic {
  id: string;
  rank: number;
  tier: TopicTier;
  title: string;
  keyword: string;
  description: string;
}

export const tierLabels: Record<TopicTier, { label: string; short: string; description: string }> = {
  ancora: {
    label: "Âncoras",
    short: "Âncora",
    description: "Maior volume de busca. Captam paciente novo no Doctoralia.",
  },
  conversao: {
    label: "Alta conversão",
    short: "Conversão",
    description: "Paciente já decidido. Marcam consulta rapidamente.",
  },
  cauda: {
    label: "Cauda longa",
    short: "Cauda longa",
    description: "Menos buscas, ticket mais alto, diferenciação.",
  },
};

export const doctoraliaTopics: DoctoraliaTopic[] = [
  {
    id: "ansiedade",
    rank: 1,
    tier: "ancora",
    title: "Ansiedade",
    keyword: "ansiedade",
    description:
      "Atendo ansiedade em adultos quando ela já atrapalha o sono, o trabalho, os estudos ou os relacionamentos. Avalio se é uma fase de estresse passageira ou um quadro mais persistente, como ansiedade generalizada, crises de ansiedade, preocupação constante ou medo excessivo em situações específicas. Investigo também sintomas físicos que costumam vir junto, como taquicardia, tensão muscular, dor de cabeça, aperto no peito e alterações do intestino. O plano é individual e combina mudanças de rotina, técnicas práticas para acalmar o corpo no dia a dia, encaminhamento para psicoterapia e, quando faz sentido clínico, uso de medicação com revisão frequente e conversa aberta sobre efeitos, tempo de uso e retirada segura.",
  },
  {
    id: "depressao",
    rank: 2,
    tier: "ancora",
    title: "Depressão",
    keyword: "depressão",
    description:
      "Atendo depressão em adultos indo muito além da tristeza pontual. Investigo cansaço que não passa, perda de prazer nas atividades que antes faziam bem, sono e apetite alterados, dificuldade de concentração, sensação de peso constante e pensamentos de desânimo ou de que a vida não faz sentido. Avalio também depressão que aparece disfarçada de irritabilidade, dores no corpo ou queda de desempenho no trabalho. Cada pessoa recebe um plano próprio, que pode envolver acompanhamento em consultas regulares, indicação de psicoterapia, cuidado com sono, atividade física e, quando necessário, antidepressivos escolhidos conforme o perfil clínico, com revisão dos efeitos, ajuste gradual da dose e plano claro de continuidade.",
  },
  {
    id: "insonia",
    rank: 3,
    tier: "ancora",
    title: "Insônia",
    keyword: "insônia",
    description:
      "Trato insônia e dificuldade para dormir em adultos: quem demora horas para pegar no sono, acorda várias vezes durante a noite ou desperta muito cedo e não consegue mais voltar a dormir. Investigo o que está por trás do sono ruim, como ansiedade, depressão, uso excessivo de telas, cafeína, álcool, dores crônicas, alterações hormonais ou apneia do sono. Construo um plano que começa pelo ajuste da rotina de sono, higiene do sono e técnicas comportamentais, e pode incluir medicação por tempo limitado, sempre com atenção ao risco de dependência de calmantes e indutores. O objetivo é voltar a dormir bem de forma estável, sem precisar do remédio para sempre.",
  },
  {
    id: "tdah-adultos",
    rank: 4,
    tier: "ancora",
    title: "TDAH em adultos",
    keyword: "TDAH em adultos",
    description:
      "Avalio e trato TDAH em adultos: dificuldade de concentração, esquecimentos frequentes, procrastinação, impulsividade, agitação interna, dificuldade de organizar tarefas e sensação constante de cansaço mental. Faço uma avaliação completa, distribuída em mais de uma consulta, com questionários validados e história de vida desde a infância para confirmar o diagnóstico e descartar ou reconhecer outras condições associadas, como ansiedade, depressão e problemas de sono. O tratamento combina medicação quando indicada, estratégias práticas de organização, estudo e trabalho, além de orientação sobre rotina, sono, uso de telas e psicoterapia focada, com acompanhamento regular para ajustar o que estiver funcionando.",
  },
  {
    id: "panico",
    rank: 5,
    tier: "ancora",
    title: "Síndrome do Pânico",
    keyword: "síndrome do pânico",
    description:
      "Atendo síndrome do pânico e crises de pânico em adultos. As crises costumam vir de repente, com coração acelerado, falta de ar, tontura, formigamento, sensação de irrealidade e medo de morrer, enlouquecer ou perder o controle. Muitas pessoas passam anos indo a pronto-socorros antes do diagnóstico correto. Explico com calma o que está acontecendo no corpo, ensino como reduzir a frequência e a intensidade das crises e construo um plano que pode incluir medicação para estabilizar o quadro e indicação de psicoterapia para evitar que o medo se transforme em isolamento, agorafobia ou evitação de lugares e situações importantes para a vida.",
  },
  {
    id: "burnout",
    rank: 6,
    tier: "conversao",
    title: "Burnout e esgotamento profissional",
    keyword: "burnout",
    description:
      "Atendo burnout e esgotamento profissional: a exaustão que aparece quando o trabalho consome mais do que se consegue repor. Sintomas comuns incluem cansaço extremo mesmo após dormir, distanciamento emocional das tarefas, cinismo, queda de rendimento, sensação de fracasso, insônia e sintomas físicos como dor de cabeça, dores musculares e problemas gastrointestinais. Avalio o que diferencia o burnout de quadros de ansiedade e depressão, oriento sobre afastamento quando necessário e emissão de atestado, indico psicoterapia e uso de medicação quando o quadro está intenso. O plano também envolve reorganizar rotina, sono, limites com o trabalho e retomada gradual das atividades.",
  },
  {
    id: "estresse",
    rank: 7,
    tier: "conversao",
    title: "Estresse e qualidade de vida",
    keyword: "estresse",
    description:
      "Atendo pessoas que sentem estresse constante, irritabilidade, dores físicas sem causa aparente, cansaço, alterações do sono e queda importante na qualidade de vida, mesmo sem um diagnóstico psiquiátrico claro. Investigo se há um quadro de ansiedade, depressão, burnout ou problema de sono por trás dos sintomas, ou se o caminho principal é trabalhar rotina, alimentação, atividade física e relações. Quando indicado, prescrevo medicação por tempo definido, com objetivo claro e revisão frequente, e oriento sobre psicoterapia e mudanças de hábito sustentáveis. A meta é sair do modo sobrevivência e recuperar prazer, energia e clareza para as decisões do dia a dia.",
  },
  {
    id: "saude-mental-mulher",
    rank: 8,
    tier: "conversao",
    title: "Saúde mental da mulher",
    keyword: "saúde mental da mulher",
    description:
      "Atendo questões emocionais que se relacionam com as fases hormonais da mulher: alterações de humor antes da menstruação, ansiedade e tristeza intensas no período pré-menstrual, sintomas na gravidez e no puerpério, dificuldades ligadas à contracepção hormonal e as mudanças emocionais da entrada na perimenopausa e menopausa. Investigo também sobrecarga mental, culpa materna, dupla jornada e como esses fatores impactam o sono, a ansiedade e o humor. Avalio o caso completo, converso sobre risco e benefício e adapto o tratamento ao momento de vida, com escolhas medicamentosas seguras para cada fase, incluindo gestação e amamentação, sempre em diálogo com ginecologista e obstetra.",
  },
  {
    id: "pos-parto",
    rank: 9,
    tier: "conversao",
    title: "Depressão e ansiedade pós-parto",
    keyword: "depressão pós-parto",
    description:
      "Atendo depressão pós-parto e ansiedade no pós-parto, quadros muito mais comuns do que se imagina e frequentemente confundidos com esgotamento normal da maternidade. Avalio sintomas como tristeza profunda, choro frequente, sensação de incapacidade de cuidar do bebê, culpa, insônia mesmo quando o bebê dorme, medo constante de que algo ruim aconteça e pensamentos assustadores e intrusivos. Investigo também baby blues, psicose puerperal e depressão paterna. Construo um plano seguro para esse momento, com orientação à família, indicação de psicoterapia e, quando necessário, medicação compatível com a amamentação, em parceria com a obstetra e o pediatra do bebê.",
  },
  {
    id: "fobia-social",
    rank: 10,
    tier: "conversao",
    title: "Fobia social",
    keyword: "fobia social",
    description:
      "Atendo fobia social: o medo intenso de falar em público, de conhecer pessoas novas, de comer na frente dos outros ou de ser observado e julgado. Não é timidez comum. É um sofrimento que leva a evitar aulas, entrevistas, promoções, festas e relacionamentos, e que costuma vir acompanhado de sintomas físicos como tremor, sudorese, rubor facial e voz embargada. Explico como o quadro funciona, indico psicoterapia focada em exposição gradual a situações sociais e, quando necessário, prescrevo medicação para reduzir os sintomas físicos da ansiedade em apresentações, reuniões e eventos importantes. O objetivo é recuperar a liberdade de circular e se expor sem pagar um preço tão alto.",
  },
  {
    id: "bipolar",
    rank: 11,
    tier: "cauda",
    title: "Transtorno bipolar",
    keyword: "transtorno bipolar",
    description:
      "Avalio e trato transtorno bipolar em adultos, incluindo os tipos I, II e ciclotimia. Investigo com cuidado a história de fases de muita energia, pouca necessidade de sono, aceleração do pensamento, gastos impulsivos e envolvimento em atividades de risco, alternadas com fases de tristeza profunda, desânimo e cansaço extremo. É um diagnóstico que exige tempo e escuta atenta, pois costuma ser confundido com depressão simples ou com quadros de ansiedade. Construo um plano de longo prazo com medicação estabilizadora, acompanhamento regular para evitar novas crises, orientação ao paciente e à família sobre como reconhecer sinais de recaída cedo e apoio para retomar projetos com estabilidade.",
  },
  {
    id: "toc",
    rank: 12,
    tier: "cauda",
    title: "TOC (transtorno obsessivo-compulsivo)",
    keyword: "TOC",
    description:
      "Atendo TOC e pensamentos obsessivos em adultos. Pensamentos que voltam o tempo todo, dúvidas persistentes, medo de contaminação, de causar dano, de perder o controle ou pensamentos religiosos e sexuais intrusivos, e rituais para sentir alívio (lavar, checar, contar, rezar, evitar), consomem energia e horas do dia. Avalio a intensidade do quadro com escalas próprias para TOC, como a Y-BOCS, e construo um tratamento que combina psicoterapia focada em exposição com prevenção de resposta e, quando indicado, medicação em doses específicas para o quadro. Também oriento a família sobre como parar de participar dos rituais sem gerar mais culpa ou brigas em casa.",
  },
  {
    id: "jovens-adultos",
    rank: 13,
    tier: "cauda",
    title: "Saúde mental de jovens adultos",
    keyword: "saúde mental de jovens adultos",
    description:
      "Atendo jovens adultos entre 18 e 35 anos com dúvidas sobre carreira, primeiros empregos, saída da casa dos pais, identidade, relacionamentos, sexualidade e propósito. Quadros comuns nessa fase incluem ansiedade, crises existenciais, TDAH descoberto tarde, episódios de depressão, uso problemático de álcool e cannabis, dependência de telas e dificuldades no sono. Também acolho quem está em transição de curso, sofrendo com pressão familiar ou com sensação de estar sempre atrasado em relação aos colegas. Faço uma escuta sem julgamento, um plano que respeita o ritmo de quem está construindo a vida adulta e integro psicoterapia e, quando necessário, medicação de forma cuidadosa.",
  },
  {
    id: "revisao-medicacao",
    rank: 14,
    tier: "cauda",
    title: "Revisão e ajuste de medicação psiquiátrica",
    keyword: "revisão de medicação psiquiátrica",
    description:
      "Faço revisão completa de medicação psiquiátrica para quem já toma antidepressivos, calmantes, indutores de sono, estabilizadores de humor ou antipsicóticos e quer entender se a dose, a combinação e o tempo de uso ainda fazem sentido. Avalio efeitos colaterais que muitas vezes são naturalizados (ganho de peso, queda de libido, embotamento emocional, sonolência), possíveis interações medicamentosas e a real necessidade de manter cada remédio. Converso de forma honesta sobre benefícios, riscos e alternativas, e quando o quadro permite, faço a redução de forma gradual, segura e acompanhada de perto, evitando sintomas de retirada e recaídas.",
  },
  {
    id: "afastamento",
    rank: 15,
    tier: "cauda",
    title: "Avaliação para afastamento do trabalho",
    keyword: "afastamento do trabalho",
    description:
      "Realizo avaliação psiquiátrica para afastamento do trabalho em casos de depressão, ansiedade intensa, burnout, crises de pânico, TOC, transtorno bipolar em fase aguda e outros quadros que impedem o exercício das funções. Faço a avaliação clínica completa, com escuta detalhada da rotina de trabalho, dos gatilhos e do impacto dos sintomas, emito atestados e relatórios fundamentados quando indicado e sigo o caso durante todo o período de afastamento. Depois, acompanho o retorno gradual ao trabalho com segurança, ajuste de função quando necessário e diálogo com medicina do trabalho, sem precipitar a alta nem prolongar o afastamento sem necessidade clínica.",
  },
  {
    id: "estabilizacao-emocional",
    rank: 16,
    tier: "conversao",
    title: "Instabilidade emocional e explosões de raiva",
    keyword: "instabilidade emocional",
    description:
      "Atendo adultos que sofrem com instabilidade emocional, oscilações rápidas de humor no mesmo dia, explosões de raiva, sensação de vazio, medo intenso de abandono e dificuldade de manter relacionamentos estáveis. Nem toda oscilação é transtorno bipolar: muitas vezes está relacionada a traços de personalidade, TDAH, TPM intensa, uso de álcool, sono ruim ou histórico de traumas. Faço uma avaliação cuidadosa para diferenciar cada situação, converso sobre o impacto disso nos relacionamentos e no trabalho e construo um plano que combina psicoterapia (com destaque para abordagens como TCC e DBT), orientação prática e, quando indicado, uso pontual de medicação.",
  },
  {
    id: "trauma-tept",
    rank: 17,
    tier: "cauda",
    title: "Trauma e transtorno de estresse pós-traumático",
    keyword: "TEPT",
    description:
      "Atendo pessoas que viveram situações traumáticas (acidentes, violência, luto complicado, assédio, violência doméstica, experiências médicas graves) e que hoje convivem com lembranças invasivas, pesadelos, sobressalto, evitação de lugares e situações, sensação de perigo constante e embotamento emocional. Avalio se o quadro configura transtorno de estresse pós-traumático ou reações agudas ao estresse, e investigo comorbidades como depressão, insônia e uso de substâncias. Construo um plano que prioriza segurança e estabilização, indica psicoterapia especializada em trauma e utiliza medicação quando necessária, respeitando o ritmo de quem já foi exposto ao limite.",
  },
  {
    id: "luto",
    rank: 18,
    tier: "cauda",
    title: "Luto e perdas significativas",
    keyword: "luto",
    description:
      "Acompanho adultos vivendo processos de luto por morte de pessoas próximas, mas também por perdas simbólicas importantes: separações, demissões, diagnósticos graves, perda de saúde, de uma gestação ou de um projeto de vida. Avalio quando o sofrimento faz parte do processo natural de elaboração e quando estamos diante de um luto complicado, de uma depressão associada ou de um quadro de ansiedade que pede intervenção. Ofereço escuta cuidadosa, oriento sobre o que esperar em cada fase, indico psicoterapia e, quando necessário, uso de medicação por tempo definido, sem tentar apagar a dor, mas evitando que ela se transforme em adoecimento persistente.",
  },
  {
    id: "compulsao-alimentar",
    rank: 19,
    tier: "cauda",
    title: "Compulsão alimentar e comer emocional",
    keyword: "compulsão alimentar",
    description:
      "Atendo adultos com compulsão alimentar, episódios de comer descontrolado, comer emocional, beliscar constante e sofrimento importante com a relação com a comida e o corpo. Avalio se o quadro configura transtorno da compulsão alimentar, bulimia ou está mais ligado a ansiedade, depressão, TDAH, restrições alimentares muito rígidas ou uso de medicações. Investigo também impacto do sono, do trabalho e de dietas anteriores. Construo um plano em parceria com nutricionista e psicoterapeuta, oriento sobre estratégias práticas para os episódios e uso de medicação quando indicado, sempre com foco em reduzir sofrimento e culpa, não apenas em controlar o peso.",
  },
  {
    id: "climaterio",
    rank: 20,
    tier: "cauda",
    title: "Saúde mental no climatério e menopausa",
    keyword: "menopausa saúde mental",
    description:
      "Atendo mulheres na perimenopausa e menopausa que enfrentam alterações importantes de humor, ansiedade, irritabilidade, choro fácil, insônia, névoa mental, queda de libido e sensação de estar perdendo o controle do próprio corpo e da própria cabeça. Muitos desses sintomas são desvalorizados ou tratados apenas como ginecológicos, quando na verdade têm forte componente psiquiátrico. Avalio o caso completo, faço a distinção entre depressão, ansiedade, hipotireoidismo e sintomas hormonais, oriento sobre estilo de vida e sono e prescrevo medicação psiquiátrica quando indicada, sempre em diálogo com a ginecologista responsável pela reposição hormonal.",
  },
  {
    id: "uso-alcool",
    rank: 21,
    tier: "cauda",
    title: "Uso problemático de álcool",
    keyword: "uso de álcool",
    description:
      "Atendo adultos que percebem que o álcool deixou de ser algo social e virou uma forma de aliviar ansiedade, tristeza, insônia ou solidão. Avalio sinais de uso problemático: aumento da quantidade, beber para dormir, esconder o quanto bebe, brigas familiares, ressacas frequentes, esquecimentos e queda de rendimento. Investigo quadros associados como depressão, ansiedade, TDAH e insônia, que muitas vezes sustentam o uso. Converso sem julgamento, com metas realistas (reduzir com segurança ou parar), oriento sobre riscos da retirada, indico psicoterapia e grupos de apoio quando indicado e utilizo medicação específica quando faz sentido clínico.",
  },
  {
    id: "cannabis",
    rank: 22,
    tier: "cauda",
    title: "Uso de cannabis e outras substâncias",
    keyword: "uso de cannabis",
    description:
      "Atendo pessoas que percebem que o uso de cannabis ou de outras substâncias passou a atrapalhar sono, memória, motivação, estudo, trabalho ou relacionamentos. Avalio sem julgamento a relação com a substância, o padrão de uso, os efeitos percebidos como positivos e os prejuízos, e investigo quadros associados como ansiedade, depressão, TDAH, insônia e episódios psicóticos. Converso sobre metas realistas, seja reduzir com segurança, seja parar, e ofereço orientação clara sobre efeitos, riscos e sintomas de retirada. Indico psicoterapia especializada, oriento a família quando pertinente e utilizo medicação quando ela agrega no plano.",
  },
  {
    id: "sono-adultos",
    rank: 23,
    tier: "conversao",
    title: "Distúrbios do sono em adultos",
    keyword: "distúrbios do sono",
    description:
      "Além da insônia clássica, atendo outros distúrbios do sono em adultos: sono não reparador, sonolência excessiva diurna, pesadelos recorrentes, terror noturno, sonambulismo, atraso de fase (pessoas que só conseguem dormir de madrugada) e uso crônico de indutores de sono. Investigo quadros associados como ansiedade, depressão, TDAH, uso de telas, cafeína, álcool e suspeita de apneia do sono, encaminhando para polissonografia quando indicado. Construo um plano com higiene do sono, ajuste de rotina, técnicas comportamentais e uso racional de medicação, com foco em restaurar sono de qualidade e reduzir gradualmente a dependência de indutores.",
  },
  {
    id: "segunda-opiniao",
    rank: 24,
    tier: "cauda",
    title: "Segunda opinião psiquiátrica",
    keyword: "segunda opinião psiquiátrica",
    description:
      "Ofereço consulta de segunda opinião psiquiátrica para pacientes que já têm diagnóstico e tratamento em andamento, mas sentem que o quadro não está bem resolvido, que os efeitos colaterais são grandes demais, que a medicação está empilhando sem clareza de objetivo ou que faltam explicações sobre o plano. Faço uma revisão detalhada do diagnóstico, da história clínica, das medicações já usadas e dos resultados obtidos, e devolvo um parecer honesto, com sugestões práticas para conversar com o psiquiatra que já acompanha ou, caso o paciente prefira, para seguir comigo o cuidado. Sem quebrar vínculo com o profissional atual sem necessidade.",
  },
  {
    id: "ansiedade-saude",
    rank: 25,
    tier: "cauda",
    title: "Ansiedade de saúde e hipocondria",
    keyword: "ansiedade de saúde",
    description:
      "Atendo adultos com ansiedade de saúde, também conhecida como hipocondria: preocupação persistente com ter uma doença grave, interpretação catastrófica de sintomas comuns do corpo, checagens repetidas, busca incessante por exames e consultas, além de longas horas pesquisando sintomas na internet. Esse padrão gera sofrimento intenso, prejuízo financeiro e desgaste com médicos e familiares. Explico como o quadro funciona, diferencio de doenças físicas reais que precisam ser descartadas, indico psicoterapia focada em exposição e reestruturação cognitiva e, quando necessário, prescrevo medicação para reduzir a ansiedade e a compulsão de checar sintomas.",
  },
  {
    id: "casais-familia",
    rank: 26,
    tier: "cauda",
    title: "Saúde mental em relações e família",
    keyword: "saúde mental relacionamentos",
    description:
      "Atendo pessoas que percebem que os sintomas psiquiátricos estão afetando fortemente relacionamentos, casamento, vida sexual, parentalidade e convivência familiar. Trabalho ansiedade, depressão, irritabilidade, TDAH, uso de álcool e traços de personalidade que aparecem principalmente dentro de casa, muitas vezes escondidos do restante da vida social. Não faço terapia de casal, mas oriento sobre como conversar com o parceiro e filhos sobre o adoecimento, quando envolver a família na consulta, como pedir apoio sem culpabilizar e quando indicar terapia de casal ou familiar em paralelo ao acompanhamento psiquiátrico individual.",
  },
  {
    id: "alta-performance",
    rank: 27,
    tier: "cauda",
    title: "Saúde mental para profissionais de alta demanda",
    keyword: "saúde mental executivos",
    description:
      "Atendo profissionais de alta demanda: executivos, empreendedores, médicos, advogados, servidores públicos em cargos de decisão, professores universitários e outros que convivem com jornadas extensas, pressão por resultado, responsabilidade sobre pessoas e exposição pública. Sintomas comuns incluem ansiedade constante, insônia, irritabilidade, queda de rendimento, dificuldade de desligar do trabalho, uso de álcool para relaxar e sinais precoces de burnout. Ofereço acompanhamento com sigilo reforçado, horários compatíveis, uso racional de medicação e integração com psicoterapia, com foco em sustentar performance sem sacrificar sono, corpo e vida pessoal.",
  },
  {
    id: "receita-controlada",
    rank: 28,
    tier: "conversao",
    title: "Prescrição responsável de medicamentos controlados",
    keyword: "medicamentos controlados",
    description:
      "Prescrevo medicamentos psiquiátricos controlados, incluindo antidepressivos, ansiolíticos, indutores de sono, estabilizadores e psicoestimulantes, sempre a partir de uma avaliação clínica completa, com diagnóstico bem estabelecido e conversa clara sobre benefícios, efeitos colaterais e tempo previsto de uso. Não faço prescrição sem consulta, nem renovo receitas de forma automática para pacientes desconhecidos, porque isso protege o paciente e a relação médica. Para quem já é acompanhado, oriento sobre planejamento das renovações, cuidados com estoque, viagens e trocas de esquema. Explico limites legais das receitas azul e amarela e como conduzir cada situação com segurança.",
  },
  {
    id: "primeiro-psiquiatra",
    rank: 29,
    tier: "conversao",
    title: "Primeira consulta com psiquiatra",
    keyword: "primeira consulta psiquiatra",
    description:
      "Atendo pessoas que nunca foram a um médico de saúde mental e chegam à consulta com muitas dúvidas, medo de rótulo, receio da medicação e vergonha de expor a própria história. Explico com calma como funciona a consulta, o que vou perguntar, quanto tempo dura, como é feita a hipótese diagnóstica, se será necessário pedir exames e quando faz sentido pensar em medicação. Também esclareço a diferença entre psiquiatra, psicólogo e neurologista, o papel da psicoterapia no tratamento e como conduzimos o sigilo. O objetivo é que a pessoa saia da primeira consulta com um plano concreto e a sensação de ter sido ouvida por completo.",
  },
  {
    id: "telepsiquiatria",
    rank: 30,
    tier: "conversao",
    title: "Consulta psiquiátrica online (telemedicina)",
    keyword: "psiquiatra online",
    description:
      "Atendo em consulta psiquiátrica online por telemedicina, seguindo as normas do Conselho Federal de Medicina, para adultos em qualquer cidade do Brasil. O atendimento online é indicado para acompanhamento de quadros já estabilizados, para quem mora longe de centros de referência, tem rotina incompatível com deslocamento ou prefere manter o cuidado no próprio ambiente. Explico como funciona a plataforma, a emissão de receitas digitais válidas em farmácias de todo o país, a segurança e o sigilo da consulta e em quais situações é preciso complementar com atendimento presencial. Ofereço a mesma escuta cuidadosa da consulta presencial, com plano claro e acompanhamento regular.",
  },
];
