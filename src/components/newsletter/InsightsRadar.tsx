import { TrendingUp, MapPin, CloudRain, DollarSign, LucideIcon } from 'lucide-react';
import { insights } from '../../lib/data';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  MapPin,
  CloudRain,
  DollarSign,
};

export default function InsightsRadar() {
  return (
    <section id="insights" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-yellow-600 pl-4">
        Radar de Insights
      </h2>
      <div className="bg-green-900 p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight) => {
            const Icon = iconMap[insight.icon];
            return (
              <div key={insight.id} className="bg-green-800 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-600 p-3 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {insight.body}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-medium text-yellow-600 border border-yellow-600 rounded-full">
                      {insight.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}