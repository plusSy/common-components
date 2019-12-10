<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 09:51:46
 * @LastEditTime: 2019-09-23 10:49:34
 * @LastEditors: zhangyonggang
 -->
<template>
  <div>
    <div class="dataList">
      <div class="w-100 flex-ju-center">
        <el-input
          placeholder="搜索"
          v-model="inputText"
          suffix-icon="el-icon-search"
          style="width: 80%;"
          class="mt-20"
        ></el-input>
      </div>
      <div>
        <ul class="p-20">
          <li class="flex-ju-al-between choosedCategory" v-for=" (item, i) in searchArr" :key="i" :title="item.value">
            <span class="text-14 color-dark-400">{{item.value}}</span>
            <em class="el-icon-remove color-primary text-18" @click="removeData(item.id)"></em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["dataList"],
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        inputText(val) {
            this.searchArr = this.filterChange(val);
        },
        dataList() {
            this.searchArr = this.filterChange(this.inputText);
        }
    },
    data() {
        return {
            inputText: "",
            searchArr: []
        };
    },
    created() {},
    methods: {
        removeData(index) {
            this.$emit("removeIndexDataChild", index);
        },
        filterChange(val) {
            let viewArr = this.dataList,
                newArr = [];
            viewArr.map(item => {
                if (item.value.indexOf(val) > -1) {
                    newArr.push(item);
                }
            });
            return newArr;
        },
        changeValue(e) {
            let searchArr = [];
            if (e === "") {
                searchArr = this.dataList;
            } else {
                this.dataList.map(item => {
                    let itemNode = item.value.indexOf(e);
                    if (itemNode > -1) {
                        searchArr.push(item);
                    } else {
                        return;
                    }
                });
            }
            this.searchArr = searchArr;
        }
    }
};
</script>

<style lang="scss" scoped>
.dataList {
  overflow: scroll;
  height: 350px;
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