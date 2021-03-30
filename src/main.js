import Vue from 'vue';
import App from './App.vue';
import router from './router';

// 引入 Bootstrap
import 'bootstrap';

// 引入 axios 相關套件
import axios from 'axios';
import VueAxios from 'vue-axios';

// 引入 vue-slider 套件
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

// 引入 vee-validate 相關設定
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

// 引入 filter
import currencyFilter from '@/filters/currency.js';
import formatTime from '@/filters/formatTime.js';
import couponFormatTime from '@/filters/couponFormatTime.js';
import couponTransfer from '@/filters/couponTransfer.js';

// 引入 eventBus
import '@/allEventBus.js';

// 好像是用以跨域存取用的
axios.defaults.withCredentials = true;

// 啟用 套件
Vue.use(VueAxios, axios); // 啟用 VueAxios 套件
Vue.component('VueSlider', VueSlider); // 啟用 vue-slider 套件


// 引入 vee-validate 相關設定
Object.keys(rules).forEach((rule) => {
	extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
	classes: {
		valid: 'is-valid',
		invalid: 'is-invalid'
	}
});


// 啟用 filter
Vue.filter('currency', currencyFilter) // 啟用 千分號 (數字 三位一撇) filter
Vue.filter('formatTime', formatTime) // 啟用 unxiTimeStamp 轉 西元 filter，一般商品資料用
Vue.filter('couponFormatTime', couponFormatTime) // 啟用 unxiTimeStamp 轉 西元 filter，coupon 用
Vue.filter('couponTransfer', couponTransfer) // 啟用 %數轉折數 filter


// 好像是用以關掉某些提示用的
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


router.beforeEach((to, from, next) => {
	// console.log("to", to);
	// console.log("from", from);
	// console.log("next", next);
	if (to.meta.requiresAuth) { // 如果頁面有需要驗證(客戶)
		const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
		axios.post(api).then((response) => {
			// console.log(response);
			if (response.data.success) { // 代表使用者為登入狀態
				next();
			}
			else {
				alert("請先登入~");
				next({
					path: "/member/login",
				});
			}
		});
	}
	// else if (to.meta.requiresAdminAuth) { // 如果頁面有需要驗證(管理員)
	// 	const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
	// 	axios.post(api).then((response) => {
	// 		// console.log(response);
	// 		if (response.data.success) { // 代表使用者為登入狀態
	// 			next();
	// 		}
	// 		else {
	// 			alert("請先登入~")
	// 			next({
	// 				path: "/admin_Dashboard/adminLogin",
	// 			});
	// 		}
	// 	});
	// }
	// else {
		next();
	// }
});