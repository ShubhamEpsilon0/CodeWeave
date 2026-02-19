import React from "react";

import "./AddCellBar.css";
import { CellTypes, CellTypeNames } from "@/constants/constants";
import type { CellType } from "@/constants/types";

interface AddCellBarProps {
  forceShow?: boolean;
  onButtonClick: (cellType: CellType) => void;
}

const AddCellBar: React.FC<AddCellBarProps> = ({
  forceShow = false,
  onButtonClick,
}) => {
  return (
    <div
      className={`add-cell-bar-container ${forceShow ? "force-show-add-cell-bar" : ""}`}
    >
      <div className="add-cell-hr-line" />
      <div className="button-container">
        {CellTypes.map((cellType) => (
          <button
            key={cellType}
            className="button is-primary is-small add-cell-button"
            onClick={() => onButtonClick(cellType)}
          >
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>{CellTypeNames[cellType]}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddCellBar;
