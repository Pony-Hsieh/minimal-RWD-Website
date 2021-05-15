<template>
    <div class="conainer-fluid p-0">
        <form class="form-signin" @submit.prevent="signin">
            <h1 class="h3 mb-3 font-weight-normal">
                管理員登入
            </h1>
            <label for="inputEmail" class="sr-only">管理員帳號</label>
            <input id="inputEmail" v-model="user.username" type="email" class="form-control" placeholder="管理員帳號"
                required>
            <label for="inputPassword" class="sr-only">管理員密碼</label>
            <input id="inputPassword" v-model="user.password" type="password" class="form-control" placeholder="管理員密碼"
                required>
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> 記住我
                </label>
            </div>
            <button class="btn btn-primary btn-block" type="submit">
                登入
            </button>
        </form>
    </div>
</template>


<script>
    export default {

        name: "AdminLogin",


        data() {
            return {
                user: {
                    username: "",
                    password: "",
                },
            }
        },


        created() {
            const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            // console.log("myCookie", myCookie);
            this.$http.defaults.headers.common.Authorization = myCookie;
        },

        
        methods: {

            // 登入
            signin() {
                const vm = this;
                // const api = `${process.env.VUE_APP_APIPATH}/signin`; 客戶端用
                const api = `${process.env.VUE_APP_APIPATH}/admin/signin`; // 管理員用

                vm.$http.post(api, vm.user).then((response) => {
                    // console.log("response", response);  // 測試是否能夠成功取回資料

                    if (response.data.success) { // 如果登入成功，就做大括號內的事情
                        const token = response.data.token;
                        const expired = response.data.expired;
                        // console.log(token, expired); // 測試用

                        // 將 cookie 存入的方法
                        document.cookie = `hexToken=${token};expires=${new Date(expired)};`; // 這行如果有空行的話，可能會導致無法成功將cookie存入瀏覽器

                        alert("登入成功，將前往管理員首頁");
                        vm.$router.push("/admin_Dashboard"); // 轉址 // 前往首頁
                    }
                    else {
                        alert("登入失敗QQ，請稍後再嘗試一次");
                        location.reload(); // 強制幫用戶重新載入頁面
                    }
                });
            },

        },

    };
</script>


<style scoped lang="scss">
    @import "@/assets/scss/backEnd/adminLogin.scss";
</style>