import "./App.css";
import React from "react";
import usePersistentState from "./hooks/usePersistentState";
import DustParticle from "./components/DustParticle";
import { formatNumber } from "./utils/formatNumber";
import UpgradeList from "./components/UpgradeList";
import ResourceRate from "./components/ResourceRate";
import SmoothCounter from "./components/SmoothCounter";

const App = () => {
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

  const handleDustClick = () => {
    setDust((prevDust) => clickMultiplier * (prevDust + clickValue)); // 클릭할 때마다 먼지 수집
  };

  return (
    <div id="app-background" className="app">
      <div id="dust-container">
        <DustParticle /> {/** 먼지 입자 컴포넌트 */}
      </div>
      <h1>Origins of the Universe</h1>
      <h2>
        Collected Cosmic Dust: <SmoothCounter targetValue={dust} /> (+
        {autoDustRate} / s)
      </h2>
      <button onClick={handleDustClick} className="collect-button">
        Collect Cosmic Dust
      </button>
      <ResourceRate
        rate={autoDustRate}
        setResource={setDust}
        resourceMultiplier={autoDustMultiplier}
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
      />
    </div>
  );
};

export default App;
