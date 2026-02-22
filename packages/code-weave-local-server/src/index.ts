import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/Cells";

const listenAsync = (app: express.Application, port: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port);

    server.once("listening", () => {
      resolve();
    });

    server.once("error", reject);
  });
};

const app = express();

const proxyMiddleware = createProxyMiddleware({
  target: "http://localhost:5173",
  ws: true,
});

export const runServer = async (
  port: number,
  filepath: string,
  useProxy: boolean
) => {
  app.use(express.json());

  // app.use((req, res, next) => {
  //   console.log(req.method, req.url);
  //   next();
  // });

  app.use("/api", createCellsRouter(filepath));

  if (useProxy) {
    app.use(proxyMiddleware);
  } else {
    // Todo Fix path to react app folder
    const packagePath = require.resolve("code-weave-web-app/dist/index.html");

    const staticPath = path.dirname(packagePath);
    app.use(express.static(staticPath));
  }
  await listenAsync(app, port);
  console.log(`Code Weave Local Server is running on port ${port}`);
  console.log(`Serving cells data from file: ${filepath}`);
};
