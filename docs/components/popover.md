# popover弹出框
---

### 基本popover用法

```html
/*vue*/

<template>
    <div class="d-flex w-100">
        <com-ocj-popover title="属性启用" content="是否确认启用属性？" class="el-col-6 flex-ju-center" type="primary">
            <el-button>消息（primary）</el-button>
        </com-ocj-popover>
        <com-ocj-popover title="属性成功" content="属性成功" class="el-col-6 flex-ju-center" type="success">
            <el-button>成功（success）</el-button>
        </com-ocj-popover>
        <com-ocj-popover title="删除属性" content="是否删除属性？" class="el-col-6 flex-ju-center" type="error">
            <el-button>删除（error）</el-button>
        </com-ocj-popover>
        <com-ocj-popover title="提醒" content="提醒。。。。？" class="el-col-6 flex-ju-center" type="warning">
            <el-button>提醒（warning）</el-button>
        </com-ocj-popover>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

```

### popover触发方式用法


```html
/*vue*/
<template>
    <div class="d-flex w-100">
        <com-ocj-popover title="属性启用" trigger="click" content="是否确认启用属性？" class="el-col-8 flex-ju-center" type="primary">
            <el-button>click</el-button>
        </com-ocj-popover>
        <com-ocj-popover title="属性启用" trigger="hover" content="是否确认启用属性？" class="el-col-8 flex-ju-center" type="primary">
            <el-button>hover</el-button>
        </com-ocj-popover>
        <com-ocj-popover title="属性启用" trigger="focus" content="是否确认启用属性？" class="el-col-8 flex-ju-center" type="primary">
            <el-button>focus</el-button>
        </com-ocj-popover>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>
```
### popover其他属性用法

```html
/*vue*/
<template>
    <div class="d-flex w-100">
        <com-ocj-popover title="属性启用" :showIcon="false" content="是否确认启用属性？" class="el-col-8 flex-ju-center" type="primary">
            <el-button>showIcon: false</el-button>
        </com-ocj-popover>
        <com-ocj-popover title="属性启用" :showFooter="false" content="是否确认启用属性？" class="el-col-8 flex-ju-center" type="primary">
            <el-button>showFooter: false</el-button>
        </com-ocj-popover>
        <com-ocj-popover title="属性启用" :showCancelBtn="false" content="是否确认启用属性？" class="el-col-8 flex-ju-center" type="primary">
            <el-button>showCancelBtn: false</el-button>
        </com-ocj-popover>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

```


<div id="main2" class="api-wrap mt-24">
	<div class="api-wrap mt-24">
		<h3>属性</h3>
	   <el-table :data="apiDataProps" class="w-100 m-0">
	      <el-table-column prop="params" label="参数" width="190"></el-table-column>
	      <el-table-column prop="describe" label="说明"></el-table-column>
	      <el-table-column prop="type" label="类型" width="140"></el-table-column>
	      <el-table-column prop="defaultValue" label="默认值" width="200"></el-table-column>
	    </el-table>
		<h3>事件</h3>
	   <el-table :data="apiDataEvents" class="w-100 m-0">
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
      apiDataProps:[
		{
	    params: 'trigger',
	    describe: '触发方式',
	    type: 'String',
	    defaultValue: '可选值click,focus,hover， 默认click'
	  },
		{
      params: 'type',
      describe: ' 对应icon类型',
      type: 'String',
      defaultValue: '可选值primary,success,error,warning， 默认primary'
    },
    {
      params: 'showIcon',
      describe: ' 是否展示icon',
      type: 'Boolean',
      defaultValue: 'true'
    },
    {
      params: 'showFooter',
      describe: '是否展示底部按钮',
      type: 'Boolean',
      defaultValue: 'true'
    },
    {
      params: 'showCancelBtn',
      describe: '是否展示取消按钮',
      type: 'Boolean',
      defaultValue: 'true'
    },
    {
      params: 'slot插槽',
      describe: '插槽为中间内容区域',
      type: '---',
      defaultValue: '---'
    }
	],
	apiDataEvents : [
		{
			params: 'ok',
			describe: '点击确定的时候触发的事件',
			cbparams: '',
		},
		{
			params: 'cancel',
			describe: '点击取消的时候触发的事件',
			cbparams: '',
		}
	]
    }
  })
</script>



---
 {docsify-updated} 



