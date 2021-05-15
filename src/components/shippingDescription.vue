<template>
    <section class="container">
        <div class="row">
            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img :src="image[0]" alt="示意 icon">
                </div>
                <h4>運費</h4>
                <p>單筆訂單滿千免運</p>
            </div>

            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img :src="image[1]" alt="示意 icon">
                </div>
                <h4>發票</h4>
                <p>統一開立電子發票</p>
            </div>

            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img :src="image[2]" alt="示意 icon">
                </div>
                <h4>付款</h4>
                <p>提供多元付款方式</p>
            </div>

            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img :src="image[3]" alt="示意 icon">
                </div>
                <h4>客服</h4>
                <p>週一至週五，8:00~17:00</p>
            </div>
        </div>
    </section>
</template>


<script>
    export default {

        name: "ShippingDescription",


        data() {
            return {
                image: [
                    "https://preview.colorlib.com/theme/winter/img/icon/icon_1.png",
                    "https://preview.colorlib.com/theme/winter/img/icon/icon_2.png",
                    "https://preview.colorlib.com/theme/winter/img/icon/icon_3.png",
                    "https://preview.colorlib.com/theme/winter/img/icon/icon_4.png",
                ],
            }
        }
    };
</script>


<style scoped lang="scss">
    @import "@/assets/scss/components/shippingDescription.scss";
</style>