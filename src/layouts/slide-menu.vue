<template>
  <div class="slide-menu" min-h-100vh z-99 relative>
    <div h-full shrink-0 :style="{ width: settingStore.layoutW + 'px' }"></div>
    <component :is="settingStore.mode === 'pc' ? 'LayoutSlider' : 'DrawerBox'">
      <div h-64 transition-20 center-flex>
        <img :src="logo" w-36 h-36 mr-12 />
        <div v-if="!settingStore.inlineCollapsed" color-white font-500 text-20>无他社区</div>
      </div>
      <a-menu
        :selected-keys="selectedKeys"
        :inline-collapsed="settingStore.inlineCollapsed"
        mode="inline"
        :style="{ width: settingStore.menuW + 'px' }"
        :open-keys="settingStore.openKeys"
        theme="dark"
        @click="handleClick"
      >
        <template v-for="item in permissionStore.currentRoutes" :key="item.path">
          <template v-if="item.children">
            <sub-menu :key="item.path" :menu-info="item" />
          </template>
          <template v-else>
            <a-menu-item v-if="!item?.meta?.hidden" :key="item.path">
              <template #icon>
                <component :is="item.meta.icon as string" v-if="item.meta && item.meta.icon"></component>
              </template>
              <span>{{ item.meta ? item.meta.title : item.name }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </component>
  </div>
</template>

<script setup lang="ts">
import permission from "~/store/permission";
import setting from "~/store/setting";
// import constantRoutes from "~/router/constantRoutes/index";
import SubMenu from "./components/sub-menu.vue";
import { getOpenKeys } from "../utils/router";

let route = useRoute();
let go = useGo();
let settingStore = setting();
let permissionStore = permission();
let { logo } = useLocalImage();

// let showTabs = computed(() => !constantRoutes.some(item => item.path === route.path));
getOpenKeys();

let selectedKeys = computed(() => {
  return [route.meta.parentRoute || route.path];
});

useResizeObserver(
  document.body,
  useThrottleFn(entries => {
    const entry = entries[0];
    settingStore.onlistenBodyResize(entry.contentRect);
  }, 20)
);

// getOpenKeys();

let handleClick = ({ key = "" }: { key: string }) => {
  go(key);
};
</script>

<script lang="ts">
import LayoutSlider from "./components/layout-slider.vue";
import DrawerBox from "./components/drawer-box.vue";

export default defineComponent({
  components: {
    LayoutSlider,
    DrawerBox,
  },
});
</script>

<style lang="less" scoped>
.slide-menu {
  background-color: var(--slider-bg-color);
}
</style>
