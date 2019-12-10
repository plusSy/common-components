
/**
 * @Description: Address select component
 * @Author: Ocj-Team
 * @Date: 2019/10/12
 * @LastEditTime: 2019/10/12 14:47:48
 * @LastEditors: syl
**/ 
export default {
  name: 'comOcjCascader',
  data() {
    let {
      BASEURL,
      multiple,
      leaf,
      checkStrictly,
      includeCountry
    } = this,
    defaultParams = includeCountry ? undefined : 1;

    return {
      count: 0,
      effectValue: [],
      panelValue: [],
      downOrUp: 'down',
      panelProps: {
        multiple: multiple,
        value: 'id',
        label: 'name',
        children: 'subList',
        checkStrictly: checkStrictly,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level === Number(leaf)) {
            return resolve();
          }
          ocj.post({
            url: BASEURL,
            data: {
              "parentId": (node && node.data && node.data.id) || defaultParams
            },
            success: (result) => {
              if (result.length > 0) {
                result = result.map(item => {
                  item.level = includeCountry ? item.level + 1 : item.level;
                  item.leaf = item.level - leaf < 0 ? '' : 'level';
                  return item;
                });
                resolve(result);
              } else {
                node.level = leaf;
                node.data.leaf = "level"
                resolve();
              }
            }
          });
        }
      },
      oldArr: []
    };
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 向下层级
    leaf: {
      type: [String, Number],
      default: 4
    },
    // 是否严格的遵守父子节点不互相关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // BASEURL
    BASEURL: {
      type: String,
      default: '/api/bom/item/product/ItemRegionQueryFacade/queryRegion'
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // placeholder
    placeholder: {
      type: String,
      default: '请选择...'
    },
    // 是否包含国家
    includeCountry: {
      type: Boolean,
      default: false
    }
  },
  created() {
    let valType = this.value instanceof Array;
    if (!valType) {
      let defaultArr = this.multiple ? [] : [{id :'', name: ''}];
      console.warn('绑定数据类型为数组!');
      this.effectValue = this.handleData(defaultArr);
    } else {
      this.effectValue = this.handleData(this.value);
    }
  },
  methods: {
    // 标签关闭
    handleClose(event) {
      let
        val = event.target.parentNode.attributes['data-value'].value,
        newArr = [],
        effectValue = this.effectValue,
        resultData = [];

      effectValue.map(item => {
        if (item.id !== val) {
          newArr.push(item);
        }
      });
      this.effectValue = newArr;

      resultData = this.handleEmitData(this.effectValue);

      this.$emit('input', this.multiple ? resultData : this.effectValue);
    },
    // 级联面板改变
    handelPanelChange(val) {
      let
        newArr = [],
        node = this.$refs['cascaderRef'].getCheckedNodes(),
        effectValue = this.effectValue,
        resultData = [],
        leaf = this.leaf;

      // 拉取节点
      node.map(item => {
        let
          result = [],
          {
            checkStrictly
          } = this,
          data = this.handelGetOptions(item, result);
        data.reverse();
        if (item.level === Number(leaf) || checkStrictly) {
          newArr.push(data);
        }
      });

      // 节点清洗
      if (this.multiple) {

        effectValue = this.handleWashData(newArr, effectValue);

        this.oldArr = newArr;

      } else {
        effectValue = this.handleData(newArr[0]);
      }

      this.effectValue = effectValue;

      resultData = this.handleEmitData(this.effectValue);

      this.$emit('input', this.multiple ? resultData : newArr[0]);
    },
    // 关注上次操作的节点进行查找,清洗,合并,去重,删除
    handleWashData(val, effectValue) {
      let
        beforeArr = this.oldArr,
        newArr = this.handleData(val),
        oldArr = this.handleData(beforeArr),
        delIdArr = [],
        unSameArr = [],
        res = [],

        newIdArr = newArr.map(item => {
          return item.id;
        });

      oldArr.map(item => {
        if (!newIdArr.includes(item.id)) {
          delIdArr.push(item.id);
        }
      });

      unSameArr = this.handleDEData([...effectValue, ...newArr]);

      unSameArr.map(item => {
        if (!delIdArr.includes(item.id)) {
          res.push(item);
        }
      });
      return res;
    },
    hide(params) {
      this.downOrUp = 'down';
    },
    // 展示区 获取焦点
    handleFocus() {
      let {
        downOrUp,
        disabled
      } = this;
      if (disabled) {
        return;
      }
      this.downOrUp = downOrUp === 'down' ? 'up' : 'down';
    },
    // panelVal
    handlePanelVal(arr) {
      let newArr = [];
      arr.map(item => {
        let id = item.id.split(',');
        newArr.push(id);
      });
      return newArr;
    },
    // 清洗展示数据
    handleData(val) {
      let result = [],
        multiple = this.multiple;
      if (multiple) {
        val.map(item => {
          let newId = [],
            newName = [],
            newObj = {};
          item.map(cell => {
            newId.push(cell.id);
            newName.push(cell.name);
          });
          newObj.id = newId.join(',');
          newObj.name = newName.join(' / ');
          result.push(newObj);
        });
      } else {
        let newId = [],
          newName = [],
          newObj = {};
        val.map(item => {
          newId.push(item.id);
          newName.push(item.name);
        });
        newObj.id = newId.join(',');
        newObj.name = newName.join(' / ');
        result.push(newObj);
      }
      return result;
    },
    // 展示数据回洗emit数据
    handleEmitData(eff) {
      let result = [];
      eff.map(item => {
        let id = item.id.split(','),
          name = item.name.split(' / '),
          arr = [];

        id.map((a, ai) => {
          name.map((b, bi) => {
            let obj = {};
            if (ai === bi) {
              obj.id = a;
              obj.name = b;
              arr.push(obj);
            }
          });
        });
        result.push(arr);
      });
      return result;
    },
    // 获取options
    handelGetOptions(node, result) {
      let {
        data: {
          name,
          id
        },
        parent
      } = node, newObj = {};
      newObj = {
        name,
        id
      };
      result.push(newObj);
      if (parent) {
        this.handelGetOptions(parent, result);
      } else {
        return result;
      }
      return result;
    },
    // 根据Id去重
    handleDEData(arr) {
      const res = new Map();
      return arr.filter((a) => !res.has(a.id) && res.set(a.id, 1));
    },
  },
  watch: {
    value(newVal) {
      let effectValue = this.handleData(newVal);
      this.effectValue = effectValue;
    },
    effectValue(newVal) {
      let panelVal = this.handlePanelVal(newVal);
      this.panelValue = this.multiple ? panelVal : panelVal[0];
    }
  }
};