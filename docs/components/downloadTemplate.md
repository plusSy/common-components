---
### 基本DownloadTemplate用法
#### DownloadTemplate默认用法
```vue
<template>
    <c-portal-download-template groupCode="uc_user_export"></c-portal-download-template>
</template>
<script>
export default {
    name: 'download-template',
}
</script>
```




### 属性

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| text | 按钮文案 | String | 下载模板 |
| groupCode | 业务分组编码，必传，由各业务域自己获取传入 | String |  |
| type | 按钮类型 | String | 可选值primary，success，warning，danger，info，text |



### 源代码
```vue
<template>
    <div class="component-DownloadTemplate">
        <div>
            <el-button @click="downloadTemplate" type="primary" download>{{text}}</el-button>
            <a class="d-none" ref="download" :href="url" download />
        </div>
    </div>
</template>

<script>
import { downloadTemplate } from '@services/fileManage';

export default {
    name: 'com-DownloadTemplate',
    props: {
        text: {
            type: String,
            default: '下载模板',
        },
        groupCode: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            url: ''
        };
    },
    methods: {
        //获取下载url，下载文件
        async downloadTemplate() {
            const params = {
                groupCode: this.groupCode
            };
            this.url = await downloadTemplate (params);
            this.$nextTick(() => {
                this.$refs.download.click();
            });
        }
    },
};
</script>

<style scoped lang='scss'>
.component-DownloadTemplate {

}
</style>
```



---
 {docsify-updated} 

