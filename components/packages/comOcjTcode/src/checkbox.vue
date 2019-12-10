<template>
  <el-checkbox-group v-bind="$attrs" :value="result" v-on="$listeners">
    <el-checkbox v-for="item in items" :key="item.value" :label="item.value">{{item.name}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
    props: ["items", "value"],
    computed: {
        result() {
            return this.value ? this.value : [];
        }
    }
};
</script>