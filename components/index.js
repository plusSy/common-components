import Button from './packages/button/index';
import Input from './packages/input/index';

const components = [
  Button,
  Input
];

// eslint-disable-next-line no-unused-vars
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Button,
  Input
}