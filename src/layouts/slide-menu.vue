<template>
  <div class="slide-menu">
    <div class="slide-blank" :style="{ width: settingStore.layoutW + 'px' }"></div>
    <component :is="settingStore.mode === 'pc' ? 'LayoutSlider' : 'DrawerBox'">
      <div class="header center-flex">
        <Logo />
        <div v-if="!settingStore.inlineCollapsed" font-500 text-20>无他社区</div>
      </div>
      <a-menu
        :selected-keys="selectedKeys"
        :inline-collapsed="settingStore.inlineCollapsed"
        mode="inline"
        :style="{ width: settingStore.menuW + 'px' }"
        :open-keys="settingStore.openKeys"
        @click="handleClick"
      >
        <template v-for="item in routes" :key="item.path">
          <template v-if="item.children">
            <sub-menu :key="item.path" :menu-info="item" />
          </template>
          <template v-else>
            <a-menu-item :key="item.path">
              <template #icon>
                <component :is="$icons[item.meta.icon as string]" v-if="item.meta && item.meta.icon"></component>
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
import SubMenu from "./components/sub-menu.vue";
import Logo from "../components/logo.vue";
import { getOpenKeys } from "../utils/index";

let route = useRoute();
let go = useGo();
let settingStore = setting();
let permissionStore = permission();
let instance: any = getCurrentInstance();

let selectedKeys = computed(() => [route.path]);
let { currentRoutes: routes } = permissionStore;
let $icons = instance.proxy.$icons;

useResizeObserver(
  document.body,
  useThrottleFn(entries => {
    const entry = entries[0];
    settingStore.onlistenBodyResize(entry.contentRect);
  }, 20)
);

getOpenKeys();

let handleClick = ({ key = "" }: { key: string }) => {
  go({ path: key });
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
  .slide-blank {
    height: 100%;
    flex-shrink: 0;
  }
  .header {
    height: 64px;
    transition: width 0.2s linear;
  }
}
</style>
