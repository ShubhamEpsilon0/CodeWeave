import "./App.css";
import React, { useEffect } from "react";

import { useAppActions } from "@/state/hooks/ActionHooks";
import { useAppSelector } from "@/state/hooks/typedHooks";

import LoadingIndicator from "./LoadingIndicator";
import CellList from "./CellList";

const App: React.FC = () => {
  const { initializeApp } = useAppActions();
  const appInitialized = useAppSelector((state) => state.app.initialized);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!appInitialized) {
    return (
      <div className="progress-container">
        <LoadingIndicator action={"Initializing App,  fetching Notebook..."} />
      </div>
    );
  }

  return <CellList />;
};

export default App;
