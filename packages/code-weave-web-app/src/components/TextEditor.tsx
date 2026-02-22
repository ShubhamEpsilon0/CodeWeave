import "./TextEditor.css";

import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import type { Cell } from "@/constants/types";

import { useCellActions } from "@/state/hooks/ActionHooks";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  if (cell.type != "text") {
    console.log("Incorrect cell type in Text Cell");
    return null;
  }
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const { updateCell } = useCellActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        editorRef.current.contains(event.target as Node)
      ) {
        setIsEditing(true);

        return;
      }
      setIsEditing(false);
    };
    window.addEventListener("click", listener, { capture: true });

    return () => {
      window.removeEventListener("click", listener, { capture: true });
    };
  }, [isEditing]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && (event.shiftKey || event.metaKey)) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div ref={editorRef} className="text-editor" data-color-mode="dark">
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || "")}
          onKeyDown={(event) => handleKeyDown(event)}
        />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setIsEditing(true)}>
      <div className="card-content" data-color-mode="dark">
        <MDEditor.Markdown
          source={cell.content || "[No Content] Click here to start Typing..."}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
