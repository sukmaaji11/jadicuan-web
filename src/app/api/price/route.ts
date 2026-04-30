import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbols = searchParams.get('symbols');

  if (!symbols) return NextResponse.json([]);

  const codes = symbols.split(',').slice(0, 5);

  const results = await Promise.all(
    codes.map(async (code) => {
      try {
        const quote: any = await yahooFinance.quote(`${code}.JK`);

        const price =
          quote?.regularMarketPrice ??
          quote?.regularMarketPreviousClose ??
          quote?.postMarketPrice ??
          null;

        return { code, price };
      } catch {
        return { code, price: null };
      }
    }),
  );

  return NextResponse.json(results);
}
