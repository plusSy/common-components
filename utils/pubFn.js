const PUBFN = {
  // 数组中对象元素去重，第一个参数为数组，第二个为去重对象的key
  packedArr(arr, objVal) {
      const result = [],
          hash = {};
      for (let i = 0; i < arr.length; i++) {
          const elem = arr[i][objVal];
          if (!hash[elem]) {
              result.push(arr[i]);
              hash[elem] = true;
          }
      }
      return result;
  },
  arrIsRepeat(arr) {
      let hash = {};
      for (let i in arr) {
          if (hash[arr[i]]) {
              return true;
          }
          hash[arr[i]] = true;
      }
      return false;
  },
  convertFormItemValue(data, value, label = 'label', name = 'value', sep = '、') {
      const checkBoxData = [];
      if (data.constructor === Object) {
          for (let key in data) {
              if (value && value.constructor === Array) {
                  const valueArr = value.map(e => String(e));
                  valueArr.includes(key) && checkBoxData.push(data[key]);
              } else if (key === String(value)) {
                  return data[key];
              }
          }
      } else if (data.constructor === Array) {
          for (let key of data) {
              if (value && value.constructor === Array) {
                  value.includes(key[name]) && checkBoxData.push(key[label]);
              } else if (key[name] === value) {
                  return key[label];
              }
          }
      }
      return checkBoxData.join(sep);
  },
  unSet(arr1, arr2) {
      const set1 = new Set(arr1),
          set2 = new Set(arr2),
          subset = [];
      for (let item of set1) {
          if (!set2.has(item)) {
              subset.push(item);
          } else {
              set1.delete(item);
              set2.delete(item);
          }
      }
      for (let item of set2) {
          if (!set1.has(item)) {
              subset.push(item);
          }
      }
      return subset;
  },
  cloneDeep(target) {
      return JSON.parse(JSON.stringify(target));
  }
};

export default PUBFN;
