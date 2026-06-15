# Plano: Seção "Temas em que atua" para Doctoralia

Adicionar uma nova seção visual no app com os 15 temas de atuação prontos para copiar e colar no perfil do Doctoralia, já ordenados por prioridade de captação e com texto reescrito para SEO (linguagem natural, sem jargão, sem termos comerciais, sem dados de contato).

## Ordem de prioridade (volume de busca + conversão em psiquiatria BR)

**Tier 1 — Âncoras (cole primeiro, geram tráfego frio)**
1. Ansiedade
2. Depressão
3. Insônia
4. TDAH em adultos
5. Síndrome de Pânico

**Tier 2 — Alta conversão (paciente já decidido)**
6. Burnout / Esgotamento profissional
7. Estresse e qualidade de vida
8. Saúde mental da mulher
9. Depressão pós-parto
10. Fobia social

**Tier 3 — Cauda longa (menos buscas, ticket alto, diferenciação)**
11. Transtorno bipolar
12. TOC (Transtorno obsessivo-compulsivo)
13. Saúde mental de jovens adultos
14. Revisão e ajuste de medicação psiquiátrica
15. Avaliação para afastamento do trabalho

## Ajustes de SEO aplicados em cada descrição

- Palavra-chave principal nas **primeiras 10 palavras** do texto (Doctoralia indexa o início).
- Remoção de termos técnicos: "TAG", "TDPM", "perimenopausa", "TCC", "Y-BOCS", "psicoeducação", "desprescrição", "comorbidade" → trocados por linguagem do paciente.
- Remoção de qualquer chamada comercial ("agende", "entre em contato", "no meu consultório") — proibido pelo Doctoralia.
- Frases curtas (média 15–20 palavras), voz ativa, primeira pessoa.
- 1 sinônimo natural por descrição (ex: "pânico / crises de pânico", "insônia / dificuldade para dormir") para capturar variações de busca.
- Tamanho entre 350–500 caracteres (faixa que o Doctoralia marca como "perfil completo" sem cortar na preview mobile).

## Implementação técnica

**Novo arquivo:** `src/data/doctoraliaTopics.ts`
- Exporta `topics: { id, rank, tier: 'ancora'|'conversao'|'cauda', title, keyword, description, chars }[]`
- 15 itens na ordem acima.

**Novo componente:** `src/components/protocol/DoctoraliaTopics.tsx`
- Cabeçalho explicando as 3 tiers e como usar.
- Filtro por tier (Todos / Âncoras / Alta conversão / Cauda longa).
- Grid de cards (responsivo: 1 col mobile, 2 col tablet, 3 col desktop) com:
  - Badge de tier + número de prioridade
  - Título
  - Descrição
  - Contador de caracteres
  - Botão "Copiar título" e "Copiar descrição" (usa `navigator.clipboard` + toast).
- Mesmo padrão visual de `DoctoraliaReviewReplies.tsx` para manter coerência.

**Edição:** `src/pages/Index.tsx`
- Importar `DoctoraliaTopics` e renderizar logo após `DoctoraliaReviewReplies`.
- Adicionar link de âncora no menu/navegação se houver.

## Fora de escopo

- Não altero descrições já existentes em outras seções.
- Não mexo no backend nem em dados do Supabase.
- Não publico o site.
