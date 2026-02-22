import { Router } from "express";
import fs from "fs/promises";

export const createCellsRouter = (filepath: string) => {
  const CellsRouter = Router();

  CellsRouter.get("/cells", async (req, res) => {
    console.log(`Reading cells from file: ${filepath}`);
    try {
      const serializedCells = await fs.readFile(filepath, "utf-8");
      res.json({ cells: serializedCells });
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        if (error.code === "ENOENT") {
          console.warn(`File ${filepath} not found. Returning empty cells.`);
          res.json({ cells: "[]" });
          return;
        }
        console.error("Error reading cells:", error.message);
      } else {
        console.error("Error reading cells:", error);
      }
      res.status(500).json({ error: "Failed to read cells" });
    }
  });

  CellsRouter.post("/cells", async (req, res) => {
    const { cells } = req.body;
    if (typeof cells !== "string") {
      return res.status(400).json({ error: "Cells must be a string" });
    }

    await fs.writeFile(filepath, cells, "utf-8");

    return res.json({ status: "ok" });
  });

  return CellsRouter;
};
