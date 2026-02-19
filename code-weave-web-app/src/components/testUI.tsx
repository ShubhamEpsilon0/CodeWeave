import React, { useEffect, useState } from "react";

import { initializeBundler } from "@/bundle/bundler";
import CellList from "./CellList";

const TestUI: React.FC = () => {
  const [esbuildInitialized, setESbuildInitialized] = useState(false);

  const initialize = async () => {
    if (esbuildInitialized) return;

    initializeBundler();
    setESbuildInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  return <>{esbuildInitialized && <CellList />}</>;
};

export default TestUI;
