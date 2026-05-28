import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function FirstClickPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lgpdChecked, setLgpdChecked] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const hasRegistered = localStorage.getItem("remax_agro_registered");
    const hasSeenFirstClick = sessionStorage.getItem("first_click_popup_seen");
    
    if (hasRegistered || hasSeenFirstClick) return;

    const handleFirstClick = (e: MouseEvent) => {
      // Ignore clicks on the popup itself or its backdrop
      const target = e.target as HTMLElement;
      if (target.closest('.first-click-popup-container')) return;

      if (!triggered.current) {
        triggered.current = true;
        setVisible(true);
        sessionStorage.setItem("first_click_popup_seen", "1");
      }
    };

    // Add listener with a slight delay so it doesn't trigger immediately on load if user clicks fast
    const timer = setTimeout(() => {
      document.addEventListener("click", handleFirstClick, { capture: true });
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleFirstClick, { capture: true });
    };
  }, []);

  const close = () => {
    setVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lgpdChecked) {
      setLgpdError(true);
      return;
    }
    setLgpdError(false);
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;

    try {
      await supabase.from("leads").insert([
        {
          name,
          email,
          whatsapp,
          source: "first_click_popup",
        },
      ]);
      
      setSubmitted(true);
      localStorage.setItem("remax_agro_registered", "1");
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving lead:", error);
      // Even if it fails, we let them through for UX
      setSubmitted(true);
      localStorage.setItem("remax_agro_registered", "1");
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 first-click-popup-container"
      style={{ animation: "fadeIn 0.3s ease both" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F2A1A]/80 backdrop-blur-sm cursor-pointer"
        onClick={close}
      ></div>

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: "popIn 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Topo verde escuro com logo */}
        <div className="bg-[#0F2A1A] px-6 pt-6 pb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A84C]/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1A4A2A]/60 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Fechar"
          >
            <i className="ri-close-line text-base"></i>
          </button>

          <div className="relative z-10 text-center">
            <img
              src="/images/logo-white.png"
              alt="RE/MAX AGRO powered by DATAGRO"
              className="h-10 object-contain mx-auto mb-4"
            />
            <div className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F2A1A] text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              <i className="ri-mail-star-line text-xs"></i>
              Acesso Exclusivo
            </div>
            <h2
              className="text-white text-xl md:text-2xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Cadastre-se para acessar o conteúdo completo do
              <span className="text-[#C9A84C] italic"> Agro Estratégico</span>
            </h2>
          </div>
        </div>

        {/* Corpo */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
                <i className="ri-check-double-line text-emerald-600 text-2xl"></i>
              </div>
              <h3 className="text-[#0F2A1A] font-bold text-lg mb-2">Cadastro realizado com sucesso! 🌱</h3>
              <p className="text-[#5a5a5a] text-sm">
                Aproveite a leitura. Você também receberá nossa newsletter semanal.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[#5a5a5a] text-sm leading-relaxed mb-4">
                Para continuar navegando e lendo as notícias na íntegra, faça seu cadastro rápido e gratuito.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome completo"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#d8d0c0] bg-[#fafaf8] text-sm text-[#0F2A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu melhor e-mail"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#d8d0c0] bg-[#fafaf8] text-sm text-[#0F2A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp (opcional)"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8d0c0] bg-[#fafaf8] text-sm text-[#0F2A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />

                {/* LGPD Checkbox */}
                <div className={`rounded-xl border p-3 ${lgpdError ? "border-red-400 bg-red-50" : "border-[#d8d0c0] bg-[#F5F0E8]"}`}>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lgpdChecked}
                      onChange={(e) => {
                        setLgpdChecked(e.target.checked);
                        if (e.target.checked) setLgpdError(false);
                      }}
                      className="mt-0.5 w-4 h-4 accent-[#0F2A1A] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-[#3a3a3a] text-xs leading-relaxed">
                      Li e aceito os{" "}
                      <a href="#" className="text-[#C9A84C] underline hover:text-[#0F2A1A] cursor-pointer">Termos de Uso</a>{" "}
                      e a{" "}
                      <a href="#" className="text-[#C9A84C] underline hover:text-[#0F2A1A] cursor-pointer">Política de Privacidade</a>.
                      Consinto com o tratamento dos meus dados pessoais pela RE/MAX AGRO e DATAGRO para envio de comunicações, conforme a{" "}
                      <strong>LGPD (Lei nº 13.709/2018)</strong>.
                    </span>
                  </label>
                  {lgpdError && (
                    <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                      <i className="ri-error-warning-line"></i>
                      É obrigatório aceitar para continuar.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0F2A1A] hover:bg-[#1A4A2A] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <i className="ri-loader-4-line animate-spin text-lg"></i>
                  ) : (
                    <>
                      Acessar Conteúdo <i className="ri-arrow-right-line"></i>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
