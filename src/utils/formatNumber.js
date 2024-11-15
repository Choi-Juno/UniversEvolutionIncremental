export const formatNumber = (
  num,
  decimalPlaces = 2,
  notationType = "notation"
) => {
  if (num === 0) return "0"; // 0일 때 바로 반환

  if (notationType === "scientific") {
    // 과학적 표기법
    return num.toExponential(decimalPlaces);
  }

  // (0,1)구간 숫자 처리
  if (num > 0 && num < 1) {
    return num.toFixed(3); // 소수점 3자리까지만 표시
  }

  // 기본 Notation 방식
  const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]; // 접미사 배열
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3); // 숫자 단위 결정 (1000단위)

  if (tier === 0) return num.toFixed(decimalPlaces); // 1000 미만은 그대로 반환

  const suffix = suffixes[tier] || `e${tier * 3}`; // 접미사 또는 e표기법으로 대체
  const scale = Math.pow(10, tier * 3); // 해당 단위의 크기
  const scaleNum = num / scale;

  return `${scaleNum.toFixed(decimalPlaces)}${suffix}`;
};
