import type { CellType } from "./types";

export const CellTypeNames: Record<CellType, string> = {
  code: "Code",
  text: "Text",
  "ai-prompt": "AI Prompt",
} as const;

export const CellTypes: readonly CellType[] = Object.keys(
  CellTypeNames
) as (keyof typeof CellTypeNames)[];
