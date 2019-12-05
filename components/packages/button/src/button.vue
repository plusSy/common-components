<template>
  <div class="button-wrap">
    <button class="button-default" @click="handleClick">按钮</button>
  </div>
</template>

<style lang="scss" scoped>
.button-default{
  outline: none;
  border: 1px solid #000;
  padding: 4px 16px;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<script>
export default {
  name: "ocjButton",
  methods: {
    handleClick () {
      window.console.log('button click!')
    }
  }
}
</script>>