/**
 * @module components
 * @description components for vue
 * @author ocj-team
*/
// test
import comOcjButton from './packages/comOcjButton/index';

// components
import comOcjPager from './packages/comOcjPager/index';
import comOcjCascader from './packages/comOcjCascader/index';
import comOcjPopover from './packages/comOcjPopover/index';
import comOcjTcode from './packages/comOcjTcode/index';
import comOcjTable from './packages/comOcjTable/index';
import comOcjTree from './packages/comOcjTree/index';
import comOcjEditor from './packages/comOcjTree/index';
import comOcjClassCheck from './packages/comOcjClassCheck/index';
import comOcjCategory from './packages/comOcjCategory/index';
import comOcjIdInput from './packages/comOcjCategory/index';
import comOcjDropdown from './packages/comOcjCategory/index';

// plugins
import comOcjDialogPlugin from '../plugins/dialog/index.js';

const components = [
  comOcjButton,
  comOcjPager,
  comOcjCascader,
  comOcjPopover,
  comOcjTcode,
  comOcjTable,
  comOcjTree,
  comOcjEditor,
  comOcjClassCheck,
  comOcjCategory,
  comOcjIdInput,
  comOcjDropdown
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
    Vue.use(comOcjDialogPlugin);

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

export default Object.assign(components, {
  install
});