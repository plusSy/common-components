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
import comOcjPlugins from '../plugins/index.js';

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

// eslint-disable-next-line no-unused-vars
const install = function (Vue, opts = {}) {
  if (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    });

    Vue.use(comOcjPlugins);
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(components, {
  install
});