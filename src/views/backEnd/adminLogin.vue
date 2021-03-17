<template>
    <div class="conainer-fluid p-0">

        <form class="form-signin" @submit.prevent="signin">
            <h1 class="h3 mb-3 font-weight-normal">管理員登入</h1>
            <label for="inputEmail" class="sr-only">管理員帳號</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="管理員帳號" v-model="user.username"
                required>
            <label for="inputPassword" class="sr-only">管理員密碼</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="管理員密碼" v-model="user.password"
                required>
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> 記住我
                </label>
            </div>
            <button class="btn btn-primary btn-block" type="submit">登入</button>
        </form>

    </div>
</template>


<style scoped>
    .form-signin {
        height: calc(100vh - 60px);
        text-align: center;
        max-width: 330px;
        padding: 95px 0;
        margin: 0 auto;
    }

    @media (min-width: 992px) {
        .form-signin {
            height: calc(100vh - 78px);
        }
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>


<script>
    export default {

        name: "adminLogin", // 其實我也不確定這個到底要不要寫，因為拿掉好像也沒看到甚麼立即的影響

        data() {
            return {
                user: {
                    username: "",
                    password: "",
                },
            }
        },

        methods: {

            // 登入
            signin() {
                // const api = `${process.env.APIPATH}/signin`; 客戶端用
                const api = `${process.env.APIPATH}/admin/signin`; // 管理員用
                const vm = this;

                this.$http.post(api, vm.user).then((response) => {
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

        created() {
            const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            // console.log("myCookie", myCookie);
            this.$http.defaults.headers.common.Authorization = myCookie;
        },

    };
</script>