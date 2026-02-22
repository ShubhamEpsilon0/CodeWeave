import * as esbuild from "esbuild-wasm";
import { unpkgPathResolvePlugin } from "./plugins/path-resolve-plugin";
import { unpkgPathFetchPlugin } from "./plugins/path-fetch-plugin";
import * as babelParser from "@babel/parser";
import traverse from "@babel/traverse";

export const initializeBundler = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.14.54/esbuild.wasm",
  });
};

export const bundleCode = async (rawCode: string) => {
  try {
    const buildResult = await esbuild.build({
      entryPoints: ["index.jsx"],
      bundle: true,
      write: false,
      logLevel: "silent",
      plugins: [unpkgPathResolvePlugin(), unpkgPathFetchPlugin(rawCode)],
      define: {
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return {
      code: buildResult.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message || "An unknown error occurred during bundling.",
      };
    }

    throw err;
  }
};

export const extractDefinitions = (code: string) => {
  const ast = babelParser.parse(code, {
    sourceType: "module",
  });

  const definitions: string[] = [];

  traverse(ast, {
    VariableDeclaration(path) {
      definitions.push(path.toString());
    },
    FunctionDeclaration(path) {
      definitions.push(path.toString());
    },
    ClassDeclaration(path) {
      definitions.push(path.toString());
    },
  });

  console.log("Extracted definitions:", definitions);

  return definitions;
};
