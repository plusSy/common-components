### 基本Export用法

#### Export默认用法

```vue
<template>
    <c-portal-export businessType="ex_test"></c-portal-export>
</template>
<script>
export default {
    name: 'export',
}
</script>
```


### 属性

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| text | 按钮文案 | String | '批量导出' |
| params | 各业务域要传递的查询参数 | Object | {} |
| businessType | 业务类型，必传，由各业务域自己获取传入 | String | |





### Export组件源码

```vue
<template>
    <div class="component-Export">
        <div @click="openDialog">
            <!-- 样式可以自由定义，默认为按钮 -->
            <slot>
                <el-button type="primary">{{text}}</el-button>
            </slot>
        </div>
        <el-dialog class="export-dialog" :append-to-body="true" title="修改文件名称" width="480px" :visible="dialogVisible" :before-close="handleClose">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="文件名称" prop="fileName" label-width="84px">
                    <el-input maxlength="42" class="update-name_input" v-model="form.fileName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="submitDialog">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { exportFile } from '@services/fileManage';

export default {
    name: 'com-Export',
    data() {
        return {
            dialogVisible: false,
            form: {
                fileName: ''
            },
            rules: {
                fileName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\.]+$/, message: '可包含中文、英文、数字', trigger: 'blur' }
                ],
            }
        };
    },
    props: {
        text: {
            type: String,
            default: '批量导出'
        },
        // 业务方在调用组件之前的校验，返回true，可弹窗
        // 业务类型
        businessType: {
            type: String,
            required: true
        },
        // 查询参数
        params: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    methods: {
        // 随机生成文件名
        renderFileName() {
            const random = String(Math.random()).slice(5,8),
                date = Date.now();
            this.form.fileName = `File_${date}${random}.xlsx`;
        },

        openDialog() {
            // 通过校验即可打开弹窗, 随机生成文件名
            this.renderFileName();
            this.dialogVisible = true;
        },

        // 提交弹窗
        async submitDialog() {
            this.$refs.form.validate((valid) => {
                if(valid) {
                    this.submitForm();

                }else {
                    return false;
                }
            });

        },

        async submitForm() {
            const result = await exportFile({
                params: JSON.stringify(this.params),
                businessType: this.businessType,
                tenantId: 1,
                fileName: this.form.fileName
            });
            if(result) {
                this.dialogVisible = false;
                window.location.href = '//ucm-test.ocj.com.cn/fm/index.html#/filemanage?activeTab=export';
            }else {
                this.$message({
                    type: 'error',
                    message: result.message
                });
            }
        },

        handleClose() {
            this.dialogVisible = false;
            this.$refs.form.resetFields();
        }
    }
};
</script>

<style scoped lang='scss'>
    .export-dialog {
        .el-dialog__body {
            padding: 28px 0 18px 18px
        }
        .el-form-item__label::before {
            margin-left: 0!important
        }
        .el-form-item__label {
            padding: 0;
            text-align: left;
        }
        .update-name_input {
            width: 350px;
        }
        .el-dialog__footer {
            padding: 10px 20px 15px
        }
    }
</style>
```
