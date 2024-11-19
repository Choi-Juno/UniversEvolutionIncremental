import React from "react";
import "../css/SidebarMenu.css";

const SidebarMenu = ({
  currentStage,
  unlockedStages = ["adminPanel"],
  setStage,
}) => {
  const stages = [
    { id: "cosmicDust", name: "Cosmic Dust" },
    { id: "stellarFormation", name: "Stellar Formation" },
    { id: "earthFormation", name: "Earth Formation" },
    { id: "lifeEvolution", name: "Life Evolution" },
    { id: "humanCivilization", name: "Human Civilization" },
    { id: "futureTechnology", name: "Future Technology" },
    { id: "admin", name: "Admin Panel" },
  ];

  return (
    <div className="sidebar-menu">
      {stages.map((stage) => {
        const isUnlocked = unlockedStages.includes(stage.id);
        const isCurrent = currentStage === stage.id;

        return (
          <button
            key={stage.id}
            className={`menu-item ${isCurrent ? "current" : ""} ${
              isUnlocked ? "unlocked" : "locked"
            }`}
            onClick={() => {
              if (isUnlocked) setStage(stage.id);
            }}
            disabled={!isUnlocked}
          >
            {stage.name}
          </button>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
