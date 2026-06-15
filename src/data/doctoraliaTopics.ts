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
      "Atendo ansiedade em adultos quando ela já atrapalha o sono, o trabalho ou os relacionamentos. Avalio se é uma fase de estresse passageira ou um quadro mais persistente, como ansiedade generalizada, crises de ansiedade ou medo excessivo em situações específicas. O plano é individual e combina mudanças de rotina, técnicas práticas para acalmar o corpo, encaminhamento para psicoterapia e, quando faz sentido, uso de medicação com revisão frequente para evitar dependência.",
  },
  {
    id: "depressao",
    rank: 2,
    tier: "ancora",
    title: "Depressão",
    keyword: "depressão",
    description:
      "Atendo depressão em adultos, indo além da tristeza. Investigo cansaço que não passa, perda de prazer, sono e apetite alterados, dificuldade de concentração e pensamentos de desânimo. Cada pessoa recebe um plano próprio, que pode envolver acompanhamento em consultas regulares, indicação de psicoterapia e, quando necessário, antidepressivos escolhidos conforme o perfil clínico, com revisão de efeitos e ajuste gradual da dose.",
  },
  {
    id: "insonia",
    rank: 3,
    tier: "ancora",
    title: "Insônia",
    keyword: "insônia",
    description:
      "Trato insônia e dificuldade para dormir em adultos. Investigo o que está por trás do sono ruim: ansiedade, depressão, uso de telas, cafeína, dores ou alterações hormonais. Construo um plano que começa pelo ajuste da rotina de sono e pode incluir técnicas comportamentais e medicação por tempo limitado, sempre com atenção ao risco de dependência. O objetivo é dormir melhor de forma estável, sem precisar do remédio para sempre.",
  },
  {
    id: "tdah-adultos",
    rank: 4,
    tier: "ancora",
    title: "TDAH em adultos",
    keyword: "TDAH em adultos",
    description:
      "Avalio e trato TDAH em adultos: dificuldade de concentração, esquecimentos, procrastinação, impulsividade e cansaço mental. Faço uma avaliação completa com questionários validados e história de vida desde a infância para confirmar o diagnóstico e descartar outras causas. O tratamento combina medicação quando indicada, estratégias práticas de organização e estudo, além de orientação sobre rotina, sono e uso de telas.",
  },
  {
    id: "panico",
    rank: 5,
    tier: "ancora",
    title: "Síndrome do Pânico",
    keyword: "síndrome do pânico",
    description:
      "Atendo síndrome do pânico e crises de pânico em adultos. As crises costumam vir de repente, com coração acelerado, falta de ar, tontura e medo de morrer ou perder o controle. Explico o que está acontecendo no corpo, ensino como reduzir a frequência das crises e construo um plano que pode incluir medicação para estabilizar o quadro e indicação de psicoterapia para evitar que o medo se transforme em isolamento.",
  },
  {
    id: "burnout",
    rank: 6,
    tier: "conversao",
    title: "Burnout e esgotamento profissional",
    keyword: "burnout",
    description:
      "Atendo burnout e esgotamento profissional: a exaustão que aparece quando o trabalho consome mais do que se consegue repor. Avalio o que diferencia o burnout de quadros de ansiedade e depressão, oriento sobre afastamento quando necessário, indico psicoterapia e uso de medicação quando o quadro está intenso. O plano também envolve reorganizar rotina, sono e limites com o trabalho para uma recuperação consistente.",
  },
  {
    id: "estresse",
    rank: 7,
    tier: "conversao",
    title: "Estresse e qualidade de vida",
    keyword: "estresse",
    description:
      "Atendo pessoas que sentem estresse constante, irritabilidade, dores físicas sem causa aparente e queda na qualidade de vida. Investigo se há um quadro psiquiátrico por trás dos sintomas ou se o caminho é trabalhar rotina, sono, alimentação e relações. Quando indicado, prescrevo medicação por tempo definido e oriento sobre psicoterapia e mudanças de hábito sustentáveis no dia a dia.",
  },
  {
    id: "saude-mental-mulher",
    rank: 8,
    tier: "conversao",
    title: "Saúde mental da mulher",
    keyword: "saúde mental da mulher",
    description:
      "Atendo questões emocionais que se relacionam com as fases hormonais da mulher: alterações de humor antes da menstruação, ansiedade e tristeza intensas no período pré-menstrual, sintomas da gravidez e do pós-parto e as mudanças emocionais da entrada na menopausa. Avalio o caso completo e adapto o tratamento ao momento de vida, com escolhas medicamentosas seguras para cada fase.",
  },
  {
    id: "pos-parto",
    rank: 9,
    tier: "conversao",
    title: "Depressão e ansiedade pós-parto",
    keyword: "depressão pós-parto",
    description:
      "Atendo depressão pós-parto e ansiedade no pós-parto. Avalio sintomas como tristeza profunda, choro frequente, sensação de incapacidade de cuidar do bebê, insônia mesmo quando o bebê dorme e pensamentos assustadores. Construo um plano seguro para esse momento, com orientação à família, indicação de psicoterapia e, quando necessário, medicação compatível com a amamentação.",
  },
  {
    id: "fobia-social",
    rank: 10,
    tier: "conversao",
    title: "Fobia social",
    keyword: "fobia social",
    description:
      "Atendo fobia social: o medo intenso de falar em público, de conhecer pessoas novas ou de ser observado e julgado. Não é timidez comum. Explico como o quadro funciona, indico psicoterapia focada em exposição gradual a situações sociais e, quando necessário, prescrevo medicação para reduzir os sintomas físicos da ansiedade em apresentações, reuniões e eventos.",
  },
  {
    id: "bipolar",
    rank: 11,
    tier: "cauda",
    title: "Transtorno bipolar",
    keyword: "transtorno bipolar",
    description:
      "Avalio e trato transtorno bipolar em adultos. Investigo a história de fases de muita energia, pouca necessidade de sono e impulsividade alternadas com fases de tristeza profunda e desânimo. Construo um plano de longo prazo com medicação estabilizadora, acompanhamento regular para evitar novas crises e orientação ao paciente e à família sobre como reconhecer sinais de recaída cedo.",
  },
  {
    id: "toc",
    rank: 12,
    tier: "cauda",
    title: "TOC (transtorno obsessivo-compulsivo)",
    keyword: "TOC",
    description:
      "Atendo TOC e pensamentos obsessivos em adultos. Pensamentos que voltam o tempo todo, rituais para sentir alívio e dúvida constante consomem energia e tempo do dia. Avalio a intensidade do quadro com escalas próprias para TOC e construo um tratamento que combina psicoterapia focada em exposição com prevenção de resposta e, quando indicado, medicação para reduzir a intensidade dos sintomas.",
  },
  {
    id: "jovens-adultos",
    rank: 13,
    tier: "cauda",
    title: "Saúde mental de jovens adultos",
    keyword: "saúde mental de jovens adultos",
    description:
      "Atendo jovens adultos entre 18 e 35 anos com dúvidas sobre carreira, primeiros empregos, identidade, relacionamentos e propósito. Quadros comuns nessa fase incluem ansiedade, crises existenciais, TDAH descoberto tarde e episódios de depressão. Faço uma escuta sem julgamento e um plano que respeita o ritmo de quem está construindo a vida adulta.",
  },
  {
    id: "revisao-medicacao",
    rank: 14,
    tier: "cauda",
    title: "Revisão e ajuste de medicação psiquiátrica",
    keyword: "revisão de medicação psiquiátrica",
    description:
      "Faço revisão completa de medicação psiquiátrica para quem já toma antidepressivos, calmantes ou estabilizadores e quer entender se a dose, a combinação e o tempo de uso ainda fazem sentido. Avalio efeitos colaterais, possíveis interações e a real necessidade de manter cada remédio. Quando o quadro permite, faço a redução de forma gradual, segura e acompanhada de perto.",
  },
  {
    id: "afastamento",
    rank: 15,
    tier: "cauda",
    title: "Avaliação para afastamento do trabalho",
    keyword: "afastamento do trabalho",
    description:
      "Realizo avaliação psiquiátrica para afastamento do trabalho em casos de depressão, ansiedade intensa, burnout, crises de pânico e outros quadros que impedem o exercício das funções. Faço a avaliação clínica completa, emito atestados e relatórios fundamentados e acompanho o retorno gradual ao trabalho com segurança, sem precipitar a alta nem prolongar o afastamento sem necessidade.",
  },
];
