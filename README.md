# common-components

## 快速上手
如何在项目中快速使用 common-components.

## 开发依赖
+ verdaccio [组件库](https://verdaccio.org/zh-CN/)
  + 组件库
  + 本地服务地址: http://10.22.1.30:4873
+ vue-cli@3 [配置参考文档](https://cli.vuejs.org/zh/config/)
  + 项目脚手架生成工具
+ webpack [配置参考文档](https://webpack.js.org/concepts/)
  + 文件打包配置
+ docsify [开发文档](https://docsify.js.org/#/)
  + 文档工具
+ socket.io [开发文档](https://socket.io/docs/)
  + 文档上载依赖
+ elementUI [依赖文档](https://element.eleme.io/#/zh-CN)

## 脚本命令
通过脚本进行项目开发/打包/上传/
```js
"serve": "vue-cli-service serve" // example 开发
"build": "vue-cli-service build", // example 打包
"doc": "webpack && docsify serve ./docs", // doc 开发
"deploy": "webpack && node examples/assets/js/deploy.js", // doc 打包并发布
"init": "npm install --registry http://10.22.1.30:4873", // 项目依赖安装
"pub": "npm publish --registry http://10.22.1.30:4873" // npm 发包
```

## 引入使用
组件库的使用分为全量引用以及按需加载.
### 组件库加载
```js
1. npm install common-components --save --registry http://10.22.1.30:4873
2. npm install --registry http://10.22.1.30:4873
```
### 全量引入
```js
import Vue from 'vue';
import comUI from 'common-components';
import App from './App.vue';

Vue.use(comUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
### 按需引入
我们可以只引入需要的组件，以达到减小项目体积的目的。
```js
import Vue from 'vue';
import { dialog, comButton } from 'common-components';
import App from './App.vue';

Vue.use(dialog);
Vue.use(comButton);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 完整组件/插件列表和引入方式

完整组件列表以项目根目录`./main.js` 为准.

```js
import Vue from 'vue';

import {
  dialog,
  comButton
}  from 'common-components';

// plugins
Vue.use(dialog);

// components
Vue.use(comButton);

```


## 目录结构
```js
+-- components                  // 组件目录
| +-- packages
| | +-- comButton               // 按钮
| +-- index.js                  // 引入注册文件
+-- docs                        // 文档目录
| +-- _icon
| +-- _media
| +-- className                 // 公共样式
| +-- comcontent                // 公共内容
| +-- components                // 公共组件
| +-- plugins                   // 公共插件
| +-- vendor
| +-- _coverpage.md
| +-- _navbar.md                // 头部菜单配置
| +-- _sidebar.md               // 左侧菜单配置
| +-- .nojekyll                 // 用于阻止 GitHub Pages 会忽略掉下划线开头的文件
| +-- icon.html                 // icon入口文件
| +-- index.html                // 入口文件
| +-- README.md                 // 会做为主页内容渲染
+-- examples                    // 样例目录
| +-- assets                    // 静态资源
| | +-- js
| | | +-- client.js
| | | +-- deploy.js             // socket.io 上传
| | +-- logo.png
| +-- components
| +-- App.vue
| +-- main.js
+-- plugins                     // 插件目录
| +-- dialog                    // 弹出层
| +-- index.js                  // 引入注册文件
+-- public
| +-- favicon.ico
| +-- index.html
+-- utils                       // function & methods 目录(优化到方法库)
| +-- filter.js
| +-- pubFn.js
| +-- storge.js
| +-- valid.js
+-- .editorconfig
+-- .gitignore
+-- babel.config.js
+-- main.js                     // 主文件
+-- package-lock.json
+-- package.json
+-- README.md
+-- vue.config.js               // vue-cli@3 配置
+-- webpack.config.js           // doc 打包配置
```
