import type { GetCellsResponse } from "./types";
import type { Cell } from "@/constants/types";

import { axiosInstance } from "./Axios";

export const fetchCells = async (): Promise<Cell[]> => {
  try {
    const { data } = await axiosInstance.get<GetCellsResponse>("/api/cells");
    console.log("Fetched cells data:", data); // Debug log to check the response structure
    const cells = data.cells.map(
      (cell) =>
        ({
          type: cell.type,
          id: cell.id,
          content: cell.content,
          ...(cell.type === "code" ? { excluded: false } : {}), // Add 'excluded' field for code cells
        }) as Cell
    );
    return cells;
  } catch (err) {
    console.error("Failed to fetch cells:", err);
    throw new Error("Failed to fetch cells");
  }
};

export const saveCells = async (cells: Cell[]): Promise<void> => {
  try {
    await axiosInstance.post("/api/cells", {
      cells: cells.map((cell) => ({
        type: cell.type,
        id: cell.id,
        content: cell.content,
      })),
    });
  } catch (err) {
    console.error("Failed to save cells:", err);
    throw new Error("Failed to save cells");
  }
};
