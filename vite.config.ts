import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import { program } from "commander";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { glob } from "glob";
import { fileURLToPath } from "node:url";

program.option("-f, --format <char>").argument("<string>");

program.parse();

const options = program.opts();
const format = options.format || "es";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ rollupTypes: true, outDir: resolve(__dirname, `dist/${format}`) }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 这里可以配置 Less 的选项
      },
    },
  },
  build: {
    lib: {
      entry: "./lib/index.tsx",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-resizable",
        "react-is",
        "react-dom",
        "antd",
      ],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}").map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative("lib", file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      output: [
        {
          //打包格式
          format: format,
          name: "lib_global_name",
          //打包后文件名
          // entryFileNames: "[name].",
          //让打包目录和我们目录对应
          // preserveModules: true,
          exports: "auto",
          //配置打包根目录
          dir: resolve(__dirname, `dist/${format}`),
        },
      ],
    },
  },
});
