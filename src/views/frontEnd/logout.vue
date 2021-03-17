<template>
    <div>

        <headerComponent />
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="newMember">
                        <img src="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png" alt=""
                            height="50px">
                        <h3>user name</h3>
                        <a href="" @click.prevent="signout">登出</a>
                    </div>
                </div>
            </div>
        </div>

        <igPost />
        <footerComponent />

    </div>
</template>


<style scoped>
    .container-fluid .row {
        padding: 15px 0;
    }

    .newMember {
        height: calc(100vh - 60px - 30px);
        padding: 80px 70px;
    }

    .newMember {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #fff;
        background: rgb(0, 255, 165);
        background: -moz-linear-gradient(16deg, rgba(0, 255, 165, 1) 0%, rgba(0, 170, 204, 1) 100%);
        background: -webkit-linear-gradient(16deg, rgba(0, 255, 165, 1) 0%, rgba(0, 170, 204, 1) 100%);
        background: linear-gradient(16deg, rgba(0, 255, 165, 1) 0%, rgba(0, 170, 204, 1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ffa5", endColorstr="#00aacc", GradientType=1);
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
        border: 1px solid #c2ffef;
        border-radius: 50px;
        background-color: transparent;
        font-size: 14px;
        text-decoration: none;
        color: #000;
        color: #fff;
    }

    .newMember a:hover {
        background-color: #fff;
        color: #2f7dfc;
    }

    .newMember a:active {
        font-size: 15px;
    }

    @media(min-width: 992px) {
        .newMember {
            height: calc(100vh - 78px - 30px);
            padding: 80px 70px;
        }
    }


    /* @media(max-width: 991px) {

        .newMember {
            height: 400px;
            padding: 0 15px;
        }
    } */

    /* @media(min-width: 992px) {
        .container .row {
            padding: 100px 15px;
        }
    }

    @media(min-width: 1200px) {
        .container .row {
            padding: 140px 15px;
        }
    } */
</style>


<script>

    import headerComponent from "../headerComponent";
    import igPost from "../igPost";
    import footerComponent from "../footerComponent";

    export default {
        name: "logout",

        components: {
            headerComponent,
            igPost,
            footerComponent
        },

        methods: {

            // 登出
            signout() {
                const api = `${process.env.APIPATH}/logout`;
                const vm = this;

                this.$http.post(api).then((response) => {
                    console.log(response.data);
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

        created() {
            // 回到頁面頂部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },

    }
</script>