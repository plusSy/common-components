import components from './components/index.js';
import plugins from './plugins/index.js';

window.console.log(plugins);

export const { dialog } = plugins;

export const { 
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
 } = components;

export default components