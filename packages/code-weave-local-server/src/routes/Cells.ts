import type { RequestPayload, Cell } from "../types/cells";
import CellSerializer from "../utils/CellSerializer";

import { Router } from "express";
import fs from "fs/promises";

export const createCellsRouter = (filepath: string) => {
  const CellsRouter = Router();

  CellsRouter.get("/cells", async (req, res) => {
    try {
      const serializedCells = await fs.readFile(filepath, "utf-8");

      // Add Deserializing logic here.
      const desrializedCells: Cell[] =
        CellSerializer.deserializer(serializedCells);

      res.json({ cells: desrializedCells });
    } catch (error) {
      if (error instanceof Error && (error as any).code === "ENOENT") {
        console.warn(`File ${filepath} not found. Returning empty cells.`);
        return res.json({ cells: [] });
      }

      console.error("Unexpected error reading cells:", error);
      res.status(500).json({ error: "Failed to read cells" });
    }
  });

  CellsRouter.post("/cells", async (req, res) => {
    const { cells }: RequestPayload = req.body;

    try {
      // Add Serializing Logic Here
      const serializedCells = CellSerializer.serializer(cells);

      await fs.writeFile(filepath, serializedCells, "utf-8");

      return res.json({ status: "ok" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save cells" });
    }
  });

  return CellsRouter;
};
