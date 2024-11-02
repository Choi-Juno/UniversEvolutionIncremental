export function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T"; // 조 (trillion)
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"; // 십억 (billion)
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"; // 백만 (million)
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"; // 천 (thousand)

  return num.toString();
}
