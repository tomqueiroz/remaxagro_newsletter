import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a4d2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Branding and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              RE/MAX AGRO DATAGRO
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Newsletter especializada em informações do mercado agropecuário, 
              trazendo análises, tendências e oportunidades do setor. 
              Conectando produtores, investidores e profissionais do agronegócio 
              com dados estratégicos e insights valiosos para tomada de decisão.
            </p>
          </div>

          {/* Right Side - Links and Editions */}
          <div className="grid grid-cols-2 gap-8">
            {/* Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.remax.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    RE/MAX AGRO
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.datagro.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Portal DATAGRO
                  </a>
                </li>
                <li>
                  <a
                    href="/subscribe"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Inscrever-se
                  </a>
                </li>
              </ul>
            </div>

            {/* Editions Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Edições</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/edicoes/2026"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    2026
                  </a>
                </li>
                <li>
                  <a
                    href="/edicoes/2025"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    2025
                  </a>
                </li>
                <li>
                  <a
                    href="/edicoes/2024"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    2024
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2d6b45]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 RE/MAX AGRO DATAGRO. Todos os direitos reservados.</p>
            <a
              href="/unsubscribe"
              className="hover:text-white transition-colors mt-2 md:mt-0"
            >
              Cancelar inscrição
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;