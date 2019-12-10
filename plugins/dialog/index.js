import dialog from './dialog';

let install = function(Vue, options = {}) {
    // 存在vue注册全局vue
    if (Vue) {
        window.console.log('123');
        Vue.prototype.$dialog = dialog;
    }
}
export default {
    install
};