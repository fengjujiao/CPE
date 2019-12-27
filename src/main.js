/* eslint-disable import/order */
import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
// eslint-disable-next-line import/extensions
import './plugins/element.js';
// eslint-disable-next-line import/order
import VCharts from 'v-charts';
import './assets/css/main.css';

// eslint-disable-next-line import/extensions
import main from './assets/js/main.js';
// 日历组件
// eslint-disable-next-line import/no-unresolved
import 'vue-event-calendar/dist/style.css'; // 1.1.10之后的版本，css被放在了单独的文件中，方便替换
// eslint-disable-next-line import/order
import vueEventCalendar from 'vue-event-calendar';
// 引入echarts
import echarts from 'echarts';

Vue.prototype.$echarts = echarts;
Vue.use(vueEventCalendar, { locale: 'en' }); // 可以设置语言，支持中文和英文
Vue.config.productionTip = false;
Vue.use(VCharts);
Vue.prototype.$main = main;
// 全局过滤器

import * as custom from './assets/js/filter'
Object.keys(custom).forEach((key) => {
  Vue.filter(key, custom[key]);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
