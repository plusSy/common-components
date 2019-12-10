import Vue from 'vue';

let data = null;
export default {
    getData() {
        if (data === null) {
            data = Vue.observable({});
        }
        return data;
    },
    get(typeCode, url) {
        let data = this.getData();
        if (!typeCode) {
            return alert('typeCode不能为空');
        }
        let options = data[typeCode];
        if (!options) {
            if (!url) {
                url = '/api/tcode/findByTypeCodes';
            }
            ocj.post({
                url: url,
                data: {
                    typeCode: typeCode
                },
                success: reback => {
                    reback.forEach(item => {
                        data[typeCode].push(item);
                    });
                }
            });
            Vue.set(data, typeCode, []);
            return data[typeCode];
        }
        return options;
    },
    set(typeCode, value) {}
};
