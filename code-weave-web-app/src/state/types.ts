import type { Cell, CellMoveDirection, CellType } from "@/constants/types";

export interface CellsState {
  loading: boolean;
  error: string | null;
  cells: Record<string, Cell>;
  cellOrder: string[]; // Array of Cell Ids to maintain order
}

export interface BundleState {
  [cellId: string]:
    | {
        loading: boolean;
        code: string;
        error: string | null;
      }
    | undefined;
}

export interface AddCellActionPayload {
  type: CellType;
  prevCellId?: string | null;
}

export interface RemoveCellActionPayload {
  cellId: string;
}

export interface UpdateCellActionPayload {
  cellId: string;
  content?: string | Record<string, string>;
}

export interface MoveCellActionPayload {
  cellId: string;
  direction: CellMoveDirection;
}

export interface ToggleCumulativeExecutionActionPayload {
  cellId: string;
}

export interface BundleStartActionPayload {
  cellId: string;
}

export interface BundleCompleteActionPayload {
  cellId: string;
  bundle: {
    code: string;
    error: string | null;
  };
}
