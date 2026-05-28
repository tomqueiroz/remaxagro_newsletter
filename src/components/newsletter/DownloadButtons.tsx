/**
 * DownloadButtons
 * Grupo de botões de download: PDF e HTML de email.
 * Cada um é standalone (não depende do outro).
 */

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useNewsletterData } from "@/hooks/useNewsletterData";
import { NewsletterPDF } from "./NewsletterPDF";
import type { PDFImageUrls } from "./NewsletterPDF";
import { generateNewsletterHTML } from "@/lib/generateNewsletterHTML";

/** Constrói URLs absolutas para as imagens do PDF — necessário para @react-pdf/renderer no browser */
function buildImageUrls(): PDFImageUrls {
  const base = window.location.origin;
  return {
    logoWhite: `${base}/images/logo-white.png`,
    hero:      `${base}/images/hero-agro-newsletter.png`,
    selo:      `${base}/images/selo-corretor-certificado.png`,
  };
}

// ─── PDF ─────────────────────────────────────────────────────────────────────

interface DownloadPDFProps {
  variant?: "header" | "footer";
}

export function DownloadPDFButton({ variant = "header" }: DownloadPDFProps) {
  const [loading, setLoading] = useState(false);
  const data = useNewsletterData();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const images = buildImageUrls();
      const blob = await pdf(<NewsletterPDF data={data} images={images} />).toBlob();
      triggerDownload(
        blob,
        `REMAX-AGRO-Newsletter-Ed${data.editionNumber}-${data.lastUpdated.replace(/\//g, "-")}.pdf`
      );
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "footer") {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#C9A84C] border border-white/20 hover:border-[#C9A84C] text-white hover:text-[#0F2A1A] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer text-sm disabled:opacity-60 group"
      >
        {loading ? (
          <><i className="ri-loader-4-line animate-spin text-base" />Gerando PDF...</>
        ) : (
          <><i className="ri-file-pdf-2-line text-base group-hover:scale-110 transition-transform" />Baixar PDF</>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="whitespace-nowrap inline-flex items-center gap-1.5 bg-[#0F2A1A] hover:bg-[#1A4A2A] border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#C9A84C] font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-xs disabled:opacity-60"
      title="Baixar newsletter em PDF"
    >
      {loading ? (
        <><i className="ri-loader-4-line animate-spin text-sm" />Gerando...</>
      ) : (
        <><i className="ri-file-pdf-2-line text-sm" />PDF</>
      )}
    </button>
  );
}

// ─── HTML ─────────────────────────────────────────────────────────────────────

interface DownloadHTMLProps {
  variant?: "header" | "footer";
}

export function DownloadHTMLButton({ variant = "header" }: DownloadHTMLProps) {
  const [loading, setLoading] = useState(false);
  const data = useNewsletterData();

  const handleDownload = () => {
    setLoading(true);
    try {
      const html = generateNewsletterHTML(data);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      triggerDownload(
        blob,
        `REMAX-AGRO-Newsletter-Ed${data.editionNumber}-EMAIL.html`
      );
    } catch (err) {
      console.error("Erro ao gerar HTML:", err);
      alert("Erro ao gerar HTML. Tente novamente.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  if (variant === "footer") {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#1a2e4a] border border-white/20 hover:border-white/40 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer text-sm disabled:opacity-60 group"
      >
        {loading ? (
          <><i className="ri-loader-4-line animate-spin text-base" />Gerando...</>
        ) : (
          <><i className="ri-mail-send-line text-base group-hover:scale-110 transition-transform" />Baixar HTML Email</>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="whitespace-nowrap inline-flex items-center gap-1.5 bg-[#1a2e4a] hover:bg-[#243d5c] border border-white/10 hover:border-white/30 text-white font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-xs disabled:opacity-60"
      title="Baixar HTML compatível com e-mail"
    >
      {loading ? (
        <><i className="ri-loader-4-line animate-spin text-sm" />Gerando...</>
      ) : (
        <><i className="ri-mail-send-line text-sm" />HTML</>
      )}
    </button>
  );
}

// ─── Grupo combinado ─────────────────────────────────────────────────────────

interface DownloadGroupProps {
  variant?: "header" | "footer";
}

export default function DownloadButtons({ variant = "header" }: DownloadGroupProps) {
  if (variant === "footer") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <DownloadPDFButton variant="footer" />
        <DownloadHTMLButton variant="footer" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <DownloadPDFButton variant="header" />
      <DownloadHTMLButton variant="header" />
    </div>
  );
}

// ─── Util ─────────────────────────────────────────────────────────────────────

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
