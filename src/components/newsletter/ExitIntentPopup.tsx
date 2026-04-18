import { useState, useEffect, useRef } from "react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lgpdChecked, setLgpdChecked] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);
  const triggered = useRef(false);
  const mobileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit_popup_dismissed_remax");
    if (dismissed) return;

    // Desktop: detecta saída do mouse pelo topo da página
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    // Mobile: dispara após 40s de leitura
    mobileTimer.current = setTimeout(() => {
      if (!triggered.current && window.innerWidth < 768) {
        triggered.current = true;
        setVisible(true);
      }
    }, 40000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (mobileTimer.current) clearTimeout(mobileTimer.current);
    };
  }, []);

  const close = () => {
    sessionStorage.setItem("exit_popup_dismissed_remax", "1");
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
    try {
      await new Promise((r) => setTimeout(r, 900));
      setSubmitted(true);
      setTimeout(() => {
        sessionStorage.setItem("exit_popup_dismissed_remax", "1");
        setVisible(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
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
              Lista Exclusiva · 100% Gratuito
            </div>
            <h2
              className="text-white text-xl md:text-2xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Não vá embora sem entrar para a lista exclusiva do
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
              <h3 className="text-[#0F2A1A] font-bold text-lg mb-2">Bem-vindo à lista exclusiva! 🌱</h3>
              <p className="text-[#5a5a5a] text-sm">
                Você receberá toda segunda-feira a newsletter mais estratégica do agronegócio brasileiro, além de informativos e convites para eventos exclusivos.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[#5a5a5a] text-sm leading-relaxed mb-4">
                Receba toda segunda-feira o que realmente importa no campo: cotações, destaques de mercado, análises DATAGRO e convites exclusivos para eventos do setor.
              </p>

              {/* Benefícios */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  { icon: "ri-newspaper-line", text: "Newsletter Semanal" },
                  { icon: "ri-bar-chart-line", text: "Análises DATAGRO" },
                  { icon: "ri-calendar-event-line", text: "Eventos Exclusivos" },
                  { icon: "ri-notification-line", text: "Informativos Especiais" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 bg-[#F5F0E8] rounded-xl px-3 py-2">
                    <i className={`${b.icon} text-[#C9A84C] text-sm`}></i>
                    <span className="text-[#0F2A1A] text-xs font-medium">{b.text}</span>
                  </div>
                ))}
              </div>

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
                      <strong>LGPD (Lei nº 13.709/2018)</strong>. Posso revogar meu consentimento a qualquer momento.
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
                  className="w-full bg-[#0F2A1A] hover:bg-[#1A4A2A] text-white font-bold py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Inscrevendo...
                    </>
                  ) : (
                    <>
                      <i className="ri-mail-send-line"></i>
                      Quero Fazer Parte da Lista Exclusiva
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={close}
                  className="w-full text-[#9a9a9a] text-xs hover:text-[#5a5a5a] transition-colors cursor-pointer py-1"
                >
                  Não, prefiro perder os informativos exclusivos
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
