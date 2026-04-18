import { commodities } from '@/lib/data';

export default function CommodityPanel() {
  return (
    <section id="cotacoes" className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-yellow-600 pl-4">
            Cotações do Dia
          </h2>
        </div>

        {/* Commodity Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {commodities.map((commodity) => (
            <div
              key={commodity.symbol}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              {/* Symbol */}
              <div className="text-yellow-600 font-mono text-sm font-bold uppercase mb-2">
                {commodity.symbol}
              </div>

              {/* Name */}
              <div className="text-gray-700 text-sm mb-3">
                {commodity.name}
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {commodity.price}
              </div>

              {/* Unit */}
              <div className="text-xs text-gray-500 mb-2">
                {commodity.unit}
              </div>

              {/* Change Percentage */}
              <div
                className={`text-sm font-semibold ${
                  commodity.positive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {commodity.change}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote Disclaimer */}
        <div className="text-xs text-gray-500 text-center mt-6">
          * Cotações indicativas fornecidas por DATAGRO. Valores sujeitos a alteração.
          Consulte seu corretor para informações atualizadas.
        </div>
      </div>
    </section>
  );
}