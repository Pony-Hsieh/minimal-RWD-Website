<template>
    <div>
        <HeaderComponent />

        <main>
            <div class="container py-5">
                <!-- 地圖 -->
                <div class="my-3 d-none d-sm-block">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.814773352636!2d121.5100991150064!3d25.04035928396941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90a870e5af1%3A0x180e1a442209d1c1!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiA5q61MTIy6Jmf!5e0!3m2!1szh-TW!2stw!4v1611559277975!5m2!1szh-TW!2stw"
                        frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0" />
                </div>

                <h2 class="my-3 contactUs">
                    聯絡我們
                </h2>
                <form>
                    <div class="form-group">
                        <textarea class="form-control" style="resize: none; height: 218px;"
                            placeholder="想表達的意見寫在這裡~~" />
                    </div>

                    <!-- 個人資料 -->
                    <div class="form-row">
                        <div class="form-group col-12 col-sm-6">
                            <input type="text" class="form-control" placeholder="姓名">
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <input type="email" class="form-control" placeholder="你的 email">
                        </div>
                    </div>
                    <div class="form-row">
                        <button type="submit" class="mx-auto" @click.prevent>
                            送出
                        </button>
                    </div>
                </form>

                <section class="companyInfo">
                    <div>
                        <div>
                            <i class="fas fa-home" />
                        </div>
                        <div>
                            <h3>連絡地址</h3>
                            <p>台北市中正區重慶南路一段122號</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <i class="fas fa-mobile-alt" />
                        </div>
                        <div>
                            <h3>連絡電話</h3>
                            <p>02-2320-6239</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <i class="far fa-envelope" />
                        </div>
                        <div>
                            <h3>連絡 email</h3>
                            <p>public_web@oop.gov.tw</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <div class="filled" />

        <IgPost />
        <FooterComponent />
    </div>
</template>


<script>
    import HeaderComponent from "@/components/HeaderComponent.vue";
    import IgPost from "@/components/IgPost.vue";
    import FooterComponent from "@/components/FooterComponent.vue";

    export default {

        name: "ContactUs",


        components: {
            HeaderComponent,
            IgPost,
            FooterComponent,
        },


        created() {
            // 回到頁面頂部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },


        mounted() {
            this.judgeFilled(); // 判斷是否需要加入填補空白區域的 div
        },


        methods: {

            // 判斷是否需要加入填補空白區域的 div
            judgeFilled() {
                let elBody = document.querySelector("body");
                let headerHeight = document.querySelector("header").offsetHeight;
                let igHeight = document.querySelector(".igPostArea").offsetHeight;
                let footerHeight = document.querySelector("footer").offsetHeight;
                let mainHeight = document.querySelector("main").offsetHeight;
                let rawHeight = headerHeight + igHeight + footerHeight + mainHeight;

                let bodyResizeObserver = new ResizeObserver(function () {
                    if (window.innerHeight > rawHeight) {
                        let h = window.innerHeight - rawHeight;
                        document.querySelector(".filled").style.height = `${h}px`;
                        // console.log(`高度為 ${h}`);
                    }
                    else {
                        document.querySelector(".filled").style.height = "0";
                        // console.log("無高度");
                    }
                });
                bodyResizeObserver.observe(elBody);
            },

        },


    };
</script>


<style scoped lang="scss">
    @import "@/assets/scss/frontEnd/contactUs.scss";
</style>