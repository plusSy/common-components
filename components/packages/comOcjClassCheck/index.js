import component from './src/classCheck.vue';

component.install = function (Vue) {
  Vue.component(component.name, component)
}

export default component;