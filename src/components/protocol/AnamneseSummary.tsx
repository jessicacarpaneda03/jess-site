import { useMemo, useState } from "react";
import { Check, ClipboardCopy, FileText, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const safe = (max: number) =>
  z.string().trim().max(max).regex(/^[^<>]*$/, { message: "Caracteres inválidos" });

type Form = {
  nome: string;
  idade: string;
  sexo: string;
  queixa: string;
  hda: string;
  antecedentes: string;
  medicacoes: string;
  familiares: string;
  habitos: string;
  exameMental: string;
  risco: "ausente" | "passiva" | "ativa-sem-plano" | "ativa-com-plano" | "tentativa-recente" | "";
  hipotese: string;
  conduta: string;
  retorno: string;
};

const initial: Form = {
  nome: "",
  idade: "",
  sexo: "",
  queixa: "",
  hda: "",
  antecedentes: "",
  medicacoes: "",
  familiares: "",
  habitos: "",
  exameMental: "",
  risco: "",
  hipotese: "",
  conduta: "",
  retorno: "",
};

const riscoLabels: Record<NonNullable<Form["risco"]>, string> = {
  "": "Não avaliado",
  ausente: "Ausente",
  passiva: "Ideação passiva",
  "ativa-sem-plano": "Ideação ativa SEM plano",
  "ativa-com-plano": "⚠ Ideação ativa COM plano — alto risco",
  "tentativa-recente": "⚠ Tentativa recente — alto risco",
};

function buildSummary(f: Form) {
  const empty = (s: string) => (s.trim() ? s.trim() : "—");
  const head = `RESUMO CLÍNICO — SAÚDE MENTAL
Paciente: ${empty(f.nome)}${f.idade ? ` (${f.idade} anos)` : ""}${f.sexo ? ` • ${f.sexo}` : ""}
Data do resumo: ${new Date().toLocaleDateString("pt-BR")}`;

  return `${head}

QUEIXA PRINCIPAL
${empty(f.queixa)}

HISTÓRIA DA DOENÇA ATUAL
${empty(f.hda)}

ANTECEDENTES PESSOAIS
${empty(f.antecedentes)}

MEDICAÇÕES EM USO
${empty(f.medicacoes)}

ANTECEDENTES FAMILIARES
${empty(f.familiares)}

HÁBITOS DE VIDA
${empty(f.habitos)}

EXAME DO ESTADO MENTAL (resumido)
${empty(f.exameMental)}

AVALIAÇÃO DE RISCO
${riscoLabels[f.risco || ""]}

HIPÓTESE DIAGNÓSTICA
${empty(f.hipotese)}

CONDUTA
${empty(f.conduta)}

RETORNO
${empty(f.retorno)}
`;
}

export const AnamneseSummary = () => {
  const [form, setForm] = useState<Form>(initial);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof Form>(key: K, raw: Form[K]) => {
    if (typeof raw === "string" && key !== "risco") {
      const max = key === "queixa" || key === "hipotese" || key === "retorno" ? 240 : 1200;
      const r = safe(max).safeParse(raw);
      if (!r.success) {
        toast.error("Caracteres inválidos detectados");
        return;
      }
    }
    setForm((v) => ({ ...v, [key]: raw }));
  };

  const summary = useMemo(() => buildSummary(form), [form]);
  const charCount = summary.length;
  const filled =
    Object.entries(form).filter(([k, v]) => k !== "risco" && (v as string).trim()).length +
    (form.risco ? 1 : 0);
  const totalFields = Object.keys(form).length;

  const copy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Resumo copiado", { description: "Pronto para colar no prontuário ou documento." });
    setTimeout(() => setCopied(false), 1800);
  };

  const reset = () => setForm(initial);

  const isHighRisk = form.risco === "ativa-com-plano" || form.risco === "tentativa-recente";

  return (
    <div className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Geração assistida</p>
          <h3 className="mt-2 font-display text-2xl md:text-3xl">
            Gerar <span className="italic text-primary">resumo</span> da anamnese
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Preencha os campos abaixo e o resumo clínico estruturado é gerado em tempo real,
            pronto para colar no prontuário, encaminhamento ou laudo.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          {filled}/{totalFields} campos preenchidos
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Formulário */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Label htmlFor="rs-nome">Nome</Label>
              <Input id="rs-nome" value={form.nome} onChange={(e) => update("nome", e.target.value)} maxLength={80} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="rs-idade">Idade</Label>
              <Input
                id="rs-idade"
                value={form.idade}
                onChange={(e) => update("idade", e.target.value.replace(/\D/g, "").slice(0, 3))}
                inputMode="numeric"
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="rs-sexo">Sexo / gênero</Label>
            <Input id="rs-sexo" value={form.sexo} onChange={(e) => update("sexo", e.target.value)} maxLength={30} className="mt-1.5" placeholder="Ex.: feminino, masculino, não-binário…" />
          </div>

          <div>
            <Label htmlFor="rs-queixa">Queixa principal</Label>
            <Textarea id="rs-queixa" value={form.queixa} onChange={(e) => update("queixa", e.target.value)} maxLength={240} rows={2} className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="rs-hda">História da doença atual</Label>
            <Textarea id="rs-hda" value={form.hda} onChange={(e) => update("hda", e.target.value)} maxLength={1200} rows={4} className="mt-1.5" placeholder="Início, curso, fatores desencadeantes, impacto funcional…" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="rs-ant">Antecedentes pessoais</Label>
              <Textarea id="rs-ant" value={form.antecedentes} onChange={(e) => update("antecedentes", e.target.value)} maxLength={1200} rows={3} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="rs-med">Medicações em uso</Label>
              <Textarea id="rs-med" value={form.medicacoes} onChange={(e) => update("medicacoes", e.target.value)} maxLength={1200} rows={3} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="rs-fam">Antecedentes familiares</Label>
              <Textarea id="rs-fam" value={form.familiares} onChange={(e) => update("familiares", e.target.value)} maxLength={1200} rows={3} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="rs-hab">Hábitos de vida</Label>
              <Textarea id="rs-hab" value={form.habitos} onChange={(e) => update("habitos", e.target.value)} maxLength={1200} rows={3} className="mt-1.5" placeholder="Sono, álcool, tabaco, atividade física…" />
            </div>
          </div>

          <div>
            <Label htmlFor="rs-eem">Exame do estado mental (resumido)</Label>
            <Textarea id="rs-eem" value={form.exameMental} onChange={(e) => update("exameMental", e.target.value)} maxLength={1200} rows={3} className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="rs-risco">Avaliação de risco</Label>
            <select
              id="rs-risco"
              value={form.risco}
              onChange={(e) => update("risco", e.target.value as Form["risco"])}
              className={`mt-1.5 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isHighRisk ? "border-destructive text-destructive" : "border-input"
              }`}
            >
              <option value="">— Selecionar —</option>
              <option value="ausente">Ausente</option>
              <option value="passiva">Ideação passiva ("queria sumir")</option>
              <option value="ativa-sem-plano">Ideação ativa SEM plano</option>
              <option value="ativa-com-plano">⚠ Ideação ativa COM plano</option>
              <option value="tentativa-recente">⚠ Tentativa recente</option>
            </select>
            {isHighRisk && (
              <p className="mt-2 rounded-md border border-destructive/30 bg-destructive/10 p-2 text-xs text-destructive">
                ⚠ Alto risco — orientar avaliação presencial imediata (SAMU 192 / PS) e CVV 188. Considerar plano de segurança e contato com rede de apoio.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="rs-hip">Hipótese diagnóstica (CID-11)</Label>
            <Input id="rs-hip" value={form.hipotese} onChange={(e) => update("hipotese", e.target.value)} maxLength={240} className="mt-1.5" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="rs-cond">Conduta</Label>
              <Textarea id="rs-cond" value={form.conduta} onChange={(e) => update("conduta", e.target.value)} maxLength={1200} rows={3} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="rs-ret">Retorno</Label>
              <Input id="rs-ret" value={form.retorno} onChange={(e) => update("retorno", e.target.value)} maxLength={120} className="mt-1.5" placeholder="Ex.: 30 dias" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={copy} className="rounded-full">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copiado
                </>
              ) : (
                <>
                  <ClipboardCopy className="mr-2 h-4 w-4" /> Copiar resumo
                </>
              )}
            </Button>
            <Button onClick={reset} variant="ghost" className="rounded-full">
              <RotateCcw className="mr-2 h-3.5 w-3.5" /> Limpar
            </Button>
          </div>
        </div>

        {/* Preview do resumo */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Pré-visualização do resumo
            </Label>
            <span className="text-xs text-muted-foreground">{charCount} caracteres</span>
          </div>
          <pre className="max-h-[640px] overflow-auto whitespace-pre-wrap rounded-2xl border border-border bg-secondary/40 p-5 font-sans text-[13px] leading-relaxed text-foreground/85">
            {summary}
          </pre>
        </div>
      </div>
    </div>
  );
};
