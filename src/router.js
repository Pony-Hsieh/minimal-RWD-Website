import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/frontEnd/Home.vue';


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

    // 客戶端 前台
    {
      // 客戶端首頁
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      // 商城 - 所有產品
      path: "/shop",
      name: "Shop",
      component: () => import('@/views/frontEnd/Shop.vue'),
    },
    {
      // 商城 - 單一商品頁面
      path: "/singleProduct",
      name: "SingleProduct",
      component: () => import('@/views/frontEnd/SingleProduct.vue'),
    },

    {
      // 會員 - 登入頁面
      path: "/login",
      name: "Login",
      component: () => import('@/views/frontEnd/Login.vue'),
      // meta: { requiresAuth: true }, // 須驗證登入 // 經由測試，meta 內的屬性可自定義名稱
    },
    {
      // 會員 - 登出頁面
      path: "/logout",
      name: "Logout",
      component: () => import('@/views/frontEnd/Logout.vue'),
      // meta: { requiresAuth: true }, // 須驗證登入
    },
    {
      // 會員 - 檢視訂單
      path: "/order",
      name: "Order",
      component: () => import('@/views/frontEnd/Order.vue'),
      // meta: { requiresAuth: true }, // 須驗證登入
    },
    {
      // 會員 - 購物車
      path: "/cart",
      name: "Cart",
      component: () => import('@/views/frontEnd/Cart.vue'),
    },
    {
      // 下單後頁面、檢視單一訂單(兩者共用)
      name: "singleOrder",
      path: "/SingleOrder",
      component: () => import('@/views/frontEnd/SingleOrder.vue'),
    },

    {
      // 聯繫我們
      path: '/contactUs',
      name: 'ContactUs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/frontEnd/ContactUs.vue'),
    },

    // 客服人員端 後台


    {
      // 避免因為用戶輸入非預期的網址而跳轉至空白頁面
      // 萬用路由要放在最後
      path: '*',
      redirect: '/', // 導至首頁
    },
  ],
});

