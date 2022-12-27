<template>
  <div class="wrapper">
    <div class="box1">One</div>
    <div class="box2">Two</div>
    <div class="box3">Three</div>
    <div class="box4">Four</div>
    <div class="box5">Five</div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "Test",
});
</script>

<style lang="less">
.wrapper {
  display: grid;
  grid-auto-rows: 100px;
  div {
    background-color: green;
  }
}

.box1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

.box2 {
  grid-column-start: 1;
  grid-row-start: 3;
  grid-row-end: 5;
}
</style>
