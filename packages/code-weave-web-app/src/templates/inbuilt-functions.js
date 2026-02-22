import _React from "react";
import { createRoot as _createRoot } from "react-dom/client";

const show = (value) => {
  const root = document.getElementById("root");
  if (value instanceof Object) {
    console.log("Object value:", value.$$typeof);
    if (value.$$typeof && value.props) {
      const root = _createRoot(document.getElementById("root"));
      root.render(value);
      return;
    }
    root.innerHTML = JSON.stringify(value, null, 2);
    return;
  }
  root.innerHTML = value;
};
