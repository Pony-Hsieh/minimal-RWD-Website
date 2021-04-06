<template>
  <section class="container">
    <div class="row">
      <div v-for="(item, i) in image"
        :key="i"
        class="singleShippingDetail col-12 col-sm-6 col-lg-3"
      >
        <div class="my-auto">
          <img :src="item"
            alt="示意 icon"
          >
        </div>
        <h4>Free shipping</h4>
        <p>Divided face for bearing the divide unto seed winged divided light Forth.</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    // name: 'ShippingDescription',

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