<template>
  <div>
    <button class="test-button" @click="handleClick">按钮</button>
  </div>
</template>

<script>
export default {
  name: "comButton",
  methods: {
    handleClick () {
      window.console.log('comButton test!');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
