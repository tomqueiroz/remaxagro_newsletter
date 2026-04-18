import { brokers } from "@/mocks/newsletter";

export default function BrokersTeam() {
  return (
    <section id="especialistas" className="w-full">
      <div className="bg-[#0F2A1A] rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1A4A2A]/50 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header: selo à esquerda + título + CTA */}
          <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">

            {/* SELO em destaque */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full lg:w-auto">
              <div className="relative">
                {/* Glow dourado atrás do selo */}
                <div className="absolute inset-0 rounded-full bg-[#C9A84C]/20 blur-xl scale-110 pointer-events-none"></div>
                <img
                  src="/images/selo-corretor-certificado.png"
                  alt="Corretor Certificado RE/MAX Commercial Divisão Agro"
                  className="relative w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 0 18px rgba(201,168,76,0.35))" }}
                />
              </div>
              <div className="text-center lg:text-center">
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest leading-none">Certificação</p>
                <p className="text-white/50 text-xs mt-0.5">RE/MAX Commercial</p>
              </div>
            </div>

            {/* Título + texto + CTA */}
            <div className="flex-1 min-w-0">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Time Especializado</p>
              <h2 className="text-white text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Corretores RE/MAX AGRO
                <br />
                <span className="text-[#C9A84C]">Engajados & Prontos para Atender</span>
              </h2>
              <p className="text-white/60 text-sm mt-3 max-w-xl">
                Todos os nossos especialistas são <strong className="text-[#C9A84C]">Corretores Certificados RE/MAX Commercial Divisão Agro</strong> — a mais alta certificação em corretagem de propriedades rurais do Brasil. Estão ativamente engajados nesta newsletter e prontos para transformar informação em oportunidade para você.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://agro.remax.com.br"
                  rel="nofollow"
                  target="_blank"
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0F2A1A] font-bold px-6 py-3 rounded-full hover:bg-[#e0bc5a] transition-all duration-200 cursor-pointer text-sm"
                >
                  <i className="ri-team-line"></i>
                  Ver Todos os Especialistas
                </a>
                <a
                  href="#inscricao"
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-200 cursor-pointer text-sm"
                >
                  <i className="ri-mail-send-line"></i>
                  Falar com um Corretor
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brokers.map((broker) => (
              <div
                key={broker.id}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-[#C9A84C]/30 group-hover:border-[#C9A84C] transition-colors">
                    <img
                      src={broker.avatar}
                      alt={broker.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-white font-bold text-sm leading-snug mb-0.5">{broker.name}</h3>
                  <p className="text-[#C9A84C] text-xs mb-1">{broker.role}</p>
                  <p className="text-white/50 text-xs flex items-center gap-1">
                    <i className="ri-map-pin-line text-xs"></i>
                    {broker.region}
                  </p>
                  <a
                    href={`https://wa.me/${broker.whatsapp.replace(/\D/g, "")}`}
                    rel="nofollow"
                    target="_blank"
                    className="mt-3 w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 rounded-full transition-colors cursor-pointer"
                  >
                    <i className="ri-whatsapp-line text-sm"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white/60 text-sm">
                <strong className="text-white">100% do time</strong> está engajado e participando desta newsletter semanal
              </span>
            </div>
            <div className="sm:ml-auto flex items-center gap-3">
              <a href="https://instagram.com/remaxagro" rel="nofollow" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0F2A1A] transition-all cursor-pointer">
                <i className="ri-instagram-line text-sm"></i>
              </a>
              <a href="https://linkedin.com" rel="nofollow" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0F2A1A] transition-all cursor-pointer">
                <i className="ri-linkedin-line text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
