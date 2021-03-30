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
            <a href="#" @click.prevent="toggleDropdownNav" :class="{'nowMainPage':nowMainPage === '/member'}">
              會員&nbsp;&nbsp;<i class="fas fa-caret-down" />
            </a>
            <ul class="list-unstyled dropdownNav" :class="{'ing':dropdownNavStatus}">
              <li>
                <!-- <router-link to="/member/login"> -->
                <router-link to="/member/login" :class="{'nowSubPage':navLogStatus}">
                  登入/登出
                </router-link>
              </li>
              <li>
                <!-- <router-link to="/member/order"> -->
                <router-link to="/member/order" :class="{'nowSubPage':nowSubPage === '/member/order'}">
                  檢視訂單
                </router-link>
              </li>
              <li>
                <!-- <router-link to="/member/cart"> -->
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
      <div class="col-8 col-lg-2 order-lg-1 logoArea">
        <router-link to="/" class="d-flex justify-content-center align-items-center" style="width: 100%; height: 100%;">
          <img src="https://preview.colorlib.com/theme/winter/img/logo.png" alt="">
        </router-link>
      </div>

      <!-- iconArea -->
      <div class="col-2 order-lg-3 d-flex justify-content-center align-items-center iconArea">
        <router-link to="/member/cart">
          <i class="fas fa-shopping-cart" />
          <div class="LSCartItemNum">
            {{ LSCartItemNum }}
          </div>
        </router-link>
        <i class="fas fa-search ml-2 ml-lg-4" title="目前僅可點擊，但跳出的搜尋欄無搜尋功能"
          @click.prevent="searchBarStatus = !searchBarStatus" />
      </div>

      <!-- 搜尋欄 -->
      <div class="searchBar" :class="{'ing':searchBarStatus}">
        <input type="text" placeholder="Search Here">
        <i class="fas fa-times" @click.prevent="searchBarStatus = !searchBarStatus" />
      </div>
    </div>
  </header>
</template>


<script>
  import $ from 'jquery';

  export default {

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

    watch: {
      "clientWidth": {
        handler: function (val) {
          if (val < 992) {
            // 避免在螢幕尺寸切換時，造成 burger menu 破版
            this.dropdownNavStatus = false;
            this.headerNavBurgerStatus = false;
          }
        },
      },
    },

    created() {
      const vm = this;
      vm.getLSCartItemNum();
      vm.nowMainPage = vm.$route.matched[0].path;
      if (vm.$route.matched.length > 1) {
        vm.nowSubPage = vm.$route.matched[1].path;
      }
      if (vm.nowMainPage === "/member") {
        vm.navLogStatus = (vm.nowSubPage === '/member/login' || vm.nowSubPage === '/member/logout' || false);
      }
    },

    mounted() {
      const vm = this;
      vm.$LSCartNum_Bus.$on("LSCartItemNumEvent", (param) => {
        vm.LSCartItemNum = param;
      });

      vm.clientWidth = document.body.clientWidth;
      window.onresize = function () {
        vm.clientWidth = document.body.clientWidth;
      };
    },

    methods: {

      // 取得 LS 購物車內有幾項商品
      getLSCartItemNum() {
        const LSCart = JSON.parse(localStorage.getItem("userLSCart")) || [];
        this.LSCartItemNum = LSCart.length;
      },

      toggleHeaderNavBurger() {
        this.headerNavBurgerStatus = !this.headerNavBurgerStatus;
        // 如果直接閉合主選單，次選單也會閉合
        if (this.headerNavBurgerStatus === false) {
          this.dropdownNavStatus = false;
        }
      },
      toggleDropdownNav() {
        this.dropdownNavStatus = !this.dropdownNavStatus;
      },
      dropdown() {
        // document.querySelector(".searchArea .dropdown-item").classList.add("ing"); // 原生 JS 寫法
        $('.searchInputArea').addClass('ing');
      },
      closeDropdown() {
        // document.querySelector(".searchArea .dropdown-item").classList.remove("ing");  // 原生 JS 寫法
        $('.searchInputArea').removeClass('ing');
      },
    },

  };
</script>


<style scoped>
  a.nowMainPage {
    /* color: aqua !important; */
    background-color: #316aff;
    /* background-color: #2f7dfc; */
    color: #fff !important;
  }

  a.nowSubPage {
    background-color: #fff !important;
    /* color: #2f7dfc !important; */
    color: #316aff !important;
  }

  /* 通用樣式 */
  .container-fluid {
    height: 60px;
  }

  @media (min-width: 992px) {
    .container-fluid {
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
    padding: 0 15px;
    text-decoration: none;
    color: black;
  }

  .headerNavBurger a:hover {
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

    .logoArea {
      height: 78px;
    }

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

  .dropdownNav {
    opacity: 0;
    visibility: hidden;
    width: 95%;
    position: absolute;
    top: 0;
    left: 2.5%;
    transition: 0.5s;
    z-index: -1;
  }

  .dropdownNav.ing {
    opacity: 1;
    visibility: visible;
    position: absolute;
    top: 42px;
    transition: 0.8s;
    z-index: 0;
    border-radius: 5px;
    background-color: #fff;
    padding: 15px 10px;
  }

  .dropdownNav a {
    border-radius: 5px;
  }

  .dropdownNav a:hover {
    background-color: #2f7dfc;
    color: #fff;
  }

  .dropdownNav a.nowSubPage {
    background-color: #2f7dfc !important;
    color: #fff !important;
  }

  @media (min-width: 992px) {
    .dropdownNav {
      transition: ease-in-out 0.8s;
      padding: 15px;
    }

    .dropdownNav.ing {
      top: 78px;
      transition: ease-in-out 0.8s;
      background-color: #2f7dfc;
    }

    .dropdownNav a {
      color: #fff;
    }

    .dropdownNav a:hover {
      background-color: #fff;
      color: #2f7dfc;
    }

    .dropdownNav a.nowSubPage {
      background-color: #fff !important;
      color: #2f7dfc !important;
    }

  }


  .iconArea i {
    font-size: 20px;
  }

  /* 購物車 icon */
  .iconArea>a {
    position: relative;
    color: #000;
  }

  .iconArea>a:active {
    transform: scale(1.1);
  }

  .LSCartItemNum {
    width: 18px;
    height: 18px;
    font-size: 14px;
    background-color: #2f7dfc;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    top: -9px;
    right: -9px;
  }

  /* 搜尋 icon */
  .iconArea i:hover {
    cursor: pointer;
  }

  .iconArea .fa-search {
    color: #000;
  }

  /* 搜尋欄 */
  .searchBar {
    width: 100%;
    height: 46.5px;
    background-color: #2f7dfc;
    display: flex;
    justify-content: space-between;
    padding: 0 12.5%;
    align-items: center;
    position: absolute;
    top: 20px;
    opacity: 0;
    visibility: hidden;
    transition: 0.8s;
  }

  .searchBar.ing {
    top: 70px;
    opacity: 1;
    visibility: visible;
    transition: 0.8s;
  }

  .searchBar input {
    width: 95%;
    outline: none;
    border: none;
    background: transparent;
    color: #fff;
    /* input 內的游標顏色可透過 color 調整 */
  }

  .searchBar i {
    font-size: 30px;
    color: #fff;
  }

  .searchBar i:hover {
    cursor: pointer;
  }

  /* 以下四項為調整 placeholder 文字顏色 */
  /*webkit瀏覽器專用*/
  .searchBar input::-webkit-input-placeholder {
    color: #fff;
  }

  /*Firefox 4-18瀏覽器專用*/
  .searchBar input::-moz-placeholder {
    color: #fff;
  }

  /*Firefox 19+瀏覽器專用*/
  .searchBar input::-moz-placeholder {
    color: #fff;
  }

  /*IE10瀏覽器專用*/
  .searchBar:-ms-input-placeholder {
    color: #fff;
  }
</style>