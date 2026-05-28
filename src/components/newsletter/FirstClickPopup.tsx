/**
 * FirstClickPopup
 * Pop-up de cadastro obrigatório exibido no primeiro clique de um novo usuário.
 * Se o usuário já se cadastrou (localStorage "remax_agro_registered"), não exibe.
 * Ao se cadastrar com sucesso, sinaliza via localStorage para que o ExitIntentPopup não apareça.
 */

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "remax_agro_registered";
const POPUP_SHOWN_KEY = "remax_agro_first_click_shown";

export default function FirstClickPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lgpdChecked, setLgpdChecked] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);

  // Listener de primeiro clique
  const handleFirstClick = useCallback(() => {
    const alreadyRegistered = localStorage.getItem(STORAGE_KEY);
    const alreadyShown = sessionStorage.getItem(POPUP_SHOWN_KEY);

    if (!alreadyRegistered && !alreadyShown) {
      sessionStorage.setItem(POPUP_SHOWN_KEY, "1");
      setVisible(true);
    }
    // Remove o listener após o primeiro clique
    document.removeEventListener("click", handleFirstClick);
  }, []);

  useEffect(() => {
    // Não adiciona o listener se o usuário já está cadastrado
    if (localStorage.getItem(STORAGE_KEY)) return;

    document.addEventListener("click", handleFirstClick);
    return () => {
      document.removeEventListener("click", handleFirstClick);
    };
  }, [handleFirstClick]);

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
    try {
      // Simula envio — substituir por chamada real à API
      await new Promise((r) => setTimeout(r, 900));

      // Marca o usuário como cadastrado para esta e futuras sessões
      localStorage.setItem(STORAGE_KEY, "1");

      setSubmitted(true);
      setTimeout(() => setVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-4"
      style={{ animation: "fadeIn 0.3s ease both" }}
    >
      {/* Backdrop — NÃO fecha ao clicar (cadastro obrigatório) */}
      <div className="absolute inset-0 bg-[#0F2A1A]/85 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: "popIn 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Topo verde escuro */}
        <div className="bg-[#0F2A1A] px-6 pt-6 pb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A84C]/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1A4A2A]/60 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 text-center">
            <img
              src="/images/logo-white.png"
              alt="RE/MAX AGRO powered by DATAGRO"
              className="h-10 object-contain mx-auto mb-4"
            />
            <div className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F2A1A] text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              <i className="ri-lock-unlock-line text-xs"></i>
              Acesso Gratuito · Conteúdo Exclusivo
            </div>
            <h2
              className="text-white text-xl md:text-2xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Cadastre-se para acessar o
              <span className="text-[#C9A84C] italic"> Agro Estratégico</span>
            </h2>
            <p className="text-white/70 text-sm mt-2">
              Informação curada para quem decide no campo — 100% gratuito.
            </p>
          </div>
        </div>

        {/* Corpo */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
                <i className="ri-check-double-line text-emerald-600 text-2xl"></i>
              </div>
              <h3 className="text-[#0F2A1A] font-bold text-lg mb-2">
                Bem-vindo à newsletter exclusiva do agro!
              </h3>
              <p className="text-[#5a5a5a] text-sm">
                Você agora faz parte da comunidade RE/MAX AGRO. Acompanhe as melhores análises e cotações do setor toda semana.
              </p>
            </div>
          ) : (
            <>
              {/* Benefícios */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  { icon: "ri-newspaper-line", text: "Newsletter Semanal" },
                  { icon: "ri-bar-chart-line", text: "Cotações Exclusivas" },
                  { icon: "ri-map-pin-line", text: "Mercado de Terras" },
                  { icon: "ri-shield-check-line", text: "Análises DATAGRO" },
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
                <div
                  className={`rounded-xl border p-3 ${
                    lgpdError ? "border-red-400 bg-red-50" : "border-[#d8d0c0] bg-[#F5F0E8]"
                  }`}
                >
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
                      <a href="#" className="text-[#C9A84C] underline hover:text-[#0F2A1A]">
                        Termos de Uso
                      </a>{" "}
                      e a{" "}
                      <a href="#" className="text-[#C9A84C] underline hover:text-[#0F2A1A]">
                        Política de Privacidade
                      </a>
                      . Consinto com o tratamento dos meus dados pela RE/MAX AGRO e DATAGRO,
                      conforme a <strong>LGPD (Lei nº 13.709/2018)</strong>.
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
                  className="w-full bg-[#C9A84C] hover:bg-[#e0bc5a] text-[#0F2A1A] font-bold py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <i className="ri-user-add-line"></i>
                      Quero Acesso Gratuito
                    </>
                  )}
                </button>

                <p className="text-center text-[#9a9a9a] text-xs">
                  Sem spam. Cancele quando quiser.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
