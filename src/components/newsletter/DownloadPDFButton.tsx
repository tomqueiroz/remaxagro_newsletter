/**
 * DownloadPDFButton
 * Botão reutilizável para gerar e baixar o PDF da newsletter.
 * Usa @react-pdf/renderer com lazy-load para não impactar o bundle inicial.
 */

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useNewsletterData } from "@/hooks/useNewsletterData";
import NewsletterPDF from "./NewsletterPDF";

interface Props {
  variant?: "header" | "footer";
}

export default function DownloadPDFButton({ variant = "header" }: Props) {
  const [loading, setLoading] = useState(false);
  const data = useNewsletterData();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<NewsletterPDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `REMAX-AGRO-Newsletter-Edicao-${data.editionNumber}-${data.lastUpdated.replace(/\//g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
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
          <>
            <i className="ri-loader-4-line animate-spin text-base"></i>
            Gerando PDF...
          </>
        ) : (
          <>
            <i className="ri-file-pdf-2-line text-base group-hover:scale-110 transition-transform"></i>
            Baixar esta Edição em PDF
          </>
        )}
      </button>
    );
  }

  // variant === "header"
  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="whitespace-nowrap inline-flex items-center gap-1.5 bg-[#0F2A1A] hover:bg-[#1A4A2A] border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#C9A84C] font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-xs disabled:opacity-60"
      title="Baixar newsletter em PDF"
    >
      {loading ? (
        <>
          <i className="ri-loader-4-line animate-spin text-sm"></i>
          Gerando...
        </>
      ) : (
        <>
          <i className="ri-file-pdf-2-line text-sm"></i>
          PDF
        </>
      )}
    </button>
  );
}
