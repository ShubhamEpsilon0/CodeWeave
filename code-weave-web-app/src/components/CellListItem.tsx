import "./CellListItem.css";
import React from "react";

import CellMenu from "./CellMenu";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import type { Cell } from "@/constants/types";

interface CellListItemProps {
  cell: Cell;
}

const containerClassMap = {
  code: "code-container",
  text: "text-container",
  "ai-prompt": "ai-container",
} as const;

const componentMap = {
  code: CodeCell,
  text: TextEditor,
  "ai-prompt": null,
} as const;

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let Component = componentMap[cell.type];
  if (!Component) return null;
  return (
    <div className="cell-list-item">
      <div className={containerClassMap[cell.type]}>
        <CellMenu cell={cell} />
        <Component cell={cell} />{" "}
      </div>
    </div>
  );
};

export default CellListItem;
