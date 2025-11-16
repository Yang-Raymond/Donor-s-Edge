import { NextRequest, NextResponse } from "next/server";

const BLACKLISTED_BOOKMAKERS = [
  "draftkings", "pinnacle", "betmgm", "betmgm_co_uk", "caesars", "fanatics", "fanduel",
  "888sport.de", "888sport.dk", "888sport.es", "888sport.it", "888sport.ro", "betcenter.be",
  "betuk", "fun88.co.uk", "highbet.co.uk", "net88.co.uk", "parimatch.co.uk", "pointsbet.com.au",
  "pokerstars.es", "pokerstars.fr", "pokerstars.it", "pokerstars.uk",
  "unibet.be", "unibet.dk", "unibet.es", "unibet.it", "unibet.ro", "unibet.fr", "unibet.co.uk", "unibet.com.au", "unibet.nl", "unibet.se",
  "vbet.co.uk", "vbet.fr", "vbet.ua"
];

export interface ArbitrageOpportunity {
  id: string;
  match: string;
  participant1: string;
  participant2: string;
  marketName: string;
  outcomes: {
    outcomeName: string;
    bookmakerName: string;
    price: number;
    eventPath: string;
  }[];
  profit: number;
  timestamp: string;
}

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("https://odds-api1.p.rapidapi.com/surebets", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "odds-api1.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch arbitrage opportunities");
    }

    const data = await response.json();
    const parsed = Object.values(data);

    // Filter and format the arbitrage opportunities
    const opportunities: ArbitrageOpportunity[] = [];

    for (const bet of parsed as any[]) {
      const market = bet?.markets && Object.values(bet.markets)[0];
      if (!market) continue;

      const outcomes = (market as any)?.outcomes || {};
      const outcomeNames = Object.keys(outcomes);

      // Collect bookmaker names for each outcome
      const usedBookmakers = outcomeNames.map((key) => {
        const outcome = outcomes[key];
        return Object.keys(outcome.bookmakers)[0];
      });

      // Skip if ANY bookmaker is blacklisted
      if (!usedBookmakers.every((bk) => !BLACKLISTED_BOOKMAKERS.includes(bk))) {
        continue;
      }

      // Format outcomes
      const formattedOutcomes = outcomeNames.map((key) => {
        const outcome = outcomes[key];
        const firstBookieName = Object.keys(outcome.bookmakers)[0];
        const firstBookie = outcome.bookmakers[firstBookieName];

        return {
          outcomeName: outcome.outcomeName,
          bookmakerName: firstBookieName,
          price: firstBookie.price,
          eventPath: firstBookie.eventPath,
        };
      });

      // Calculate profit
      const odds = formattedOutcomes.map((o) => o.price);
      let profit = 0;
      if (odds.length >= 2) {
        const implied = odds.reduce((sum, o) => sum + 1 / o, 0);
        profit = (1 - implied) * 100;
      }

      // Only include profitable opportunities
      if (profit > 0) {
        opportunities.push({
          id: `${bet.participant1}-${bet.participant2}-${Date.now()}-${Math.random()}`,
          match: `${bet.participant1} vs ${bet.participant2}`,
          participant1: bet.participant1,
          participant2: bet.participant2,
          marketName: (market as any).marketName || "N/A",
          outcomes: formattedOutcomes,
          profit: parseFloat(profit.toFixed(2)),
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Sort by profit (highest first)
    opportunities.sort((a, b) => b.profit - a.profit);

    return NextResponse.json({
      success: true,
      count: opportunities.length,
      opportunities,
    });
  } catch (error: any) {
    console.error("Error fetching arbitrage opportunities:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to fetch arbitrage opportunities" 
      },
      { status: 500 }
    );
  }
}
