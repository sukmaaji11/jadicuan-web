import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbols = searchParams.get('symbols');

  if (!symbols) return NextResponse.json([]);

  const codes = symbols.split(',').slice(0, 5);

  const results = [];

  for (const code of codes) {
    try {
      const quote = await yahooFinance.quote(`${code}.JK`);

      const price =
        quote?.regularMarketPrice ??
        quote?.regularMarketPreviousClose ??
        quote?.postMarketPrice ??
        null;

      results.push({
        code,
        price,
      });
    } catch (err) {
      results.push({
        code,
        price: null,
      });
    }
    console.log('RESULT:', results);
  }

  return NextResponse.json(results);
}
