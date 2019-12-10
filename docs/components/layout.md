

Layout 主要分为 Sidebar、Header、页签/Tab、Main 四个部分:


| 子组件 | 功能 | 数据源 |
| -- | -- | -- |
| Sidebar | 展示 Logo, 系统名称, 菜单, 系统列表面板 | ACL |
| Header | 展示页面标题, 消息提醒, 用户信息, 以及全屏切换, 锁屏, 登出等功能 | UC |
| 页签/Tab | 监听路由自动添加页签 | UC |
| Main | 结合 keep-alive 和 router-view 保留页面状态 | UC |





注：目前 portal 提供了 `c-portal-bo-layout` 和 `c-portal-layout` 两个组件, 区别在于：`c-portal-bo-layout` 会自动从服务端同步数据, 统一处理登出/锁屏事件, 另外也增加了 dev 模式, 支持手动传入 menus 等数据。

## 基本用法

```vue
<template>
  <c-portal-bo-layout app-code="ACL&UC" :menus="menus" >
    <!-- 右上角个人中心下拉框支持slot传入，只支持el-dropdown-item元素
    <template v-slot:dropdownItem>
        <div>
            <el-dropdown-item icon="el-icon-monitor" command="lock">测试1</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout">测试2</el-dropdown-item>
        </div>
    </template> -->
  </c-portal-bo-layout>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      // 线上环境使用
      appCode: "WF&FM"
    };
  },
  created() {
    if (ocj.isDev) {
      this.menus = require("./sideMenu").default;
    }
  }
};
</script>
```


## 属性

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| appCode | 应用唯一标识, 与 acl 菜单接口结合使用, 开发模式可以任意设置 | String |  |
| devMode | 是否开启开发模式 | Boolean | ocj.isDev |
| menus | 左侧菜单数据, 结合 devMode=true 使用 | Array | [] |
| type | 当前系统标识 | String | bom |


## 准备接入

为了使用 Layout 中的页签和路由 keep-alive 功能, 需要以下配置:

### route 配置

需要配置 name, meta 参数:

- name: 用于 keep-alive 的 include 参数, 缓存页面状态.

- meta.title: 用于 header 和页签.

- meta.noCache: 默认缓存所有路由, 若你不希望路由被缓存, 可以设置 `noCache: true`

```js
[
  {
    path: "/user/users",
    component: pages.users,
    name: "page-users",
    meta: {
      title: "账号列表"
    }
  }
];
```

### Menu 配置（本地开发）

url 格式: path + hash.

> 菜单的 click handler:
>
> 1. 首先解析 url 参数, 获取 path 与 hash 部分;
> 2. 判断 path 与当前页面的 path 是否一致:
>    - 若一致, 则认为是应用内菜单, 执行: `$route.push(hash)`;
>    - 否则, 应用外菜单, 执行 `window.location.href = url`;

```js
[
  {
    code: "menu_poststree",
    name: "岗位树设置",
    type: "menu",
    icon: "s-home",
    parentCode: "WF&FM",
    url: "/fm/index.html#/poststree"
  },
  {
    code: "any_menu_group",
    name: "菜单组",
    type: "menu_group",
    icon: "s-home",
    parentCode: "WF&FM",
    chidlren: [
        ...
    ]
  }
];
```

注意：传入 `c-portal-bo-layout` 的 menus 是数组。

### Main

Main 部分的组件结构如下：

```html
<el-scrollbar>
  <el-main>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </el-main>
</el-scrollbar>
```

注意: el-main 被包裹在 el-scrollbar 中, **el-main 不会自动撑开**


---
 {docsify-updated} 



