import {defineConfig} from 'vite'
import path from 'path';
import { program } from 'commander';
import dts from "vite-plugin-dts";

program
    .option('-f, --format <char>')
    .argument('<string>');

program.parse();

const options = program.opts();
const format = options.format || 'es';

export default defineConfig({
    plugins: [
        dts({rollupTypes: true, outDir: path.resolve(__dirname, `dist/${format}`)}),
    ],
    build: {
        lib: {
            entry: './lib/main.ts',
        },
        rollupOptions: {
            output: [
                {
                    //打包格式
                    format: format,
                    name: "lib_global_name",
                    //打包后文件名
                    // entryFileNames: "[name].",
                    //让打包目录和我们目录对应
                    // preserveModules: true,
                    exports: "named",
                    //配置打包根目录
                    dir: path.resolve(__dirname, `dist/${format}`)
                },
            ],
        },
    },
})
