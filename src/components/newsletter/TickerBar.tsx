import React from 'react';
import { commodities } from '../../lib/data';

const TickerBar: React.FC = () => {
  // Duplicate the array to create seamless loop
  const duplicatedCommodities = [...commodities, ...commodities];

  return (
    <div className="relative overflow-hidden bg-[#1a3a1a] py-3">
      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .ticker-animation {
            animation: ticker 30s linear infinite;
          }
        `}
      </style>
      <div className="ticker-animation flex whitespace-nowrap">
        {duplicatedCommodities.map((commodity, index) => (
          <div key={index} className="inline-flex items-center px-6">
            <span className="text-yellow-500 font-bold text-sm">
              {commodity.symbol}
            </span>
            <span className="text-white mx-2 text-sm">
              {commodity.price}
            </span>
            <span
              className={`text-sm font-medium ${
                commodity.positive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {commodity.change}
            </span>
            <span className="text-gray-400 mx-3">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;