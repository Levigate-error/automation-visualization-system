import { defineConfig, loadEnv, UserConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
import path from "path";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import { version } from "./package.json";

export default ({ mode }: UserConfig) => {
  Object.assign(process.env, loadEnv(mode || "production", process.cwd()));

  return defineConfig({
    base: "/",
    plugins: [
      react({ babel: { plugins: [] } }),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style`, // Import only necessary styles
          },
        ],
      }),
      svgr({
        include: "**/*.svg",
        exclude: "**/*.svg?path",
        svgrOptions: {
          dimensions: true,
        },
      }),
      viteTsconfigPaths(),
      nodePolyfills({
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
    ],
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to the env variable
      port: Number(process.env.VITE_PORT) || 3000,
      proxy: {
        "/api": {
          target: process.env.VITE_APP_BACK_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-${version}.js`,
          chunkFileNames: `assets/[name]-${version}.js`,
          assetFileNames: `assets/[name]-${version}.[ext]`,
        },
      },
      outDir: "./build",
    },
  });
};
