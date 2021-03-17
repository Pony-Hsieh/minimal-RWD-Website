// 官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';

// 自訂的分頁元件
// import HelloWorld from '@/components/HelloWorld';
// 前台
import home from '@/components/pages/home'; // 首頁
import login from '@/components/pages/login'; // 登入頁
import logout from '@/components/pages/logout'; // 登入頁
import shop from '@/components/pages/shop'; // 商城
import singleProduct from '@/components/pages/singleProduct'; // 單一商品頁面
import cart from '@/components/pages/cart'; // 購物車
import order from '@/components/pages/order'; // 檢視所有訂單
import singleOrder from '@/components/pages/singleOrder'; // 檢視單一訂單、下單後頁面
import contactUs from '@/components/pages/contactUs'; // 連絡我們

// 後台
import admin_Dashboard from '@/components/pages/admin_Dashboard';
// import adminSimulatedOrder from '@/components/pages/adminSimulatedOrder';
import adminHome from '@/components/pages/adminHome'; // 管理員首頁
import adminLogin from '@/components/pages/adminLogin'; // 管理員登入頁面
import adminProducts from '@/components/pages/adminProducts'; // 管理產品
import adminCoupon from '@/components/pages/adminCoupon'; // 管理 coupon
import adminOrder from '@/components/pages/adminOrder'; // 管理訂單
// import test from '@/components/pages/test';


// 啟用元件
Vue.use(VueRouter);

// 元件要能夠匯出給 entry 檔案(此範例中是 main.js)使用

// 路由配置檔 
export default new VueRouter({

    routes: [

        {
            // 避免因為用戶輸入非預期的網址而跳轉至空白頁面
            path: "*",
            redirect: "/", // 導至首頁
        },

        {
            // 客戶端首頁
            name: "home",
            path: "/",
            component: home,
        },

        {
            // 商城 - 所有產品
            name: "shop",
            path: "/shop",
            component: shop,
        },
        {
            // 商城 - 單一商品頁面
            name: "singleProduct",
            path: "/singleProduct",
            component: singleProduct,
        },

        {
            // 登入頁面
            name: "login",
            path: "/login",
            component: login,
            // 因為需要視登入狀況決定要導至哪個頁面，故選擇寫在 login.vue 內
        },

        {
            // 登出頁面
            name: "logout",
            path: "/logout",
            component: logout,
        },

        {
            // 檢視訂單
            name: "order",
            path: "/order",
            component: order,
            meta: { requiresAuth: true }, // 須驗證登入
            // meta: { abc: true }, // 經由測試，meta 內的屬性可自定義名稱
        },

        {
            // 購物車
            name: "cart",
            path: "/cart",
            component: cart,
        },

        {
            // 下單後頁面、檢視單一訂單(兩者共用)
            name: "singleOrder",
            path: "/singleOrder",
            component: singleOrder,
        },

        {
            // 聯絡我們
            name: "contactUs",
            path: "/contactUs",
            component: contactUs,
        },

        {
            // name: "admin_Dashboard", // 下方這個黃色警示，在去除這個 name 之後就會消失
            // vue-router.esm.js?fe87:16 [vue-router] Named Route 'admin_Dashboard' has a default child route. When navigating to this named route (:to="{name: 'admin_Dashboard'"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.
            path: "/admin_Dashboard",
            component: admin_Dashboard,
            children: [
                {
                    name: "adminHome",
                    path: "", // 空值表示預設會尋訪這個子路由
                    component: adminHome,
                },
                {
                    name: "adminLogin",
                    path: "adminLogin",
                    component: adminLogin,
                },
                {
                    name: "adminProducts",
                    path: "adminProducts",
                    component: adminProducts,
                    meta: { requiresAdminAuth: true }, // 須驗證登入
                },
                {
                    name: "adminCoupon",
                    path: "adminCoupon",
                    component: adminCoupon,
                    meta: { requiresAdminAuth: true }, // 須驗證登入
                },
                {
                    name: "adminOrder",
                    path: "adminOrder",
                    component: adminOrder,
                    meta: { requiresAdminAuth: true }, // 須驗證登入
                },
            ]
        },
    ]
});