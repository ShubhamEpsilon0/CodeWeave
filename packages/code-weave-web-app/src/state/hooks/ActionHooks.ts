import { bindActionCreators } from "@reduxjs/toolkit";
import {
  addCell,
  moveCell,
  removeCell,
  updateCell,
  toggleCumulativeExecution,
} from "../slices/CellsSlice";

import { useAppDispatch } from "./typedHooks";
import type { CellType } from "@/constants/types";

import { createBundleThunk } from "../thunks/createBundleThunk";
import { fetchCellsThunk } from "../thunks/fetchCellsThunk";
import { initializeAppThunk } from "../thunks/initializeAppThunk";

export const useCellActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      addCell: (type: CellType, prevCellId?: string) =>
        addCell({ type, prevCellId }),
      removeCell: (cellId: string) => removeCell({ cellId }),
      updateCell: (cellId: string, content: string) =>
        updateCell({ cellId, content }),
      moveCell: (cellId: string, direction: "up" | "down") =>
        moveCell({ cellId, direction }),
      toggleCumulativeExecution: (cellId: string) =>
        toggleCumulativeExecution({ cellId }),
      fetchCells: () => {
        console.log("Dispatching fetchCells action...");
        return fetchCellsThunk();
      },
    },
    dispatch
  );
};

export const useBundleActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      createBundle: (cellId: string, inputCode: string) =>
        createBundleThunk({ cellId, inputCode }),
    },
    dispatch
  );
};

export const useAppActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      initializeApp: () => {
        return initializeAppThunk();
      },
    },
    dispatch
  );
};
