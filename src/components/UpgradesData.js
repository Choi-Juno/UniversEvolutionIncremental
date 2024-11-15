const upgradesData = [
  {
    id: 1,
    name: "Large hands", // 큰 손
    baseCost: 10,
    costMultiplier: 1.2,
    currentLevel: 0,
    unlockRequirement: { dust: 10 },
    isUnlocked: false, // 초기 상태는 해금되지 않음
    description: "Increases dust gained per click", // 클링 당 먼지 수집을 증가시킵니다.
    effect: ({ setClickValue }) => setClickValue((prev) => prev + 1),
  },
  {
    id: 2,
    name: "Dust Collector", // 먼지 흡입기
    baseCost: 50,
    costMultiplier: 1.17,
    currentLevel: 0,
    unlockRequirement: { upgradeId: 1, level: 5, dust: 50 }, // 1번 업그레이드가 5레벨 이상일 때 해금
    isUnlocked: false,
    description: "Automatically collect dusts every second",
    effect: ({ setAutoDust }) => setAutoDust((prev) => prev + 1),
  },
  {
    id: 3,
    name: "Two-handed", // 양손 수집가
    baseCost: 200,
    costMultiplier: 2,
    currentLevel: 0,
    unlockRequirement: { upgradeId: 1, level: 10, dust: 500 },
    isUnlocked: false,
    description: "Doubles dust acquisition per click",
    effect: ({ setDustMultiplier }) => setDustMultiplier((prev) => prev + 1),
  },
  {
    id: 4,
    name: "Double Auto Collection",
    baseCost: 1000,
    currentLevel: 0,
    costMultiplier: 1.89,
    unlockRequirement: { upgradeId: 2, level: 10, dust: 500 },
    isUnlocked: false,
    description: "Doubles automatic dust collection",
    effect: ({ setAutoDustMultiplier }) =>
      setAutoDustMultiplier((prev) => prev * 2),
  },
  {
    id: 5,
    name: "Conversion Efficiency",
    baseCost: 2000000,
    currentLevel: 0,
    costMultiplier: 1.79,
    unlockRequirement: { dust: 1000000 },
    isUnlocked: false,
    description: "Conversion cost decrease to 5%",
    effect: ({ setEnergyConversionRate }, level) =>
      setEnergyConversionRate((prev) => prev * Math.pow(0.95, level)),
  },
  {
    id: 6,
    name: "Auto Energy Generator",
    baseCost: 5000000,
    currentLevel: 0,
    costMultiplier: 1.33,
    unlockRequirement: { upgradeId: 5, level: 3, dust: 1000000 },
    isUnlocked: false,
    description: "Automatically generate energy",
    effect: ({ setAutoEnergy }) => setAutoEnergy((prev) => prev + 1),
  },
  {
    id: 7,
    name: "Auto Energy Cooldown",
    baseCost: 10000000,
    currentLevel: 0,
    costMultiplier: 10,
    unlockRequirement: { upgradeId: 6, level: 1 },
    isUnlocked: false,
    description: "Reduces Auto Energy cooldown by 10%",
    effect: ({ setAutoEnergyCooldown }, level) =>
      setAutoEnergyCooldown((prev) => prev * Math.pow(0.9, level)),
  },
];

export default upgradesData;
