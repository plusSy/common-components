<template>
  <div class="listBlock pl-16 pr-16">
    <el-autocomplete
      v-model="queryStringEnter"
      class="inline-input searchList"
      :fetch-suggestions="querySearch"
      placeholder="名称"
      @select="handleSelect"
      value-key="propName"
      suffix-icon="el-icon-search"
      size="small"
    ></el-autocomplete>
    <div class="mt-20 pl-4 searchItemList">
      <span>规格属性</span>
      <div
        v-for="(propItem, sizeIndex) in propSizeList"
        :key="'prop-size' + sizeIndex"
        :class="propItem.id === current ? 'activeSelect' : 'curser'"
        @click="select(propItem, sizeIndex)"
      >
        <el-tooltip
          v-if="propItem.propName.length > 12"
          :content="propItem.propName"
          placement="top"
        >
          <span class="searchItemList-text text-truncate d-inline-block">{{ propItem.propName }}</span>
        </el-tooltip>
        <span
          v-else
          class="searchItemList-text text-truncate d-inline-block"
        >{{ propItem.propName }}</span>
        <span class="float-right o-icon">&#xe63e;</span>
      </div>
      <span>普通属性</span>
      <div
        v-for="(propItem, commonIndex) in propCommonList"
        :key="'prop-common' + commonIndex"
        :class="propItem.id === current ? 'activeSelect' : 'curser'"
        @click="select(propItem, commonIndex)"
      >
        <el-tooltip
          v-if="propItem.propName.length > 12"
          :content="propItem.propName"
          placement="top"
        >
          <span class="searchItemList-text text-truncate d-inline-block">{{ propItem.propName }}</span>
        </el-tooltip>
        <span
          v-else
          class="searchItemList-text text-truncate d-inline-block"
        >{{ propItem.propName }}</span>
        <span class="float-right o-icon">&#xe63e;</span>
      </div>
    </div>
  </div>
</template>
<script>
import mutation from "./store";
export default {
  props: {
    propValueUrl: String
  },
  data() {
    return {
      queryStringEnter: ""
    };
  },
  computed: {
    propSizeList() {
      return mutation.get().propList.filter(e => e.propType);
    },
    propCommonList() {
      return mutation.get().propList.filter(e => !e.propType);
    },
    current() {
      return mutation.get().propId;
    }
  },
  mounted() {
    // if (store.propList.length > 0) {
    //     this.select(store.propList[0]);
    // }
  },
  methods: {
    // 搜索
    querySearch(queryString, cb) {
      let suggesList = mutation.get().propList,
        results = queryString
          ? suggesList.filter(this.createFilter(queryString))
          : suggesList;
      cb(results);
    },
    // 根据搜索过滤
    createFilter(queryString) {
      return suggesList => {
        return (
          suggesList.propName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    // 搜索过滤后选择
    handleSelect(item) {
      this.select(item);
    },
    select(item) {
      let store = mutation.get();
      // 如果已选中，不做处理
      if (store.propId === item.id) {
        return;
      }
      // current 做选中定位
      store.propId = item.id;
      // 拿到当前点击的option的index
      // 更新面包屑组件的list
      // 清除已选的子级类目和已选的子级数据，重新加载下级
      store.selectedCategory.splice(store.selectedCategory.length);
      store.selectedProp = [
        {
          id: item.propId,
          name: item.propName
        }
      ];
      store.selectedPropValue = [];
      this.$emit("select", {
        category: store.selectedCategory,
        prop: store.selectedProp,
        propValue: []
      });
      this.$httpGetPropValue(item.propId);
    },
    $httpGetPropValue(id) {
      let store = mutation.get();
      ocj.post({
        url: this.propValueUrl,
        data: {
          categoryId: store.categoryCurrent,
          propId: id
        },
        success: res => {
          store.propValueList = res || [];
        }
      });
    }
  }
};
</script>
