import React, { useEffect, useState } from "react";

import { initializeBundler } from "@/bundle/bundler";
import CellList from "./CellList";
import { useCellActions } from "@/state/hooks/ActionHooks";

const App: React.FC = () => {
  const { fetchCells } = useCellActions();
  const [esbuildInitialized, setESbuildInitialized] = useState(false);

  const initialize = async () => {
    if (esbuildInitialized) return;

    initializeBundler();
    fetchCells();
    setESbuildInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  return <>{esbuildInitialized && <CellList />}</>;
};

export default App;
