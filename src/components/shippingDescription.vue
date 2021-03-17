<template>
    <section class="container">
        <div class="row">
            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img src="https://preview.colorlib.com/theme/winter/img/icon/icon_1.png" alt="">
                </div>
                <h4>Free shipping</h4>
                <p>Divided face for bearing the divide unto seed winged divided light Forth.</p>
            </div>
            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img src="https://preview.colorlib.com/theme/winter/img/icon/icon_2.png" alt="">
                </div>
                <h4>Free shipping</h4>
                <p>Divided face for bearing the divide unto seed winged divided light Forth.</p>
            </div>
            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img src="https://preview.colorlib.com/theme/winter/img/icon/icon_3.png" alt="">
                </div>
                <h4>Free shipping</h4>
                <p>Divided face for bearing the divide unto seed winged divided light Forth.</p>
            </div>
            <div class="singleShippingDetail col-12 col-sm-6 col-lg-3">
                <div class="my-auto">
                    <img src="https://preview.colorlib.com/theme/winter/img/icon/icon_4.png" alt="">
                </div>
                <h4>Free shipping</h4>
                <p>Divided face for bearing the divide unto seed winged divided light Forth.</p>
            </div>
        </div>
    </section>
</template>


<style scoped>
    .container {
        padding-top: 70px;
        padding-bottom: 70px;
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 992px) {
        .container {
            padding-top: 100px;
            padding-bottom: 100px;
        }
    }

    .singleShippingDetail {
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .singleShippingDetail h4 {
        font-size: 24px;
        font-weight: 700;
        margin-top: 15px;
        margin-bottom: 5px;
    }
</style>


<script>
    export default {
        name: "shippingDescription",
    }
</script>