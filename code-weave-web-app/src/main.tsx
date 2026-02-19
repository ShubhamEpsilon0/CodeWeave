import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";

//@ts-ignore
import process from "process";
(window as any).process = process;

import { store } from "@/state/store";
import { Provider } from "react-redux";

import TestUI from "@/components/testUI";

const App = () => {
  return (
    <Provider store={store}>
      <TestUI />
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
