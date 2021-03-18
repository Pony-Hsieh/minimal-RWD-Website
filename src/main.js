import Vue from 'vue';
import App from './App.vue';
import router from './router';

// 引入 Bootstrap
import 'bootstrap';

// 引入 axios 相關套件
import axios from 'axios';
import VueAxios from 'vue-axios';

// 引入 filter
import currencyFilter from '@/filters/currency'
import formatTime from '@/filters/formatTime'
import couponFormatTime from '@/filters/couponFormatTime'
import couponTransfer from '@/filters/couponTransfer'

// 好像是用以跨域存取用的
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios); // 啟用 VueAxios 套件

// 啟用 filter
Vue.filter('currency', currencyFilter) // 啟用 千分號 (數字 三位一撇) filter
Vue.filter('formatTime', formatTime) // 啟用 unxiTimeStamp 轉 西元 filter，一般商品資料用
Vue.filter('couponFormatTime', couponFormatTime) // 啟用 unxiTimeStamp 轉 西元 filter，coupon 用
Vue.filter('couponTransfer', couponTransfer) // 啟用 %數轉折數 filter


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
