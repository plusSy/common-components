<template>
  <div class="search-select d-flex flex-ju-al-center mb-20" v-clickoutside="handleClose">
    <div class="search-input">
      <el-input
        placeholder="请输入类目关键字"
        clearable
        v-model="keyword"
        class="mr-20 flex-auto"
        @input="$onChange"
        @focus="$onFocus"
        @clear="$onClear"
      ></el-input>
    </div>
    <div
      v-show="showTree && data.length > 0"
      class="select-tree pl-24 pt-12 pr-24 pb-24"
      style="width: 100%;"
    >
      <el-tree
        :props="treeProps"
        :expand-on-click-node="false"
        @node-click="$selected"
        :data="data"
        default-expand-all
      />
    </div>
  </div>
</template>
<script>
function getPath(node, result) {
  let parent = node.parent;
  if (parent === null || parent.level === 0) {
    return result;
  }
  result.unshift(parent.data);
  return getPath(parent, result);
}
export default {
  props: ["market", "url"],
  data() {
    return {
      data: [],
      keyword: "",
      showTree: false,
      treeProps: {
        label: "name",
        // eslint-disable-next-line no-unused-vars
        leafYn: (data, node) => {
          if (data.leafYn === 1) {
            return true;
          }
          return false;
        }
      }
    };
  },
  methods: {
    // 搜索框change事件
    async $onChange(val) {
      if (!val) {
        return (this.data = []);
      }
      // eslint-disable-next-line no-undef
      let result = await ocj.post({
        url: this.url,
        data: {
          marketId: this.market,
          searchContent: val
        }
      });
      this.data = result || [];
    },
    // 绑定的指令事件
    handleClose() {
      this.showTree = false;
    },
    // 搜索框获取焦点，展示下拉树
    $onFocus() {
      this.showTree = true;
    },
    // eslint-disable-next-line no-unused-vars
    $selected(data, node, com) {
      // if (data.children) {
      //     return;
      // }
      let result = [];
      result.push(data);
      result = getPath(node, result);

      this.$emit("select", {
        categoryList: result,
        propList: [],
        propValueList: []
      });
      this.showTree = false;
    },
    // 搜索框清除
    $onClear() {
      this.showTree = false;
    }
  }
};
</script>
