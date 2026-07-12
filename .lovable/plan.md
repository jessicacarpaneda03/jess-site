## Objetivo
Aumentar a conversão do guia `/guia-conversao-whatsapp` levando o leitor direto para os scripts prontos da Biblioteca de Mensagens, já filtrados pela categoria certa para o momento da leitura.

## Como vai funcionar

1. **Âncora + deep link na Biblioteca**
   - Adicionar `id="biblioteca"` na `<section>` da `MessageLibrary` (dentro de `src/components/protocol/MessageLibrary.tsx`).
   - `MessageLibrary` passa a ler `?category=<nome>` da URL na montagem, e se a categoria existir, já aplica no filtro `activeCategory` e faz `scrollIntoView` suave até a seção.
   - Suporta também `?q=<busca>` para pré-preencher o campo de busca (opcional, útil para CTAs mais específicos).

2. **CTAs contextuais dentro do guia** (`src/pages/GuiaConversaoWhatsapp.tsx`)
   Cada seção ganha um botão discreto “Copiar script pronto” logo abaixo do checklist, mirando a categoria da Biblioteca que resolve aquele ponto:

   | Seção do guia | CTA | Deep link |
   | --- | --- | --- |
   | 1. Velocidade de resposta | Ver scripts de boas-vindas e ausência | `/#biblioteca?category=Boas-vindas` e `?category=Ausência` |
   | 2. Tom humanizado | Ver scripts de primeira vez | `/#biblioteca?category=Primeira vez` |
   | 3. Scripts para objeções | Botões separados: Valores · Objeções · Logística · Receitas | um por categoria |
   | 4. Métricas | Ver scripts de confirmação e lembrete | `?category=Confirmação` e `?category=Lembrete` |

3. **CTA principal reforçado no fim do guia**
   O bloco “Como aplicar isso no seu consultório hoje” ganha dois botões lado a lado:
   - Primário: **“Abrir biblioteca de scripts”** → `/#biblioteca`
   - Secundário: **“Ver protocolo completo”** → `/`

4. **Barra sticky de conversão (topo do artigo)**
   Uma faixa fina no topo do guia com um único botão “Copiar meus scripts de WhatsApp” → `/#biblioteca`, visível durante a leitura sem interromper o conteúdo. Reforça a conversão mesmo para quem só lê o começo.

## Detalhes técnicos

- Uso de `<Link to={{ pathname: "/", hash: "biblioteca", search: "?category=Valores" }}>` do `react-router-dom`.
- Em `MessageLibrary`, usar `useLocation()` + `useEffect` para aplicar `category`/`q` uma única vez e chamar `document.getElementById("biblioteca")?.scrollIntoView({ behavior: "smooth", block: "start" })`.
- Se a categoria da URL não existir na lista atual, cai silenciosamente em “Todas”.
- Nenhuma alteração em `messageLibrarySeed.ts`, edge functions ou lógica de negócio.

## Fora de escopo
- Rastreamento analítico dos cliques (pode ser adicionado depois).
- Novas mensagens ou reorganização de categorias existentes.
