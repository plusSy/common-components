
---
### 基本imgEdit用法
### 使用前安装插件：npm install vue-cropper/yarn add vue-cropper
#### 默认不包括弹窗，使用时需要配合使用vue-dialog使用，使用dialog包裹该组件即可

```vue 
  <template>
        <div id="app">
    <el-button type="text" @click="dialogTableVisible = true">截图</el-button>
    <el-dialog
      :visible.sync="dialogTableVisible"
      width="525px"
      :close-on-click-modal="model"
      :modal="model"
      :show-close="model"
    >
      <img-edit :imgUrl="imgUrl" v-on:newImgUrl="newImgUrlFun" v-on:refreshCrop="refreshCropFun" class="hello"></img-edit>
    </el-dialog>
    </div>
    </template>
    <script>
        import imgEdit from "@c/imgEdit.vue";
      export default {
        data() {
          return {
            dialogTableVisible: false,
            dialogFormVisible: false,
            model: false,
            imgUrl:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1004193740,755429050&fm=26&gp=0.jpg"
          };
        },
        components: {
          imgEdit
        },
        //回调，返回的参数是_data={
            cropWidth:剪辑框宽度
            scale:放大倍数
            oX:左上角X坐标
            oY:左上角Y坐标
            rotate:旋转角度
        }
        methods: {
          //确认
          newImgUrlFun(data) {
            console.log(data);
          },
          //取消
          refreshCropFun(){
            console.log('取消')
          }
        }
      };
    </script>
```



---
 {docsify-updated} 


