export default function HeroIntro() {
  return (
    <section id="introducao" className="w-full relative overflow-hidden">
      <div className="relative h-[520px] md:h-[620px] w-full">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&h=620&q=80"
          alt="Agronegócio Brasileiro"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A1A]/90 via-[#0F2A1A]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A1A]/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F2A1A] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                <i className="ri-star-fill text-xs"></i>
                Primeira Edição · Abril 2026
              </div>

              <h1
                className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                O Agro Estratégico
                <br />
                <span className="text-[#C9A84C] italic">na Palma da Sua Mão</span>
              </h1>

              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                Curadoria exclusiva da{" "}
                <strong className="text-[#C9A84C]">RE/MAX AGRO powered by DATAGRO</strong> — a empresa-referência em agrodata no Brasil — para proprietários rurais, grandes fazendeiros, investidores e profissionais do agronegócio.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#destaques"
                  className="whitespace-nowrap inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F2A1A] font-bold px-6 py-3 rounded-full hover:bg-[#e0bc5a] transition-all duration-200 cursor-pointer text-sm"
                >
                  <i className="ri-newspaper-line"></i>
                  Ver Destaques da Semana
                </a>
                <a
                  href="#cotacoes"
                  className="whitespace-nowrap inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-200 cursor-pointer text-sm border border-white/20"
                >
                  <i className="ri-bar-chart-line"></i>
                  Cotações ao Vivo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down arrow animado */}
        <a
          href="#cotacoes"
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group"
          aria-label="Role para baixo"
        >
          <span
            className="text-white/70 text-xs font-semibold uppercase tracking-widest group-hover:text-[#C9A84C] transition-colors"
            style={{ letterSpacing: "0.2em" }}
          >
            Role para baixo
          </span>
          <span
            className="flex flex-col items-center"
            style={{
              animation: "scrollArrow 1.6s ease-in-out infinite",
            }}
          >
            <i className="ri-arrow-down-s-line text-[#C9A84C] text-3xl" style={{ lineHeight: 1 }}></i>
            <i className="ri-arrow-down-s-line text-[#C9A84C]/50 text-2xl -mt-3" style={{ lineHeight: 1 }}></i>
          </span>
        </a>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0F2A1A]/80 backdrop-blur-sm border-t border-[#C9A84C]/20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "ri-user-line", value: "12.400+", label: "Assinantes" },
              { icon: "ri-mail-send-line", value: "Toda Segunda", label: "Frequência" },
              { icon: "ri-shield-check-line", value: "100% Curado", label: "Conteúdo" },
              { icon: "ri-award-line", value: "DATAGRO", label: "Parceiro Oficial" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#C9A84C]/20">
                  <i className={`${stat.icon} text-[#C9A84C] text-sm`}></i>
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">{stat.value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial intro */}
      <div className="bg-[#FAFAF5] w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#C9A84C]"></div>
              Carta Editorial
              <div className="w-8 h-px bg-[#C9A84C]"></div>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0F2A1A] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Bem-vindo à Newsletter que o Agro Estratégico Merecia
            </h2>
            <div className="text-[#3a3a3a] text-base leading-relaxed space-y-4 text-left">
              <p>
                O agronegócio brasileiro movimenta mais de{" "}
                <strong>R$ 2,4 trilhões por ano</strong> e representa quase 30% do PIB nacional. Mesmo assim, os tomadores de decisão do setor — proprietários de grandes fazendas, investidores rurais e profissionais especializados — ainda carecem de uma fonte de informação verdadeiramente curada, estratégica e conveniente.
              </p>
              <p>
                É para preencher esse espaço que nasce a{" "}
                <strong className="text-[#0F2A1A]">Newsletter RE/MAX AGRO powered by DATAGRO</strong>. A <strong>DATAGRO</strong>, empresa-referência em agrodata no Brasil com mais de 30 anos de mercado, une forças com a <strong>RE/MAX AGRO</strong>, maior rede de corretores especializados em propriedades rurais do país, para entregar toda segunda-feira o que realmente importa para quem decide no campo.
              </p>
              <p>
                Aqui você encontrará o resumo dos principais movimentos do agro na semana anterior, cotações atualizadas das principais culturas, análises de mercado de terras, insights sobre o que está por vir e a agenda dos eventos que você não pode perder.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <img
                src="/images/logo-color.png"
                alt="RE/MAX Commercial Divisão Agro powered by DATAGRO"
                className="h-28 md:h-32 object-contain"
              />
              <p className="text-[#0F2A1A]/60 text-sm italic text-center">
                "Informação estratégica para quem decide no campo."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
