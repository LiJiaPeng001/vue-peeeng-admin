/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "~/utils/*";
declare module "~/store/*";
declare module "~/api/*";
declare module "~/plugins/*";
declare module "~/components/*";
declare module "~/composables/*";
declare module "~pages*";
declare module "#/*";
declare module "nprogress";
declare module "mockjs";
declare module "ant-design-vue/*";
declare module "photoswipe/*";
