<template>
    <el-dropdown trigger="click" @command="handleCommand" :hide-on-click="hideOnClick">
        <span class="cursor-pointer ml-12 color-primary">{{ buttonName }}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item 
                class="flex-ju-center" 
                v-for="(item, i) in config" 
                :key="i" 
                :command="`${i}`"
                :disabled="item.disabled"
                :divided="item.divided"
            >
                <!-- 下拉弹出层 -->
                <com-ocj-popover
                    v-if="!!item.confirm && !!item.confirm.content && !!item.confirm.type"
                    :ref="`${i}`"
                    :placement="placement"
                    :title="item.confirm.title"
                    :content="item.confirm.content"
                    :type="item.confirm.type"
                    @ok="select(item, i)"
                >
                    <el-button @click="clickButton(false)" type="text" class="ml-12 mr-12 pl-12 pr-12" :class="item.className">{{ item.text }}</el-button>
                </com-ocj-popover>
                <!-- 下拉按钮 -->
                <el-button v-else @click="clickButton(true)" type="text" class="ml-12 mr-12 pl-12 pr-12" :class="item.className">{{ item.text }}</el-button>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    name: 'comOcjDropdown',
    data() {
        return {
            // 点击后是否关闭下拉
            hideOnClick: false
        };
    },
    props: {
        // 下拉列表数据
        config: {
            type: Array,
            default: () => []
        },
        // 按钮名称
        buttonName: {
            type: String,
            default: () => '更多'
        },
        // 弹出层对齐
        placement: {
            type: String,
            default: () => 'left'
        }
    },
    methods: {
        // 点击完成是否hide下拉
        clickButton(hideOnClick) {
            this.hideOnClick = hideOnClick;
        },
        // 关闭其他弹出层
        handleCommand(clickIndex) {
            Object.keys(this.$refs).forEach((d, i) => {
                if(d !== clickIndex && this.$refs[d][0] && this.$refs[d][0].$onCancel) {
                    this.$refs[d][0].$onCancel();
                }
            });
            // 是否隐藏下拉
            if(
                this.config && 
                this.config[clickIndex] &&
                this.config[clickIndex].confirm && 
                this.config[clickIndex].confirm.content && 
                this.config[clickIndex].confirm.type
            ) {
                this.hideOnClick = false;
            } else {
                this.hideOnClick = true;
                this.select(this.config[clickIndex], Number(clickIndex));
            }
        },
        // 将选中的状态值抛出去接收
        select(item, i) {
            this.$emit('select', {
                item, i
            });
        }
    }
};
</script>
