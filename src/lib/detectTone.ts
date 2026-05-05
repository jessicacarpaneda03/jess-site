// Detector de tom de avaliações públicas (Doctoralia/Google).
// IMPORTANTE: este arquivo é a fonte da verdade. A edge function
// `supabase/functions/formulador-resposta/index.ts` mantém uma cópia
// inline desta função — qualquer mudança aqui deve ser replicada lá.

export type Tom = "positivo_forte" | "positivo" | "neutro" | "negativo";

const NEG_WORDS = [
  "ruim", "péssim", "pessim", "decepc", "demor", "corrid",
  "caro demais", "frio", "não recomendo", "nao recomendo",
  "não voltaria", "nao voltaria", "esperei muito",
  "não gostei", "nao gostei", "horrível", "horrivel",
  "grosse", "mal atendid",
];

const STRONG_WORDS = [
  "extremamente", "incrível", "incrivel", "diferenciada", "diferenciado",
  "salvou", "transformou", "melhor médic", "melhor medic", "apenas confiem",
  "maravilhos", "excepcional", "sensacional", "mudou minha",
];

const POS_WORDS = [
  "ótim", "otim", "bom ", "boa ", "gostei", "recomendo",
  "atencios", "ajudou", "gentil", "humana", "humano",
  "acolhedor", "atenta", "compreens",
];

export function detectTone(text: string): Tom {
  const t = text.toLowerCase();
  if (NEG_WORDS.some((w) => t.includes(w))) return "negativo";

  const strongHits = STRONG_WORDS.filter((w) => t.includes(w)).length;
  const posHits = POS_WORDS.filter((w) => t.includes(w)).length;
  const exclam = (text.match(/!/g) || []).length;
  const hasCaps = /\b[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{4,}\b/.test(text);

  if (strongHits >= 1 && (posHits + strongHits >= 2 || exclam >= 2 || hasCaps)) return "positivo_forte";
  if (strongHits >= 1 || posHits >= 2) return "positivo_forte";
  if (posHits >= 1) return "positivo";
  return "neutro";
}
