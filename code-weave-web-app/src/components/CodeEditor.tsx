import "./CodeEditor.css";
import "./syntax.css";

import React, { useRef } from "react";

import MonacoEditor from "@monaco-editor/react";
import prettier from "prettier/standalone";
import parser from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";

// import * as Babel from "@babel/standalone";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

import MonacoJSXHighlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange: (code: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);
  const handleFormat = async () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = await prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser, estree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    editorRef.current.setValue(formatted);
  };
  return (
    <div className="code-editor-container">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormat}
      >
        Format
      </button>
      <MonacoEditor
        height={"100%"}
        defaultValue={initialValue}
        defaultLanguage="javascript"
        theme="vs-dark"
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          const babelParse = (code: string) =>
            parse(code, {
              sourceType: "module",
              plugins: ["jsx"],
            });

          //@ts-ignore
          const highlighter = new MonacoJSXHighlighter(
            monaco,
            babelParse,
            traverse,
            editor
          );

          highlighter.highLightOnDidChangeModelContent(
            100,
            () => {},
            () => {},
            undefined,
            () => {}
          );
        }}
      />
    </div>
  );
};

export default CodeEditor;
