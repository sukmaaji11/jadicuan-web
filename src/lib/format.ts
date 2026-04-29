export const formatShort = (num: number) => {
  if (!num) return '0';

  if (Math.abs(num) >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(1) + 'B';

  if (Math.abs(num) >= 1_000_000) return (num / 1_000_000).toFixed(1) + ' jt';

  if (Math.abs(num) >= 1_000) return (num / 1_000).toFixed(1) + ' rb';

  return num.toString();
};
