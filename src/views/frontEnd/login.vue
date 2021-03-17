<template>
    <div>

        <headerComponent />

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
                        <input type="email" placeholder="Username" v-model="user.username" required>
                        <input type="password" placeholder="Password" v-model="user.password" required>
                        <div>
                            <label for="rememberMe">記住我的帳號</label>
                            <input type="checkbox" id="rememberMe">
                            <button type="submit">LOG IN</button>
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

        <igPost />
        <footerComponent />

    </div>
</template>


<style scoped>
    .container .row {
        padding: 70px 0;
    }

    .newMember,
    .oldMember {
        height: 600px;
        padding: 80px 70px;
    }

    .newMember {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #fff;
        background: rgb(255, 0, 90);
        background: -moz-linear-gradient(16deg, rgba(255, 0, 90, 1) 0%, rgba(255, 85, 51, 1) 100%);
        background: -webkit-linear-gradient(16deg, rgba(255, 0, 90, 1) 0%, rgba(255, 85, 51, 1) 100%);
        background: linear-gradient(16deg, rgba(255, 0, 90, 1) 0%, rgba(255, 85, 51, 1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff005a", endColorstr="#ff5533", GradientType=1);
    }

    .newMember h3 {
        font-size: 24px;
        font-weight: 700;
    }

    .newMember p {
        font-size: 15px;
        margin-top: 17px;
        margin-bottom: 0;
        /* 覆寫掉 _reboot.scss 中　p 的 margin-bottom 設定 */
    }

    .newMember a {
        width: 226.43px;
        height: 40.667px;
        margin-top: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ffc2d2;
        border-radius: 50px;
        background-color: transparent;
        font-size: 14px;
        text-decoration: none;
        color: #fff;
    }

    .newMember a:hover {
        background-color: #fff;
        color: #2f7dfc;
    }

    .newMember a:active {
        font-size: 15px;
    }

    .oldMember {
        font-size: 1rem;
    }

    .oldMember h3 {
        font-size: 26px;
        font-weight: 700;
        line-height: 36px;
        margin-bottom: 20px;
    }

    .oldMember form {
        margin-bottom: 20px;
    }

    .oldMember form>input {
        display: block;
        width: 100%;
        outline: none;
        margin-bottom: 1rem;
        padding: 12px 6px;
        border: 0px solid transparent;
        border-bottom: 1px solid #dddddd;
        border-radius: 0;
    }

    .oldMember button {
        width: 100%;
        height: 40px;
        outline: none;
        border: none;
        border-radius: 50px;
        background-color: #2f7dfc;
        color: #fff;
        margin: 30px 0 17px 0;
        transition: 0.5s;
    }

    .oldMember button:hover {
        background-color: red;
        transition: 0.5s;
    }

    .oldMember form div label {
        font-size: 14px;
        color: #777;
    }

    .oldMember form div a {
        display: block;
        text-align: right;
        font-size: 14px;
        text-decoration: none;
        color: #777;
    }


    @media(max-width: 991px) {

        .newMember,
        .oldMember {
            height: 400px;
            padding: 0 15px;
        }

        .oldMember {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    @media(min-width: 992px) {
        .container .row {
            padding: 100px 15px;
        }
    }

    @media(min-width: 1200px) {
        .container .row {
            padding: 140px 15px;
        }

        .oldMember h3 {
            margin-bottom: 80px;
        }
    }
</style>


<script>

    // 引入 axios 相關套件 // 為了依據使用者的登入狀態判定要導至登入或登出頁面
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    // Vue.use(VueAxios, axios) // 啟用 VueAxios 套件 // 這個在全局啟用過了，這裡好像就不用再寫一次，但是上面兩行引入的部分還是要再寫一次

    import headerComponent from "../headerComponent";
    import igPost from "../igPost";
    import footerComponent from "../footerComponent";

    export default {
        name: "login",

        components: {
            headerComponent,
            igPost,
            footerComponent
        },

        data() {
            return {
                user: {
                    username: "",
                    password: "",
                },
            };
        },

        methods: {

            // 登入
            signin() {
                // const api = `${process.env.APIPATH}/admin/signin`; // 這是管理員用的
                const api = `${process.env.APIPATH}/signin`; // 這是一般客戶用的
                const vm = this;

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
                const api = `${process.env.APIPATH}/logout`;
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

        created() {
            document.body.scrollTop = document.documentElement.scrollTop = 0; // 回到頁面頂部
        },

        // 組件內的導航守衛
        beforeRouteEnter(to, from, next) {
            // 進到這個頁面前先驗證，
            // 如果是 登入 狀態，則轉至登出頁面
            // 如果是 登出 狀態，則轉至登入頁面
            const api = `${process.env.APIPATH}/api/user/check`;

            axios.post(api).then((response) => {
                // console.log(response);
                if (response.data.success) { // 代表使用者為登入狀態
                    next({ path: "/logout" });
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