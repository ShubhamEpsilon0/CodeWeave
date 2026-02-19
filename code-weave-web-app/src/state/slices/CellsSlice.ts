import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  CellsState,
  AddCellActionPayload,
  RemoveCellActionPayload,
  UpdateCellActionPayload,
  MoveCellActionPayload,
  ToggleCumulativeExecutionActionPayload,
} from "../types";
import type { Cell, CellType } from "@/constants/types";

const initialState: CellsState = {
  loading: false,
  error: null,
  cells: {}, // Cell Id: Cell
  cellOrder: [], // Array of Cell Ids to maintain order
};

const generateUniqueId = (): string => {
  return Math.random().toString(36).slice(2, 9);
};

const createCell = (type: CellType, id: string): Cell => {
  switch (type) {
    case "code":
      return { id, type, content: "", excluded: false };

    case "text":
      return { id, type, content: "" };

    case "ai-prompt":
      return { id, type, content: {} };
  }
};

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    addCell: (draftState, action: PayloadAction<AddCellActionPayload>) => {
      const { prevCellId, type } = action.payload;
      const cellId = generateUniqueId();

      draftState.cells[cellId] = createCell(type, cellId);

      const prevCellIndex = draftState.cellOrder.findIndex(
        (id) => id === prevCellId
      );
      draftState.cellOrder.splice(prevCellIndex + 1, 0, cellId);
    },
    removeCell: (
      draftState,
      action: PayloadAction<RemoveCellActionPayload>
    ) => {
      const { cellId } = action.payload;
      draftState.cellOrder = draftState.cellOrder.filter((id) => id !== cellId);
      delete draftState.cells[cellId];
    },
    updateCell: (
      draftState,
      action: PayloadAction<UpdateCellActionPayload>
    ) => {
      const { cellId, content } = action.payload;

      if (draftState.cells[cellId] && content) {
        if (typeof content === "string") {
          draftState.cells[cellId].content = content;
        } else {
          if (draftState.cells[cellId].type === "ai-prompt")
            draftState.cells[cellId].content = {
              ...draftState.cells[cellId].content,
              ...content,
            };
        }
      }
    },
    moveCell: (draftState, action: PayloadAction<MoveCellActionPayload>) => {
      const { cellId, direction } = action.payload;
      const indexChange = direction === "up" ? -1 : 1;
      const curIndex = draftState.cellOrder.findIndex((id) => id === cellId);

      const targetIndex = curIndex + indexChange;
      if (
        curIndex === -1 ||
        targetIndex < 0 ||
        targetIndex >= draftState.cellOrder.length
      ) {
        return; // Out of bounds
      }

      // Swap the cells in the order array
      [draftState.cellOrder[curIndex], draftState.cellOrder[targetIndex]] = [
        draftState.cellOrder[targetIndex],
        draftState.cellOrder[curIndex],
      ];
    },

    toggleCumulativeExecution: (
      draftState,
      action: PayloadAction<ToggleCumulativeExecutionActionPayload>
    ) => {
      const { cellId } = action.payload;
      const cell = draftState.cells[cellId];

      if (cell && cell.type === "code") {
        cell.excluded = !cell.excluded;
      }
    },
  },
});

export const {
  addCell,
  removeCell,
  updateCell,
  moveCell,
  toggleCumulativeExecution,
} = cellsSlice.actions;

export default cellsSlice.reducer;
