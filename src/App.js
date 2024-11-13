import React from "react";
import usePersistentState from "./hooks/usePersistentState";
import CosmicDust from "./stages/CosmicDust";
import SidebarMenu from "./components/SidebarMenu";
import StellarFormation from "./stages/StellarFormation";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  const [currentStage, setCurrentStage] = usePersistentState(
    "stage",
    "cosmicDust"
  );

  const renderStageContent = () => {
    switch (currentStage) {
      case "cosmicDust":
        return <CosmicDust />;
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
      <SidebarMenu setCurrentStage={setCurrentStage} />
      <div className="content">{renderStageContent()}</div>
    </div>
  );
};

export default App;
