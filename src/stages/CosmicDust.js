import React, { useEffect, useRef, useState } from "react";
import DustParticle from "../components/DustParticle";
import SmoothCounter from "../components/SmoothCounter";
import usePersistentState from "../hooks/usePersistentState";
import { formatNumber } from "../utils/formatNumber";
import ResourceRate from "../components/ResourceRate";
import UpgradeList from "../components/UpgradeList";
import "./CosmicDust.css";

const CosmicDust = ({ stageProgress, setStageProgress, setCurrentStage }) => {
  const [dust, setDust] = usePersistentState("dust", 0);
  const [clickValue, setClickValue] = usePersistentState("clickValue", 1); // 클릭당 먼지 획득량
  const [clickMultiplier, setClickMultiplier] = usePersistentState(
    "clickMultiplier",
    1
  );
  const [autoDustRate, setAutoDustRate] = usePersistentState("autoDust", 0); // 자동 먼지 수집량
  const [autoDustMultiplier, setAutoDustMultiplier] = usePersistentState(
    "autoDustMultiplier",
    1
  );
  const [energy, setEnergy] = usePersistentState("energy", 0);
  const [autoEnergy, setAutoEnergy] = usePersistentState("autoEnergy", 0);
  const [autoEnergyCooldown, setAutoEnergyCooldown] = usePersistentState(
    "autoEnergyCooldown",
    30000
  );
  const [energyConversionRate, setEnergyConversionRate] = usePersistentState(
    "energyConversionRate",
    1000000
  );

  const energyBoost = 1 + energy * 0.05; // 에너지 1당 5% 부스트

  const handleDustClick = () => {
    setDust(
      (prevDust) => prevDust + clickValue * clickMultiplier * energyBoost
    ); // 클릭할 때마다 먼지 수집
  };

  const handleEnergyConversion = () => {
    if (dust >= energyConversionRate) {
      setDust((prevDust) => prevDust - energyConversionRate);
      setEnergy((prevEnergy) => prevEnergy + 1);
    }
  };

  useEffect(() => {
    if (dust >= 1e12 && energy >= 1e3) {
      // 다음 스테이지 해금
      setStageProgress((prev) => ({
        ...prev,
        unlockedStages: [
          ...new Set([...prev.unlockedStages, "stellarFormation"]),
        ],
      }));
    }
  });

  return (
    <div>
      <div id="dust-container">
        <DustParticle /> {/** 먼지 입자 컴포넌트 */}
      </div>
      <h1>Origins of the Universe</h1>
      <h2>
        Collected Cosmic Dust: <SmoothCounter targetValue={dust} /> (+
        {formatNumber(autoDustRate * autoDustMultiplier * energyBoost)} / s)
      </h2>
      {energy >= 1 && (
        <h2>
          Energy: <SmoothCounter targetValue={energy} /> (+
          {formatNumber((autoEnergy / autoEnergyCooldown) * 1000)} / s)
        </h2>
      )}
      <button onClick={handleDustClick} className="collect-button">
        Collect Cosmic Dust
      </button>
      {dust >= energyConversionRate && (
        <button
          onClick={handleEnergyConversion}
          disabled={dust < energyConversionRate}
          className="collect-button"
        >
          Constvert Dust to Energy (Cost: {formatNumber(energyConversionRate)}{" "}
          Dust)
        </button>
      )}
      <ResourceRate
        rate={autoDustRate}
        setResource={(newDust) => {
          setDust(newDust);
        }}
        multiplier={autoDustMultiplier}
        boost={energyBoost}
      />
      <ResourceRate
        rate={autoEnergy}
        setResource={(newEnergy) => {
          setEnergy(newEnergy);
        }}
        cooldown={autoEnergyCooldown}
      />
      <UpgradeList
        dust={dust}
        setDust={setDust}
        clickValue={clickValue}
        setClickValue={setClickValue}
        autoDust={autoDustRate}
        setAutoDust={setAutoDustRate}
        setDustMultiplier={setClickMultiplier}
        setAutoDustMultiplier={setAutoDustMultiplier}
        setAutoEnergy={setAutoEnergy}
        energyConversionRate={energyConversionRate}
        setEnergyConversionRate={setEnergyConversionRate}
        setAutoEnergyCooldown={setAutoEnergyCooldown}
      />
    </div>
  );
};

export default CosmicDust;
