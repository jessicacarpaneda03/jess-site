export type ReviewTone = "formal" | "acolhedor" | "curto";

export type ReviewVariation = {
  tone: ReviewTone;
  toneLabel: string;
  text: string;
};

export type ReviewTemplate = {
  id: string;
  category: string;
  patientReviewHint: string; // exemplo do que o paciente poderia ter escrito
  variations: ReviewVariation[];
};

const LINK = "https://www.doctoralia.com.br/z/FcjTe4";

export const reviewTemplates: ReviewTemplate[] = [
  {
    id: "elogio-geral",
    category: "Elogio / Recomendação",
    patientReviewHint: "Excelente médica, super recomendo! Atendimento nota 10.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Agradeço imensamente sua avaliação, {{nome}}. É muito gratificante saber que o atendimento correspondeu às suas expectativas. Fico à disposição para continuar acompanhando sua jornada de cuidado.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `Oi, {{nome}}! Que mensagem linda — fico tão feliz em saber que você se sentiu bem cuidada. 💚 É exatamente esse o propósito. Estou aqui sempre que precisar.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Obrigada, {{nome}}! Fico muito feliz com seu feedback. 💙 Estou aqui quando precisar.`,
      },
    ],
  },
  {
    id: "melhora-tratamento",
    category: "Melhora com o tratamento",
    patientReviewHint: "Já estou me sentindo muito melhor após iniciar o tratamento.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Prezado(a) {{nome}}, agradeço por compartilhar sua evolução. A melhoria clínica é sempre o nosso objetivo principal. Continuaremos monitorando seu progresso e ajustando o plano terapêutico conforme necessário.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, que notícia maravilhosa! 🌿 Dá pra sentir seu alívio só de ler. Vamos continuar juntos nesse caminho, no tempo que você precisar. Qualquer coisa, estou por aqui.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Que bom, {{nome}}! 💚 Fico feliz pela sua melhora. Seguimos juntos!`,
      },
    ],
  },
  {
    id: "escuta-acolhimento",
    category: "Acolhimento / Escuta",
    patientReviewHint: "Me senti ouvida, acolhida. Dra. muito atenciosa e empática.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Agradeço seu reconhecimento, {{nome}}. A escuta atenta e o acolhimento ético são pilares fundamentais da minha prática. Sinto-me honrada em poder oferecer um espaço seguro para seus cuidados em saúde mental.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, seu comentário me tocou. 💚 A escuta é o começo de tudo — e você merece ser ouvida com calma e respeito. Fico feliz que tenha sentido isso. Esse espaço é seu.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Obrigada, {{nome}}! 💙 Escutar você é o mínimo. Seguimos juntas.`,
      },
    ],
  },
  {
    id: "telemedicina-satisfacao",
    category: "Satisfação com online",
    patientReviewHint: "Não sabia que online ia funcionar tão bem. Muito prático!",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Agradeço seu feedback, {{nome}}. A telemedicina, quando bem conduzida, oferece excelente qualidade de cuidado e comodidade. Fico satisfeita em saber que a experiência atendeu às suas necessidades.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, eu também já fui desconfiada do online — até experimentar! 🌿 Que bom que o conforto de casa fez a consulta ainda melhor pra você. O cuidado é o mesmo, só sem o trânsito. 😊`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Ainda bem que funcionou, {{nome}}! 🌿 Online é cuidado de verdade, no seu espaço.`,
      },
    ],
  },
  {
    id: "só-estrelas",
    category: "Apenas estrelas (sem texto)",
    patientReviewHint: "Paciente deu 5 estrelas sem escrever nada.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Agradeço sua avaliação positiva, {{nome}}. Fico à disposição para continuar acompanhando seus cuidados em saúde mental.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `Obrigada pelas 5 estrelas, {{nome}}! 💚 Fico feliz que tenha tido uma boa experiência. Estou aqui sempre que precisar.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Obrigada, {{nome}}! 💙 Fico feliz com sua avaliação.`,
      },
    ],
  },
  {
    id: "primeira-consulta",
    category: "Decisão de continuar",
    patientReviewHint: "Gostei da primeira consulta, vou continuar o tratamento.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Prezado(a) {{nome}}, agradeço sua confiança em continuar o acompanhamento. A adesão ao tratamento é um fator essencial para os resultados clínicos. Estarei presente em cada etapa do seu cuidado.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, que bom que a gente se encontrou! 🌿 Dar esse passo de continuar é força — e eu vou estar aqui em cada consulta, te apoiando. Vamos juntos.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Que bom, {{nome}}! 💚 Conto com você e você pode contar comigo.`,
      },
    ],
  },
  {
    id: "indicacao-psicologo",
    category: "Encaminhamento / Indicação",
    patientReviewHint: "A doutora me orientou muito bem e indicou um psicólogo ótimo.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Agradeço seu reconhecimento, {{nome}}. A articulação entre psiquiatria e psicoterapia é fundamental para um cuidado integral. Fico satisfeita em saber que o encaminhamento foi útil.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, fico feliz que tenha gostado da indicação! 💚 O cuidado em saúde mental é mesmo em equipe — e você merece os melhores profissionais ao seu lado.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Fico feliz, {{nome}}! 💙 Equipe boa é metade do caminho.`,
      },
    ],
  },
  {
    id: "duvida-resolvida",
    category: "Dúvida esclarecida",
    patientReviewHint: "Tirei todas as minhas dúvidas, me senti segura para começar.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Agradeço seu feedback, {{nome}}. A segurança do paciente e o esclarecimento de dúvidas são prioridades absolutas em minha prática. Estarei à disposição para novas orientações sempre que necessário.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, que alívio ler isso! 🌿 Começar um tratamento com dúvidas é difícil — e você deu um passo lindo. Vou estar aqui pra esclarecer o que surgir, sempre.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Perfeito, {{nome}}! 💚 Segurança é tudo. Seguimos juntos.`,
      },
    ],
  },
  {
    id: "agilidade-atendimento",
    category: "Agilidade / Organização",
    patientReviewHint: "A consulta começou no horário, receita chegou rápido. Tudo muito organizado.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Agradeço sua avaliação, {{nome}}. A organização do atendimento e o respeito ao horário agendado são compromissos éticos que mantenho com todos os pacientes. Fico satisfeita em saber que a experiência foi fluida.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, obrigada por notar! 💙 Seu tempo é precioso e eu respeito isso. Fico feliz que tudo tenha sido prático e rápido pra você.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Obrigada, {{nome}}! 💚 Seu tempo é respeitado aqui.`,
      },
    ],
  },
  {
    id: "diagnostico-clareza",
    category: "Clareza no diagnóstico",
    patientReviewHint: "A doutora explicou tudo de um jeito que eu finalmente entendi o que tenho.",
    variations: [
      {
        tone: "formal",
        toneLabel: "Formal",
        text: `Prezado(a) {{nome}}, agradeço imensamente seu reconhecimento. A compreensão do diagnóstico pelo paciente é um dos objetivos centrais da minha prática — informação clara gera autonomia e adesão terapêutica.`,
      },
      {
        tone: "acolhedor",
        toneLabel: "Acolhedor",
        text: `{{nome}}, isso é o que mais me importa! 🌿 Entender o que está acontecendo é metade do caminho. Você não está sozinha(o) nisso — e agora a gente sabe pra onde ir.`,
      },
      {
        tone: "curto",
        toneLabel: "Curto",
        text: `Isso é tudo, {{nome}}! 💙 Entender é o primeiro passo. Vamos juntos.`,
      },
    ],
  },
];

export const toneOptions: { value: ReviewTone; label: string; icon: string; description: string }[] = [
  { value: "formal", label: "Formal", icon: "🎩", description: "Tom profissional, sem emojis excessivos, estrutura clínica" },
  { value: "acolhedor", label: "Acolhedor", icon: "🌿", description: "Tom próximo, caloroso, com emojis e acolhimento" },
  { value: "curto", label: "Curto", icon: "⚡", description: "1-2 frases diretas, ideal pra resposta rápida" },
];
