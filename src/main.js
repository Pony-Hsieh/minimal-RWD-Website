import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
// import '../src/assets/scss/main.scss';


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
