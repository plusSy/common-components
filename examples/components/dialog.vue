<template>
  <div>
    <button @click="invokeDialog">invokeDialog</button>
  </div>
</template>

<script>
import vue from 'vue';
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