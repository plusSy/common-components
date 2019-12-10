---
### dropdown 下拉组件用法

```vue
    <template>
        <el-table>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <com-ocj-dropdown :config="config" @select="selectA"> </com-ocj-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </template>

    <script>
    export default {
        data() {
        return {
            config: [{
                confirm: {
                    title: '提示',
                    content: '确认提交？',
                    type: 'success',
                },
                text: '提交',
                className: ' color-dark'
            }, {
                confirm: {
                    title: '提示',
                    content: '确认删除？',
                    type: 'error',
                },
                text: '删除',
                className: ' color-danger'
            }, {
                text: '测试',
                className: ' color-blue'
            }, {
                text: '测试',
                disabled: true,
                className: ' color-blue'
            }],
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
        },
        methods: {
            selectA({item ,i}) {
                alert(`我选择了 ${item.text}`);
                console.log(item ,i);
            }
        }
    }
    </script>

```

### 富文本 props

| Props        | name           | default  |
| :------------- |:-------------:| -----:|
| config      | 下拉组件列表参数 | [] |
| buttonName      | 按钮名称      |  更多  |
| placement | 弹出层对齐位置     |    left |



---
 {docsify-updated} 

