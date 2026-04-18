import { useState, useEffect } from "react";

export default function LGPDConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("lgpd_consent_remax_agro");
    if (!accepted) {
      // pequeno delay para não aparecer imediatamente
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("lgpd_consent_remax_agro", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("lgpd_consent_remax_agro", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6"
      style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      <div className="max-w-4xl mx-auto bg-[#0F2A1A] rounded-2xl shadow-2xl border border-[#C9A84C]/20 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 md:p-6">
          {/* Ícone */}
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/30">
            <i className="ri-shield-check-line text-[#C9A84C] text-2xl"></i>
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm mb-1">
              🌱 Sua privacidade é importante para nós — LGPD
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              Utilizamos cookies e dados para personalizar sua experiência, enviar a newsletter RE/MAX AGRO e cumprir com a{" "}
              <strong className="text-[#C9A84C]">Lei Geral de Proteção de Dados (LGPD)</strong>. Ao continuar, você consente com o uso de dados para os fins descritos em nossa{" "}
              <a href="#" className="text-[#C9A84C] underline hover:text-[#e0bc5a] cursor-pointer">Política de Privacidade</a>.
              Você pode revogar o consentimento a qualquer momento.
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={accept}
              className="whitespace-nowrap px-5 py-2.5 bg-[#C9A84C] hover:bg-[#e0bc5a] text-[#0F2A1A] text-xs font-bold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <i className="ri-check-line text-sm"></i>
              Aceitar e Continuar
            </button>
            <button
              onClick={decline}
              className="whitespace-nowrap px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 border border-white/20"
            >
              Apenas Essenciais
            </button>
          </div>
        </div>

        {/* Barra de progresso decorativa */}
        <div className="h-0.5 bg-gradient-to-r from-[#C9A84C] via-[#CC0000] to-[#1a2e4a]"></div>
      </div>
    </div>
  );
}
