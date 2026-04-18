import DownloadPDFButton from "./DownloadPDFButton";

export default function NewsletterFooter() {
  return (
    <footer className="w-full bg-[#1a2e4a] mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/images/logo-white.png"
              alt="RE/MAX Commercial Divisão Agro powered by DATAGRO"
              className="h-14 object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              A newsletter semanal mais relevante do agronegócio brasileiro. Curadoria exclusiva da RE/MAX AGRO powered by DATAGRO para proprietários rurais, investidores e profissionais do setor.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.instagram.com/remaxcommercialdivsaoagro" rel="nofollow" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0F2A1A] transition-all duration-200 cursor-pointer" title="Instagram">
                <i className="ri-instagram-line text-base"></i>
              </a>
              <a href="https://www.linkedin.com/company/remax-agro" rel="nofollow" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0F2A1A] transition-all duration-200 cursor-pointer" title="LinkedIn">
                <i className="ri-linkedin-line text-base"></i>
              </a>
              <a href="https://www.facebook.com/remaxagro" rel="nofollow" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0F2A1A] transition-all duration-200 cursor-pointer" title="Facebook">
                <i className="ri-facebook-line text-base"></i>
              </a>
              <a href="https://wa.me/5511915051212" rel="nofollow" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0F2A1A] transition-all duration-200 cursor-pointer" title="WhatsApp">
                <i className="ri-whatsapp-line text-base"></i>
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-[#C9A84C] text-sm font-bold uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2">
              {[
                { label: "Destaques da Semana", href: "#destaques" },
                { label: "Cotações & Grãos", href: "#cotacoes" },
                { label: "Mercado de Terras", href: "#mercado" },
                { label: "Análises DATAGRO", href: "#analises" },
                { label: "Agenda Agro", href: "#agenda" },
                { label: "Fale com Especialista", href: "#especialistas" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-[#C9A84C] text-sm font-bold uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <i className="ri-phone-line text-[#C9A84C] text-sm"></i>
                <a href="tel:+5511915051212" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors cursor-pointer">
                  +55 (11) 91505-1212
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-whatsapp-line text-[#C9A84C] text-sm"></i>
                <a href="https://wa.me/5511915051212" rel="nofollow" target="_blank" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors cursor-pointer">
                  WhatsApp Central de Atendimento
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-mail-line text-[#C9A84C] text-sm"></i>
                <a href="mailto:contatoagro@remax.com.br" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors cursor-pointer">
                  contatoagro@remax.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-global-line text-[#C9A84C] text-sm"></i>
                <a href="https://agro.remax.com.br" rel="nofollow" target="_blank" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors cursor-pointer">
                  agro.remax.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-bar-chart-line text-[#C9A84C] text-sm"></i>
                <a href="https://portal.datagro.com/pt" rel="nofollow" target="_blank" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors cursor-pointer">
                  portal.datagro.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Download PDF Banner */}
      <div className="border-t border-white/10 bg-[#0a1f12]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm">📄 Baixe esta edição em PDF</p>
            <p className="text-white/50 text-xs mt-0.5">Com cotações, notícias linkáveis, contatos e opt-out — para ler offline ou compartilhar.</p>
          </div>
          <DownloadPDFButton variant="footer" />
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © 2026 RE/MAX AGRO powered by DATAGRO · Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 text-xs hover:text-[#C9A84C] transition-colors cursor-pointer">Descadastrar</a>
            <span className="text-white/20">|</span>
            <a href="#" className="text-white/40 text-xs hover:text-[#C9A84C] transition-colors cursor-pointer">Política de Privacidade</a>
            <span className="text-white/20">|</span>
            <a href="#" className="text-white/40 text-xs hover:text-[#C9A84C] transition-colors cursor-pointer">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
