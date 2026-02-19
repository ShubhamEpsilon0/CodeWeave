import CSSInjectionTemplate from "./css-injection-template.js?raw";
import CodeCellResultTemplate from "./code-cell-result-template.html?raw";
import InbuiltFunctions from "./inbuilt-functions.js?raw";

export type TemplateType =
  | "CSS_INJECTION_TEMPLATE"
  | "CODE_CELL_RESULT_TEMPLATE"
  | "INBUILT_FUNCTIONS_TEMPLATE";

export const templateTypes: Record<string, TemplateType> = {
  CSS_INJECTION_TEMPLATE: "CSS_INJECTION_TEMPLATE",
  CODE_CELL_RESULT_TEMPLATE: "CODE_CELL_RESULT_TEMPLATE",
  INBUILT_FUNCTIONS_TEMPLATE: "INBUILT_FUNCTIONS_TEMPLATE",
};

export const renderTemplate = (
  templatetype: TemplateType,
  data: Record<string, any> = {}
): string => {
  switch (templatetype) {
    case templateTypes.CSS_INJECTION_TEMPLATE:
      return CSSInjectionTemplate.replace(
        "<CSS_CODE_PLACEHOLDER>",
        data.cssCode
      );
    case templateTypes.CODE_CELL_RESULT_TEMPLATE:
      return CodeCellResultTemplate;
    case templateTypes.INBUILT_FUNCTIONS_TEMPLATE:
      return InbuiltFunctions;
    default:
      throw new Error(`Unknown template type: ${templatetype}`);
  }
};
