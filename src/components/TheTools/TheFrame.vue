<script setup lang="ts">
</script>

<template>
  <div class="div-border"></div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-border {
  width: 32px;
  height: 32px;
  border: 1px solid #dedee4;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  position: relative;
  right: 10px;
  transition: color 0.2s, border 0.2s;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
  }

  &:hover {
    color: red;
    border: 1px solid red;
  }
}
</style>