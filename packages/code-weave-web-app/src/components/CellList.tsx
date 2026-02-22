import "./CellList.css";

import CellListItem from "./CellListItem";
import AddCellBar from "./AddCellBar";

import { useAppSelector } from "@/state/hooks/typedHooks";
import { useCellActions } from "@/state/hooks/ActionHooks";
import type { CellType } from "@/constants/types";

const CellList = () => {
  const { cells, cellOrder } = useAppSelector((state) => state.cells);
  const { addCell } = useCellActions();

  return (
    <div className="cell-list">
      <AddCellBar
        forceShow={cellOrder.length == 0}
        onButtonClick={(CellType: CellType) => {
          addCell(CellType);
        }}
      />
      {cellOrder.map((cellId) => (
        <div key={cellId}>
          <CellListItem cell={cells[cellId]} />
          <AddCellBar
            onButtonClick={(CellType: CellType) => {
              addCell(CellType, cellId);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CellList;
