import React, { useEffect } from "react";
import usePersistentState from "../hooks/usePersistentState";
import { formatNumber } from "../utils/formatNumber";
import "../css/UpgradeList.css";
import upgradesData from "./UpgradesData";

const UpgradeList = ({
  dust,
  setDust,
  setClickValue,
  setAutoDust,
  setClickValueMultiplier,
  setAutoDustMultiplier,
  setDustMultiplier,
  setAutoEnergy,
  setEnergyConversionRate,
  setAutoEnergyCooldown,
}) => {
  // TODO : 업그레이드 상태 완성하기
  const [upgrades, setUpgrades] = usePersistentState(
    "upgrades",
    upgradesData.map((upgrade) => ({
      ...upgrade,
      currentLevel: 0, // 기본 레벨 설정
      cost: upgrade.baseCost, // 기본 비용 설정
    }))
  );

  // 컴포넌트 초기 로드 시 각 업그레이드 효과 적용
  useEffect(() => {
    upgrades.forEach((upgrade) => {
      if (upgrade.currentLevel > 0) {
        const upgradeDefinition = upgradesData.find((u) => u.id === upgrade.id);
        if (upgradeDefinition ** upgradeDefinition.effect) {
          upgradeDefinition.effect(
            {
              setClickValue,
              setAutoDust,
              setDustMultiplier,
              setAutoDustMultiplier,
              setEnergyConversionRate,
              setAutoEnergy,
              setAutoEnergyCooldown,
            },
            upgrade.currentLevel
          );
        }
      }
    });
  }, [
    upgrades,
    setClickValue,
    setAutoDust,
    setEnergyConversionRate,
    setAutoDustMultiplier,
    setAutoEnergy,
    setAutoEnergyCooldown,
    setDustMultiplier,
  ]);

  const handleUpgrade = (upgradeId) => {
    // 현재 업그레이드 항목을 찾음
    const upgrade = upgrades.find((upgrade) => upgrade.id === upgradeId);

    // 비용이 충분한지 확인 후, 한 번의 업데이트로 비용 차감 및 업그레이드
    if (upgrade && dust >= upgrade.cost) {
      // 비용 차감 및 상태 업데이트를 함수형으로 처리
      setDust((prevDust) => prevDust - upgrade.cost);

      const newLevel = upgrade.currentLevel + 1;
      const newCost = Math.floor(upgrade.cost * upgrade.costMultiplier);

      setUpgrades((prevUpgrades) =>
        prevUpgrades.map((u) =>
          u.id === upgradeId
            ? {
                ...u,
                cost: newCost, // 비용 증가
                currentLevel: newLevel, // 레벨 증가
              }
            : u
        )
      );

      // 업그레이드 효과 적용
      const upgradeDefinition = upgradesData.find((u) => u.id === upgrade.id);
      upgradeDefinition.effect(
        {
          setClickValue,
          setAutoDust,
          setDustMultiplier,
          setAutoDustMultiplier,
          setEnergyConversionRate,
          setAutoEnergy,
          setAutoEnergyCooldown,
        },
        newLevel
      );
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
