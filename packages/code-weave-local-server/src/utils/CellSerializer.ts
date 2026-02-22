import type { Cell } from "../types/cells";

class SerializedCellBuilder {
  serializedCell: string[];
  cellType: Cell["type"] | null;
  cellTypeLine: string;
  serializedContent: string;

  constructor() {
    this.serializedCell = [];
    this.cellTypeLine = "";
    this.serializedContent = "";
    this.cellType = null;
  }

  static cellFormatterMap: Record<
    Cell["type"],
    (content: Cell["content"]) => string
  > = {
    text: SerializedCellBuilder.TextCellFormatter,
    code: SerializedCellBuilder.CodeCellFormatter,
    "ai-prompt": SerializedCellBuilder.AIPromptCellFormatter,
  };

  static TextCellFormatter(content: Record<string, string> | string): string {
    return "/**\n" + content + "\n*/";
  }

  static CodeCellFormatter(content: Record<string, string> | string): string {
    return `${content}`;
  }

  static AIPromptCellFormatter(
    content: Record<string, string> | string
  ): string {
    return JSON.stringify(content);
  }

  addNewLine(): this {
    this._buildLine();
    return this;
  }

  addCellTypeLine(cellType: Cell["type"], cellId: Cell["id"]): this {
    this.cellType = cellType;
    this.cellTypeLine = `/// Cell Type: ${cellType}-Cell Id: ${cellId}\n`;
    return this;
  }

  addSerializedContent(content: Cell["content"]): this {
    if (this.cellType === null) return this;
    this.serializedContent =
      SerializedCellBuilder.cellFormatterMap[this.cellType](content) + "\n";
    return this;
  }

  _buildLine() {
    if (this.cellTypeLine != "") {
      this.serializedCell.push(
        this.cellTypeLine + "\n" + this.serializedContent
      );
    }
    this.serializedCell.push("\n"); // Add an extra newline for separation between cells
  }

  build(): string {
    this._buildLine();
    this.cellTypeLine = "";
    this.serializedContent = "";
    return this.serializedCell.join("\n");
  }
}

class Deserializer {
  static contentParserMap: Record<
    Cell["type"],
    (content: string) => Cell["content"]
  > = {
    text: Deserializer.TextContentParser,
    code: Deserializer.CodeContentParser,
    "ai-prompt": Deserializer.AIPromptContentParser,
  };

  static TextContentParser(content: string): Record<string, string> | string {
    if (content.startsWith("/**") && content.endsWith("*/")) {
      return content.slice(3, -2).trim();
    }
    return content;
  }

  static CodeContentParser(content: string): Record<string, string> | string {
    return content;
  }

  static AIPromptContentParser(
    content: string
  ): Record<string, string> | string {
    return JSON.parse(content) as Record<string, string>;
  }

  static deserialize(serializedCells: string): Cell[] {
    try {
      console.log(serializedCells);
      const cellRegex = /\/\/\/ Cell Type: (\w+)-Cell Id: (\w+)/g;

      const matches = Array.from(serializedCells.matchAll(cellRegex));
      const cells: Cell[] = [];

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        if (!match) continue;
        console.log("Match found:", match); // Debug log to check the regex matches
        const [fullMatch, type, id] = match;

        const startOfContent = match.index + fullMatch.length;
        const endOfContent =
          i + 1 < matches.length && matches[i + 1]
            ? matches[i + 1]!.index
            : serializedCells.length;

        const content = serializedCells
          .slice(startOfContent, endOfContent)
          .trim();

        const parsedContent =
          Deserializer.contentParserMap[type as Cell["type"]](content);

        if (id && type) {
          cells.push({
            type: type as Cell["type"],
            id,
            content: parsedContent,
          } as Cell);
        }
      }

      return cells;
    } catch (error) {
      console.error("Failed to deserialize cells:", error);
      return [];
    }
  }
}

const serializer = (cells: Cell[]): string => {
  const sbuilder = new SerializedCellBuilder();
  cells.forEach((cell) => {
    sbuilder
      .addNewLine()
      .addCellTypeLine(cell.type, cell.id)
      .addSerializedContent(cell.content);
  });

  return sbuilder.build();
};

const deserializer = (serializedCells: string): Cell[] => {
  return Deserializer.deserialize(serializedCells) as Cell[];
};

export default {
  serializer,
  deserializer,
};
