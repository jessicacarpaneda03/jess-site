## Objetivo

Detectar o **tom** da avaliação recebida (muito positiva, neutra/curta, negativa) e injetar um guia de estilo diferente para cada caso, para que respostas a tons diferentes saiam com cara/ritmo/tamanho diferentes — não com o mesmo molde.

## Mudanças em `supabase/functions/formulador-resposta/index.ts`

### 1. Função `detectTone(text): "positivo_forte" | "positivo" | "neutro" | "negativo"`

Heurística simples por palavras-chave + sinais (caixa alta, exclamações, comprimento):

- **`negativo`**: presença de palavras como `ruim`, `péssim`, `decepc`, `demor`, `corrid`, `caro`, `frio`, `não recomendo`, `não voltaria`, `esperei muito`, `não gostei`.
- **`positivo_forte`**: ≥2 sinais de "positivo" + (caixa alta de palavra inteira OU 2+ exclamações OU palavras tipo `extremamente`, `melhor`, `salvou`, `transformou`, `incrível`, `diferenciada`, `apenas confiem`).
- **`positivo`**: 1+ palavra positiva (`ótim`, `bom`, `gostei`, `recomendo`, `atenciosa`, `ajudou`, `gentil`).
- **`neutro`**: o resto (avaliações curtas/factuais como "Atendimento ok").

### 2. Tabela `TONE_GUIDES`

Cada tom recebe um guia de estilo injetado como instrução adicional na mensagem do usuário (não no system prompt — assim varia a cada chamada):

```text
positivo_forte:
"TOM DA RESPOSTA: a avaliação é calorosa e enfática.
Responda com calor real e brevidade — 2 a 4 linhas. Pode mostrar emoção genuína
('me fez bem', 'isso aqui me marcou'). Sem exagero, sem clichê. Espelhe 1 ideia
específica que a pessoa trouxe. Pode usar 1 emoji discreto se combinar."

positivo:
"TOM DA RESPOSTA: a avaliação é positiva e contida.
Responda curto e direto — 1 a 3 linhas. Agradecimento simples, uma frase
pessoal ligando ao que a pessoa disse. Sem emoji, sem floreio."

neutro:
"TOM DA RESPOSTA: a avaliação é breve/factual.
Responda muito curto — 1 a 2 linhas. Só agradeça com naturalidade. Não invente
emoção que a pessoa não demonstrou."

negativo:
"TOM DA RESPOSTA: a avaliação tem crítica ou desconforto.
Reconheça o que a pessoa sentiu, sem rebater nem justificar clinicamente.
Peça desculpas pelo desconforto e abra canal privado pelo agendamento
(https://www.doctoralia.com.br/z/FcjTe4). 3 a 5 linhas. Sem emoji."
```

### 3. Injetar guia ao montar `userContent`

Concatenar o guia depois da avaliação, só para `tipo === "opiniao"`. Para mensagem privada não muda nada.

### 4. Ajuste leve de temperature

- `negativo`: `0.6` (precisa ser cuidadoso, menos variação).
- `neutro`: `0.8`.
- `positivo` / `positivo_forte`: `1.0` (mais variação criativa).

Aplicar dentro de `callModel` com base em um novo parâmetro `tom`.

### 5. Retornar `tom` na resposta da edge function

```json
{ "resposta": "...", "attempts": 1, "issues_remaining": [], "tom": "positivo_forte" }
```

## Mudança no UI (`ReplyFormulator.tsx`)

- Estado novo `tom`.
- Mostrar discretamente acima da resposta um chip pequeno: **"Tom detectado: muito positivo / positivo / neutro / crítico"**, usando `Badge` do shadcn. Ajuda a entender por que aquela versão saiu daquele jeito.
- Mantém botão **Outra versão** e o aviso de "reescrita Nx".

## Combinação com camadas anteriores

Esta camada **soma** ao prompt humano + validador anti-clichê. Ordem das defesas:

1. Prompt base (humano, sem clichês).
2. Guia de tom específico injetado por chamada.
3. Validador captura clichês remanescentes e força reescrita.
4. Botão "Outra versão" para o usuário variar manualmente.

## Arquivos afetados

- `supabase/functions/formulador-resposta/index.ts` — `detectTone`, `TONE_GUIDES`, ajuste de `callModel` e retorno.
- `src/components/protocol/ReplyFormulator.tsx` — exibir chip de tom detectado.
- Redeploy automático da edge function.
