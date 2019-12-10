<template>
  <component
    v-bind="$attrs"
    :value="result"
    @input="input"
    v-on="$listeners"
    :items="items"
    :is="com"
  />
</template>
<script>
import Store from "./store";
import Checkbox from "./checkbox";
import Radiobox from "./radiobox";
import Select from "./select";

export default {
    name: "comOcjTcode",
    props: ["typeCode", "value", "type", "url"],
    computed: {
        items() {
            let list = Store.get(this.typeCode, this.url);
            return list;
        },
        com() {
            if (this.type === "checkbox") {
                return Checkbox;
            }
            if (this.type === "radiobox") {
                return Radiobox;
            }
            return Select;
        }
    },
    data() {
        return { result: null };
    },
    created() {
        this.result = this.value;
    },
    methods: {
        input(value) {
            this.result = value;
            this.$emit("input", value);
        }
    }
};
</script>