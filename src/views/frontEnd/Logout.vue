<template>
  <div>
    <HeaderComponent />
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="logoutArea">
            <img src="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png" alt="使用者大頭貼"
              height="50px">
            <h3>user name</h3>
            <a href="#" @click.prevent="signout">登出</a>
          </div>
        </div>
      </div>
    </div>

    <IgPost />
    <FooterComponent />
  </div>
</template>


<script>

  import HeaderComponent from '@/components/HeaderComponent.vue';
  import IgPost from '@/components/IgPost.vue';
  import FooterComponent from '@/components/FooterComponent.vue';

  export default {
    // name: "logout",

    components: {
      HeaderComponent,
      IgPost,
      FooterComponent,
    },

    created() {
      // 回到頁面頂部
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },

    methods: {

      // 登出
      signout() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/logout`;

        vm.$http.post(api).then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            // 跳出訊息通知使用者登出成功
            alert("登出成功！將前往首頁");
            vm.$router.push("/");
          }
          else {
            alert("登出失敗QQ，請稍後再嘗試一次");
            location.reload(); // 強制幫用戶重新載入頁面
          }
        });
      },
    },

  }
</script>


<style scoped lang="scss">
  @import "@/assets/scss/frontEnd/logout.scss";
</style>