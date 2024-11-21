import React, { useState } from "react";
import "../css/SidebarMenu.css";

const SidebarMenu = ({
  currentStage,
  unlockedStages = ["adminPanel"],
  setStage,
}) => {
  const [hovered, setHovered] = useState(null);

  const stages = [
    {
      id: "cosmicDust",
      name: "Cosmic Dust",
      options: ["main", "upgrades", "auto"],
    },
    {
      id: "stellarFormation",
      name: "Stellar Formation",
      options: ["1", "2", "3"],
    },
    { id: "earthFormation", name: "Earth Formation" },
    { id: "lifeEvolution", name: "Life Evolution" },
    { id: "humanCivilization", name: "Human Civilization" },
    { id: "futureTechnology", name: "Future Technology" },
    { id: "admin", name: "Admin Panel" },
  ];

  return (
    <div className="sidebar-menu">
      {stages.map((stage) => {
        const isUnlocked = unlockedStages.includes(stage.id); // 스테이지 해금 여부
        const isCurrent = currentStage === stage.id;

        return (
          <div
            key={stage.id}
            className={`menu-item ${isUnlocked ? "unlocked" : "locked"} ${
              isCurrent ? "current" : ""
            }`}
            onMouseEnter={() => isUnlocked && setHovered(stage.id)}
          >
            <button
              className="main-button"
              onClick={() => isUnlocked && setStage(stage.id)}
              disabled={!isUnlocked}
            >
              {stage.name}
            </button>
            {/** 세부 옵션 표시 */}
            {hovered === stage.id && isUnlocked && stage.options && (
              <div
                className="submenu"
                onMouseEnter={() => setHovered(stage.id)} // 서브메뉴 유지
                onMouseLeave={() => setHovered(null)} // 서브메뉴 숨김
              >
                {stage.options.map((option, index) => (
                  <button key={index} className="submenu-item">
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
