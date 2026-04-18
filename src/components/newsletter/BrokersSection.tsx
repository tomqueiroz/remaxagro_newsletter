import { brokers } from '../../lib/data';

export default function BrokersSection() {
  return (
    <section id="corretores" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">
          Nossos Corretores
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <img
                src={broker.imageUrl}
                alt={broker.name}
                className="w-24 h-24 rounded-full border-2 border-yellow-600 object-cover mb-4"
              />
              <h3 className="font-bold text-lg mb-1">{broker.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{broker.region}</p>
              <a
                href={`tel:${broker.phone}`}
                className="inline-block px-6 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium transition-colors hover:bg-yellow-600 hover:text-white"
              >
                {broker.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}