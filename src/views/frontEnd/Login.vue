<template>
  <div>
    <HeaderComponent />

    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 ">
            <div class="newMember">
              <h3>New to our Shop?</h3>
              <p>
                There are advances being made in science and technology everyday, and a good example of this
                is the
              </p>
              <a href="" @click.prevent>CREATE AN ACCOUNT</a>
            </div>
          </div>

          <div class="col-12 col-md-6 oldMember">
            <h3>
              Welcome Back !
              <br>
              Please Sign in now
            </h3>
            <form action="" @submit.prevent="signin">
              <input v-model="user.username" type="email" placeholder="Username" required>
              <input v-model="user.password" type="password" placeholder="Password" required>
              <div>
                <label for="rememberMe">記住我的帳號</label>
                <input id="rememberMe" type="checkbox">
                <button type="submit">
                  LOG IN
                </button>
                <!-- <button @click="signin">LOG IN</button> -->
                <!-- 在 form 寫了 @submit ，這個 button 就不用再綁一次事件了，如果再綁一次，就會觸發兩次事件  -->
                <a href="#" @click.prevent>
                  忘記密碼？
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <IgPost />
    <FooterComponent />
  </div>
</template>


<script>

  // 引入 axios 相關套件 // 為了依據使用者的登入狀態判定要導至登入或登出頁面
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  // Vue.use(VueAxios, axios) // 啟用 VueAxios 套件 // 這個在全局啟用過了，這裡好像就不用再寫一次，但是上面兩行引入的部分還是要再寫一次

  import HeaderComponent from '@/components/HeaderComponent.vue';
  import IgPost from '@/components/IgPost.vue';
  import FooterComponent from '@/components/FooterComponent.vue';


  export default {
    name: "Login",

    components: {
      HeaderComponent,
      IgPost,
      FooterComponent,
    },

    data() {
      return {
        user: {
          username: "",
          password: "",
        },
      };
    },

    created() {
      document.body.scrollTop = document.documentElement.scrollTop = 0; // 回到頁面頂部
    },

    methods: {

      // 登入
      signin() {
        // const api = `${process.env.VUE_APP_APIPATH}/admin/signin`; // 這是管理員用的
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/signin`; // 這是一般客戶用的

        this.$http.post(api, vm.user).then((response) => {
          // console.log("response", response);  // 測試是否能夠成功取回資料

          if (response.data.success) { // 如果登入成功，就做大括號內的事情
            const token = response.data.token;
            const expired = response.data.expired;
            // console.log(token, expired); // 測試用

            // 將 cookie 存入的方法
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`; // 這行如果有空行的話，可能會導致無法成功將cookie存入瀏覽器

            alert("登入成功，將前往首頁");
            vm.$router.push("/"); // 轉址 // 前往首頁
          }
          else {
            alert("登入失敗QQ，請稍後再嘗試一次");
            location.reload(); // 強制幫用戶重新載入頁面
          }
        });
      },

      // 登出
      signout() {
        const api = `${process.env.VUE_APP_APIPATH}/logout`;
        const vm = this;

        this.$http.post(api).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            // 跳出訊息通知使用者登出成功
            alert("登出成功！");
            vm.$router.push("/");
          }
          else {
            alert("登出失敗！");
            console.log("fail to log out");
          }
        });
      },
    },

    // 組件內的導航守衛
    beforeRouteEnter(to, from, next) {
      // 進到這個頁面前先驗證，
      // 如果是 登入 狀態，則轉至登出頁面
      // 如果是 登出 狀態，則轉至登入頁面
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;

      axios.post(api).then((response) => {
        // console.log(response);
        if (response.data.success) { // 代表使用者為登入狀態
          next({ path: "/member/logout" });
          // 這樣寫也可以
          // next({ name: "logout" });
        }
        else {
          next();
          // 原定前往(to)路徑為 "/login" ，故直接寫 next(); 即可
        }
      });
    },

  }
</script>


<style scoped lang="scss">
  @import "@/assets/scss/frontEnd/login.scss";
</style>