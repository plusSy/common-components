<template>
  <div class="listBlock pl-16 pr-16">
    <el-autocomplete
      v-model="queryStringEnter"
      class="inline-input searchList"
      :fetch-suggestions="querySearch"
      placeholder="名称"
      @select="handleSelect"
      suffix-icon="el-icon-search"
      size="small"
    ></el-autocomplete>
    <div class="mt-20 pl-4 searchItemList">
      <div
        v-for="(item, itemIndex) in propValueList"
        :key="'search' + itemIndex"
        @click="select(item, itemIndex)"
        :class="current[0] && current[0].includes(item.valueId) ? 'activeSelect' : 'curser'"
      >
        <el-tooltip v-if="item.value.length > 12" :content="item.value" placement="top">
          <span class="searchItemList-text text-truncate d-inline-block">{{ item.value }}</span>
        </el-tooltip>
        <span v-else class="searchItemList-text text-truncate d-inline-block">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import mutation from "./store";
export default {
  props: {
    index: Number
  },
  data() {
    return {
      queryStringEnter: ""
    };
  },
  computed: {
    propValueList() {
      return mutation.get().propValueList;
    },
    current() {
      return mutation.get().selectedPropValue.map(e => e.id);
    }
  },
  mounted() {},
  methods: {
    // 搜索
    querySearch(queryString, cb) {
      let suggesList = this.propValueList,
        results = queryString
          ? suggesList.filter(this.createFilter(queryString))
          : suggesList;
      cb(results);
    },
    // 根据搜索过滤
    createFilter(queryString) {
      return suggesList => {
        return (
          suggesList.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 搜索过滤后选择
    handleSelect(item) {
      this.select(item);
    },
    select(item) {
      let store = mutation.get();
      if (this.current[0] && this.current[0].includes(item.valueId)) {
        // this.current = this.current.filter(e => e !== item.id);
        store.selectedPropValue = store.selectedPropValue.map(e => {
          let id = e.id.split("，").filter(ele => ele !== String(item.valueId)),
            name = e.name.split("，").filter(ele => ele !== item.value);
          return {
            id: id.length > 0 ? id.join("，") : "",
            name: name.length > 0 ? name.join("，") : ""
          };
        });
      } else {
        // this.current.push(item.id);
        if (store.selectedPropValue.length === 0) {
          store.selectedPropValue.push({
            id: String(item.valueId),
            name: item.value
          });
        } else {
          store.selectedPropValue = store.selectedPropValue.map(e => {
            return {
              id: !e.id ? String(item.valueId) : e.id + "，" + item.valueId,
              name: !e.name ? item.value : e.name + "，" + item.value
            };
          });
        }
      }
      this.$emit("select", {
        category: store.selectedCategory,
        prop: store.selectedProp,
        propValue: store.selectedPropValue
      });
    }
  }
};
</script>
