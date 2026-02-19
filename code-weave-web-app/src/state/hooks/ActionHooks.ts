import { bindActionCreators, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCell,
  moveCell,
  removeCell,
  updateCell,
  toggleCumulativeExecution,
} from "../slices/CellsSlice";

import { bundleComplete, bundleStart } from "../slices/BundleSlice";

import { useAppDispatch } from "./typedHooks";
import type { CellType } from "@/constants/types";
import { bundleCode } from "@/bundle/bundler";

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
    },
    dispatch
  );
};

const createBundle = createAsyncThunk(
  "bundle/createBundle",
  async (
    { cellId, inputCode }: { cellId: string; inputCode: string },
    { dispatch }
  ) => {
    dispatch(bundleStart({ cellId }));

    const bundleResult = await bundleCode(inputCode);
    console.log("Bundle result:", bundleResult);
    dispatch(
      bundleComplete({
        cellId,
        bundle: {
          code: bundleResult.code,
          error: bundleResult.err,
        },
      })
    );
  }
);

export const useBundleActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      createBundle: (cellId: string, inputCode: string) =>
        createBundle({ cellId, inputCode }),
    },
    dispatch
  );
};
