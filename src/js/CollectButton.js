import React from "react";
import "../css/CollectButton.css";

const CollectButton = ({ onClick }) => {
  return <button onClick={onClick}>Collect Coins</button>;
};

export default CollectButton;
