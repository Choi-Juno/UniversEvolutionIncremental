import React from "react";
import "../css/TierDisplay.css";

const TierDisplay = ({ tier }) => {
  return (
    <div className="tier-display">
      <h2>Current Tier: {tier}</h2>
    </div>
  );
};

export default TierDisplay;
