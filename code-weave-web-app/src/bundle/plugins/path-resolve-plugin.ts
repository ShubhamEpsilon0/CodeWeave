import * as esbuild from "esbuild-wasm";

const pkgFetchURL = "https://unpkg.com";

export const unpkgPathResolvePlugin = () => {
  return {
    name: "unpkg-path-resolve-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.jsx$)/ }, (args) => {
        return { path: args.path, namespace: "a" };
      });

      build.onResolve({ filter: /^\.+\// }, (args) => {
        return {
          path: new URL(args.path, pkgFetchURL + args.resolveDir + "/").href,
          namespace: "a",
        };
      });
      build.onResolve({ filter: /.*/ }, (args) => {
        return { path: `${pkgFetchURL}/${args.path}`, namespace: "a" };
      });
    },
  };
};
