import { useCellActions } from "@/state/hooks/ActionHooks";
import type { Cell } from "@/constants/types";

interface CellMenuProps {
  cell: Cell;
}

const CellMenu: React.FC<CellMenuProps> = ({ cell }) => {
  const { removeCell, moveCell, toggleCumulativeExecution } = useCellActions();
  return (
    <div className="menu-bar">
      {cell.type === "code" && (
        <>
          <button
            className={`button is-small ${!cell.excluded ? "is-primary" : ""}`}
            onClick={() => toggleCumulativeExecution(cell.id)}
            title="Include in cumulative execution"
          >
            <span className="icon">
              <i className="fas fa-bolt"></i>
            </span>
          </button>
          <p>JS Code Block</p>
        </>
      )}
      <div className="menu-buttons">
        <button
          className="button is-primary is-small"
          onClick={() => moveCell(cell.id, "up")}
        >
          <span className="icon">
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => moveCell(cell.id, "down")}
        >
          <span className="icon">
            <i className="fas fa-arrow-down"></i>
          </span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => removeCell(cell.id)}
        >
          <span className="icon">
            <i className="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CellMenu;
