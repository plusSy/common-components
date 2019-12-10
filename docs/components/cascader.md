### cascader 级联框
---
#### 级联框的用法

```html
/*vue*/
<template>
  <div>
    <com-ocj-cascader v-model="cascaVal" ></com-ocj-cascader>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        cascaVal: []
      }
    }
  }
</script>

```


### 属性

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| value/v-mode | 绑定值 | Array | [] |
| checkStrictly | 是否严格的遵守父子节点不互相关联 | Boolean | false |
| leaf | 向下筛选层级 | String `or` Number | 4 |
| multiple | 是否多选 | Boolean | false |
| BASEURL | 后台路径 | String | '/api/bom/vendor/merchantQuery/queryAddress' |
| disbled | 是否禁用 | Boolean | false |
| placeholder | 占位符 | String | '请选择...' |
| includeCountry | 是否包含国家 | Boolean | false |




---
 {docsify-updated} 

