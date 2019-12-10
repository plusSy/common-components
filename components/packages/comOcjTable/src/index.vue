<template>
    <el-table :data="data" v-bind="$attrs" v-on="$listeners" style="width: 100%" :cell-class-name="cellClassName" @select="$comSelect" @select-all="$comSelect">
        <template slot="empty" class="flex-ju-al-center">
            <img class="my-24" src="https://frontendonline-erp.ocj.com.cn/img/nodata.png" alt="" />
        </template>
        <el-table-column v-if="checkbox" type="selection" width="50" :fixed="showFixed"></el-table-column>
        <el-table-column v-if="showExpand" type="expand" :fixed="showFixed">
            <template #default="scope">
                <slot v-bind="scope" name="expand"></slot>
            </template>
        </el-table-column>
        <!-- 组件需求： 多选框列和内容列第一列固定 -->
        <el-table-column
            v-for="(item, index) in column"
            :key="'otable' + index"
            :fixed="index === 0 && showFixed"
            :prop="`${Object.keys(item)[0]}`"
            :label="item[Object.keys(item)[0]]"
            :width="item.width || ''"
            :formatter="item.formatter"
            show-overflow-tooltip
        >
            <template #header="scope" v-if="isShowHeader(Object.keys(item)[0])">
                <slot v-bind="scope" :name="Object.keys(item)[0] + 'Header'"></slot>
            </template>
            <template #default="scope" v-if="isShowSlots(Object.keys(item)[0])">
                <slot v-bind="scope" :name="Object.keys(item)[0]"></slot>
                <!--<slot v-if="item[Object.keys(item)[0]] === column[index][Object.keys(item)[0]]" v-bind="scope" :name="Object.keys(item)[0]"></slot>-->
            </template>
        </el-table-column>
        <!-- 组件需求： 操作列固定 -->
        <el-table-column v-if="showOperation" :fixed="showFixed ? 'right' : false" label="操作" :width="operationWidth">
            <template #default="scope">
                <slot v-bind="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'comOcjTable',
    props: {
        // 表单数据
        data: {
            type: Array,
            default: () => []
        },
        // 表单列内容
        column: {
            type: Array,
            default: () => []
        },
        // 是否具备展开列
        showExpand: {
            type: Boolean,
            default: false
        },
        showFixed: {
            type: Boolean,
            default: true
        },
        // 是否展示checkbox
        checkbox: {
            type: Boolean,
            default: true
        },
        // 样式设置回调函数，返回参数为cell数据
        cellClassName: {
            type: Function
        },
        // 设置操作项宽度
        operationWidth: {
            type: String,
            default: 'auto'
        },
        showOperation: {
            type: Boolean,
            default: false
        },
        showSlots: {
            type: Array,
            default: () => []
        },
        showHeader: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        // 将选中的状态值抛出去接收
        $comSelect(selectData) {
            if (!this.checkbox) {
                return false
            }
            this.$emit('onSelect', selectData)
        },
        isShowSlots(val) {
            return this.showSlots.includes(val)
        },
        isShowHeader(val) {
            let bool = false
            this.showHeader.map(e => {
                if (e.includes(val)) {
                    bool = true
                    return false
                }
            })
            return bool
        }
    }
}
</script>
