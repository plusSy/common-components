
### 基本 tcode 用法

```html
/*vue*/
<template>
  <div>
    <strong>select模式</strong>
    <com-ocj-tcode
      type-code="product"
      style="width:300px"
      v-model="product"
      url="http://yapi.devops.erp.ocj.com.cn/mock/346/api/tcode/findByTypeCode"
    />
    {{product}}
    <br />
    <br />
    <strong>checkbox模式</strong>
    <com-ocj-tcode
      style="width:300px"
      type-code="checkobox"
      type="checkbox"
      v-model="checkobox"
      url="http://yapi.devops.erp.ocj.com.cn/mock/346/api/tcode/findByTypeCode"
    />
    {{checkobox}}
    <br />
    <br />
    <strong>radiobox模式</strong>
    <com-ocj-tcode
      style="width:300px"
      type-code="order"
      type="radiobox"
      v-model="order"
      url="http://yapi.devops.erp.ocj.com.cn/mock/346/api/tcode/findByTypeCode"
    />
    {{order}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: "",
      checkobox: null,
      order: null
    };
  }
};
</script>
```



### 属性

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| type-code | 业务type名称 | String |  |
| value/v-model | 绑定值 | String `or` Array |  |
| type | 组件类型 | String | select, checkbox, radiobox |
| url | 数据接口地址，非必填 | String | /api/tcode/findByTypeCode |





---
 {docsify-updated} 

