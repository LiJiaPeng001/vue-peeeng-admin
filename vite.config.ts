import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import viteHtmlPlugin from "./src/plugins/viteHtmlPlugin";

function getEnvVariable(mode: string) {
  return loadEnv(mode, process.cwd());
}

export default ({ mode }: ConfigEnv) => {
  return defineConfig({
    base: "/", // 基础路径
    resolve: {
      alias: {
        "~": resolve(__dirname, "./src"),
        "#": resolve(__dirname, "./types"),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      autoImport({
        imports: ["vue", "vue-router", "@vueuse/core"],
        eslintrc: {
          enabled: true, // Default `false`
        },
        dirs: ["./src/composables"],
      }),
      viteHtmlPlugin({
        metaEnv: getEnvVariable(mode),
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, "./src/style/variable.less")}";`,
        },
      },
    },
    server: {
      port: 2525,
      host: "0.0.0.0",
      proxy: {}, // cross
    },
  });
};
