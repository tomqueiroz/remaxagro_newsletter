import { useState } from "react";

export default function SubscribeSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lgpdChecked, setLgpdChecked] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lgpdChecked) {
      setLgpdError(true);
      return;
    }
    setLgpdError(false);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inscricao" className="w-full">
      <div className="bg-[#F5F0E8] rounded-2xl p-6 md:p-8 border border-[#e8e0d0]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F2A1A]">
                <i className="ri-mail-send-line text-[#C9A84C] text-sm"></i>
              </div>
              <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Newsletter Exclusiva</span>
            </div>
            <h2 className="text-[#0F2A1A] text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Receba Toda Segunda-Feira
            </h2>
            <p className="text-[#5a5a5a] text-sm leading-relaxed mb-4">
              Inscreva-se gratuitamente e receba o resumo estratégico do agronegócio diretamente no seu e-mail. Curadoria exclusiva da RE/MAX AGRO powered by DATAGRO.
            </p>
            <div className="flex flex-wrap gap-3">
              {["100% Gratuito", "Sem Spam", "Cancele Quando Quiser", "Curadoria Exclusiva"].map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[#0F2A1A] text-xs font-medium">
                  <i className="ri-check-line text-[#C9A84C] text-sm"></i>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 mx-auto mb-3">
                  <i className="ri-check-double-line text-emerald-600 text-xl"></i>
                </div>
                <h3 className="text-emerald-800 font-bold text-base mb-1">Inscrição Confirmada!</h3>
                <p className="text-emerald-700 text-sm">
                  Você receberá a próxima edição toda segunda-feira. Bem-vindo ao agro estratégico!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome completo"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#d8d0c0] bg-white text-sm text-[#0F2A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu melhor e-mail"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#d8d0c0] bg-white text-sm text-[#0F2A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <select
                  name="perfil"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#d8d0c0] bg-white text-sm text-[#0F2A1A] focus:outline-none focus:border-[#C9A84C] transition-colors cursor-pointer"
                >
                  <option value="">Seu perfil no agronegócio</option>
                  <option value="proprietario">Proprietário Rural</option>
                  <option value="investidor">Investidor</option>
                  <option value="corretor">Corretor Especializado</option>
                  <option value="profissional">Profissional do Agro</option>
                  <option value="outro">Outro</option>
                </select>
                {/* LGPD Checkbox */}
                <div className={`rounded-xl border p-3 ${lgpdError ? "border-red-400 bg-red-50" : "border-[#d8d0c0] bg-white"}`}>
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
                      Aceito os{" "}
                      <a href="#" className="text-[#C9A84C] underline hover:text-[#0F2A1A] cursor-pointer">Termos de Uso</a>{" "}
                      e a{" "}
                      <a href="#" className="text-[#C9A84C] underline hover:text-[#0F2A1A] cursor-pointer">Política de Privacidade</a>.
                      Consinto com o tratamento dos meus dados pela RE/MAX AGRO e DATAGRO, conforme a{" "}
                      <strong>LGPD (Lei nº 13.709/2018)</strong>.
                    </span>
                  </label>
                  {lgpdError && (
                    <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                      <i className="ri-error-warning-line"></i>
                      Aceite os termos para continuar.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="whitespace-nowrap w-full bg-[#0F2A1A] hover:bg-[#1A4A2A] text-white font-bold py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Inscrevendo...
                    </>
                  ) : (
                    <>
                      <i className="ri-mail-send-line"></i>
                      Quero Receber a Newsletter
                    </>
                  )}
                </button>
                <p className="text-[#9a9a9a] text-xs text-center">
                  Dados protegidos pela{" "}
                  <a href="#" className="text-[#C9A84C] hover:underline cursor-pointer">LGPD</a>.
                  Cancele quando quiser.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
