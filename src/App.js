import "./App.css";
import React, { useEffect } from "react";
import usePersistentState from "./hooks/usePersistentState";
import DustParticle from "./components/DustParticle";
import { formatNumber } from "./utils/formatNumber";
import UpgradeList from "./components/UpgradeList";

const App = () => {
  const [dust, setDust] = usePersistentState("dust", 0);
  const [clickValue, setClickValue] = usePersistentState("clickValue", 1); // 클릭당 먼지 획득량
  const [autoDust, setAutoDust] = usePersistentState("autoDust", 0); // 자동 먼지 수집량

  const handleDustClick = () => {
    setDust((prevDust) => prevDust + clickValue); // 클릭할 때마다 먼지 수집
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDust((prevDust) => prevDust + autoDust);
    }, 1000);
    return () => clearInterval(intervalId); // 언마운트 시 interval 제거
  }, [autoDust, setDust]);

  return (
    <div id="app-background" className="app">
      <div id="dust-container">
        <DustParticle /> {/** 먼지 입자 컴포넌트 */}
      </div>
      <h1>Origins of the Universe</h1>
      <h2>Collected Cosmic Dust: {formatNumber(dust)}</h2>
      <button onClick={handleDustClick} className="collect-button">
        Collect Cosmic Dust
      </button>
      <UpgradeList
        dust={dust}
        setDust={setDust}
        clickValue={clickValue}
        setClickValue={setClickValue}
        autoDust={autoDust}
        setAutoDust={setAutoDust}
      />
    </div>
  );
};

export default App;
