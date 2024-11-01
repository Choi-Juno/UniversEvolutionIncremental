import React from "react";

const ResetButton = ({ handleReset, tier }) => {
  const canReset = tier >= 3; // 리셋 조건: 3티어 이상일 때 리셋 가능
  return (
    <button onClick={handleReset} disabled={!canReset}>
      {canReset ? "Reset Game for Bonus" : "Reset Tier 3 To Reset"}
    </button>
  );
};

export default ResetButton;
