export type AnamneseTemplate = {
  id: string;
  title: string;
  category: string;
  description: string;
  template: string;
};

export const anamneseTemplates: AnamneseTemplate[] = [
  {
    id: "psiq-geral",
    category: "Saúde mental geral",
    title: "Anamnese psiquiátrica completa (1ª consulta)",
    description: "Estrutura completa para primeira avaliação psiquiátrica adulta.",
    template: `ANAMNESE PSIQUIÁTRICA — PRIMEIRA CONSULTA
Paciente: {{nome}}
Idade: {{idade}} anos
Data: {{data}}
Profissional: Dr(a). {{profissional}}

1. QUEIXA PRINCIPAL (QP)
"…"

2. HISTÓRIA DA DOENÇA ATUAL (HDA)
- Início dos sintomas:
- Curso e evolução:
- Fatores desencadeantes:
- Fatores de melhora/piora:
- Impacto funcional (trabalho, estudo, relações):
- Tratamentos prévios e respostas:

3. REVISÃO DE SINTOMAS PSIQUIÁTRICOS
- Humor (depressivo / elevado / irritável):
- Ansiedade (generalizada, pânico, fobias):
- Sono (latência, manutenção, despertar precoce):
- Apetite e peso:
- Energia / anedonia:
- Concentração e memória:
- Ideação suicida / autolesão:
- Sintomas psicóticos (alucinações, delírios):
- Uso de substâncias:

4. ANTECEDENTES PESSOAIS
- Psiquiátricos:
- Clínicos:
- Cirúrgicos:
- Medicações em uso:
- Alergias:

5. ANTECEDENTES FAMILIARES
- Transtornos psiquiátricos na família:
- Suicídio na família:

6. HISTÓRIA DE VIDA
- Gestação/parto/desenvolvimento:
- Infância e escolaridade:
- Vida afetiva e sexual:
- Trabalho atual:
- Rede de apoio:

7. EXAME DO ESTADO MENTAL
- Apresentação e atitude:
- Consciência e orientação:
- Humor e afeto:
- Pensamento (curso, forma, conteúdo):
- Sensopercepção:
- Cognição:
- Juízo crítico e insight:

8. HIPÓTESES DIAGNÓSTICAS (CID-11)
-

9. PLANO TERAPÊUTICO
- Farmacológico:
- Psicoterápico:
- Exames complementares:
- Orientações:
- Retorno: {{retorno}}`,
  },
  {
    id: "tdah-c1",
    category: "TDAH (avaliação em 3-4 consultas)",
    title: "TDAH adulto — Consulta 1: avaliação inicial",
    description: "Primeiro encontro (50-60 min): queixa, sintomas atuais, impacto e escalas iniciais.",
    template: `AVALIAÇÃO DE TDAH — CONSULTA 1 (INICIAL)
Paciente: {{nome}}
Idade: {{idade}} anos
Data: {{data}}
Profissional: Dr(a). {{profissional}}

ENQUADRE
- Avaliação estruturada em 3 a 4 consultas.
- Hoje: mapear queixa, sintomas atuais e impacto. Sem fechar diagnóstico.

1. QUEIXA PRINCIPAL E EXPECTATIVA
- O que motivou buscar avaliação agora:
- O que espera deste processo:
- Quem sugeriu (próprio, família, trabalho, terapeuta):

2. SINTOMAS ATUAIS
2.1 Desatenção
( ) Erros por descuido
( ) Dificuldade em sustentar atenção
( ) Parece não ouvir
( ) Não conclui tarefas
( ) Dificuldade em organizar
( ) Evita tarefas de esforço mental
( ) Perde objetos
( ) Distrai-se com estímulos
( ) Esquecimentos no dia a dia

2.2 Hiperatividade / impulsividade
( ) Inquietação motora
( ) Dificuldade em ficar sentado
( ) Inquietação interna
( ) Lazer silencioso difícil
( ) "A mil por hora"
( ) Fala excessiva
( ) Responde antes do fim da pergunta
( ) Dificuldade em esperar a vez
( ) Interrompe ou se intromete

2.3 Disfunção executiva
- Planejamento, priorização, gestão do tempo:
- Procrastinação e início de tarefas:
- Regulação emocional, irritabilidade, frustração:

3. IMPACTO FUNCIONAL HOJE
- Trabalho / estudo:
- Casa, finanças, rotina:
- Relacionamentos e vida social:
- Sono e energia:

4. ESCALAS APLICADAS NA CONSULTA
- ASRS-18:
- SNAP-IV (auto/heteroaplicado):
- PHQ-9:
- GAD-7:
- AUDIT:
- Triagem de sono (Epworth/PSQI):

5. SEGURANÇA E COMORBIDADES IMEDIATAS
- Ideação suicida / autolesão:
- Uso de substâncias:
- Risco no trânsito / trabalho:

6. TAREFA PARA CASA (até a Consulta 2)
- Reaplicar/levar ASRS, SNAP, PHQ-9, GAD-7 preenchidos.
- Trazer relato de familiar e, se possível, de professor/colega de trabalho.
- Buscar boletins escolares antigos, fichas médicas e cartão de vacina.
- Anotar 3 situações reais da semana em que os sintomas atrapalharam.

7. IMPRESSÃO INICIAL E CONDUTA
- Impressão preliminar (sem fechar diagnóstico):
- Conduta hoje: {{conduta}}
- Retorno: {{retorno}}`,
  },
  {
    id: "tdah-c2",
    category: "TDAH (avaliação em 3-4 consultas)",
    title: "TDAH adulto — Consulta 2: história de desenvolvimento",
    description: "Segundo encontro (50-60 min): trajetória de vida, infância, escola e família.",
    template: `AVALIAÇÃO DE TDAH — CONSULTA 2 (HISTÓRIA DE DESENVOLVIMENTO)
Paciente: {{nome}}
Data: {{data}}
Profissional: Dr(a). {{profissional}}

REVISÃO DA SEMANA
- Escalas trazidas (ASRS / SNAP / PHQ-9 / GAD-7):
- 3 situações reais anotadas:
- Material escolar / relatos de família trazidos:

1. GESTAÇÃO, PARTO E PRIMEIRA INFÂNCIA
- Intercorrências na gestação:
- Parto, prematuridade, intercorrências neonatais:
- Marcos do desenvolvimento (fala, marcha, controle esfincteriano):
- Temperamento nos primeiros anos:

2. INFÂNCIA (até os 12 anos)
- Comportamento em casa:
- Adaptação escolar (alfabetização, leitura, escrita, matemática):
- Boletins, advertências, reforço, repetências:
- Relato de pais e professores:
- Sociabilidade, amizades, conflitos:
- Esportes e atividades extracurriculares:

3. ADOLESCÊNCIA
- Desempenho no fundamental II e ensino médio:
- Organização, agenda, estudo independente:
- Uso de álcool, tabaco, outras substâncias:
- Comportamentos de risco (trânsito, sexualidade, brigas):
- Saúde mental nesta fase (humor, ansiedade, autolesão):

4. VIDA ADULTA
- Trajetória acadêmica e profissional:
- Trocas de emprego, demissões, sub-rendimento:
- Vida financeira, dívidas, impulsividade de consumo:
- Relacionamentos afetivos, separações, conflitos:
- Maternidade/paternidade e organização familiar:

5. HISTÓRIA FAMILIAR
- TDAH, transtornos de aprendizagem, ansiedade, depressão, bipolaridade, uso de substâncias:
- Diagnósticos formais e tratamentos na família:

6. ANTECEDENTES CLÍNICOS
- Doenças clínicas, neurológicas, endocrinológicas, cardiológicas:
- Medicações em uso:
- Exames recentes relevantes:

7. TAREFA PARA CASA (até a Consulta 3)
- Diário semanal: 3 momentos/dia em que sintomas apareceram (situação, gatilho, impacto).
- Levar informante significativo (parceiro, mãe/pai, amigo próximo) à próxima consulta, presencial ou por vídeo.
- Se possível, trazer avaliação neuropsicológica prévia ou solicitar.

8. CONDUTA
- Resumo do que ficou claro hoje:
- Pendências para a próxima consulta:
- Conduta: {{conduta}}
- Retorno: {{retorno}}`,
  },
  {
    id: "tdah-c3",
    category: "TDAH (avaliação em 3-4 consultas)",
    title: "TDAH adulto — Consulta 3: diagnóstico e plano",
    description: "Terceiro encontro (50-60 min): informante, diferenciais, fechamento e plano.",
    template: `AVALIAÇÃO DE TDAH — CONSULTA 3 (DIAGNÓSTICO E PLANO)
Paciente: {{nome}}
Data: {{data}}
Profissional: Dr(a). {{profissional}}

1. ENTREVISTA COM INFORMANTE
- Quem é (vínculo, tempo de convivência):
- Percepção dos sintomas no dia a dia:
- Sintomas observados antes dos 12 anos (ou desde quando convive):
- Impacto observado em casa, trabalho, estudos:
- Diferenças entre o relato do paciente e o do informante:

2. REVISÃO DAS ESCALAS E DO DIÁRIO
- ASRS-18 (total e domínios):
- SNAP-IV:
- PHQ-9 / GAD-7 / AUDIT:
- Padrões observados no diário semanal:

3. DIAGNÓSTICOS DIFERENCIAIS
- Depressão / distimia:
- Transtornos de ansiedade:
- Transtorno bipolar (hipomania, ciclos):
- Transtornos do sono (apneia, atraso de fase, insônia crônica):
- Uso de álcool e substâncias:
- Transtornos de aprendizagem específicos:
- Transtorno do espectro autista:
- Transtornos de personalidade (borderline em especial):
- Causas clínicas (tireoide, anemia, dor crônica, efeito de medicamentos):

4. CRITÉRIOS DSM-5-TR / CID-11 (6A05)
- ≥5 sintomas de desatenção e/ou hiperatividade-impulsividade por ≥6 meses:
- Início antes dos 12 anos (documentado):
- Presentes em ≥2 contextos:
- Prejuízo funcional claro:
- Não melhor explicado por outro transtorno:

5. FECHAMENTO DIAGNÓSTICO
- Diagnóstico (CID-11):
- Apresentação predominante (desatento / hiperativo-impulsivo / combinado):
- Gravidade (leve / moderada / grave):
- Comorbidades confirmadas:

6. PLANO TERAPÊUTICO INDIVIDUALIZADO
- Psicoeducação (paciente e família):
- Higiene de sono e rotina:
- Estratégias de organização externa (agenda, lembretes, blocos de tempo):
- Psicoterapia (TCC com foco em TDAH, coaching executivo):
- Tratamento farmacológico proposto e alternativas:
- Avaliação cardiovascular pré-medicação (PA, FC, ECG se indicado):
- Encaminhamentos (neuropsicologia, fonoaudiologia, nutrição, terapeuta ocupacional):
- Documentos: relatório, atestado, laudo escolar/trabalho:

7. CONDUTA HOJE
- Decisão compartilhada com o paciente: {{conduta}}
- Retorno: {{retorno}}`,
  },
  {
    id: "tdah-c4",
    category: "TDAH (avaliação em 3-4 consultas)",
    title: "TDAH adulto — Consulta 4: ajuste e seguimento",
    description: "Quarto encontro (opcional, 30-50 min): titulação, metas e plano de seguimento.",
    template: `AVALIAÇÃO DE TDAH — CONSULTA 4 (AJUSTE E SEGUIMENTO)
Paciente: {{nome}}
Data: {{data}}
Profissional: Dr(a). {{profissional}}

1. REVISÃO DESDE A CONSULTA 3
- Adesão ao plano não farmacológico:
- Adesão à medicação (dose atual, horário, esquecimentos):
- Efeitos percebidos (atenção, organização, humor, sono, apetite):
- Efeitos adversos (cardiovasculares, sono, apetite, humor, tiques):
- PA e FC nesta consulta:

2. RESULTADOS DE EXAMES E LAUDOS
- Avaliação neuropsicológica:
- Exames cardiológicos:
- Outros exames solicitados:

3. METAS DE 4 A 8 SEMANAS
- Meta 1 (trabalho/estudo):
- Meta 2 (rotina/sono):
- Meta 3 (relacional/emocional):
- Indicadores objetivos de melhora:

4. AJUSTE TERAPÊUTICO
- Titulação de medicação:
- Mudanças em psicoterapia / encaminhamentos:
- Estratégias comportamentais reforçadas:

5. PLANO DE SEGUIMENTO
- Frequência inicial: semanal -> quinzenal -> mensal -> trimestral.
- Sinais de alerta para contato antes do retorno (humor, ideação, efeitos adversos, PA/FC):
- Canais de contato e horários:
- Reavaliação formal em: 3 / 6 / 12 meses.

6. CONDUTA
- Esquema definido: {{conduta}}
- Retorno: {{retorno}}`,
  },
  {
    id: "ansiedade",
    category: "Ansiedade",
    title: "Anamnese — Transtornos de ansiedade",
    description: "Avaliação focada em TAG, pânico e fobias.",
    template: `ANAMNESE — ESPECTRO ANSIOSO
Paciente: {{nome}}
Data: {{data}}

1. CARACTERIZAÇÃO DA ANSIEDADE
- Início:
- Frequência e duração:
- Gatilhos identificados:
- Sintomas físicos (taquicardia, sudorese, tremor, dispneia):
- Sintomas cognitivos (preocupação, ruminação, catastrofização):

2. TRIAGEM POR QUADRO
- TAG (preocupação excessiva ≥6 meses): 
- Transtorno de pânico (ataques recorrentes inesperados):
- Agorafobia / esquiva:
- Fobia social:
- Fobias específicas:
- TOC (obsessões / compulsões):
- TEPT (evento traumático, reexperiência, hipervigilância):

3. IMPACTO FUNCIONAL
- Trabalho/estudo:
- Vida social:
- Sono:
- Uso de substâncias para alívio:

4. ESCALAS APLICADAS
- GAD-7: …
- PHQ-9: …
- PSS-10: …

5. ANTECEDENTES E COMORBIDADES
-

6. HIPÓTESE E PLANO
- CID-11:
- Conduta: {{conduta}}
- Retorno: {{retorno}}`,
  },
  {
    id: "depressao",
    category: "Humor",
    title: "Anamnese — Episódio depressivo",
    description: "Avaliação de humor depressivo, risco e funcionalidade.",
    template: `ANAMNESE — EPISÓDIO DEPRESSIVO
Paciente: {{nome}}
Data: {{data}}

1. SINTOMAS NUCLEARES (≥2 semanas)
( ) Humor deprimido a maior parte do dia
( ) Anedonia / perda de interesse
( ) Alteração de apetite ou peso
( ) Insônia ou hipersonia
( ) Agitação ou lentificação psicomotora
( ) Fadiga / perda de energia
( ) Sentimentos de inutilidade ou culpa excessiva
( ) Dificuldade de concentração
( ) Pensamentos de morte / ideação suicida

2. AVALIAÇÃO DE RISCO
- Ideação: ( ) ausente ( ) passiva ( ) ativa
- Plano: ( ) não ( ) sim — descrever:
- Acesso a meios:
- Tentativas prévias:
- Fatores protetivos:

3. RASTREIO DE BIPOLARIDADE
- Episódios prévios de elevação de humor:
- Hipomania induzida por antidepressivo:
- História familiar de bipolaridade:

4. ESCALAS
- PHQ-9: …
- HAM-D / MADRS: …
- C-SSRS: …

5. HISTÓRICO TERAPÊUTICO
- Antidepressivos prévios (dose, tempo, resposta, efeitos):
- Psicoterapia:

6. HIPÓTESE E PLANO
- CID-11:
- Conduta: {{conduta}}
- Retorno: {{retorno}}`,
  },
  {
    id: "sono",
    category: "Sono",
    title: "Anamnese — Queixas de sono",
    description: "Estrutura para insônia e distúrbios do sono.",
    template: `ANAMNESE — SONO
Paciente: {{nome}}
Data: {{data}}

1. PADRÃO DE SONO ATUAL
- Horário de deitar / levantar:
- Latência para iniciar o sono:
- Despertares noturnos (frequência/duração):
- Despertar precoce:
- Sensação ao acordar:
- Cochilos diurnos:

2. HIGIENE DO SONO
- Telas antes de dormir:
- Cafeína / álcool / nicotina:
- Atividade física e horário:
- Ambiente (luz, ruído, temperatura):

3. SINTOMAS ASSOCIADOS
- Ronco / apneia presenciada:
- Movimentos de pernas:
- Pesadelos / parassonias:
- Sonolência diurna (Epworth):

4. IMPACTO DIURNO
- Atenção/memória:
- Humor / irritabilidade:
- Desempenho:

5. COMORBIDADES E MEDICAÇÕES
-

6. HIPÓTESE E PLANO
- CID-11:
- Conduta: {{conduta}}
- Retorno: {{retorno}}`,
  },
  {
    id: "retorno",
    category: "Retorno",
    title: "Evolução de retorno (consulta breve)",
    description: "Modelo enxuto para consultas de seguimento.",
    template: `EVOLUÇÃO — RETORNO
Paciente: {{nome}}
Data: {{data}}

1. EVOLUÇÃO DESDE A ÚLTIMA CONSULTA
-

2. ADESÃO E TOLERÂNCIA À MEDICAÇÃO
- Esquema atual:
- Adesão:
- Efeitos adversos:

3. SINTOMAS-ALVO (escala 0–10)
- Humor:
- Ansiedade:
- Sono:
- Atenção:
- Funcionalidade:

4. EXAME DO ESTADO MENTAL (resumido)
-

5. RISCO
- Ideação suicida: ( ) ausente ( ) presente — detalhar:

6. CONDUTA
- Ajustes: {{conduta}}
- Orientações:
- Retorno: {{retorno}}`,
  },
];
