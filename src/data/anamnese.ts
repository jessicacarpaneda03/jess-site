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
    id: "tdah-adulto",
    category: "TDAH",
    title: "Anamnese dirigida — TDAH no adulto",
    description: "Triagem estruturada para avaliação de TDAH em adultos.",
    template: `ANAMNESE DIRIGIDA — TDAH ADULTO
Paciente: {{nome}}
Idade: {{idade}} anos
Data: {{data}}

1. QUEIXA E IMPACTO ATUAL
- Principais dificuldades hoje:
- Áreas afetadas (trabalho, estudo, finanças, relacionamentos):
- Quando percebeu que algo era diferente:

2. SINTOMAS DE DESATENÇÃO (avaliar frequência)
( ) Erros por descuido em tarefas
( ) Dificuldade em manter atenção
( ) Parece não ouvir quando falam diretamente
( ) Não conclui tarefas
( ) Dificuldade em organizar atividades
( ) Evita tarefas que exigem esforço mental
( ) Perde objetos com frequência
( ) Distrai-se com estímulos externos
( ) Esquecimento em atividades diárias

3. SINTOMAS DE HIPERATIVIDADE/IMPULSIVIDADE
( ) Inquietação, mexe mãos/pés
( ) Dificuldade em permanecer sentado
( ) Sensação interna de inquietação
( ) Dificuldade em atividades de lazer silenciosas
( ) "A mil por hora"
( ) Fala excessivamente
( ) Responde antes da pergunta terminar
( ) Dificuldade em esperar a vez
( ) Interrompe ou se intromete

4. HISTÓRIA NA INFÂNCIA
- Sintomas antes dos 12 anos:
- Desempenho escolar:
- Relato de pais/professores:
- Boletins, repetências, reforço:

5. COMORBIDADES A RASTREAR
- Ansiedade / Depressão:
- Transtorno bipolar:
- Uso de substâncias:
- Transtornos do sono:
- Transtorno do espectro autista:
- Transtornos de aprendizagem:

6. ANTECEDENTES E MEDICAÇÕES
- Tentativas terapêuticas prévias:
- Doenças cardiovasculares (pessoal/familiar):
- Pressão arterial / FC basal:

7. INSTRUMENTOS APLICADOS
- ASRS-18: …
- WURS: …
- Outros:

8. HIPÓTESE E PLANO
- Diagnóstico (CID-11 6A05):
- Apresentação predominante:
- Conduta: {{conduta}}
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
