<template>
  <div class="listBlock pl-16 pr-16">
    <el-autocomplete
      v-model="queryStringEnter"
      class="inline-input searchList mt-24"
      :fetch-suggestions="querySearch"
      placeholder="名称"
      @select="handleSelect"
      value-key="name"
      suffix-icon="el-icon-search"
      size="small"
    ></el-autocomplete>
    <div class="mt-20 pl-4 searchItemList">
      <div
        v-for="(item, itemIndex) in data"
        :key="'search' + itemIndex"
        @click="select(item)"
        @dblclick.stop.prevent="dblclick"
        :class="current.includes(item.id) ? 'activeSelect' : 'curser'"
      >
        <!--        {{current && current.id === item.id}} + {{item.id}}-->
        <el-tooltip v-if="item.name.length > 12" :content="item.name" placement="top">
          <span class="searchItemList-text text-truncate d-inline-block">{{ item.name }}</span>
        </el-tooltip>
        <span v-else class="searchItemList-text text-truncate d-inline-block">{{ item.name }}</span>
        <span class="float-right o-icon" v-if="item.leafYn === 0">&#xe63e;</span>
      </div>
    </div>
  </div>
</template>
<script>
import mutation from "./store";
export default {
  props: {
    url: String,
    propUrl: String,
    marketId: [Number, String],
    index: Number,
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      queryStringEnter: "",
      isLoading: false,
      suggesList: []
    };
  },
  computed: {
    current() {
      // return this.getCurrentCategory();
      return mutation.get().selectedCategory.map(e => e.id);
    }
  },
  mounted() {
    let current = this.getCurrentCategory();
    if (current) {
      this.loadCategory(current);
    }
  },
  methods: {
    dblclick() {},
    getCurrentCategory() {
      let data = mutation.get(),
        selected = data.selectedCategory;
      if (selected.length < this.index) {
        return null;
      }
      return selected[this.index];
    },
    // 搜索
    querySearch(queryString, cb) {
      let suggesList = mutation.get().allOptions[this.index],
        results = queryString
          ? suggesList.filter(this.createFilter(queryString))
          : suggesList;
      cb(results);
    },
    // 根据搜索过滤
    createFilter(queryString) {
      return suggesList => {
        return (
          suggesList.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    // 搜索过滤后选择
    handleSelect(item) {
      this.select(item);
    },
    async loadCategory(item) {
      this.isLoading = true;
      let result = await ocj.post({
        url: this.url,
        data: {
          parentId: item.id,
          marketId: this.marketId || 1,
          hiddenDisable: 1
        }
      });
      this.isLoading = false;
      if (result && result.length > 0) {
        let allOptions = mutation.get().allOptions;
        allOptions.push(result);
      }
    },
    async select(item) {
      if (this.isLoading) {
        return;
      }
      let store = mutation.get();
      // 不存在子级类目时，点击当前选中的类目也要刷新数据
      // if (store.categoryCurrent === item.id && this.index < store.categoryList.length - 1) {
      //     return;
      // }
      store.categoryCurrent = item.id;
      const length = store.allOptions.length;
      if (this.index < length - 1) {
        store.allOptions.splice(this.index + 1);
      }
      if (item.leafYn !== 0) {
        store.selectedCategory.splice(this.index);
        store.selectedCategory.push(item);
        store.categoryIndex = this.index;
        store.propValueList = [];
        store.selectedPropValue = [];
        store.propId = "";
        this.$emit("select", {
          category: store.selectedCategory,
          prop: [],
          propValue: []
        });
        if (this.propUrl) {
          let result = await ocj.post({
            url: this.propUrl,
            data: {
              categoryId: item.id
            }
          });
          const data = result || [];
          store.propList = data.filter(e => e.propId > 2);
        }
        return;
      }
      store.propList = [];
      store.propValueList = [];
      store.selectedProp = [];
      store.selectedPropValue = [];
      store.selectedCategory.splice(this.index);
      store.selectedCategory.push(item);
      this.$emit("select", {
        category: store.selectedCategory,
        prop: [],
        propValue: []
      });
      await this.loadCategory(item);
    }
  }
};
</script>
