/**
 * @module components
 * @description components for vue
 * @author ocj-team
*/
// components
import comButton from './packages/comButton/index';

// plugins
import comDialogPlugin from '../plugins/dialog/index.js';

const components = [
  comButton
];

// function & methods
import VALID from '../utils/valid';
import Storge from '../utils/storge';
import PubFn from '../utils/pubFn';

// eslint-disable-next-line no-unused-vars
const install = function (Vue, opts = {}) {
  if (Vue) {
    // components
    components.forEach(component => {
      Vue.component(component.name, component)
    });

    // plugins
    Vue.use(comDialogPlugin);

    // function & methods
    Vue.prototype.$Valid = VALID;
    Vue.prototype.$Storge = Storge;
    Vue.prototype.$PubFn = PubFn;
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  comButton
};
