import React from "react";
import usePersistentState from "../hooks/usePersistentState";
import { formatNumber } from "../utils/formatNumber";
import "../css/UpgradeList.css";

const UpgradeList = ({
  dust,
  setDust,
  clickValue,
  setClickValue,
  autoDust,
  setAutoDust,
  setAutoDustMultiplier,
  setDustMultiplier,
}) => {
  // TODO : 업그레이드 상태 완성하기
  const [upgrades, setUpgrades] = usePersistentState("upgrades", [
    {
      id: 1,
      name: "Large hands", // 큰 손
      cost: 10,
      costMultiplier: 1.2,
      currentLevel: 0,
      unlockRequirement: { dust: 10 },
      isUnlocked: false, // 초기 상태는 해금되지 않음
      description: "Increases dust gained per click", // 클링 당 먼지 수집을 증가시킵니다.
    },
    {
      id: 2,
      name: "Dust Collector", // 먼지 흡입기
      cost: 50,
      costMultiplier: 1.3,
      currentLevel: 0,
      unlockRequirement: { upgradeId: 1, level: 5, dust: 50 }, // 1번 업그레이드가 5레벨 이상일 때 해금
      isUnlocked: false,
      description: "Automatically collect dusts every second",
    },
    {
      id: 3,
      name: "Two-handed", // 양손 수집가
      cost: 200,
      costMultiplier: 2,
      currentLevel: 0,
      unlockRequirement: { upgradeId: 1, level: 10, dust: 500 },
      isUnlocked: false,
      description: "Doubles dust acquisition per click",
    },
    {
      id: 4,
      name: "Double Auto Collection",
      cost: 1500,
      currentLevel: 0,
      costMultiplier: 2.5,
      unlockRequirement: { upgradeId: 2, level: 5, dust: 500 },
      isUnlocked: false,
      description: "Doubles automatic dust collection",
    },
  ]);

  // 업그레이드 효과 정의
  const upgradeEffects = {
    1: () => setClickValue((prev) => prev + 1),
    2: () => setAutoDust((prev) => prev + 1),
    3: () => setDustMultiplier((prev) => prev * 2),
    4: () => setAutoDustMultiplier((prev) => prev * 2),
  };

  const handleUpgrade = (upgradeId) => {
    // 현재 업그레이드 항목을 찾음
    const upgrade = upgrades.find((upgrade) => upgrade.id === upgradeId);

    // 비용이 충분한지 확인 후, 한 번의 업데이트로 비용 차감 및 업그레이드
    if (upgrade && dust >= upgrade.cost) {
      // 비용 차감 및 상태 업데이트를 함수형으로 처리
      setDust((prevDust) => prevDust - upgrade.cost);

      setUpgrades((prevUpgrades) =>
        prevUpgrades.map((u) =>
          u.id === upgradeId
            ? {
                ...u,
                cost: Math.floor(u.cost * u.costMultiplier), // 비용 증가
                currentLevel: u.currentLevel + 1, // 레벨 증가
              }
            : u
        )
      );

      // 업그레이드 효과 적용
      upgradeEffects[upgradeId]?.();
    } else {
      alert("Not enough dust for this upgrade!");
    }
  };

  // 업그레이드 해금 상태 업데이트
  React.useEffect(() => {
    setUpgrades((prevUpgrades) =>
      prevUpgrades.map((upgrade) => {
        // 이미 해금된 업그레이드는 건너뜀
        if (upgrade.isUnlocked) return upgrade;

        const req = upgrade.unlockRequirement || {};

        // 조건에 따른 해금 여부 설정
        const isUnlocked =
          (req.dust ? dust >= req.dust : true) && // 소지 비용 조건
          (req.upgradeId && req.level
            ? prevUpgrades.some(
                (u) => u.id === req.upgradeId && u.currentLevel >= req.level
              )
            : true); // 이전 업그레이드의 레벨 조건

        return isUnlocked ? { ...upgrade, isUnlocked: true } : upgrade;
      })
    );
  }, [dust, setUpgrades]);

  return (
    <div className="upgrade-container">
      <h2>Upgrades</h2>
      <div className="upgrade-list">
        {upgrades
          .filter((upgrade) => upgrade.isUnlocked)
          .map((upgrade) => (
            <button
              key={upgrade.id}
              onClick={() => handleUpgrade(upgrade.id)}
              disabled={dust < upgrade.cost}
              className="upgrade-button"
            >
              <h3>{upgrade.name}</h3>
              <p className="cost">Cost: {formatNumber(upgrade.cost)} dusts</p>
              <p>{upgrade.description}</p>
              <p>Level: {upgrade.currentLevel}</p>
            </button>
          ))}
      </div>
    </div>
  );
};

export default UpgradeList;
