import "./App.css";
import React from "react";
import CoinDisplay from "./js/CoinDisplay";
import CollectButton from "./js/CollectButton";
import AutoCollector from "./js/AutoCollector";
import TierDisplay from "./js/TierDisplay";
import TierManager from "./js/TierManager";
import usePersistentState from "./hooks/usePersistentState";
import UpgradeList from "./js/UpgradeList";
import ResetButton from "./js/ResetButton";

const App = () => {
  // 코인 상태 정의
  const [coins, setCoins] = usePersistentState("coins", 0); // 코인 상태 관리
  const [autoCoin, setAutoCoin] = usePersistentState("autoCoin", 1); // 자동 수익 상태 관리
  const [tier, setTier] = usePersistentState("tier", 1); // 티어 상태
  const [clickValue, setClickValue] = usePersistentState("clickValue", 1); // 클릭당 코인 수익
  const [resetBonus, setResetBonus] = usePersistentState("resetBonus", 1);

  // 클릭하여 코인 증가 함수
  const handleClick = () => {
    setCoins((prevCoins) => prevCoins + clickValue * tier * resetBonus); // 클릭 시 코인 1 증가
  };

  const handleReset = () => {
    setCoins(0);
    setAutoCoin(1);
    setClickValue(1);
    setTier(1);
    setResetBonus((prevBonus) => prevBonus + 0.1);
    localStorage.removeItem("upgrades"); //업그레이드 초기화
  };
  return (
    <div className="app">
      <h1>Universe Evolution Incremental</h1>
      <CoinDisplay coins={coins} />
      <CollectButton onClick={handleClick} />
      <AutoCollector coins={coins} setCoins={setCoins} autoCoin={autoCoin} />
      <TierDisplay tier={tier} />
      <TierManager coins={coins} tier={tier} setTier={setTier} />
      <UpgradeList
        coins={coins}
        setCoins={setCoins}
        autoCoin={autoCoin}
        setAutoCoin={setAutoCoin}
        clickValue={clickValue}
        setClickValue={setClickValue}
        tier={tier} /* 티어에 따라 업그레이드 표시  */
      />
      <ResetButton handleReset={handleReset} tier={tier} />
    </div>
  );
};

export default App;
