<template>
  <a-button class="mx-auto mb-10" @click="toggleDark">222</a-button>
</template>
<script lang="ts" setup>
let isDark = useDark();

const toggleDark = useToggle(isDark);
</script>
<script lang="ts">
export default defineComponent({
  name: "Test",
});
</script>
