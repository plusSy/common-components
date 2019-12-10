import dialog from './dialog';

// eslint-disable-next-line no-unused-vars
let install = function(Vue, options = {}) {
    // 存在vue注册全局vue
    if (Vue) {
        Vue.prototype.$dialog = dialog;
    }
}
export default {
    install
};