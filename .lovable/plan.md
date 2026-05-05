## Objetivo

Adicionar uma camada de validação na edge function que detecta frases/clichês de IA na resposta gerada e, se encontrar, **reenvia para o modelo reescrever** — automaticamente, sem o usuário perceber. Combinado com a voz humana já planejada, garante que nada robótico saia para o copy/paste.

## Como funciona

```text
[gerar] → [validar contra lista de clichês]
            │
            ├─ passou → devolve para o front
            └─ falhou → reenvia ao modelo com feedback
                          ("evite estas expressões: …")
                          até 2 retries → devolve a melhor versão
```

## Mudanças em `supabase/functions/formulador-resposta/index.ts`

### 1. Lista de clichês (`BANNED_PATTERNS`)

Array de regex (case-insensitive, com acentos opcionais), agrupado por categoria:

- **Vocabulário inflado**: `extremamente`, `imensamente`, `profundamente (grata|feliz|tocada)`, `de coração agradecid[ao]`
- **Clichês de consultório/IA**: `cuidado humano`, `escuta ativa`, `acolhimento integral`, `olhar humanizado`, `caminhada de cuidado`, `trajetória`, `jornada`
- **Fórmulas vazias**: `estou (sempre )?à disposição`, `conte sempre comigo`, `será sempre um prazer`, `é uma honra`, `que palavras generosas`, `que mensagem linda`, `fiquei (muito )?tocada`, `fico imensamente`
- **Voz de equipe (proibida)**: `\bequipe\b`, `\bnós\b`, `\bagradecemos\b`, `nossa equipe`, `estamos à disposição`
- **Padrões estruturais robóticos**: 3+ adjetivos seguidos separados por vírgula, frases com mais de 35 palavras, uso de `;`, mais de 1 emoji
- **Promessas absolutas (regra do protocolo)**: `vou te curar`, `garanto`, `com certeza vai`

### 2. Função `validateReply(text): { ok, issues[] }`

- Roda cada regex sobre o texto.
- Conta emojis (regex unicode).
- Mede tamanho médio de frase.
- Retorna lista de issues encontradas (string legível: ex.: `'usou "extremamente"'`, `'usou "estou à disposição"'`, `'mais de 1 emoji'`).

### 3. Loop de regeneração com feedback

```text
maxAttempts = 3
for i in 1..maxAttempts:
  resposta = chamarModelo(messages)
  issues = validateReply(resposta)
  if issues.empty: return resposta
  messages.push({ role: "assistant", content: resposta })
  messages.push({
    role: "user",
    content: "Reescreva. Sua resposta soou robótica. Problemas: " + issues +
             ". Reescreva mais curta, humana, sem clichês, sem essas expressões. Devolva APENAS a nova resposta."
  })
return melhorTentativa  // a com menos issues
```

### 4. Resposta da edge function

Retornar também metadata para debug (sem mostrar pro usuário final, mas útil em dev):
```json
{
  "resposta": "...",
  "attempts": 2,
  "issues_remaining": []
}
```

### 5. Limites

- Máx 3 tentativas para não estourar custo/latência.
- Se as 3 falharem, devolve a versão com menos issues + log no console (`console.warn("validateReply: respostas continuam genéricas", { issues, attempts })`).
- Tratamento de 429/402 mantido como já está.

## Mudança opcional no UI (`ReplyFormulator.tsx`)

- Mostrar discretamente, abaixo da resposta, um selo: **"Reescrita 2x para soar mais humana"** quando `attempts > 1`. Ajuda a confiar no sistema.
- Botão **"Gerar outra versão"** continua existindo (do plano anterior) para o usuário forçar uma nova geração quando quiser.

## Arquivos afetados

- `supabase/functions/formulador-resposta/index.ts` — adicionar `BANNED_PATTERNS`, `validateReply`, loop de regeneração.
- `src/components/protocol/ReplyFormulator.tsx` — exibir contador de tentativas (opcional).
- Redeploy automático da edge function.

## Combinação com o plano anterior

Esta camada **soma** ao plano de "voz humana real": o prompt já tenta sair humano de primeira; a validação é a rede de segurança que captura quando ele escorrega.
