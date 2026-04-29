type Trade = {
  createdAt: string;
  profit: number | null;
  status: 'OPEN' | 'CLOSED';
};

export function computeAnalytics(trades: Trade[]) {
  const closed = trades.filter((t) => t.status === 'CLOSED');

  const profits = closed.map((t) => t.profit ?? 0);

  const winTrades = profits.filter((p) => p > 0);
  const lossTrades = profits.filter((p) => p < 0);

  const win = winTrades.length;
  const loss = lossTrades.length;
  const total = win + loss;

  const totalProfit = profits.reduce((a, b) => a + b, 0);

  const avgWin = win ? winTrades.reduce((a, b) => a + b, 0) / win : 0;
  const avgLoss = loss ? lossTrades.reduce((a, b) => a + b, 0) / loss : 0;

  const winrate = total ? (win / total) * 100 : 0;

  const rr = avgLoss !== 0 ? Math.abs(avgWin / avgLoss) : 0;

  const safeRR = Math.min(rr, 10); // limit biar ga absurd
  // Expectancy = (Win% * AvgWin) - (Loss% * AvgLoss)

  const expectancy =
    (winrate / 100) * avgWin + ((100 - winrate) / 100) * avgLoss;

  return {
    totalProfit,
    win,
    loss,
    winrate,
    avgWin,
    avgLoss,
    rr,
    safeRR,
    expectancy,
  };
}

export function computeDrawdown(trades: Trade[]) {
  const closed = trades
    .filter((t) => t.status === 'CLOSED')
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  let equity = 0;
  let peak = 0;
  let maxDrawdown = 0;

  const series: { equity: number; drawdown: number; date: string }[] = [];

  for (const t of closed) {
    equity += t.profit ?? 0;

    if (equity > peak) peak = equity;

    const dd = peak - equity; // absolute drawdown
    if (dd > maxDrawdown) maxDrawdown = dd;

    series.push({
      equity,
      drawdown: dd,
      date: new Date(t.createdAt).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
      }),
    });
  }

  const maxDDPct = peak ? (maxDrawdown / peak) * 100 : 0;
  const currentDD = series.length ? series[series.length - 1].drawdown : 0;

  return {
    series,
    maxDrawdown,
    maxDDPct,
    currentDD,
  };
}
