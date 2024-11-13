import React, { useState } from "react";
import usePersistentState from "../hooks/usePersistentState";
import "../css/AdminPanel.css";

const AdminPanel = () => {
  // 관리할 게임 상태 값 가져오기
  const [dust, setDust] = usePersistentState("dust", 0);
  const [energy, setEnergy] = usePersistentState("energy", 0);
  const [clickValue, setClickValue] = usePersistentState("clickValue", 1);
  const [autoDustRate, setAutoDustRate] = usePersistentState("autoDust", 0);

  // 로컬 상태로 관리하는 입력 값
  const [dustInput, setDustInput] = useState(dust);
  const [energyInput, setEnergyInput] = useState(energy);
  const [clickValueInput, setClickValueInput] = useState(clickValue);
  const [autoDustRateInput, setAutoDustRateInput] = useState(autoDustRate);

  // 입력 값 fhzjftmxhflwldp wjwkd
  const updateValues = () => {
    setDust(dustInput);
    setEnergy(energyInput);
    setClickValue(clickValueInput);
    setAutoDustRate(autoDustRateInput);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="input-group">
        <label>Cosmic Dust: </label>
        <input
          type="number"
          value={dustInput}
          onChange={(e) => setDustInput(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Energy: </label>
        <input
          type="number"
          value={energyInput}
          onChange={(e) => setEnergyInput(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Click Value: </label>
        <input
          type="number"
          value={clickValueInput}
          onChange={(e) => setClickValueInput(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Auto Dust Rate: </label>
        <input
          type="number"
          value={autoDustRateInput}
          onChange={(e) => setAutoDustRateInput(Number(e.target.value))}
        />
      </div>
      <button onClick={updateValues} className="update-button">
        Update Values
      </button>
    </div>
  );
};

export default AdminPanel;
