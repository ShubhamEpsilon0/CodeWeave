export type CellType = "code" | "text" | "ai-prompt";

export type CellMoveDirection = "up" | "down";

interface CellBase {
  id: string;
}

export interface ICodeCell extends CellBase {
  type: "code";
  excluded: boolean;
  content: string;
}

export interface ITextCell extends CellBase {
  type: "text";
  content: string;
}

export interface IAIPromptCell extends CellBase {
  type: "ai-prompt";
  content: Record<string, string>;
}

export type Cell = ICodeCell | ITextCell | IAIPromptCell;
