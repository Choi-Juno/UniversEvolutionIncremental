import React from "react";
import usePersistentState from "../hooks/usePersistentState";

const UpgradeList = ({
  coins,
  setCoins,
  autoCoin,
  setAutoCoin,
  clickValue,
  setClickValue,
  tier,
}) => {
  const [upgrades, setUpgrades] = usePersistentState("upgrades", [
    {
      id: 1,
      name: "Increase Click Value",
      cost: 50,
      maxLevel: 5,
      currentLevel: 0,
      requiredTier: 1,
    },
    {
      id: 2,
      name: "Increase Auto Collection",
      cost: 100,
      maxLevel: 3,
      currentLevel: 0,
      requiredTier: 1,
    },
    {
      id: 3,
      name: "Double Click Value",
      cost: 500,
      maxLevel: 1,
      currentLevel: 0,
      requiredTier: 2,
    },
    {
      id: 4,
      name: "Double Auto Collection",
      cost: 1500,
      maxLevel: 2,
      currentLevel: 0,
      requiredTier: 2,
    },
  ]);

  // 업그레이드 효과 정의
  const upgradeEffects = {
    1: () => setClickValue((prev) => prev + 1),
    2: () => setAutoCoin((prev) => prev + 1),
    3: () => setClickValue((prev) => prev * 2),
    4: () => setAutoCoin((prev) => prev * 2),
  };

  const handleUpgrade = (upgradeId) => {
    setUpgrades((prevUpgrades) =>
      prevUpgrades.map((upgrade) => {
        if (
          upgrade.id === upgradeId &&
          coins >= upgrade.cost &&
          upgrade.currentLevel < upgrade.maxLevel
        ) {
          setCoins((prevCoins) => prevCoins - upgrade.cost);
          // 업그레이드 효과 적용
          upgradeEffects[upgradeId]?.(); // 존재하는 경우에만 호출

          // 새로운 객체로 currentLevel 증가
          return { ...upgrade, currentLevel: upgrade.currentLevel + 1 };
        }
        return upgrade;
      })
    );
  };

  return (
    <div className="upgrade-list">
      <h2>Upgrades</h2>
      {upgrades
        .filter((upgrade) => upgrade.requiredTier <= tier) // 티어 조건에 맞는 업그레이드만 표시
        .map((upgrade) => (
          <button
            key={upgrade.id}
            onClick={() => handleUpgrade(upgrade.id)}
            disabled={
              coins < upgrade.cost || upgrade.currentLevel >= upgrade.maxLevel
            }
          >
            {upgrade.name} - Cost: {upgrade.cost} coins (Level:{" "}
            {upgrade.currentLevel}/{upgrade.maxLevel})
          </button>
        ))}
    </div>
  );
};

export default UpgradeList;
