import { describe, it, expect } from "vitest";
import { detectTone } from "./detectTone";

describe("detectTone", () => {
  describe("negativo", () => {
    it("detecta avaliação ruim", () => {
      expect(detectTone("Atendimento ruim, não voltaria.")).toBe("negativo");
    });

    it("detecta atendimento corrido", () => {
      expect(detectTone("Achei o atendimento corrido demais.")).toBe("negativo");
    });

    it("detecta espera longa", () => {
      expect(detectTone("Esperei muito tempo pra ser atendida.")).toBe("negativo");
    });

    it("detecta 'não recomendo' mesmo sem acento", () => {
      expect(detectTone("Nao recomendo a todos.")).toBe("negativo");
    });

    it("prioriza negativo sobre positivo se houver crítica", () => {
      // mistura: tem 'gentil' (positivo) mas também 'frio' (negativo)
      expect(detectTone("A médica é gentil, mas o atendimento foi frio.")).toBe("negativo");
    });

    it("detecta péssimo", () => {
      expect(detectTone("Experiência péssima.")).toBe("negativo");
    });
  });

  describe("positivo_forte", () => {
    it("detecta avaliação calorosa com palavra forte + caixa alta", () => {
      expect(
        detectTone("Não tenho palavras. EXTREMAMENTE humana e atenciosa. A mulher é diferenciada. Apenas confiem!")
      ).toBe("positivo_forte");
    });

    it("detecta 'incrível' com exclamações", () => {
      expect(detectTone("Atendimento incrível!! Recomendo!!")).toBe("positivo_forte");
    });

    it("detecta 'salvou' como palavra forte", () => {
      expect(detectTone("Ela salvou minha vida.")).toBe("positivo_forte");
    });

    it("detecta combinação de 2+ palavras positivas", () => {
      expect(detectTone("Médica humana, gentil e atenciosa.")).toBe("positivo_forte");
    });

    it("detecta 'maravilhosa'", () => {
      expect(detectTone("Profissional maravilhosa.")).toBe("positivo_forte");
    });

    it("detecta 'excepcional' sozinho", () => {
      expect(detectTone("Atendimento excepcional.")).toBe("positivo_forte");
    });
  });

  describe("positivo", () => {
    it("detecta avaliação contida com 1 palavra positiva", () => {
      expect(detectTone("Recomendo a doutora.")).toBe("positivo");
    });

    it("detecta 'gostei' isolado", () => {
      expect(detectTone("Gostei da consulta.")).toBe("positivo");
    });

    it("detecta 'ajudou' isolado", () => {
      expect(detectTone("Me ajudou bastante.")).toBe("positivo");
    });

    it("detecta 'ótimo' isolado", () => {
      expect(detectTone("Atendimento ótimo.")).toBe("positivo");
    });
  });

  describe("neutro", () => {
    it("classifica avaliação curta sem palavras-chave como neutro", () => {
      expect(detectTone("Consulta realizada.")).toBe("neutro");
    });

    it("classifica texto factual sem opinião como neutro", () => {
      expect(detectTone("Atendi por videochamada.")).toBe("neutro");
    });

    it("classifica string vazia como neutro", () => {
      expect(detectTone("")).toBe("neutro");
    });

    it("classifica string só com pontuação como neutro", () => {
      expect(detectTone("...")).toBe("neutro");
    });
  });

  describe("case-insensitive", () => {
    it("detecta palavras em qualquer caixa", () => {
      expect(detectTone("INCRÍVEL atendimento!")).toBe("positivo_forte");
      expect(detectTone("ruim demais")).toBe("negativo");
    });
  });
});
