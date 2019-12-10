<template>
  <el-radio-group v-bind="$attrs" :value="value" v-on="$listeners">
    <el-radio v-for="item in items" :key="item.value" :label="item.value">{{item.name}}</el-radio>
  </el-radio-group>
</template>
<script>
export default {
    props: ["items", "value"]
};
</script>