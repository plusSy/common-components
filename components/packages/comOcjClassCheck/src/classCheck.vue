<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 15:27:05
 * @LastEditTime: 2019-11-14 11:20:01
 * @LastEditors: zhangyonggang
 -->
<template>
  <div>
    <div class="box">
      <div class="border-outline flex-ju-center w-100">
        <div class="border-right-e8" style="width: 50%">
          <p class="bg-color-lighter m-0 pt-12 pb-12 pl-24 text-14 pr-24">
            <span>全部类目</span><el-checkbox v-model="allChecked"  v-show="isAllChecked" style="float:right"></el-checkbox></p>

          <class-tree
            v-show="!allChecked"
            ref="tree"
            v-bind:getDataUrl="getDataUrl"
            :marketId="marketId"
            :nodeLimit="nodeLimit"
            @handleGetValChild="handleGetVal"
            :orignalDataList="orignalDataList"
          ></class-tree>
        </div>
        <div style="width: 50%">
          <p class="bg-color-lighter m-0 pt-12 pb-12 pl-24 text-14">已选类目</p>
          <data-list :dataList="dataList"
           v-show="!allChecked" @removeIndexDataChild="removeIndexData"></data-list>
            <div>
        <ul class="p-20" v-show="allChecked">
          <li class="flex-ju-al-between choosedCategory">
            <span class="text-14 color-dark-400">全部类目</span>
          </li>
        </ul>
      </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import classTree from "./classTree.vue";
import dataList from "./dataList.vue";

export default {
    name: "comOcjClassCheck",
    props: {
        getDataUrl: {
            type: String,
            default: "/api/bom/brand/BrandQueryFacade/queryBrandCategoryByParentId"
        },
        marketId: {
            type: String,
            default: "1"
        },
        isAllChecked: {
            type: Boolean,
            default: false
        },
        nodeLimit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dataList: [],
            orignalDataList: [], //目标数据原始数据
            removeIndex: null, //清除数据index
            allChecked: false
        };
    },
    created() {},
    mounted() {},
    methods: {
    //编辑状态调用已选择的数据
        backfillData(val) {
            this.$refs.tree.setDataToData(val);
        },
        // 数据清洗
        handleGetVal(val = [[]]) {
            if(val[0]&&val[0][0].id===-1){
                this.allChecked=true;
            }else{
                // 拼接回填数据和新增数据this.orignalDataList+val
                this.orignalDataList = val;
                // 对数据进行清洗
                let resObj = [],
                    orignalDataList = this.orignalDataList;

                orignalDataList.map(item => {
                    let valArr = [],
                        idArr = [],
                        valObj = {},
                        valLeg = item.length - 1;
                    item.map(cell => {
                        valArr.push(cell.name);
                        idArr.push(cell.id);
                    });

                    valObj.value = valArr.join(" / ");
                    valObj.id = item[valLeg].id;
                    valObj.ids = idArr;

                    resObj = [...resObj, valObj];
                });

                this.dataList = resObj;
            }

        },
        //搜索过滤
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        //删除目标数据
        removeIndexData(index) {
            this.$refs.tree.removeFromIndex(index); //删除原数据中的选中状态
        },
        //提交数据 this.orignalDataList
        submit() {
            let _data = this.allChecked ? "-1" : this.orignalDataList;
            this.$emit("childSubmit", _data);
        }
    },
    computed: {},
    components: { classTree, dataList }
};
</script>

<style scoped lang="scss">
.box {
  height: 400px;
  width: 100%;
  margin: 0 auto;
  text-align: left;
  display: flex;
}
.choosedCategory{
  position: relative;
  padding-right: 20px;
  cursor: default;

  span{
    display: inline-block;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  i{
    position: absolute;
    right: 0;
    cursor: pointer;
  }
}
</style>
