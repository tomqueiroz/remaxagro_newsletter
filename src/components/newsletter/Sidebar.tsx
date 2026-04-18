import React from 'react';
import { commodities } from '../../lib/data';

const Sidebar: React.FC = () => {
  return (
    <aside className="sticky top-4 space-y-6">
      {/* Quick Quotes Widget */}
      <div className="bg-green-900 text-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Cotações Rápidas</h3>
        <div className="space-y-3">
          {commodities.map((commodity) => (
            <div key={commodity.symbol} className="flex items-center justify-between border-b border-green-800 pb-2 last:border-b-0">
              <div>
                <div className="font-bold text-sm">{commodity.symbol}</div>
                <div className="text-xs text-green-300">{commodity.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{commodity.price}</div>
                <div className="text-xs text-gray-300">{commodity.unit}</div>
              </div>
              <div
                className={`text-sm font-bold ${
                  commodity.positive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {commodity.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About DATAGRO Box */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-gray-900">Sobre a DATAGRO</h3>
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          A DATAGRO é referência em análise de mercado agrícola no Brasil há mais de 40 anos. 
          Fornecemos dados precisos, análises técnicas e projeções de mercado para os principais 
          produtos do agronegócio brasileiro.
        </p>
        <a
          href="https://portal.datagro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 font-semibold hover:text-green-900 text-sm inline-flex items-center"
        >
          Visite portal.datagro.com
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      {/* Edition Info Box */}
      <div className="bg-amber-50 rounded-lg p-6 shadow-lg border border-amber-200">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Sobre esta Edição</h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">📅</span>
            <div>
              <strong>Frequência:</strong> Semanal, toda segunda-feira
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📊</span>
            <div>
              <strong>Conteúdo:</strong> Análises de mercado, cotações atualizadas e oportunidades
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <div>
              <strong>Foco:</strong> Proprietários rurais, investidores e profissionais do agronegócio
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🌾</span>
            <div>
              <strong>Dados:</strong> Informações exclusivas DATAGRO e insights de mercado
            </div>
          </li>
        </ul>
      </div>

      {/* RE/MAX AGRO CTA */}
      <div className="bg-red-600 text-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-3">RE/MAX AGRO</h3>
        <p className="text-sm mb-4 leading-relaxed">
          Especialistas em propriedades rurais e investimentos no agronegócio. 
          Conectamos você às melhores oportunidades do campo.
        </p>
        <a
          href="https://agro.remax.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white text-red-600 font-bold py-3 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
        >
          Conheça a RE/MAX AGRO
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;