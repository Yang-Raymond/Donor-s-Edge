"use client";

import { ArbitrageOpportunity } from "../api/fetch-arbitrage/route";

interface ArbitrageTableProps {
  opportunities: ArbitrageOpportunity[];
  loading?: boolean;
}

export default function ArbitrageTable({ opportunities, loading }: ArbitrageTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading arbitrage opportunities...</p>
        </div>
      </div>
    );
  }

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">No Opportunities Available</h3>
        <p className="text-gray-400">
          Make a donation to receive exclusive arbitrage betting opportunities!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate" style={{ borderSpacing: '0 16px' }}>
        <thead className="sticky top-0 z-10">
          <tr>
            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-transparent">
              Match
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-transparent">
              Market
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-transparent">
              Outcome 1
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-transparent">
              Outcome 2
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-transparent">
              Outcome 3
            </th>
            <th className="px-5 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider bg-transparent">
              Profit
            </th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp, index) => {
            const outcomeCells = [];
            
            // Create cells for up to 3 outcomes
            for (let i = 0; i < 3; i++) {
              if (i < opp.outcomes.length) {
                const outcome = opp.outcomes[i];
                outcomeCells.push(
                  <td
                    key={i}
                    className="px-5 py-5 text-sm text-gray-200 bg-white/5 border-l border-white/5"
                  >
                    <div className="leading-relaxed">
                      <div className="font-medium">{outcome.outcomeName}</div>
                      <a
                        href={outcome.eventPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                      >
                        {outcome.bookmakerName}
                      </a>
                      <span className="text-gray-400">: {outcome.price.toFixed(2)}</span>
                    </div>
                  </td>
                );
              } else {
                outcomeCells.push(
                  <td
                    key={i}
                    className="px-5 py-5 text-center text-gray-500 bg-white/5 border-l border-white/5"
                  >
                    —
                  </td>
                );
              }
            }

            return (
              <tr
                key={opp.id || index}
                className="bg-[#252a3d] rounded-xl shadow-lg hover:bg-[#2d3349] transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <td className="px-6 py-5 text-left text-sm font-semibold text-white rounded-l-xl min-w-[200px]">
                  {opp.match}
                </td>
                <td className="px-5 py-5 text-left text-sm text-gray-400 italic">
                  {opp.marketName}
                </td>
                {outcomeCells}
                <td className="px-5 py-5 text-center font-bold text-lg rounded-r-xl">
                  <span className="text-green-400" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.3)' }}>
                    {opp.profit.toFixed(2)}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
