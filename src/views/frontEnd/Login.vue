<template>
    <div>
        <AlertMsg />

        <HeaderComponent />

        <div class="wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6 ">
                        <div class="newMember">
                            <h3>New to our Shop?</h3>
                            <p>
                                There are advances being made in science and technology everyday, and a good example of
                                this
                                is the
                            </p>
                            <a href="#" @click.prevent>CREATE AN ACCOUNT</a>
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
    import axios from "axios";
    // 引入 axios 套件 // 為了依據使用者的登入狀態判定要導至登入或登出頁面 
    // 因為判斷時，Vue 實體尚未建立，因此無法使用 Vue Axios，故需搭配 axios 作為輔助使用

    import HeaderComponent from "@/components/HeaderComponent.vue";
    import IgPost from "@/components/IgPost.vue";
    import FooterComponent from "@/components/FooterComponent.vue";
    import AlertMsg from "@/components/AlertMsg.vue";

    export default {

        name: "Login",


        components: {
            HeaderComponent,
            IgPost,
            FooterComponent,
            AlertMsg,
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
                const vm = this;
                const api = `${process.env.VUE_APP_APIPATH}/signin`;
                vm.$http.post(api, vm.user).then((response) => {

                    if (response.data.success) { // 如果登入成功，就做大括號內的事情
                        const token = response.data.token;
                        const expired = response.data.expired;

                        // 將 cookie 存入的方法
                        document.cookie = `hexToken=${token};expires=${new Date(expired)};`; // 這行如果有空行的話，可能會導致無法成功將cookie存入瀏覽器

                        vm.$alertMsg_Bus.$emit("alertMsgEvent", "登入成功！<br/>將前往首頁");
                        setTimeout(() => {
                            vm.$router.push("/");
                        }, 3000);
                    }

                    else {
                        vm.$alertMsg_Bus.$emit("alertMsgEvent", "登入失敗QQ，請稍後再嘗試一次", "danger");
                        setTimeout(() => {
                            location.reload(); // 強制幫用戶重新載入頁面
                        }, 3000);
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