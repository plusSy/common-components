<template>
  <div class="selectTrans">
    <Search :url="searchUrl" :market="marketId" @select="$searchSelect" />
    <div class="mt-12 border-outline searchBlock">
      <category-option
        :url="url"
        :propUrl="propUrl"
        v-for="(blockMount, index) in allOptions"
        :data="blockMount"
        :index="index"
        :marketId="marketId"
        v-on="$listeners"
        :key="'categoryOption' + index"
      />
      <prop-option
        v-if="propUrl && showProp"
        :propValueUrl="propValueUrl"
        v-on="$listeners"
        index="0"
      />
      <prop-value-option v-if="showPropValue" v-on="$listeners" />
    </div>
    <div class="breadcrumb p-8 pl-16 mt-12" v-if="selectList && selectList.length > 0">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="d-inline-block">
        <span class="float-left">已选类目：</span>
        <el-breadcrumb-item
          v-for="(item, index) in selectList"
          :key="'breadcrumb' + index"
        >{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
import categoryOption from "./categoryOption";
import propOption from "./propOption";
import propValueOption from "./propValueOption";
import mutation from "./store";
import Search from "./search";

export default {
    name: "comOcjCategory",
    components: { categoryOption, propOption, propValueOption, Search },
    props: {
        url: String,
        propUrl: String,
        searchUrl: String,
        propValueUrl: String,
        marketId: [Number, String],
        value: {}
    },
    computed: {
        selectList() {
            let store = mutation.get();
            return [
                ...store.selectedCategory,
                ...store.selectedProp,
                ...store.selectedPropValue
            ];
        },
        allOptions() {
            return mutation.get().allOptions;
        },
        showProp() {
            return mutation.get().propList.length > 0;
        },
        showPropValue() {
            return mutation.get().propValueList.length > 0;
        },
        queryData() {
            return {
                hiddenDisable: 1,
                marketId: this.marketId || 1,
                cateGroup: this.cateGroup || null
            };
        }
    },
    created() {
        mutation.init(this.value);
        this.loadCategory();
    },
    methods: {
        $searchSelect(data) {
            this.refresh(data);
            this.$emit("select", {
                category: data.categoryList,
                prop: [],
                propValue: []
            });
        },
        refresh(data) {
            mutation.init(data);
            let that = this;
            that.loadCategory();
        },
        async loadCategory() {
            let result = await ocj.post({
                url: this.url,
                data: {
                    marketId: this.marketId || 1,
                    hiddenDisable: 1,
                    parentId: 0
                }
            });
            if (result && result.length > 0) {
                mutation.get().allOptions.push(result);
            }
        }
    }
};
</script>

