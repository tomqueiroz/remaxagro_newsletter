import { useState, useEffect, useRef } from "react";

/**
 * FirstClickPopup — aparece no primeiro clique de um novo usuário.
 * Não aparece se o usuário já se cadastrou (localStorage "remax_agro_registered").
 * Ao se cadastrar, marca localStorage e garante que o ExitIntentPopup não apareça.
 */
export default function FirstClickPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lgpdChecked, setLgpdChecked] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    // Se já cadastrado ou já dispensado nesta sessão, não mostrar
    const registered = localStorage.getItem("remax_agro_registered");
    const dismissed = sessionStorage.getItem("first_click_dismissed_remax");
    if (registered || dismissed) return;

    const handleFirstClick = () => {
      if (!triggered.current) {
        triggered.current = true;
        // Pequeno delay para não aparecer imediatamente ao clicar em botões CTA
        setTimeout(() => setVisible(true), 400);
        document.removeEventListener("click", handleFirstClick);
      }
    };

    // Aguarda um pouco para não disparar em carregamento
    const initTimer = setTimeout(() => {
      document.addEventListener("click", handleFirstClick);
    }, 2000);

    return () => {
      clearTimeout(initTimer);
      document.removeEventListener("click", handleFirstClick);
    };
  }, []);

  const close = () => {
    sessionStorage.setItem("first_click_dismissed_remax", "1");
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
      // Marca como cadastrado — ExitIntentPopup também verifica esta chave
      localStorage.setItem("remax_agro_registered", "1");
      sessionStorage.setItem("exit_popup_dismissed_remax", "1");
      setSubmitted(true);
      setTimeout(() => setVisible(false), 2800);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center px-4"
      style={{ animation: "fadeIn 0.3s ease both" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0F2A1A]/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: "popIn 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header verde */}
        <div className="bg-[#1a2e4a] px-6 pt-7 pb-5 text-center relative">
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <i className="ri-close-line text-xl" />
          </button>
          <img src="/images/logo-color.png" alt="RE/MAX AGRO" className="h-10 mx-auto mb-4 object-contain" />
          <h2 className="text-white text-xl font-bold leading-tight">
            Fique por dentro do Agro Estratégico
          </h2>
          <p className="text-white/70 text-sm mt-2">
            Cadastre-se gratuitamente e receba toda semana a curadoria mais completa do agronegócio brasileiro.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e4a] mb-2">Cadastro realizado!</h3>
              <p className="text-gray-600 text-sm">
                Você receberá a newsletter RE/MAX AGRO toda semana. Bem-vindo ao agro estratégico!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome completo *"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail *"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp (opcional)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
                />
              </div>

              {/* LGPD */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lgpdChecked}
                    onChange={(e) => {
                      setLgpdChecked(e.target.checked);
                      if (e.target.checked) setLgpdError(false);
                    }}
                    className="mt-0.5 rounded accent-[#1a2e4a]"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    Concordo em receber comunicações da RE/MAX AGRO e estou ciente da{" "}
                    <a href="#" className="text-[#1a2e4a] underline">Política de Privacidade</a>.
                    Meus dados são protegidos conforme a Lei 13.709/2018 (LGPD). *
                  </span>
                </label>
                {lgpdError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <i className="ri-error-warning-line" />
                    Aceite a política de privacidade para continuar.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4a847] hover:bg-[#c49636] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <i className="ri-mail-send-line" />
                    Quero receber a newsletter
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={close}
                className="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
              >
                Agora não, obrigado
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
