import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/frontEnd/Home.vue';
import ContactUs from '@/views/frontEnd/ContactUs.vue';


// // 前台
// import home from '@/components/pages/home'; // 首頁
// import login from '@/components/pages/login'; // 登入頁
// import logout from '@/components/pages/logout'; // 登出頁
// import shop from '@/components/pages/shop'; // 商城
// import singleProduct from '@/components/pages/singleProduct'; // 單一商品頁面
// import cart from '@/components/pages/cart'; // 購物車
// import order from '@/components/pages/order'; // 檢視所有訂單
// import singleOrder from '@/components/pages/singleOrder'; // 檢視單一訂單、下單後頁面
// import contactUs from '@/components/pages/contactUs'; // 連絡我們


// // 後台
// import admin_Dashboard from '@/components/pages/admin_Dashboard';
// // import adminSimulatedOrder from '@/components/pages/adminSimulatedOrder';
// import adminHome from '@/components/pages/adminHome'; // 管理員首頁
// import adminLogin from '@/components/pages/adminLogin'; // 管理員登入頁面
// import adminProducts from '@/components/pages/adminProducts'; // 管理產品
// import adminCoupon from '@/components/pages/adminCoupon'; // 管理 coupon
// import adminOrder from '@/components/pages/adminOrder'; // 管理訂單
// // import test from '@/components/pages/test';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contactUs',
      name: 'ContactUs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/frontEnd/ContactUs.vue'),
    },
    {
      // 避免因為用戶輸入非預期的網址而跳轉至空白頁面
      // 萬用路由要放在最後
      path: '*',
      redirect: '/', // 導至首頁
    },
  ],
});
