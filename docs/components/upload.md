# Upload 上传
---
### 基本Upload用法
#### Upload默认用法
```vue
<template>
    <c-portal-upload businessType="im_test"></c-portal-upload>
</template>
<script>
export default {
    name: 'upload',
}
</script>
```




### 属性

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| text | 按钮文案 | String | '上传' |
| rule | 规则描述 | String | '提示：文件大小不超过5M，数据行数不超过2000行' |
| businessType | 业务类型，必传，由各业务域自己获取传入 | String |  |




<Common-api :api-data="
	[
		{
			params: 'text',
			describe: '按钮文案',
			type: 'String',
			defaultValue: '上传'
		},
		{
			params: 'rule',
			describe: '规则描述',
			type: 'String',
			defaultValue: '提示：文件大小不超过5M，数据行数不超过2000行'
		},
		{
			params: 'businessType',
			describe: '业务类型，必传，由各业务域自己获取传入',
			type: 'String',
		},
	]
"></Common-api>





---
 {docsify-updated} 

