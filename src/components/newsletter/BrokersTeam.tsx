import { brokers } from "@/mocks/newsletter";

export default function BrokersTeam() {
  return (
    <section id="especialistas" className="w-full">
      <div className="bg-[#0F2A1A] rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1A4A2A]/50 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Time Especializado</p>
              <h2 className="text-white text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Corretores RE/MAX AGRO
                <br />
                <span className="text-[#C9A84C]">Engajados & Prontos para Atender</span>
              </h2>
              <p className="text-white/60 text-sm mt-2 max-w-lg">
                Nosso time de especialistas em propriedades rurais está ativamente engajado nesta newsletter e pronto para transformar informação em oportunidade para você.
              </p>
            </div>
            <a
              href="https://agro.remax.com.br"
              rel="nofollow"
              target="_blank"
              className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F2A1A] font-bold px-6 py-3 rounded-full hover:bg-[#e0bc5a] transition-all duration-200 cursor-pointer text-sm"
            >
              <i className="ri-team-line"></i>
              Ver Todos os Especialistas
            </a>
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
