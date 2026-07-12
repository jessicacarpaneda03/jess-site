# Verificação MCP — Dra. Jéssica

## Objetivo
Garantir que `formulate_reply`, `list_services` e `get_contact_info` sejam descobertas e executadas corretamente pelos três clientes MCP (ChatGPT, Claude Desktop, Cursor), autenticando via OAuth Supabase.

## Pré-requisitos
1. App **publicado** (MCP OAuth exige HTTPS público; `id-preview--*.lovable.app` não é aceito por alguns clientes). URL de produção: `https://<seu-domínio>/functions/v1/mcp`.
2. Google provider ativo no Supabase (login OAuth funciona).
3. Rota `/.lovable/oauth/consent` acessível e completando o fluxo.
4. Rodar `app_mcp_server--extract_mcp_manifest` e `supabase--deploy_edge_functions(["mcp"])` para garantir manifest e função no ar.

## Passo 1 — Sanity checks do servidor
- `GET https://<ref>.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` deve retornar 200 com o issuer Supabase.
- `POST .../functions/v1/mcp` com `initialize` (sem token) deve retornar 401 + header `WWW-Authenticate` apontando para o resource metadata.
- Após login OAuth: `tools/list` deve retornar exatamente 3 tools com nomes, títulos, descrições e `inputSchema` corretos.

## Passo 2 — Configuração em cada cliente

### ChatGPT (Developer Mode / Connectors)
- Settings → Connectors → Add custom MCP server
- URL: `https://<ref>.supabase.co/functions/v1/mcp`
- Transport: Streamable HTTP
- Autorizar via popup OAuth → aprovar em `/.lovable/oauth/consent`
- Verificar: as 3 tools aparecem na lista de ferramentas do conector.

### Claude Desktop (Custom Connectors — plano Pro/Team)
- Settings → Connectors → Add custom connector → URL do MCP
- Fluxo OAuth idêntico
- Verificar: `formulate_reply`, `list_services`, `get_contact_info` listadas.

### Cursor
- Settings → MCP → Add new server (Streamable HTTP)
- URL do MCP + OAuth
- Verificar descoberta em Cursor Chat.

## Passo 3 — Execução de cada ferramenta (em cada cliente)

| Tool | Prompt de teste | Resultado esperado |
|---|---|---|
| `list_services` | "Liste os serviços da Dra. Jéssica" | JSON com Primeira consulta R$400/90min, Retorno R$250/60min, Renovação R$150 |
| `get_contact_info` | "Qual o CRM e site da Dra. Jéssica?" | CRM GO 31189, site drajessicacarpaneda.com.br |
| `formulate_reply` (whatsapp) | "Formule resposta para: 'quanto custa a consulta?'" | Texto em 1ª pessoa citando R$400/90min |
| `formulate_reply` (opiniao) | mode=opiniao, msg=avaliação 5★ | Agradecimento sem confirmar vínculo |
| `formulate_reply` (novidade) | mode=novidade, tema=TDAH | Texto ≤750 chars, sem traços longos |

## Passo 3.5 — Checagem de logs
- `supabase--edge_function_logs` para função `mcp` durante os testes: confirmar 200 nas chamadas de tools/list e tools/call; confirmar que `formulate_reply` chega ao Lovable AI Gateway sem erro.

## Passo 4 — Critérios de aceitação
- [ ] Os 3 clientes concluem OAuth e persistem sessão.
- [ ] Cada cliente lista as 3 tools com metadados corretos.
- [ ] Cada tool retorna dados válidos (não-erro) nos 5 cenários da tabela.
- [ ] Logs não mostram 401/500 durante execução autorizada.

## Passo 5 — Contingências
- Se cliente rejeita issuer: verificar que `VITE_SUPABASE_PROJECT_ID` está inlined no bundle e issuer é `https://<ref>.supabase.co/auth/v1` (nunca `.lovable.cloud`).
- Se `formulate_reply` falha: checar `LOVABLE_API_KEY` no ambiente da edge function.
- Se Cursor/Claude não descobre: reimplantar função e revalidar manifest.

## Entregável
Relatório curto neste chat listando ✅/❌ por cliente × ferramenta, com screenshots ou trechos de log dos casos que falharem.

## Notas técnicas
- Nenhuma alteração de código é necessária se a validação passar. Correções aplicam-se apenas a `src/lib/mcp/**` + redeploy da função `mcp`.
- Não editar `supabase/functions/mcp/index.ts` manualmente (auto-gerado).
