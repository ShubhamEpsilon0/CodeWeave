import type { Cell } from "@/constants/types";

import { axiosInstance } from "./Axios";

export const fetchCells = async (): Promise<Cell[]> => {
  try {
    const { data } = await axiosInstance.get<{ cells: string }>("/api/cells");
    return JSON.parse(data.cells) as Cell[];
  } catch (err) {
    console.error("Failed to fetch cells:", err);
    throw new Error("Failed to fetch cells");
  }
};

export const saveCells = async (cells: string): Promise<void> => {
  try {
    await axiosInstance.post("/api/cells", { cells });
  } catch (err) {
    console.error("Failed to save cells:", err);
    throw new Error("Failed to save cells");
  }
};
