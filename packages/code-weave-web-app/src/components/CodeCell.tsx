import "./CodeCell.css";
import React, { useEffect } from "react";

import CodeEditor from "@/components/CodeEditor";
import Resizable from "@/components/Resizable";
import Preview from "./Preview";
import { templateTypes, renderTemplate } from "@/templates/template-renderer";

import type { Cell } from "@/constants/types";

import { useBundleActions, useCellActions } from "@/state/hooks/ActionHooks";
import { useAppSelector } from "@/state/hooks/typedHooks";

import { extractDefinitions } from "@/bundle/bundler";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  if (cell.type != "code") {
    console.log("Incorrect cell type in Code Cell");
    return null;
  }
  const { updateCell } = useCellActions();
  const { createBundle } = useBundleActions();
  const cells = useAppSelector((state) => state.cells);
  const bundle = useAppSelector((state) => state.bundler.bundles[cell.id]);

  const getCumulativeCode = (
    cells: Record<string, Cell>,
    cellOrder: string[]
  ) => {
    const cumulativeCodeList = cellOrder
      .slice(
        0,
        cellOrder.findIndex((id) => id === cell.id)
      )
      .filter((id) => cells[id].type === "code" && !cells[id].excluded)
      .map((id) => {
        if (typeof cells[id].content != "string") {
          return;
        }
        return extractDefinitions(cells[id].content).join("\n");
      });

    return (
      renderTemplate(templateTypes.INBUILT_FUNCTIONS_TEMPLATE) +
      "\n" +
      cumulativeCodeList.join("\n") +
      "\n" +
      cell.content
    );
  };

  useEffect(() => {
    const cumulativeCode = getCumulativeCode(cells.cells, cells.cellOrder);

    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(() => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content || ""}
            onChange={(value) => {
              updateCell(cell.id, value || "");
            }}
          />
        </Resizable>
        <div className="progress-wrapper">
          {bundle && !bundle.loading ? (
            <Preview code={bundle.code} err={bundle.error || ""} />
          ) : (
            <div className="progress-cover">
              <progress className="progress is-small is-primary">
                Loading
              </progress>
            </div>
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
