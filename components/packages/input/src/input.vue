<template>
  <div class="input-wrap">
    <input class="input-default" v-model="val" />
  </div>
</template>

<style lang="scss" scoped>
.input-default{
  min-width: 200px;
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
  name: "ocjInput",
  data () {
    return {
      val: ''
    }
  },
  watch: {
    val (val) {
       this.$emit('input', val)
    }
  }
}
</script>>