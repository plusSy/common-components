import Vue from 'vue';
import App from './App.vue';

import { comOcjCascader } from '../main.js';

window.console.log(comOcjCascader);

Vue.use(comOcjCascader);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
