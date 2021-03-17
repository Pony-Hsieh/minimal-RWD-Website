<template>
    <div>
        <headerComponent />

        <div class="container py-5">

            <!-- 地圖 -->
            <div class="my-3 d-none d-sm-block">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.814773352636!2d121.5100991150064!3d25.04035928396941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90a870e5af1%3A0x180e1a442209d1c1!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiA5q61MTIy6Jmf!5e0!3m2!1szh-TW!2stw!4v1611559277975!5m2!1szh-TW!2stw"
                    frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                <!-- <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.814773352636!2d121.5100991150064!3d25.04035928396941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90a870e5af1%3A0x180e1a442209d1c1!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiA5q61MTIy6Jmf!5e0!3m2!1szh-TW!2stw!4v1611559277975!5m2!1szh-TW!2stw"
            width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
            tabindex="0"></iframe> -->
            </div>

            <h2 class="my-3 contactUs">聯絡我們</h2>
            <form>
                <div class="form-group">
                    <textarea class="form-control" style="resize: none; height: 218px;"
                        placeholder="想表達的意見寫在這裡~~"></textarea>
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
                    <button type="submit" class="mx-auto" @click.prevent>送出</button>
                </div>
            </form>

            <section class="companyInfo">
                <div>
                    <div>
                        <i class="fas fa-home"></i>
                    </div>
                    <div>
                        <h3>連絡地址</h3>
                        <p>台北市中正區重慶南路一段122號</p>
                    </div>
                </div>
                <div>
                    <div>
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <div>
                        <h3>連絡電話</h3>
                        <p>02-2320-6239</p>
                    </div>
                </div>
                <div>
                    <div>
                        <i class="far fa-envelope"></i>
                    </div>
                    <div>
                        <h3>連絡 email</h3>
                        <p>public_web@oop.gov.tw</p>
                    </div>
                </div>
            </section>
        </div>

        <igPost />
        <footerComponent />

    </div>
</template>

<style scoped>
    iframe {
        width: 100%;
        height: 100%;
        height: 450px;
    }

    h2 {
        font-size: 1.5rem;
        color: #1a1a1a;
    }

    button {
        width: 165px;
        height: 42px;
        border-radius: 21px;
        outline: none;
        border: none;
        background-color: #2f7dfc;
        color: #fff;
    }

    button:active {
        border: 1.5px solid #2f7dfc;
        background-color: #fff;
        color: #2f7dfc;
    }

    .companyInfo {
        margin-top: 30px;
    }

    .companyInfo>div {
        margin-bottom: 25px;
        display: flex;
        align-items: center;
    }

    /* 放 icon */
    .companyInfo>div>div:first-of-type {
        width: 27px;
        height: 27px;
        text-align: center;
        line-height: 27px;
    }

    .companyInfo i {
        color: #8f9195;
        font-size: 27px;
    }

    /* 放聯絡資訊 */
    .companyInfo>div>div:last-of-type {
        margin-left: 20px;
    }

    .companyInfo h3 {
        color: #2a2a2a;
        font-size: 16px;
        margin: 0;
    }

    .companyInfo p {
        color: #8a8a8a;
        font-size: 15px;
        margin: 0;
        margin-top: 5px;
    }
</style>



<script>
    import headerComponent from "../headerComponent";
    import igPost from "../igPost";
    import footerComponent from "../footerComponent";

    export default {
        name: "contactUs",
        components: {
            headerComponent,
            igPost,
            footerComponent
        },
        created() {
            // 回到頁面頂部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
    }
</script>