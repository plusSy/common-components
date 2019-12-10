### tree 类目树

---


```html
/*vue*/
<template>
  <div>
    <com-ocj-tree
      ref="tree"
      :name="name"
      :check-strictly="true"
      :showCheckbox="true"
      :http_treedata="$httpTreeData"
    />
    <span @click="refresh">添加</span>
    <span @click="remove">删除</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "hello",
      parentId: "",
      searchContent: "",
      queryData: {
        marketId: 1,
        hiddenDisable: 1,
        parentId: 0
      }
    };
  },
  methods: {
    refresh() {
      let id = parseInt(Math.random() * 10000);
      this.$refs.tree.refresh(id);
    },
    remove() {
      this.$refs.tree.remove();
    },
    async $httpTreeData(func, node) {
      let url =
        "http://yapi.devops.erp.ocj.com.cn/mock/219/api/bom/category/CategoryQueryFacade/queryTreeList";
      await ocj.post({
        url: url, //http请求的URL
        data: Object.assign(this.queryData, {
          parentId: this.parentId,
          searchContent: this.searchContent // 查找内容
        }), //请求的参数
        //请求成功回调函数,
        success: res => {
          func(res || [], node);
        }
      });
    }
  }
};
</script>

```


---
 {docsify-updated} 


