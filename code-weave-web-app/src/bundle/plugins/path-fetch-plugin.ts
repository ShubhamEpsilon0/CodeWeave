import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

import { renderTemplate, templateTypes } from "@/templates/template-renderer";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgPathFetchPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.jsx$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args) => {
        let cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        console.log("Checking cache for:", args.path, cachedResult);
        console.log("Cache hit:", !!cachedResult);
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const { data } = await axios.get(args.path);
        const cssCode = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const cssInjectedScript: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: renderTemplate(templateTypes.CSS_INJECTION_TEMPLATE, {
            cssCode,
          }),
        };

        await fileCache.setItem(args.path, cssInjectedScript);

        return cssInjectedScript;
      });

      build.onLoad({ filter: /\.*/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const module: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          // Added ./ to remove the filename from the path, otherwise it will be included in the resolveDir and
          // cause issues when resolving relative paths in the imported file
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, module);

        return module;
      });
    },
  };
};
