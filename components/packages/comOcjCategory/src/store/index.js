import Vue from 'vue';

let store = null;
const storeInit = function() {
    if (store === null) {
        store = Vue.observable({
            allOptions: [], // 类目列表
            categoryIndex: 0, // 选中叶子类目时的index
            categoryCurrent: null,
            categoryList: [], // 编辑传入选中项
            propList: [], // 属性项列表
            propId: '', // 需要激活的属性id
            propValueList: [], // 属性值列表
            selectedCategory: [], // 已选类目
            selectedProp: [], // 已选属性
            selectedPropValue: [] // 已选属性值
        });
    }
};
const mutation = {
    get() {
        if (store === null) {
            storeInit();
        }
        return store;
    },
    init(value) {
        if (store === null) {
            storeInit();
        }
        store.allOptions = [];
        store.propList = [];
        store.propValueList = [];
        store.propId = '';
        if (value) {
            store.selectedCategory = value.categoryList;
            store.selectedProp = value.propList;
            store.selectedPropValue = value.propValueList;
        } else {
            store.selectedCategory = [];
            store.selectedProp = [];
            store.selectedPropValue = [];
        }
    }
};

export default mutation;
