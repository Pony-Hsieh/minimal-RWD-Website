<template>
  <div>
    <!-- 選單 -->
    <!-- 等同前台的 headerComponent -->
    <div class="container-fluid bg-white sticky-top shadow">
      <div class="row" style="height: 60px;">
        <!-- 漢堡選單按鈕 -->
        <div class="col-3 d-flex d-lg-none justify-content-center align-items-center" style="cursor: pointer;"
          @click="headerNavBurgerStatus = !headerNavBurgerStatus">
          <i class="fas fa-bars" />
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
            <img src="@/assets/img/squareIconWithoutWord.png" alt="minimal Logo">
          </router-link>
        </div>

        <!-- 登入登出 -->
        <div class="col-3 order-lg-3 p-0 d-flex justify-content-center align-items-center loginArea">
          <button v-if="!loginStatus" class="btn btn-outline-primary btn-sm" @click.prevent="toAdminLogInPage">
            登入
          </button>
          <button v-else class="btn btn-outline-primary btn-sm" @click.prevent="signout">
            登出
          </button>
        </div>
      </div>
    </div>

    <!-- router-view -->
    <div class="container-fluid">
      <main>
        <!-- 用以顯示 adminProducts.vue -->
        <!-- 用以顯示 adminCoupon.vue -->
        <!-- 用以顯示 adminOrder.vue -->
        <router-view />
      </main>
    </div>

    <FooterComponent />
  </div>
</template>


<script>
  import FooterComponent from '@/components/FooterComponent.vue';

  export default {
    // name: "admin_Dashboard", // 其實我也不確定這個到底要不要寫，因為拿掉好像也沒看到甚麼立即的影響

    components: {
      FooterComponent,
    },

    data() {
      return {
        headerNavBurgerStatus: false,
        loginStatus: false,
        clientWidth: 0,
      }
    },

    watch: {
      "$route"(to, from) {
        // console.log("TO", to);
        // console.log("FROM", from);
        if (to.fullPath !== from.fullPath) {
          this.headerNavBurgerStatus = false; // 收起選單
          this.judgeLoginStatus(); // 判斷右上角是登入或登出按鈕
        }
      },
      "clientWidth": {
        handler: function (val) {
          if (val < 992) {
            // 避免在螢幕尺寸切換時，造成 burger menu 破版
            // this.dropdownNavStatus = false;
            this.headerNavBurgerStatus = false;
          }
        },
      },
    },

    created() {
      const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
      // console.log("myCookie", myCookie);
      this.$http.defaults.headers.common.Authorization = myCookie;

      this.judgeLoginStatus();
    },

    methods: {

      judgeLoginStatus() {
        // 判斷管理者的登入狀態，決定顯示登入或登出按鈕
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
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
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/logout`;

        vm.$http.post(api).then((response) => {
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

  };
</script>


<style scoped lang="scss">
  @import "@/assets/scss/backEnd/admin_Dashboard.scss";
</style>