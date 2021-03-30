import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/frontEnd/Home.vue';
import Admin_Dashboard from '@/views/backEnd/Admin_Dashboard.vue';

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
      name: 'Home',
      component: Home,
    },


    // 商城
    {
      path: "/shop",
      component: () => import('@/views/frontEnd/ShopFrame.vue'),
      children: [
        {
          // 所有產品
          path: "",
          name: "Shop",
          component: () => import('@/views/frontEnd/Shop.vue'),
        },
        {
          // 單一產品頁面
          path: "singleProduct",
          name: "SingleProduct",
          component: () => import('@/views/frontEnd/SingleProduct.vue'),
        },
      ]
    },


    // 會員
    {
      path: "/member",
      component: () => import('@/views/frontEnd/Member.vue'),
      children: [
        {
          // 會員 - 登入頁面
          path: "login",
          name: "Login",
          component: () => import('@/views/frontEnd/Login.vue'),
        },
        {
          // 會員 - 登出頁面
          path: "logout",
          name: "Logout",
          component: () => import('@/views/frontEnd/Logout.vue'),
          // meta: { requiresAuth: true }, // 須驗證登入
        },
        {
          // 會員 - 檢視所有訂單
          path: "order",
          name: "Order",
          component: () => import('@/views/frontEnd/Order.vue'),
          // meta: { requiresAuth: true }, // 須驗證登入
        },
        {
          // 會員 - 購物車(無須登入即可使用)
          path: "cart",
          name: "Cart",
          component: () => import('@/views/frontEnd/Cart.vue'),
        },
      ]
    },


    {
      // 下單後頁面、檢視單一訂單(兩者共用)
      path: "/singleOrder",
      name: "SingleOrder",
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







    // 測試用頁面
    // 測試用頁面
    // 測試用頁面
    // ----------------------------------------------------------------------------------------

    {
      // 會員 - 購物車 -- 排版測試用 頁面 具有完整功能
      path: "/testCart",
      name: "TestCart",
      component: () => import('@/views/frontEnd/TestCart.vue'),
    },

    // ----------------------------------------------------------------------------------------







    // 客服人員端 後台
    {
      // name: "admin_Dashboard", // 下方這個黃色警示，在去除這個 name 之後就會消失
      // vue-router.esm.js?fe87:16 [vue-router] Named Route 'admin_Dashboard' has a default child route. When navigating to this named route (:to="{name: 'admin_Dashboard'"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.
      path: "/admin_Dashboard",
      component: Admin_Dashboard,
      children: [
        {
          path: "", // 空值表示預設會尋訪這個子路由
          name: "AdminHome",
          component: () => import('@/views/backEnd/AdminHome.vue'),
        },
        {
          path: "adminLogin",
          name: "AdminLogin",
          component: () => import('@/views/backEnd/AdminLogin.vue'),
        },
        {
          path: "adminProducts",
          name: "AdminProducts",
          component: () => import('@/views/backEnd/AdminProducts.vue'),
          // meta: { requiresAdminAuth: true }, // 須驗證登入
        },
        {
          path: "adminCoupon",
          name: "AdminCoupon",
          component: () => import('@/views/backEnd/AdminCoupon.vue'),
          // meta: { requiresAdminAuth: true }, // 須驗證登入
        },
        {
          path: "adminOrder",
          name: "AdminOrder",
          component: () => import('@/views/backEnd/AdminOrder.vue'),
          // meta: { requiresAdminAuth: true }, // 須驗證登入
        },
      ]
    },


    // 萬用路由
    {
      // 避免因為用戶輸入非預期的網址而跳轉至空白頁面
      // 萬用路由要放在最後
      path: '*',
      redirect: '/', // 導至首頁
    },

  ],
});

