export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return Response.json({ error: 'No symbol' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}.JK`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store',
      },
    );

    const json = await res.json();
    const result = json?.quoteResponse?.result?.[0];

    // ✅ kalau Yahoo gagal → fallback
    if (!result) {
      return Response.json({
        code: symbol,
        name: `PT ${symbol} (Manual)`,
        price: null,
        fallback: true,
      });
    }

    return Response.json({
      code: result.symbol,
      name: result.longName || result.shortName,
      price: result.regularMarketPrice,
      change: result.regularMarketChangePercent,
    });
  } catch (err) {
    console.error(err);

    // ✅ fallback kalau error total
    return Response.json({
      code: symbol,
      name: `PT ${symbol}`,
      price: null,
      fallback: true,
    });
  }
}
