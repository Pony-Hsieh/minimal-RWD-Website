<template>
    <div>

        <!-- 選單 -->
        <!-- 等同前台的 headerComponent -->
        <div class="container-fluid bg-white sticky-top shadow">
            <div class="row" style="height: 60px;">

                <!-- 漢堡選單按鈕 -->
                <div class="col-3 d-flex d-lg-none justify-content-center align-items-center"
                    @click="headerNavBurgerStatus = !headerNavBurgerStatus" style="cursor: pointer;">
                    <i class="fas fa-bars"></i>
                </div>
                <!-- 選單 -->
                <nav class="col-lg-6 order-lg-3 headerNavBurger" :class="{'ing':headerNavBurgerStatus}">
                    <ul class="list-unstyled">
                        <li>
                            <router-link to="/admin_Dashboard" exact-active-class="active">
                                管理員首頁
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin_Dashboard/adminProducts" exact-active-class="active">
                                產品管理
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin_Dashboard/adminCoupon" exact-active-class="active">
                                優惠券管理
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin_Dashboard/adminOrder" exact-active-class="active">
                                訂單管理
                            </router-link>
                        </li>
                    </ul>
                </nav>

                <!-- LOGO -->
                <div class="col-6 col-lg-3 order-lg-1 logoArea">
                    <router-link to="/admin_Dashboard" class="d-flex justify-content-center align-items-center"
                        style="width: 100%; height: 100%;">
                        <img src="https://preview.colorlib.com/theme/winter/img/logo.png" alt="" />
                    </router-link>
                </div>

                <!-- 登入登出 -->
                <div class="col-3 order-lg-3 p-0 d-flex justify-content-center align-items-center loginArea">
                    <button class="btn btn-outline-primary btn-sm" v-if="!loginStatus"
                        @click.prevent="toAdminLogInPage">登入</button>
                    <button class="btn btn-outline-primary btn-sm" v-else @click.prevent="signout">登出</button>
                </div>

            </div>
        </div>

        <!-- router-view -->
        <div class="container-fluid">
            <main>
                <!-- 用以顯示 adminProducts.vue -->
                <!-- 用以顯示 adminCoupon.vue -->
                <!-- 用以顯示 adminOrder.vue -->
                <router-view></router-view>
            </main>
        </div>

        <footerComponent />

    </div>
</template>


<style scoped>
    .container-fluid:first-child {
        height: 60px;
    }

    @media (min-width: 992px) {
        .container-fluid:first-child {
            height: 78px;
        }
    }

    .headerNavBurger {
        position: absolute;
        top: 0;
        z-index: -1;
        width: 100%;
        padding: 0 15px;
        opacity: 0;
        visibility: hidden;
        transition: 1s;
    }

    .headerNavBurger.ing {
        opacity: 1;
        visibility: visible;
        position: absolute;
        top: 80px;
        width: 100%;
        padding: 0 15px;
        z-index: 0;
    }

    .headerNavBurger>ul {
        outline: 1px solid #aaa;
        background-color: #fff;
    }

    .headerNavBurger>ul li {
        height: 42px;
        line-height: 42px;
        /* 垂直置中 */
    }

    .headerNavBurger a {
        display: block;
        width: 100%;
        border-radius: 5px;
        padding: 0 15px;
        text-decoration: none;
        color: black;
    }

    .headerNavBurger a:hover {
        background-color: #2f7dfc;
        border-radius: 5px;
        color: #fff;
    }

    .headerNavBurger a.active {
        /* .active 是在 router index 那裏設定的 */
        background-color: #2f7dfc;
        color: #fff;
    }

    .headerNavBurger a:active {
        transform: scale(1.01);
    }

    .headerNavBurger li:nth-of-type(3) {
        position: relative;
    }

    .headerNavBurger li:nth-of-type(4) {
        transition: 1s;
        margin-top: 0;
    }

    .headerNavBurger li:nth-of-type(4).ing {
        transition: 0.8s;
        margin-top: 156px;
    }

    @media (min-width: 992px) {

        .logoArea,
        .iconArea {
            height: 78px;
        }

        .headerNavBurger {
            height: 78px;
        }

        .headerNavBurger {
            position: static;
            z-index: 0;
            opacity: 1;
            visibility: visible;
        }

        .headerNavBurger>ul {
            outline: none;
            display: flex;
            justify-content: space-between;
        }

        .headerNavBurger>ul>li {
            height: 78px;
            width: 25%;
            text-align: center;
            padding: 8px;
        }

        .headerNavBurger a {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
        }

        .headerNavBurger li:nth-of-type(4) {
            transition: 0s;
        }

        .headerNavBurger li:nth-of-type(4).ing {
            transition: 0s;
            margin-top: 0px;
        }
    }
</style>

<script>
    import footerComponent from "../footerComponent";

    export default {
        name: "admin_Dashboard", // 其實我也不確定這個到底要不要寫，因為拿掉好像也沒看到甚麼立即的影響

        components: {
            footerComponent,
        },

        data() {
            return {
                headerNavBurgerStatus: false,
                loginStatus: false,
            }
        },

        methods: {

            judgeLoginStatus() {
                // 判斷管理者的登入狀態，決定顯示登入或登出按鈕
                const api = `${process.env.APIPATH}/api/user/check`;
                const vm = this;
                vm.$http.post(api).then((response) => {
                    // console.log("response", response);
                    if (response.data.success) { // 代表使用者為登入狀態
                        vm.loginStatus = true;
                    }
                });
            },

            // 前往登入頁面
            toAdminLogInPage() {
                // console.log(this.$router);
                if (this.$router.history.current.path !== "/admin_Dashboard/adminLogin") {
                    this.$router.push("/admin_Dashboard/adminLogin"); // 轉址 // 前往首頁
                }
                else {
                    console.log("已經在登入頁面囉~");
                }
            },

            // 登出
            signout() {
                const api = `${process.env.APIPATH}/logout`;
                const vm = this;

                this.$http.post(api).then((response) => {
                    // console.log("登出的 response", response); // 先將資料取回，確定從遠端取回的資料結構
                    if (response.data.success) {
                        alert("已成功登出！"); // 告知後台管理員已成功刪除產品
                        vm.$router.push("/admin_Dashboard");
                        location.reload(); // 因為網址相同，故 vue 不會重新渲染，所以使用此語法強制重整頁面
                    }
                    else {
                        alert("暫時無法登出，請稍後再試一次");
                        location.reload(); // 因為網址相同，故 vue 不會重新渲染，所以使用此語法強制重整頁面
                    }
                });
            },
        },

        created() {
            const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            // console.log("myCookie", myCookie);
            this.$http.defaults.headers.common.Authorization = myCookie;

            this.judgeLoginStatus();
        },

        watch: {
            '$route'(to, from) {
                // console.log("TO", to);
                // console.log("FROM", from);
                if (to.fullPath !== from.fullPath) {
                    this.headerNavBurgerStatus = false; // 收起選單
                    this.judgeLoginStatus(); // 判斷右上角是登入或登出按鈕
                }
            }
        },

    };
</script>