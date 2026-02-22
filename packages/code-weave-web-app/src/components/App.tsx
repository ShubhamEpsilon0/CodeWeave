import React, { useEffect } from "react";

import CellList from "./CellList";
import { useAppActions } from "@/state/hooks/ActionHooks";
import { useAppSelector } from "@/state/hooks/typedHooks";

const App: React.FC = () => {
  const { initializeApp } = useAppActions();
  const appInitialized = useAppSelector((state) => state.app.initialized);

  useEffect(() => {
    initializeApp();
  }, []);

  return <>{appInitialized && <CellList />}</>;
};

export default App;
