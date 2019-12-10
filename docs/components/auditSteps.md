# AuditSteps 审核步骤
---
### 基本AuditSteps用法
#### AuditSteps默认用法

```vue
	<template>
        <c-portal-audit-steps :stepsInfo="data"></c-portal-audit-steps>
    </template>
    <script>
    export default {
        name: 'auditSteps',
        data() {
            return {
                data: []
            }
        },
        mounted() {
            this.$httpGetData()
        },
        methods: {
            // table接口请求
            $httpGetTable() {
                this.data = [
                    {
                        name: '提交申请',
                        userName: ['员工A'],
                        date: '2019-10-10  12:00:00',
                        status: 'APPROVED'
                    },
                    {
                        name: '提交申请',
                        userName: ['员工A'],
                        date: '2019-10-10  12:00:00',
                        status: ['PENDING']
                    },
                    {
                        name: '提交申请',
                        userName: ['员工A'],
                        date: '2019-10-10  12:00:00',
                        status: 'STATELESS'
                    },
                ]
            },
        }
    }
    </script>
```



### 属性

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| stepsInfo | 显示的数据 | Array | [] |
| type | 类型选择，支持步骤（steps），表格（table） | String | 'steps' |
| stepDirection | 只在type为steps有效，显示方向，横向（horizontal）或纵向展示（vertical） | String | 'vertical' |




---
 {docsify-updated} 

