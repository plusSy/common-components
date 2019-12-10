
# dialog基本展示  {docsify-ignore-all}

---


## 基本dialog用法
### dialog的实例

```html
/*vue*/
<template>
    <div>
        <el-button @click="invokeDialog">显示dialog</el-button>
    </div>
</template>

<script>
// import anyDialog from 'anyDialog';
export default {
    data() {
        return {
            dialogComponent: null,
            dialogOptions: {}
        }
    },
    created() {
        /**
         * 弹窗事例，
         * 推荐使用 import 导入“弹窗组件”
         * e.g. this.dialogComponent = vue.extend(anyDialog);
         */
        this.dialogComponent = vue.extend({
            template: `<el-dialog
                        :visible="visible"
                        :title="title"
                        :before-close = "closefy"
                    >
                    <span>{{content}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="closefy">取 消</el-button>
                        <el-button type="primary" @click="closefy">确 定</el-button>
                    </span>
                    </el-dialog>`,
            data() {
                return {
                    content: "这是一个弹窗测试！",
                    dialog: null
                }
            },
            props: {
                title: String
            },
            methods: {
                closefy() {
                    this.close();
                }
            }
        });
        /**
         *  dialog组件的props可以通过dialogOptions传递
         **/
        this.dialogOptions = {
            title: '提示弹窗'
        };

    },
    methods: {
        invokeDialog() {
            // 初始化业务弹窗实例
            this.dialog = this.$dialog.createDialog(this.dialogComponent,this.dialogOptions);
            // 显示当前业务弹窗
            this.dialog.open();
        }
    }
}
</script>
```

> 此组件依赖 element-ui dialog，dialogOptions 参数同 el-dialog prpos。例 { title: '提示' }

<div id="attributes" class="api-wrap mt-24">
	<div class="api-wrap mt-24">
		<h3>属性</h3>
	   <el-table :data="apiDataAttr" class="w-100 m-0">
            <el-table-column prop="params" label="参数" width="140"></el-table-column>
            <el-table-column prop="type" label="类型" width="140"></el-table-column>
            <el-table-column prop="describe" label="说明"></el-table-column>
	    </el-table>
	</div>

</div>

<div id="events" class="api-wrap mt-24">
    <div class="api-wrap mt-24">
        <h3>事件</h3>
       <el-table :data="apiDataEvents" class="w-100 m-0">
            <el-table-column prop="params" label="事件名称" width="140"></el-table-column>
            <el-table-column prop="describe" label="说明"></el-table-column>
        </el-table>
    </div>

</div>

<script>
new Vue({
    el: '#attributes',
    data: {
        apiDataAttr: [
            {
                params: 'dialogComponent',
                type: 'Component',
                describe: '当前 dialog 实例组件'
            },
            {
                params: 'dialogOptions',
                type: 'Object',
                describe: '当前 dialog 属性参数配置，同 element-ui dialog 属性一致'
            },
        ]
    }
})
new Vue({
    el: '#events',
    data:  {
      apiDataEvents : [
        {
          params: 'open',
          describe: '打开dialog，见示例代码 e.g. this.dialog.open();',
          cbparams: '',
        },
        {
          params: 'close',
          describe: '关闭dialog，见示例代码 e.g. this.dialog.close();',
          cbparams: '',
        },
        {
          params: 'isShowing',
          describe: '当前dialog状态',
          cbparams: '',
        }
      ]
    }
});
</script>

