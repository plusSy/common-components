### 基本用法

- 前端元素权限指令，根据后端声明的权限 ID，判断当前 dom 是否显示

```html
<template>
  <el-button v-permission="'rightId'">编辑</el-button>
</template>
```

### 权限点创建入口

1. BOM 入口 https://bom-test.ocj.com.cn/ucm/index.html#/acl/featurePermission
2. CPM 入口 http://cpm-test.ocj.com.cn/partner/index.html#/menuManage
3. 进入相关页面，新建权限点，菜单类型：页面元素

---

{docsify-updated}
