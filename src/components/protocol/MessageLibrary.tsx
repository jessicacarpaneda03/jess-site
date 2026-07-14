import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Copy, Plus, Pencil, Trash2, Save, X, Search, Download, Upload, RotateCcw, Wand2, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { librarySeed, type LibraryMessage } from "@/data/messageLibrarySeed";

// Variáveis dinâmicas: {{nome}}, {{data}}, {{hora}}, {{preço}}, etc.
const VAR_REGEX = /\{\{\s*([\wçãáéíóúâêôà]+)\s*\}\}/gi;

const VAR_DEFAULTS: Record<string, string> = {
  nome: "",
  data: "",
  hora: "",
  preço: "R$ 400",
  preco: "R$ 400",
  valor: "R$ 400",
  link: "drajessicacarpaneda.com.br",
  site: "drajessicacarpaneda.com.br",
  medicação: "",
  medicacao: "",
  dosagem: "",
  telefone: "",
};

const VAR_STORAGE_KEY = "whatsapp-message-library-vars-v1";

function extractVars(text: string): string[] {
  const found = new Set<string>();
  text.replace(VAR_REGEX, (_m, name) => {
    found.add(String(name).toLowerCase());
    return "";
  });
  return Array.from(found);
}

function applyVars(text: string, values: Record<string, string>): string {
  return text.replace(VAR_REGEX, (_m, name) => {
    const key = String(name).toLowerCase();
    const v = values[key];
    return v && v.trim() ? v : `{{${name}}}`;
  });
}

// Formata texto para WhatsApp: quebras ideais, negrito/itálico nativos,
// remove espaços extras, garante uma linha em branco entre parágrafos e
// quebra frases longas em blocos legíveis no celular.
function formatForWhatsApp(input: string): string {
  let text = input.replace(/\r\n/g, "\n");

  // Markdown -> WhatsApp
  text = text.replace(/\*\*(.+?)\*\*/g, "*$1*"); // **negrito** -> *negrito*
  text = text.replace(/__(.+?)__/g, "_$1_");     // __itálico__ -> _itálico_
  text = text.replace(/~~(.+?)~~/g, "~$1~");     // ~~risco~~ -> ~risco~

  // Limpa espaços em cada linha
  text = text
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .join("\n");

  // Colapsa 3+ quebras em 2 (parágrafos com uma linha em branco)
  text = text.replace(/\n{3,}/g, "\n\n");

  // Quebra parágrafos muito longos em frases (>280 chars vira uma frase por linha)
  text = text
    .split("\n\n")
    .map((para) => {
      if (para.length <= 280 || /^[-•\d]/.test(para)) return para;
      const sentences = para.match(/[^.!?]+[.!?]+[)"']?\s?|[^.!?]+$/g);
      if (!sentences) return para;
      return sentences.map((s) => s.trim()).filter(Boolean).join("\n");
    })
    .join("\n\n");

  // Normaliza bullets em listas
  text = text.replace(/^\s*[-*]\s+/gm, "• ");

  return text.trim();
}


const STORAGE_KEY = "whatsapp-message-library-v1";

function loadMessages(): LibraryMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return librarySeed;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed;
    return librarySeed;
  } catch {
    return librarySeed;
  }
}

function saveMessages(msgs: LibraryMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

function uid() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const MessageLibrary = () => {
  const [messages, setMessages] = useState<LibraryMessage[]>(() => loadMessages());
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<LibraryMessage | null>(null);
  const [customizingId, setCustomizingId] = useState<string | null>(null);
  const [varValues, setVarValues] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(VAR_STORAGE_KEY);
      return raw ? { ...VAR_DEFAULTS, ...JSON.parse(raw) } : { ...VAR_DEFAULTS };
    } catch {
      return { ...VAR_DEFAULTS };
    }
  });

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(VAR_STORAGE_KEY, JSON.stringify(varValues));
  }, [varValues]);

  // Deep-link: /?category=X&q=Y#biblioteca vindo do guia de conversão
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const q = params.get("q");
    if (cat) {
      const known = Array.from(new Set(messages.map((m) => m.category)));
      if (known.some((k) => k.toLowerCase() === cat.toLowerCase())) {
        setActiveCategory(known.find((k) => k.toLowerCase() === cat.toLowerCase()) || "Todas");
      }
    }
    if (q) setQuery(q);
    if ((cat || q) && location.hash === "#biblioteca") {
      setTimeout(() => {
        document.getElementById("biblioteca")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.hash]);



  const categories = useMemo(() => {
    const set = new Set(messages.map((m) => m.category));
    return ["Todas", ...Array.from(set).sort()];
  }, [messages]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      const matchCat = activeCategory === "Todas" || m.category === activeCategory;
      const matchQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.text.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [messages, query, activeCategory]);

  const startNew = () => {
    setDraft({ id: uid(), category: "Geral", title: "", text: "" });
    setEditingId("__new__");
  };

  const startEdit = (m: LibraryMessage) => {
    setDraft({ ...m });
    setEditingId(m.id);
  };

  const cancelEdit = () => {
    setDraft(null);
    setEditingId(null);
  };

  const saveDraft = () => {
    if (!draft) return;
    if (!draft.title.trim() || !draft.text.trim()) {
      toast.error("Preencha título e texto.");
      return;
    }
    const cleaned: LibraryMessage = {
      ...draft,
      category: draft.category.trim() || "Geral",
      title: draft.title.trim(),
    };
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === cleaned.id);
      return exists ? prev.map((m) => (m.id === cleaned.id ? cleaned : m)) : [cleaned, ...prev];
    });
    toast.success("Mensagem salva.");
    cancelEdit();
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success("Mensagem removida.");
  };

  const copyText = async (text: string) => {
    const vars = extractVars(text);
    if (vars.length > 0) {
      const missing = vars.filter((v) => !varValues[v] || !varValues[v].trim());
      const rendered = applyVars(text, varValues);
      await navigator.clipboard.writeText(rendered);
      if (missing.length) {
        toast.warning(`Copiada, mas faltou preencher: ${missing.map((m) => `{{${m}}}`).join(", ")}`);
      } else {
        toast.success("Copiada com variáveis preenchidas.");
      }
      return;
    }
    await navigator.clipboard.writeText(text);
    toast.success("Copiada para o WhatsApp.");
  };

  const copyFinal = async (text: string) => {
    const rendered = extractVars(text).length ? applyVars(text, varValues) : text;
    const formatted = formatForWhatsApp(rendered);
    await navigator.clipboard.writeText(formatted);
    toast.success("Versão final formatada copiada.");
  };

  const sendWhatsApp = (text: string) => {
    const rendered = extractVars(text).length ? applyVars(text, varValues) : text;
    const formatted = formatForWhatsApp(rendered);
    // Normaliza telefone: apenas dígitos. Se informado sem DDI, assume Brasil (55).
    const raw = (varValues.telefone || "").replace(/\D/g, "");
    const phone = raw ? (raw.startsWith("55") ? raw : `55${raw}`) : "";
    const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
    const url = `${base}?text=${encodeURIComponent(formatted)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(phone ? "Abrindo conversa no WhatsApp." : "Abrindo WhatsApp — escolha o contato.");
  };



  const exportJson = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "biblioteca-mensagens-whatsapp.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("Formato inválido");
      const merged: LibraryMessage[] = [...messages];
      for (const item of parsed) {
        if (item?.title && item?.text) {
          merged.unshift({
            id: item.id || uid(),
            category: item.category || "Importadas",
            title: String(item.title),
            text: String(item.text),
          });
        }
      }
      setMessages(merged);
      toast.success("Mensagens importadas.");
    } catch {
      toast.error("Arquivo inválido.");
    }
  };

  const resetSeed = () => {
    if (confirm("Restaurar as mensagens iniciais? Suas edições serão substituídas.")) {
      setMessages(librarySeed);
      toast.success("Biblioteca restaurada.");
    }
  };

  return (
    <section id="biblioteca" className="py-16 px-4 bg-background border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-2">
            Biblioteca de Mensagens
          </h2>
          <p className="text-muted-foreground">
            Salve, edite e reutilize suas respostas do WhatsApp. Valores atuais: 90 min · R$ 400 e 60 min · R$ 250.
            Tudo fica salvo no seu navegador.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, texto ou categoria..."
              className="pl-9"
            />
          </div>
          <Button onClick={startNew} className="gap-2">
            <Plus className="h-4 w-4" /> Nova mensagem
          </Button>
          <Button variant="outline" onClick={exportJson} className="gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
          <label className="inline-flex">
            <Button variant="outline" asChild className="gap-2 cursor-pointer">
              <span>
                <Upload className="h-4 w-4" /> Importar
              </span>
            </Button>
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importJson(f);
                e.target.value = "";
              }}
            />
          </label>
          <Button variant="ghost" onClick={resetSeed} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Restaurar
          </Button>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editor */}
        {draft && (
          <Card className="p-4 mb-6 border-primary/40">
            <div className="grid gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="Título (ex: Confirmação de agendamento)"
                />
                <Input
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  placeholder="Categoria (ex: Valores, Ausência, Boas-vindas)"
                />
              </div>
              <Textarea
                value={draft.text}
                onChange={(e) => setDraft({ ...draft, text: e.target.value })}
                placeholder="Texto da mensagem..."
                className="min-h-[180px] font-mono text-sm"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={cancelEdit} className="gap-2">
                  <X className="h-4 w-4" /> Cancelar
                </Button>
                <Button onClick={saveDraft} className="gap-2">
                  <Save className="h-4 w-4" /> Salvar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Dica sobre variáveis */}
        <Card className="p-3 mb-4 bg-muted/40 border-dashed">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Variáveis dinâmicas:</strong> use{" "}
            <code className="px-1 bg-background rounded">{`{{nome}}`}</code>,{" "}
            <code className="px-1 bg-background rounded">{`{{data}}`}</code>,{" "}
            <code className="px-1 bg-background rounded">{`{{hora}}`}</code>,{" "}
            <code className="px-1 bg-background rounded">{`{{preço}}`}</code>,{" "}
            <code className="px-1 bg-background rounded">{`{{medicação}}`}</code> etc. em qualquer mensagem.
            Clique em <em>Personalizar</em> para preencher antes de copiar.
          </p>
        </Card>

        {/* Lista */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((m) => {
            const vars = extractVars(m.text);
            const isCustomizing = customizingId === m.id;
            const preview = vars.length ? applyVars(m.text, varValues) : m.text;
            return (
              <Card key={m.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="secondary" className="mb-1">
                      {m.category}
                    </Badge>
                    <h3 className="font-medium text-foreground">{m.title}</h3>
                    {vars.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {vars.map((v) => (
                          <Badge key={v} variant="outline" className="text-[10px]">
                            {`{{${v}}}`}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {vars.length > 0 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setCustomizingId(isCustomizing ? null : m.id)}
                        title="Personalizar variáveis"
                      >
                        <Wand2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" onClick={() => copyText(m.text)} title="Copiar original">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyFinal(m.text)}
                      title="Gerar versão final formatada para WhatsApp"
                      className="text-primary hover:text-primary"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => sendWhatsApp(m.text)}
                      title="Enviar no WhatsApp (wa.me)"
                      className="text-green-600 hover:text-green-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => startEdit(m)} title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeMessage(m.id)}
                      title="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {isCustomizing && vars.length > 0 && (
                  <div className="grid gap-2 p-3 rounded-md bg-muted/40 border border-border">
                    {vars.map((v) => (
                      <div key={v} className="grid grid-cols-[110px_1fr] items-center gap-2">
                        <label className="text-xs text-muted-foreground font-mono">{`{{${v}}}`}</label>
                        <Input
                          value={varValues[v] || ""}
                          onChange={(e) => setVarValues((prev) => ({ ...prev, [v]: e.target.value }))}
                          placeholder={VAR_DEFAULTS[v] || `Valor para ${v}`}
                          className="h-8 text-sm"
                        />
                      </div>
                    ))}
                    <div className="flex gap-2 mt-1">
                      <Button size="sm" variant="outline" onClick={() => copyText(m.text)} className="gap-2 flex-1">
                        <Copy className="h-3.5 w-3.5" /> Copiar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => copyFinal(m.text)} className="gap-2 flex-1">
                        <Sparkles className="h-3.5 w-3.5" /> Versão final
                      </Button>
                      <Button size="sm" onClick={() => sendWhatsApp(m.text)} className="gap-2 flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <Send className="h-3.5 w-3.5" /> Enviar
                      </Button>
                    </div>
                  </div>
                )}

                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed max-h-64 overflow-auto">
                  {preview}
                </pre>
              </Card>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              Nenhuma mensagem encontrada.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
