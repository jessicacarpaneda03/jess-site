import { useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { doctor } from "@/data/protocol";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Copy, Stethoscope, MessageCircle, Globe, MapPin } from "lucide-react";
import { toast } from "sonner";

const onlyDigits = (s: string) => s.replace(/\D/g, "");

export const BusinessCard = () => {
  const [phone, setPhone] = useState("5562999999999");
  const [message, setMessage] = useState(
    "Olá, Dra. Jéssica! Vim pelo seu cartão e gostaria de informações sobre teleconsulta. 🌿"
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const waUrl = useMemo(() => {
    const num = onlyDigits(phone);
    const text = encodeURIComponent(message);
    return `https://wa.me/${num}${text ? `?text=${text}` : ""}`;
  }, [phone, message]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(waUrl);
    toast.success("Link copiado", { description: "Cole onde quiser compartilhar." });
  };

  const downloadQR = () => {
    const svg = document.getElementById("wa-qr-svg") as SVGSVGElement | null;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode-whatsapp-dra-jessica.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCardPNG = async () => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const scale = 3;
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);

    // Serialize node as foreignObject inside SVG
    const clone = node.cloneNode(true) as HTMLElement;
    // inline computed background
    const data = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w * scale}" height="${h * scale}" viewBox="0 0 ${w} ${h}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px;">${clone.outerHTML}</div>
        </foreignObject>
      </svg>`;
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((b) => {
        if (!b) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = "cartao-dra-jessica.png";
        a.click();
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <section id="cartao" className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Cartão de visita digital
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            QR Code para o <span className="italic text-primary">WhatsApp</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Edite o número e a mensagem inicial. Baixe o QR ou o cartão pronto para
            imprimir, anexar em e-mail, posts e assinaturas.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Controls */}
          <Card className="p-6 md:p-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="wa-phone">WhatsApp (com DDI + DDD)</Label>
                <Input
                  id="wa-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="55 62 9 9999-9999"
                />
                <p className="text-xs text-muted-foreground">
                  Formato internacional, só números. Ex.: 55 + DDD + número.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wa-msg">Mensagem pré-preenchida</Label>
                <Textarea
                  id="wa-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Link gerado</Label>
                <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm">
                  <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate font-mono text-xs">{waUrl}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={copyLink} variant="outline" className="rounded-full">
                  <Copy className="mr-2 h-4 w-4" /> Copiar link
                </Button>
                <Button onClick={downloadQR} variant="outline" className="rounded-full">
                  <Download className="mr-2 h-4 w-4" /> Baixar QR (SVG)
                </Button>
                <Button onClick={downloadCardPNG} className="rounded-full">
                  <Download className="mr-2 h-4 w-4" /> Baixar cartão (PNG)
                </Button>
              </div>
            </div>
          </Card>

          {/* Card preview */}
          <div className="flex items-start justify-center">
            <div
              ref={cardRef}
              className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-muted shadow-soft"
            >
              <div className="relative px-8 pt-8 pb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <Stethoscope className="h-3 w-3 text-primary" /> Médica psiquiatra
                </div>

                <h3 className="mt-5 font-display text-3xl leading-tight">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {doctor.specialty}
                </p>

                <div className="mt-5 space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-foreground/80">
                    <MapPin className="h-4 w-4 text-primary" /> {doctor.city}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {doctor.crm}
                  </p>
                </div>
              </div>

              <div className="mx-8 border-t border-border/60" />

              <div className="flex items-center gap-5 px-8 py-6">
                <div className="rounded-xl bg-white p-3 shadow-soft">
                  <QRCodeSVG
                    id="wa-qr-svg"
                    value={waUrl}
                    size={132}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0a0a0a"
                  />
                </div>
                <div className="flex-1">
                  <p className="flex items-center gap-2 font-display text-lg">
                    <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aponte a câmera para falar comigo.
                  </p>
                  <p className="mt-3 font-mono text-xs text-foreground/70">
                    +{onlyDigits(phone).replace(/(\d{2})(\d{2})(\d{5})(\d{4}).*/, "$1 $2 $3-$4")}
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 px-8 py-3 text-center text-[11px] uppercase tracking-widest text-primary">
                Teleconsulta • Brasil
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
