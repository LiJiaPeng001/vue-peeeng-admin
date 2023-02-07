import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Unocss from "unocss/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import viteTestPlugin from "./src/plugins/viteHtmlPlugin";

function getEnvVariable(mode: string) {
  return loadEnv(mode, process.cwd());
}

export default ({ mode }: ConfigEnv) => {
  let env = getEnvVariable(mode);
  console.log(env)
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
      Unocss(),
      viteTestPlugin(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      autoImport({
        imports: ["vue", "vue-router", "@vueuse/core", { "~/api/demo.ts": [] }],
        eslintrc: {
          enabled: true, // Default `false`
        },
        dirs: ["./src/composables", "./src/store"],
        vueTemplate: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, "./src/style/variable.less")}";`,
          // modifyVars: getThemeVariables({
          //   dark: true, // 开启暗黑模式
          // }),
        },
      },
    },
    // server: {
    //   port: 2525,
    //   host: "0.0.0.0",
    //   proxy: {
    //     "^/api*": env.VITE_BASE_URL,
    //   },
    // },
  });
};
