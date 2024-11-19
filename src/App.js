import React from "react";
import usePersistentState from "./hooks/usePersistentState";
import CosmicDust from "./stages/CosmicDust";
import SidebarMenu from "./components/SidebarMenu";
import StellarFormation from "./stages/StellarFormation";
import AdminPanel from "./components/AdminPanel";

const stages = [
  { id: "cosmicDust", name: "Cosmic Dust", isUnlocked: true },
  { id: "stellarFormation", name: "Stellar Formation", isUnlocked: false },
  { id: "admin", name: "Admin Panel", isUnlocked: true },
];

const App = () => {
  // stageProgress는 현재 스테이지와 진행 상태를 함께 관리
  const [stageProgress, setStageProgress] = usePersistentState(
    "stageProgress",
    {
      currentStage: "cosmicDust", // 현재 선택된 스테이지
      unlockedStages: ["cosmicDust", "admin"], // 해금된 스테이지 ID 목록
    }
  );

  const setCurrentStage = (stage) => {
    setStageProgress((prev) => ({ ...prev, currentStage: stage }));
  };

  const renderStageContent = () => {
    switch (stageProgress.currentStage) {
      case "cosmicDust":
        return (
          <CosmicDust
            stageProgress={stageProgress}
            setStageProgress={setStageProgress}
            setCurrentStage={setCurrentStage}
          />
        );
      case "stellarFormation":
        return <StellarFormation />;
      case "admin":
        return <AdminPanel />;
      default:
        return <CosmicDust />;
    }
  };

  return (
    <div className="app">
      <SidebarMenu
        currentStage={stageProgress.currentStage}
        unlockedStages={stageProgress.unlockedStages}
        setStage={(stageId) =>
          setStageProgress((prev) => ({ ...prev, currentStage: stageId }))
        }
      />
      <main>{renderStageContent()}</main>
    </div>
  );
};

export default App;
