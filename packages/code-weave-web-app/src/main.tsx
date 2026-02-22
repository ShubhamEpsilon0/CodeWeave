import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";

//@ts-ignore
import process from "process";
(window as any).process = process;

import { store } from "@/state/store";
import { Provider } from "react-redux";
import App from "@/components/App";

const MainRC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<MainRC />);
