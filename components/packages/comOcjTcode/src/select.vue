<template>
  <el-select v-bind="$attrs" :value="value" v-on="$listeners">
    <el-option v-for="item in items" :key="item.value" :label="item.name" :value="item.value" />
  </el-select>
</template>
<script>
export default {
    props: ["items", "value"]
};
</script>