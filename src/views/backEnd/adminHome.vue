<template>
    <div>
        <h1>
            管理員首頁
        </h1>
    </div>
</template>

<style scoped>
    h1 {
        height: calc(100vh - 69px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 992px) {
        h1 {
            height: calc(100vh - 90px);
        }
    }
</style>


<script>
    // import $ from "jquery";

    // 其實我也不確定這個到底要不要寫，因為拿掉好像也沒看到甚麼立即的影響
    export default {
        name: "adminHome",
        data() {
            return {
            }
        },
        methods: {
            signOut() {
                const api = `${process.env.APIPATH}/logout`;
                const vm = this;

                this.$http.post(api).then((response) => {
                    // console.log("登出的 response", response); // 先將資料取回，確定從遠端取回的資料結構
                    if (response.data.success) {
                        alert("已成功登出！"); // 告知後台管理員已成功刪除產品
                        vm.$router.push("/login");
                    }
                    else {
                        alert("暫時無法登出，請稍後再試一次");
                    }
                });
            },

        },
    };
</script>