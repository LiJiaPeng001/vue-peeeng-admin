import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Unocss from "unocss/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// import { getThemeVariables } from 'ant-design-vue/dist/theme'

function getEnvVariable(mode: string) {
  return loadEnv(mode, process.cwd());
}

export default ({ mode }: ConfigEnv) => {
  let env = getEnvVariable(mode);
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
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      autoImport({
        imports: ["vue", "vue-router", "@vueuse/core"],
        eslintrc: {
          enabled: true, // Default `false`
        },
        dirs: ["./src/composables"],
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
    server: {
      port: 2525,
      host: "0.0.0.0",
      proxy: {
        "^/api*": env.VITE_BASE_URL,
      },
    },
  });
};
