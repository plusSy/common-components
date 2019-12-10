<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 09:51:46
 * @LastEditTime: 2019-11-14 17:11:56
 * @LastEditors: zhangyonggang
 -->
<template>
  <div>
    <!-- 左侧树结构 -->
    <div class="tree">
      <div class="w-100 flex-ju-center">
        <el-input
          placeholder="搜索"
          v-model="filterText"
          style="width: 80%;"
          class="mt-20"
          suffix-icon="el-icon-search"
        ></el-input>
      </div>
      <el-tree
        :data="sourceData"
        :props="treeProps"
        node-key="id"
        :load="loadChilds"
        lazy
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        :render-content="renderContent"
        ref="tree"
      ></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    getDataUrl: {
      type: String
    },
    marketId: {
      type: String
    },
    nodeLimit: {
      type: Boolean,
      default: false
    },
    orignalDataList: {
      type: Array
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: "",
      childData: [],
      sourceData: [],
      toData: [], //所勾选的数据对象
      treeProps: {
        label: "name", // 指定节点标签为节点对象的某个属性值
        children: "children", // 指定子树为节点对象的某个属性值
        isLeaf: (data, node) => {
          if (data.leafYn === 0) {
            return false;
          }
          return true;
        } // 是否为叶子节点
      }
    };
  },
  created() {
    let params = {
      url: this.getDataUrl,
      data: { marketId: this.marketId, parentId: 0 }
    };
    ocj.post({
      url: params.url,
      data: params.data,
      success: res => {
        if (res.length === 0) {
          console.error("数据拉取失败，请刷新再试");
        }
        let toData = this.toData;

        for (let i = 0; i < toData.length; i++) {
          let leng = toData[i].length - 1;
          res.map(item => {
            if (item.id === toData[i][leng].id) {
              item.checked = true;
            } else {
              return;
            }
          });
        }
        for (let i = 0; i < res.length; i++) {
          if (!res[i].checked) {
            res[i].checked = false;
          }
        }
        this.sourceData = res;
      },
      fail: res => {
        console.error("EERRRR!!!!!!!:", res);
      }
    });
  },
  mounted() {},
  methods: {
    //选中复选框
    change(val, data, node) {
      //val 选中的状态（true 选中，false 取消选中）,data：该节点下的节点（包含子节点） node：所有节点（包含parent）
      data.checked = val;
      let result = [],
        arr;
      this.hideChildren(data, val);
      if (val) {
        //判断是否包含子节点，是则清空所有子节点数据并隐藏
        if (data.children) {
          this.removeAllChildreNode(data);
        }
        //执行选中的逻辑，增加数据到目标数组
        arr = this.getParentData(node, result).reverse();
        let treeList = this.toData;

        treeList = this.handelDelChild(arr, treeList);

        treeList.push(arr);
        this.toData = treeList;
        this.$emit("handleGetValChild", treeList);
      } else {
        //取消勾选逻辑，删除目标数组数据
        this.removeFromData(data.id);
      }
    },
    // 没有查询子节点时,勾选父节点,删除子节点
    handelDelChild(curArr, treeList) {
      let newArr = [],
        deepLength = curArr.length;
      treeList.map(item => {
        let a = false;
        for (let i = 0; i < item.length; i++) {
          if (item[i].id === curArr[deepLength - 1].id) {
            return (a = true);
          }
        }

        if (!a && item[0].id !== -1) {
          newArr.push(item);
        }
      });
      return newArr;
    },
    //编辑回填数据到todata[]
    setDataToData(val) {
      this.toData = val;
      this.$emit("handleGetValChild", val);
    },
    //展开子节点方法
    loadChilds(node, resolve) {
      // console.log("展开子节点:", node);
      if (node.level === 0) {
        return resolve([]);
      }
      //判断是否限制展开节点层级
      if (this.nodeLimit) {
        if (node.parent.parent === null) {
          // 二级节点
          this.getChildrenNode(node, resolve);
        } else {
          return resolve([]);
        }
      } else {
        // 二级节点
        this.getChildrenNode(node, resolve);
      }

      // }
    },
    //判断回填数据是否需要选中

    //加载子节点数据
    getChildrenNode(node, resolve) {
      let categoryId = node.data.id,
        params = {
          url: this.getDataUrl,
          data: {
            parentId: categoryId,
            marketId: this.marketId
          }
        };
      ocj.post({
        url: params.url,
        data: params.data,
        success: res => {
          if (res.length === 0) {
            console.error("数据拉取失败，请刷新再试");
          }
          //判断是否已经勾选，设为true
          let { data } = node,
            { toData } = this;

          for (let i = 0; i < toData.length; i++) {
            let leng = toData[i].length - 1;
            res.map(item => {
              if (item.id === toData[i][leng].id) {
                item.checked = true;
              } else {
                return;
              }
            });
          }
          // 没有勾选的checked设为false
          for (let i = 0; i < res.length; i++) {
            if (!res[i].checked) {
              res[i].checked = false;
            }
            // 当父级被隐藏式或者父级勾选时候,子集要隐藏
            res[i].hide = Boolean(data.checked || data.hide);
          }
          this.childData = res;
          this.addNodeToParent(categoryId, this.sourceData, resolve);
          // resolve(res);
        },
        fail: res => {
          console.error("数据拉取失败，请刷新再试");
        }
      });
    },
    //选择父节点隐藏所以子节点
    hideChildren(node, val) {
      if (node.children) {
        node.children.map(m => {
          this.$set(m, "hide", val);
          m.checked = false;
          this.hideChildren(m, val);
          return;
        });
      }
      return node;
    },
    // 取消父节点选择，显示所有的子节点的checkBox
    showChildren(id) {
      let nodeArr = [];
      this.sourceData.map(item => {
        if (item.id === id) {
          this.hideChildren(item, false);
        }
      });
    },
    //给父节点添加子节点
    addNodeToParent(id, list, resolve) {
      list &&
        list.map(m => {
          if (id === m.id) {
            this.$set(m, "children", this.childData);
            // m.children=this.childData
            resolve([]);
            return;
          }
          if (m.children) {
            return this.addNodeToParent(id, m.children, resolve);
          }
          return;
        });
    },
    //勾选父节点，清空所有子节点的值
    removeAllChildreNode(node) {
      this.removeFromData(node.id);
    },
    //勾选数据添加到目标数据数组
    addToData(item) {
      this.toData.push(item);
    },
    //删除/取消勾选 的数据对象
    removeFromData(dataId) {
      for (let i = 0; i < this.toData.length; i++) {
        this.toData[i].forEach(current => {
          if (dataId === current.id) {
            this.toData.splice(i, 1);
            this.$emit("handleGetValChild", this.toData);
            this.removeFromData(dataId);
            return;
          }
          return;
        });
      }
    },
    //根据所选择的元素组成数据对象
    getParentData(node, result) {
      let { data: { id, name, value }, parent } = node,
        newObj = {};
      newObj = { id, name, value };
      result.push(newObj);
      if (parent.parent !== null) {
        this.getParentData(parent, result);
      } else {
        return result;
      }
      return result;
    },
    //dom渲染checkBox元素
    renderContent(h, { node, data, store }) {
      let checkDom = null;
      if (!data.hide) {
        checkDom = (
          <div>
            {data.checked}
            <el-checkbox
              on-input={val => this.change(val, data, node)}
              value={data.checked}
            />
          </div>
        );
      }
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>{checkDom}</span>
        </span>
      );
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.name.indexOf(value) !== -1;
    },
    //查找取消选中的节点
    removeFromIndex(index) {
      // let _length = this.toData[index].length - 1,
      //     _id = this.toData[index][_length].id;
      this.removeFromData(index);
      this.showChildren(index);
      this.changeCheckboxStatus(index, this.sourceData);
    },
    //取消选中删除的节点
    changeCheckboxStatus(id, list) {
      list &&
        list.map(m => {
          if (id === m.id) {
            this.$set(m, "checked", false);
            return;
          }

          if (m.children) {
            this.changeCheckboxStatus(id, m.children);
            return;
          }
          return;
        });
    }
  }
};
</script>
<style scoped lang="scss">
.tree {
  height: 350px;
  overflow-y: scroll;
}
.el-tree {
  padding: 20px;
  overflow: hidden;
}
</style>