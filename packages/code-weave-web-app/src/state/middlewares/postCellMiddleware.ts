import {
  moveCell,
  updateCell,
  removeCell,
  addCell,
} from "../slices/CellsSlice";

import axios from "axios";

export const postCellMiddleware = ({ getState }: { getState: () => any }) => {
  let timer: number;
  return (next: any) => async (action: any) => {
    const result = next(action);
    console.log("postCellMiddleware received action:", action);
    if (
      [moveCell.type, updateCell.type, removeCell.type, addCell.type].includes(
        action.type
      )
    ) {
      const state = getState();
      const cells = state.cells.cells;

      try {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(
          () =>
            axios.post("/api/cells", {
              cells: JSON.stringify(Object.values(cells)),
            }),
          500
        );
      } catch (err) {
        console.error("Failed to post cells", err);
      }
    }

    return result;
  };
};
