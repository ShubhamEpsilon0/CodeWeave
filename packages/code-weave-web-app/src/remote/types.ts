export interface GetCellsResponse {
  cells: {
    type: "code" | "text" | "ai-prompt";
    id: string;
    content: string | Record<string, string>;
  }[];
}
