<template>
  <div>

    <AlertMsg />

    <HeaderComponent />

    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="logoutArea">
            <img src="@/assets/img/user4.png" alt="使用者大頭貼" height="50px">
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
  import AlertMsg from '@/components/AlertMsg.vue';

  export default {
    // name: "logout",

    components: {
      HeaderComponent,
      IgPost,
      FooterComponent,
      AlertMsg,
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

          if (response.data.success) {
            vm.$alertMsg_Bus.$emit("alertMsgEvent", "登出成功！<br/>將前往首頁");
            setTimeout(() => {
              vm.$router.push("/");
            }, 3000);
          }

          else {
            vm.$alertMsg_Bus.$emit("alertMsgEvent", "登出失敗QQ，請稍後再嘗試一次", "danger");
            setTimeout(() => {
              location.reload(); // 強制幫用戶重新載入頁面
            }, 3000);
          }
        });
      },
    },

  }
</script>


<style scoped lang="scss">
  @import "@/assets/scss/frontEnd/logout.scss";
</style>