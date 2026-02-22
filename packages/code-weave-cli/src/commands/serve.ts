import { Command } from "commander";
import path from "path";

import { runServer } from "code-weave-local-server";

const is_production = process.env.NODE_ENV === "production";

export const serveCommand = new Command("serve")
  .description("Start the Code Weave local server")
  .argument(
    "[filename]",
    "The file to use to save the Notebook to. If not provided, the Notebook will be saved to Notebook.js in the current directory."
  )
  .option("-p, --port <number>", "The port to run the server on", "4500")
  .action(
    async (filename: string = "Notebook.js", options: { port: string }) => {
      try {
        const fullPath = path.resolve(process.cwd(), filename);

        await runServer(parseInt(options.port, 10), fullPath, !is_production);
      } catch (error) {
        if (error instanceof Error && "code" in error) {
          if (error.code === "EADDRINUSE") {
            console.error(
              `Port ${options.port} is already in use. Please choose a different port by providing option -p or --port.`
            );
          } else {
            console.error("Error starting the server:", error);
          }
          process.exit(1);
        }
        console.error("Error starting the server:", error);
        process.exit(1);
      }
    }
  );
