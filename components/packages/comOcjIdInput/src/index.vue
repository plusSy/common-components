<template>
    <el-input v-model="values" v-bind="$attrs" v-on="$listeners" placeholder="请输入" autocomplete="off" @change="$emit('input', values)"></el-input>
</template>
<script>
export default {
    name: "comOcjIdInput",
    inheritAttrs: false,
    props: {
        value: [Number, String]
    },
    data() {
        return {
            values: this.value
        };
    },
    watch: {
        value(val) {
            if (!val) {
                this.values = val;
            }
        },
        values(val, oldVal) {
            // 改动组件之前麻烦弄清楚需求再进行改动
            if (val !== '') {
                this.values = Number(val) ? String(val) : oldVal;
            } else {
                this.values = '';
            }
            this.$emit('input', val);
        }
    }
};
</script>
