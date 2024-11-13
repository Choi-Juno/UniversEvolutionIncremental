import React from "react";
import "../css/SidebarMenu.css";

const SidebarMenu = ({ setCurrentStage }) => {
  return (
    <div className="sidebar-menu">
      <button onClick={() => setCurrentStage("cosmicDust")}>Cosmic Dust</button>
      <button onClick={() => setCurrentStage("stellarFormation")}>
        Stellar Formation
      </button>
      <button onClick={() => setCurrentStage("earthFormation")}>
        Earth Formation
      </button>
      <button onClick={() => setCurrentStage("lifeEvolution")}>
        Life Evolution
      </button>
      <button onClick={() => setCurrentStage("humanCivilization")}>
        Human Civilization
      </button>
      <button onClick={() => setCurrentStage("futureTechnology")}>
        Future Technology
      </button>
      <button onClick={() => setCurrentStage("admin")}>Admin Panel</button>
    </div>
  );
};

export default SidebarMenu;
