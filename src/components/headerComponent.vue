<template>
    <header class="container-fluid bg-white sticky-top shadow">
        <div class="row w-100 h-100">
            <!-- 漢堡選單按鈕 -->
            <div class="col-2 d-flex d-lg-none justify-content-center align-items-center" style="cursor: pointer;"
                @click="toggleHeaderNavBurger">
                <i class="fas fa-bars" />
            </div>
            <!-- 漢堡選單 -->
            <nav class="headerNavBurger col-lg-8 order-lg-2" :class="{'ing':headerNavBurgerStatus}">
                <ul class="list-unstyled">
                    <li>
                        <router-link to="/" :class="{'nowMainPage':nowMainPage === ''}">
                            首頁
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/shop" :class="{'nowMainPage':nowMainPage === '/shop'}">
                            商城
                        </router-link>
                    </li>
                    <li>
                        <a href="#" :class="{'nowMainPage':nowMainPage === '/member'}"
                            @click.prevent="toggleDropdownNav">
                            會員&nbsp;&nbsp;<i class="fas fa-caret-down" />
                        </a>
                        <ul class="list-unstyled dropdownNav" :class="{'ing':dropdownNavStatus}">
                            <li>
                                <router-link to="/member/login" :class="{'nowSubPage':navLogStatus}">
                                    登入/登出
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/member/order" :class="{'nowSubPage':nowSubPage === '/member/order'}">
                                    檢視訂單
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/member/cart" :class="{'nowSubPage':nowSubPage === '/member/cart'}">
                                    購物車
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li :class="{'ing':dropdownNavStatus}">
                        <router-link to="/contactUs" :class="{'nowMainPage':nowMainPage === '/contactUs'}">
                            聯繫我們
                        </router-link>
                    </li>
                </ul>
            </nav>

            <!-- LOGO -->
            <div class="col-8 col-lg-2 order-lg-1 d-flex justify-content-center align-items-center logoArea">
                <img src="@/assets/img/squareIconWithoutWord.png" alt="minimal Logo">
            </div>

            <!-- iconArea -->
            <div class="col-2 order-lg-3 d-flex justify-content-center align-items-center iconArea">
                <router-link to="/member/cart">
                    <i class="fas fa-shopping-cart" />
                    <div class="LSCartItemNum">
                        {{ LSCartItemNum }}
                    </div>
                </router-link>
            </div>
        </div>
    </header>
</template>


<script>
    import $ from "jquery";

    export default {

        name: "HeaderComponent",


        data() {
            return {
                headerNavBurgerStatus: false,
                dropdownNavStatus: false,
                clientWidth: 0,
                nowMainPage: "",
                nowSubPage: "",
                navLogStatus: false,
                searchBarStatus: false,
                LSCartItemNum: 0,
            };
        },


        created() {
            const vm = this;
            vm.getLSCartItemNum();
            vm.nowMainPage = vm.$route.matched[0].path;
            if (vm.$route.matched.length > 1) {
                vm.nowSubPage = vm.$route.matched[1].path;
            }
            if (vm.nowMainPage === "/member") {
                vm.navLogStatus = (vm.nowSubPage === "/member/login" || vm.nowSubPage === "/member/logout" || false);
            }
        },


        mounted() {
            const vm = this;
            vm.$LSCartNum_Bus.$on("LSCartItemNumEvent", (param) => {
                vm.LSCartItemNum = param;
            });

            // 避免在螢幕尺寸切換時，造成 burger menu 破版
            let el = document.querySelector("body");
            let bodyResizeObserver = new ResizeObserver(function () {
                if (document.body.clientWidth < 992) {
                    vm.dropdownNavStatus = false;
                    vm.headerNavBurgerStatus = false;
                }
            });
            bodyResizeObserver.observe(el);
        },


        methods: {

            // 取得 LS 購物車內有幾項商品
            getLSCartItemNum() {
                const LSCart = JSON.parse(localStorage.getItem("userLSCart")) || [];
                this.LSCartItemNum = LSCart.length;
            },


            // 切換主選單開闔
            toggleHeaderNavBurger() {
                this.headerNavBurgerStatus = !this.headerNavBurgerStatus;
                // 如果直接閉合主選單，次選單也會閉合
                if (this.headerNavBurgerStatus === false) {
                    this.dropdownNavStatus = false;
                }
            },


            // 切換次選單開闔
            toggleDropdownNav() {
                this.dropdownNavStatus = !this.dropdownNavStatus;
            },

        },

    };
</script>


<style scoped lang="scss">
    @import "@/assets/scss/components/headerComponent.scss";
</style>