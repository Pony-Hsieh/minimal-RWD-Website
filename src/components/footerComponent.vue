<template>
  <footer class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-lg-2">
          <div class="singleFooterPart">
            <h5>Category</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#"
                  @click.prevent="routerTo('Men')"
                >男士</a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="routerTo('Women')"
                >女士</a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="routerTo('Sports')"
                >運動</a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="routerTo('Shoes')"
                >鞋類</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-2 mt-3 mt-sm-0">
          <div class="singleFooterPart">
            <h5>Company</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#"
                  @click.prevent
                >關於我們</a>
              </li>
              <li>
                <a href="#"
                  @click.prevent
                >新聞報導</a>
              </li>
              <li>
                <a href="#"
                  @click.prevent
                >常見問答</a>
              </li>
              <li>
                <a href="#"
                  @click.prevent
                >產地證明</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-4 mt-3 mt-sm-0">
          <div class="singleFooterPart">
            <h5>Contact</h5>
            <ul class="list-unstyled">
              <li>
                <span>台北市中正區重慶南路一段122號</span>
              </li>
              <li>
                <span>02-2320-6239</span>
              </li>
              <li>
                <span>public_web@oop.gov.tw</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-4 mt-3 mt-sm-0">
          <div class="singleFooterPart">
            <h5>Newsletter</h5>
            <div class="subscribe">
              <form action=""
                class="d-flex"
                @submit.prevent
              >
                <input type="email"
                  placeholder="e-mail"
                >
                <button type="submit">
                  Subscribe
                </button>
              </form>
            </div>
            <div class="socialMedia">
              <a href="#"
                @click.prevent
              >
                <i class="fab fa-facebook-f" />
              </a>
              <a href="#"
                @click.prevent
              >
                <i class="fab fa-twitter" />
              </a>
              <a href="#"
                @click.prevent
              >
                <i class="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="copyright text-center">
        Copyright ©{{ copyrightYear }} All rights reserved | This template is made with by Colorlib
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    // name: 'FooterComponent',

    data() {
      return {
        copyrightYear: "",
      };
    },

    created() {
      this.getCopyrightYear();
    },

    methods: {
      getCopyrightYear() {
        this.copyrightYear = new Date().getFullYear();
      },

      routerTo(categoryName) {
        this.$router.push({ path: "/shop", query: { category: categoryName } });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/assets/scss/components/footerComponent.scss";
</style>