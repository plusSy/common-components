<template>
  <!-- 懒加载、手风琴、多选框 -->
  <el-tree
    ref="leftTree"
    :props="treeProps"
    lazy
    :load="$comLoadNode"
    empty-text
    node-key="id"
    :expand-on-click-node="false"
    accordion
    v-bind="$attrs"
    :show-checkbox="showCheckbox && type === 'default'"
    :render-content="$comRenderContent"
    @node-click="$comClickTree"
    @check-change="$comCheckChange"
  ></el-tree>
</template>
<script>
export default {
    name: "comOcjTree",
    props: {
        http_treedata: {
            type: Function
        },
        showCheckbox: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "default"
        }
    },
    data() {
        return {
            handleName: null,
            treeProps: {
                label: "name", // 指定节点标签为节点对象的某个属性值
                children: "childs", // 指定子树为节点对象的某个属性值
                isLeaf: (data, node) => {
                    if (data.leaf === 1) {
                        return true;
                    }
                    return false;
                } // 是否为叶子节点
            },
            grandNode: "",
            currentNode: null,
            currentData: null,
            func: null
        };
    },
    created() {
        if (this.name) {
            this.handleName = this.name + "_tree";
            ocj.on(this.handleName, this.handle);
        }
    },
    destroyed() {
        if (this.name) {
            ocj.off(this.handleName);
        }
    },
    methods: {
    // 通过事件监听，实现节点新增与删除
        refresh(id) {
            let node = this.$refs.leftTree.getNode(id);
            if (!node) {
                return;
            }
            node.loaded = false;
            return node.expand();
        },
        remove() {
            let node = this.currentNode;
            if (!node) {
                return;
            }
            this.$refs.leftTree.remove(node);
        },
        // 判断当前节点是否包含子节点
        $comLoadNode(node, resolve) {
            const that = this;
            that.func = resolve;
            if (node.isLeaf) {
                return;
            }
            if (node.data) {
                this.$emit("getCurrentId", node.data.id);
            } else {
                this.grandNode = node;
            }
            if (typeof this.http_treedata === "function") {
                that.http_treedata.call(this, resolve);
            }
        },
        // 传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
        $comCheckChange() {
            const datas = this.$refs.leftTree.getCheckedNodes();
            this.$emit("checkData", datas);
        },
        // render自定义样式渲染
        $comRenderContent(h, { node, data }) {
            const that = this;
            let icontooltip = "",
                iconText = "";
            // 如果是叶子类目并且是禁用状态
            if (node.isLeaf && data.online === 0) {
                icontooltip = "未上线";
                iconText = "&#xe708;";
            } else if (node.isLeaf && data.status === 0) {
                icontooltip = "已禁用";
                iconText = "&#xe69b;";
            }
            let icon = h(
                "el-tooltip",
                {
                    props: {
                        effect: "dark",
                        placement: "top",
                        content: icontooltip
                    }
                },
                [
                    h("span", {
                        class: {
                            "color-warning": node.isLeaf && data.online === 0,
                            "color-danger": node.isLeaf && data.status === 0,
                            "o-icon": true,
                            "text-16": true,
                            "cursor-not-allowed":
                node.isLeaf && data.status === 0 && that.type === "default",
                            "mr-8": true
                        },
                        domProps: {
                            innerHTML: iconText
                        }
                    })
                ]
            );
            if (that.type === "simple") {
                icon = "";
            }
            return h(
                "div",
                {
                    class: {
                        "flex-ju-al-center": true
                    }
                },
                [
                    icon,
                    h(
                        "span",
                        {
                            class: {
                                "color-dark-400": !node.isLeaf || that.type === "simple",
                                "color-dark": node.isLeaf && that.type === "default",
                                "text-weight-bold":
                  node.isLeaf && that.type === "default" && data.status !== 0,
                                "color-gray-700":
                  node.isLeaf && data.status === 0 && that.type === "default",
                                "text-14": true,
                                "cursor-not-allowed":
                  node.isLeaf && data.status === 0 && that.type === "default"
                            }
                        },
                        node.label
                    )
                ]
            );
        },
        // 传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
        $comClickTree(data, node, store) {
            this.currentNode = node;
            this.$emit("getCurrentId", data.id);
        },
        reset() {
            this.$emit("getCurrentId", "");
            this.grandNode.childNodes = [];
            this.$comLoadNode(this.grandNode, this.func);
        }
    }
};
</script>
