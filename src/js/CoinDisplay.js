import React from "react";
import "../css/CoinDisplay.css";

const CoinDisplay = ({ coins }) => {
  return (
    <div>
      <div className="coin-display">
        <h2>Coins: {Math.floor(coins)}</h2>
      </div>
    </div>
  );
};

export default CoinDisplay;
