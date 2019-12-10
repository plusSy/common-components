
# Pager 分页组件
---
### 基本pager用法

```html
/*vue*/
<template>
    <com-ocj-pager :total="total" @change="$comSelectChange"></com-ocj-pager>
</template>

<script>
export default {
    name: 'pager',
    data() {
        return {
            total: 100,
            pager: {
                pageNo: 1,
                pageSize: 10
            }
        }
    },
    methods: {
        $comSelectChange(data) {
            this.pager = Object.assign(this.pager, data)
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
			params: 'total',
			describe: 'pager总数',
			type: 'Number',
			defaultValue: '0'
		},
		{
			params: 'pageSizes',
			describe: '每页显示个数选择器的选项设置',
			type: 'Array',
			defaultValue: '[5, 10, 15, 20]'
		},
		{
			params: 'layout',
			describe: '组件布局，子组件名用逗号分隔',
			type: 'String',
			defaultValue: 'total, prev, pager, next, sizes, jumper'
		}
	],
	apiData2 : [
		{
			params: 'change',
			describe: 'pageSize、currentPage  改变时会触发',
			cbparams: 'page对象',
		}
	]
    }
  })
</script>



---
 {docsify-updated} 



