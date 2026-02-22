import * as Yup from "yup";

export const cellSchema = Yup.object({
  type: Yup.mixed<"code" | "text" | "ai-prompt">()
    .oneOf(["code", "text", "ai-prompt"])
    .required("Cell type is required"),
  id: Yup.string().required("Cell id is required"),
  content: Yup.lazy((value: Record<string, string> | string) => {
    if (typeof value === "string")
      return Yup.string().required("Content is required");
    if (typeof value === "object" && value !== null)
      return Yup.object().shape(
        Object.fromEntries(
          Object.entries(value).map(([k]) => [k, Yup.string().required()])
        )
      );
    return Yup.mixed().required("Content must be string or object");
  }),
});

export const requestSchema = Yup.object({
  cells: Yup.array().of(cellSchema).required("Cells array is required"),
});

export type Cell = Yup.InferType<typeof cellSchema>;
export type RequestPayload = Yup.InferType<typeof requestSchema>;
