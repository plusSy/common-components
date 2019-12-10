
# table基本展示  {docsify-ignore-all}

---


## 基本table用法


### table默认用法 默认带checkbox

```html
/*vue*/
<template>
    <com-ocj-table :data="tableData" :column="tableColumn" :cellClassName="cellClassName" @onSelect="$comSelectData"> </com-ocj-table>
</template>
<script>
export default {
    data() {
        return {
            checkData: '',
            tableData: [],
            // column： 对象内第一个键值对，key为column的prop值，value为column的label
            tableColumn: [
                { propNameId: '属性项ID' },
                {
                    status: '状态',
                    isSlot: true,
                    formatter(row) {
                        return row.status ? '启用' : '禁用'
                    }
                }
            ],
            tableCheckData: []
        }
    },
    mounted() {
        this.$httpGetTable()
    },
    methods: {
        // table接口请求
        $httpGetTable() {
            this.tableData = [
            
            ]
        },
        // 设置table属性样式
        cellClassName(cell) {
            let className
            switch (cell.column.property) {
                case 'status':
                    className = cell.row.status ? 'color-0bb07b' : 'color-f03d3d'
                    break
            }
            return className
        },
        $comSelectData(data) {
            this.tableCheckData = data || []
            const checkVal = this.tableCheckData.map(value => {
                return value.propNameId
            })
            this.checkData = checkVal.join(',')
            console.log(this.checkData)
        }
    }
}
</script>

```



### 带操作项table
#### 带操作项table通过showOperation、operationWidth 等控制
> showOperation控制是否显示操作项，默认值为false

> operationWidth控制操作项宽度

> 操作项内容采用默认slot插槽，当前行数据通过slot-scope接收，接收到data => data.row(当前行数据)；data => data.$index(当前行index)

```html
/*vue*/
<template>
    <com-ocj-table :data="tableData" border :column="tableColumn" :showOperation="true" :cellClassName="cellClassName" operationWidth="140px" @onSelect="$comSelectData">
        <!-- 默认插槽为操作列插槽， 可通过slot-scope获取当前行数据，可在插槽内部使用  -->
        <template slot-scope="data">
            <el-button type="text" size="small" @click="edit(data.row, data.$index)">编辑</el-button>
            <el-button type="text" size="small">属性值管理</el-button>
        </template>
    </com-ocj-table>
</template>

<script>
export default {
    name: 'tableOperation',
    data() {
        return {
            checkData: '',
            tableData: [],
            // column： 对象内第一个键值对，key为column的prop值，value为column的label
            tableColumn: [
                { propNameId: '属性项ID' },
                {
                    status: '状态',
                    formatter(row) {
                        return row.status ? '启用' : '禁用'
                    }
                }
            ],
            tableCheckData: []
        }
    },
    mounted() {
        this.$httpGetTable()
    },
    methods: {
        // table接口请求
        $httpGetTable() {
            this.tableData = [
                {
                    propNameId: 111,
                    status: 0
                },
                {
                    propNameId: 123,
                    status: 1
                }
            ]
        },
        // 设置table属性样式
        cellClassName(cell) {
            let className
            switch (cell.column.property) {
                case 'status':
                    className = cell.row.status ? 'color-0bb07b' : 'color-f03d3d'
                    break
            }
            return className
        },
        $comSelectData(data) {
            this.tableCheckData = data || []
            const checkVal = this.tableCheckData.map(value => {
                return value.propNameId
            })
            this.checkData = checkVal.join(',')
        },
        edit(val) {
            console.log(val)
        }
    }
}
</script>

```



### 自定义table
#### table 中column列自定义内容
> 在组件内部通过slot插槽插入列内容，每一列slot列的name为当前列的key值。可通过slot-scope="data"获取到当前列的值；data => data.row(当前行数据)；data => data.$index(当前行index)
> 同时需要通过showSlots 传入需要自定义列的key值组成的数组


```html
/*vue*/
<desc>

</desc>
<template>
    <com-ocj-table :data="tableData" :checkbox="false" :column="tableColumn" :showOperation="true" :showSlots="['propNameId']" :cellClassName="cellClassName" operationWidth="140px" @onSelect="$comSelectData">
        <!-- 默认插槽为操作列插槽， 可通过slot-scope获取当前行数据，可在插槽内部使用  -->
        <template slot-scope="data">
            <el-button type="text" size="small" @click="edit(data)">编辑</el-button>
            <el-button type="text" size="small">属性值管理</el-button>
        </template>
        <template #propNameId="data">
            <el-button @click="clickId(data.row, data.$index)">clickId</el-button>
        </template>
    </com-ocj-table>
</template>
<script>
export default {
    name: 'tableBase',
    data() {
        return {
            checkData: '',
            tableData: [],
            // column： 对象内第一个键值对，key为column的prop值，value为column的label
            tableColumn: [
                { propNameId: '属性项ID' },
                {
                    status: '状态',
                    formatter(row) {
                        return row.status ? '启用' : '禁用'
                    }
                }
            ],
            tableCheckData: []
        }
    },
    mounted() {
        this.$httpGetTable()
    },
    methods: {
        // table接口请求
        $httpGetTable() {
            this.tableData = [
                {
                    propNameId: 111,
                    status: 0
                },
                {
                    propNameId: 123,
                    status: 1
                }
            ]
        },
        // 设置table属性样式
        cellClassName(cell) {
            let className
            switch (cell.column.property) {
                case 'status':
                    className = cell.row.status ? 'color-0bb07b' : 'color-f03d3d'
                    break
            }
            return className
        },
        $comSelectData(data) {
            this.tableCheckData = data || []
            const checkVal = this.tableCheckData.map(value => {
                return value.propNameId
            })
            this.checkData = checkVal.join(',')
            console.log(this.checkData)
        },
        edit(val) {
            console.log(val)
        },
        clickId(row, index) {
            console.log(row, index)
        }
    }
}
</script>


```



<div id="main2" class="api-wrap mt-24">
	<div class="api-wrap mt-24">
		<h3>属性</h3>
	   <el-table :data="apiData1" class="w-100 m-0">
	      <el-table-column prop="params" label="参数" width="190"></el-table-column>
	      <el-table-column prop="describe" label="说明"></el-table-column>
	      <el-table-column prop="type" label="类型" width="140"></el-table-column>
	      <el-table-column prop="defaultValue" label="默认值" width="100"></el-table-column>
	    </el-table>
		<h3>事件</h3>
	   <el-table :data="apiData2" class="w-100 m-0">
	      <el-table-column prop="params" label="事件名称" width="140"></el-table-column>
	      <el-table-column prop="describe" label="说明"></el-table-column>
	      <el-table-column prop="cbparams" label="回调参数"></el-table-column>
	    </el-table>
	</div>

</div>

<script>
  new Vue({
    el: '#main2',
    data:  {
      apiData1: [
		{
			params: 'data',
			describe: '显示的数据',
			type: 'Array',
			defaultValue: '[]'
		},
		{
			params: 'column',
			describe: '表格列的配置描述，具体项及使用方法参考示例代码',
			type: 'Array',
			defaultValue: '[]'
		},
		{
			params: 'checkbox',
			describe: '是否显示多选框',
			type: 'Boolean',
			defaultValue: 'true'
		},
		{
			params: 'border',
			describe: '是否竖线边框',
			type: 'Boolean',
			defaultValue: 'false'
		},
		{
			params: 'operationWidth',
			describe: '操作项宽度',
			type: 'String',
			defaultValue: 'auto'
		},
		{
			params: 'cellClassName',
			describe: '单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。',
			type: 'Function({row, column, rowIndex, columnIndex})',
			defaultValue: '----'
		},
		{
			params: 'showOperation',
			describe: '是否显示操作列',
			type: 'Boolean',
			defaultValue: 'true'
		},
		{
			params: 'showSlots',
			describe: '自定义的slots name数组集合',
			type: 'Array',
			defaultValue: '[]'
		}
	],
	apiData2 : [
		{
			params: 'onSelect',
			describe: '当用户手动勾选或全选时数据行的 Checkbox 时触发的事件',
			cbparams: 'selection',
		}
	]
    }
  })
</script>




---
 {docsify-updated} 


